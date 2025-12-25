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
import { getContentUrl } from "../utils/config";

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

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('auth_token');
    if (!token) {
      setLoading(false);
      return;
    }
    setIsAuthenticated(true);

    // Load dashboard data
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
        console.error('Failed to load dashboard data:', error);
        // Data branch should have dashboard.json with this content
        console.log('Make sure dashboard.json exists in your data branch content folder');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
      case 'locked':
        return <LockedFeature />;
      default:
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