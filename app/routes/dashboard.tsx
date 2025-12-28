import type { Route } from "./+types/dashboard";
import { useState, useEffect } from "react";
import { Navigate } from "react-router";
import { DashboardLayout } from "../components/dashboard/layout";
import { DashboardHome } from "../components/dashboard/home";
import { Setup } from "../components/dashboard/setup";
import { AttendanceManagement } from "../components/dashboard/attendance";
import { EmployeeManagement } from "../components/dashboard/employee";
import { StudentManagement } from "../components/dashboard/student";
import { LockedFeature } from "../components/dashboard/locked";
import { ProfilePage } from "../components/dashboard/profile-page";
import { getContentUrl } from "../utils/config";

const lockedMenuItems = [
  'admission', 'admission-query', 'notifications', 'assignments', 'birthdays',
  'canteen', 'certificates', 'hostel', 'library', 'other-charges', 'passout',
  'progress', 'recharge', 'timetable', 'transport', 'user', 'whatsapp'
];

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard - Seekio Academic Management" },
    { name: "description", content: "Academic management dashboard for schools and institutions." },
  ];
}

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Handle hash navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setActiveMenu(hash);
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check initial hash
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('auth_token');
    if (!token) {
      setLoading(false);
      return;
    }
    setIsAuthenticated(true);

    // Fetch fresh user data to check live mode status
    const userData = localStorage.getItem('user_data');
    if (userData) {
      const user = JSON.parse(userData);
      const email = user.email;
      
      // Fetch fresh credentials to get current isLive status
      fetch(getContentUrl('/signup.json') + '?v=' + Math.random())
        .then(res => res.json())
        .then(data => {
          const userCred = data.testCredentials;
          if (userCred && userCred.email === email) {
            // Update cached user data with fresh isLive status (parse string to boolean)
            const isLiveStatus = userCred.isLive === 'true' || userCred.isLive === true;
            const updatedUser = { ...user, isLive: isLiveStatus };
            localStorage.setItem('user_data', JSON.stringify(updatedUser));
            
            if (isLiveStatus) {
              // In live mode, show empty data structure
              const emptyData = {
                schoolName: "Your School Name",
                academicYear: "2024-2025",
                dashboard: { trialDays: 0, stats: { students: 0, employees: 0, classes: 0 } },
                communication: { sms: 0, whatsapp: 0, email: 0 },
                attendance: { present: 0, absent: 0, leave: 0, notMarked: 0, total: 0 },
                employees: [],
                students: [],
                setup: { classes: [] }
              };
              setDashboardData(emptyData);
              setLoading(false);
              return;
            }
          }
          
          // Load test mode data
          loadTestModeData();
        })
        .catch(error => {
          console.error('Failed to fetch fresh credentials:', error instanceof Error ? error.message.replace(/[\r\n]/g, '') : 'Unknown error');
          // Fallback to cached data
          const isLiveMode = user.isLive;
          if (isLiveMode) {
            const emptyData = {
              schoolName: "Your School Name",
              academicYear: "2024-2025",
              dashboard: { trialDays: 0, stats: { students: 0, employees: 0, classes: 0 } },
              communication: { sms: 0, whatsapp: 0, email: 0 },
              attendance: { present: 0, absent: 0, leave: 0, notMarked: 0, total: 0 },
              employees: [],
              students: [],
              setup: { classes: [] }
            };
            setDashboardData(emptyData);
            setLoading(false);
            return;
          }
          loadTestModeData();
        });
    } else {
      loadTestModeData();
    }
  }, []);

  const loadTestModeData = () => {
    // Load dashboard data for test mode
    const cachedData = sessionStorage.getItem('dashboard-data');
    if (cachedData) {
      try {
        const parsed = JSON.parse(cachedData);
        setDashboardData(parsed);
      } catch (e) {
        console.warn('Failed to parse cached dashboard data');
      }
    }
    
    fetch(getContentUrl('/dashboard-data-sample.json'))
      .then(res => {
        console.log('Dashboard fetch response:', res.status, res.statusText);
        return res.json();
      })
      .then(data => {
        console.log('Dashboard data loaded:', data);
        setDashboardData(data);
        sessionStorage.setItem('dashboard-data', JSON.stringify(data));
      })
      .catch(error => {
        console.error('Failed to load dashboard data:', error instanceof Error ? error.message.replace(/[\r\n]/g, '') : 'Unknown error');
        console.log('Make sure dashboard.json exists in your data branch content folder');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/signup" replace />;
  }

  const renderContent = () => {
    const userData = localStorage.getItem('user_data');
    const isLiveMode = userData && JSON.parse(userData).isLive;
    
    switch (activeMenu) {
      case 'dashboard':
        return <DashboardHome data={dashboardData} />;
      case 'setup':
        return <Setup data={dashboardData} />;
      case 'attendance':
        return <AttendanceManagement data={dashboardData} />;
      case 'employee':
        return <EmployeeManagement data={dashboardData} />;
      case 'student':
        return <StudentManagement data={dashboardData} />;
      case 'profile':
        return <ProfilePage data={dashboardData} />;
      case 'fees':
      case 'assignments':
      case 'progress':
      case 'locked':
        return isLiveMode ? <DashboardHome data={dashboardData} /> : <LockedFeature key={activeMenu} data={dashboardData} />;
      default:
        if (lockedMenuItems.includes(activeMenu)) {
          return isLiveMode ? <DashboardHome data={dashboardData} /> : <LockedFeature key={activeMenu} data={dashboardData} />;
        }
        return <DashboardHome data={dashboardData} />;
    }
  };

  return (
    <DashboardLayout 
      activeMenu={activeMenu} 
      setActiveMenu={setActiveMenu}
      data={dashboardData}
    >
      {renderContent()}
    </DashboardLayout>
  );
}