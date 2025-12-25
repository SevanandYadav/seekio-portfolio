import { ReactNode, useState } from "react";
import { 
  LayoutDashboard, Settings, Users, UserCheck, DollarSign, 
  GraduationCap, UserPlus, MessageSquare, Bell, Calendar,
  Gift, Coffee, Award, Home, BookOpen, CreditCard, Clock,
  Bus, Shield, Send, LogOut, AlertTriangle, ChevronLeft,
  ChevronRight, ChevronsLeft, ChevronsRight, User, Key, Lock
} from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
  data: any;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'setup', label: 'Setup', icon: Settings },
  { id: 'attendance', label: 'Attendance Management', icon: UserCheck },
  { id: 'employee', label: 'Employee Management', icon: Users },
  { id: 'fees', label: 'Fees Management', icon: DollarSign },
  { id: 'student', label: 'Student Management', icon: GraduationCap },
  { id: 'admission', label: 'Admission Management', icon: UserPlus, locked: true },
  { id: 'admission-query', label: 'Admission Query', icon: MessageSquare, locked: true },
  { id: 'notifications', label: 'App Notifications', icon: Bell, locked: true },
  { id: 'assignments', label: 'Assignments & Notices', icon: BookOpen, locked: true },
  { id: 'birthdays', label: 'Birthdays', icon: Gift, locked: true },
  { id: 'canteen', label: 'Canteen Management', icon: Coffee, locked: true },
  { id: 'certificates', label: 'Certificates', icon: Award, locked: true },
  { id: 'hostel', label: 'Hostel Management', icon: Home, locked: true },
  { id: 'library', label: 'Library Management', icon: BookOpen, locked: true },
  { id: 'other-charges', label: 'Other Charges', icon: CreditCard, locked: true },
  { id: 'passout', label: 'Passout', icon: GraduationCap, locked: true },
  { id: 'progress', label: 'Progress Report', icon: BookOpen, locked: true },
  { id: 'recharge', label: 'Recharge', icon: CreditCard, locked: true },
  { id: 'timetable', label: 'Time-Table Management', icon: Clock, locked: true },
  { id: 'transport', label: 'Transport Management', icon: Bus, locked: true },
  { id: 'user', label: 'User Management', icon: Shield, locked: true },
  { id: 'whatsapp', label: 'Whatsapp Messages', icon: Send, locked: true },
];

export function DashboardLayout({ children, activeMenu, setActiveMenu, data }: DashboardLayoutProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    sessionStorage.removeItem('dashboard-data');
    window.location.href = '/signup';
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const navigateYear = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear() + direction, currentDate.getMonth(), 1));
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const today = new Date();
    const days = [];
    
    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = today.getDate() === day && 
                     today.getMonth() === currentDate.getMonth() && 
                     today.getFullYear() === currentDate.getFullYear();
      
      days.push(
        <div 
          key={day} 
          className={`h-8 flex items-center justify-center text-sm cursor-pointer hover:bg-blue-50 rounded ${
            isToday ? 'bg-blue-600 text-white font-semibold' : 'text-gray-700'
          }`}
        >
          {day}
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">
            {data?.schoolName || "JJ English Medium School"}
          </h1>
          <p className="text-sm text-gray-500">Academic Year: {data?.academicYear || "2024-2025"}</p>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto py-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => item.locked ? setActiveMenu('locked') : setActiveMenu(item.id)}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-blue-50 transition-colors ${
                  activeMenu === item.id 
                    ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                <Icon size={18} className="mr-3" />
                <span className="text-sm font-medium flex-1">{item.label}</span>
                {item.locked && <Lock size={14} className="text-gray-400" />}
              </button>
            );
          })}
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={18} className="mr-3" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                <AlertTriangle size={16} className="mr-2" />
                <span className="text-sm font-medium">You are on Test Mode</span>
              </div>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Go Live
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Good Evening, {data?.schoolName || "JJ English Medium School"}
              </div>
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <User size={20} />
                  <span className="text-sm">Profile</span>
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <Key size={16} className="mr-3" />
                      Reset Password
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={16} className="mr-3" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex">
          {/* Main Content */}
          <div className="flex-1 p-6">
            {children}
          </div>

          {/* Right Sidebar - Calendar (only for dashboard) */}
          {activeMenu === 'dashboard' && (
            <div className="w-80 bg-white shadow-lg p-6">
              {/* Session Year Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Session Year</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>2024 - 2025</option>
                  <option>2023 - 2024</option>
                  <option>2022 - 2023</option>
                </select>
              </div>

              {/* Calendar */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Calendar</h3>
                
                {/* Today's Date */}
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-gray-600">Today:</div>
                  <div className="font-semibold text-gray-900">
                    {new Date().toLocaleDateString('en-GB')} - {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
                  </div>
                </div>

                {/* Calendar Navigation */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <button onClick={() => navigateYear(-1)} className="p-1 hover:bg-gray-100 rounded">
                      <ChevronsLeft size={16} className="text-gray-600" />
                    </button>
                    <button onClick={() => navigateMonth(-1)} className="p-1 hover:bg-gray-100 rounded">
                      <ChevronLeft size={16} className="text-gray-600" />
                    </button>
                  </div>
                  <div className="font-semibold text-gray-900">
                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => navigateMonth(1)} className="p-1 hover:bg-gray-100 rounded">
                      <ChevronRight size={16} className="text-gray-600" />
                    </button>
                    <button onClick={() => navigateYear(1)} className="p-1 hover:bg-gray-100 rounded">
                      <ChevronsRight size={16} className="text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-gray-500">
                      {day}
                    </div>
                  ))}
                  {renderCalendar()}
                </div>

                {/* No Events */}
                <div className="text-center text-sm text-gray-500 mb-4">
                  No Events Found !
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                  Add Event
                </button>
              </div>

              {/* Trial Warning */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <AlertTriangle size={16} className="text-yellow-600 mr-2" />
                  <span className="text-sm font-medium text-yellow-800">Trial Warning</span>
                </div>
                <p className="text-sm text-yellow-700">
                  Your Trial Ends in <span className="font-semibold">29 days</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}