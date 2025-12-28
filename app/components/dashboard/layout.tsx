import { ReactNode, useState, useEffect } from "react";
import { 
  LayoutDashboard, Settings, Users, UserCheck, DollarSign, 
  GraduationCap, UserPlus, MessageSquare, Bell, Calendar,
  Gift, Coffee, Award, Home, BookOpen, CreditCard, Clock,
  Bus, Shield, Send, LogOut, AlertTriangle, ChevronLeft,
  ChevronRight, ChevronsLeft, ChevronsRight, User, Key, Lock, CheckCircle
} from "lucide-react";
import { TestModeModal } from "./test-mode-modal";
import { ProfileModal } from "./profile-modal";

// Load Tawk.to script
if (typeof window !== 'undefined') {
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://embed.tawk.to/694f530a5823b7197c153ae4/1jdeuldfq';
  script.charset = 'UTF-8';
  script.setAttribute('crossorigin', '*');
  document.head.appendChild(script);
}

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
  const [showTestModeModal, setShowTestModeModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showHolidayWarning, setShowHolidayWarning] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [events, setEvents] = useState<any[]>([]);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [dateError, setDateError] = useState('');
  const [newEvent, setNewEvent] = useState({
    name: '',
    type: 'once',
    description: '',
    startDate: '',
    endDate: '',
    attendanceRequired: false,
    applicableTo: { teachers: false, students: false }
  });
  
  // Check if user is in live mode and get subscription data
  const userData = localStorage.getItem('user_data');
  const user = userData ? JSON.parse(userData) : null;
  const isLiveMode = user?.isLive;
  const subscription = user?.subscription || { level: 0, planName: 'Free Trial' };
  
  // Subscription level names
  const getSubscriptionName = (level: number) => {
    switch(level) {
      case 0: return 'Free Trial';
      case 1: return 'Professional';
      case 2: return 'Enterprise';
      default: return 'Free Trial';
    }
  };
  
  // Check if user needs upgrade button (not on Enterprise level)
  const showUpgradeButton = subscription.level < 2;
  
  // Load events from cache
  useEffect(() => {
    if (isLiveMode) {
      const cachedEvents = localStorage.getItem('live_events');
      if (cachedEvents) {
        setEvents(JSON.parse(cachedEvents));
      }
    }
  }, [isLiveMode]);
  
  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showUserMenu) {
        setShowUserMenu(false);
      }
    };
    
    if (showUserMenu) {
      document.addEventListener('click', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showUserMenu]);
  
  const calculateTrialDays = () => {
    if (!subscription?.endDate) return 0;
    const endDate = new Date(subscription.endDate);
    const today = new Date();
    const daysLeft = Math.ceil((endDate.getTime() - today.getTime()) / (24 * 60 * 60 * 1000));
    return Math.max(0, daysLeft);
  };
  
  // Check if subscription has expired
  const isSubscriptionExpired = () => {
    if (!subscription?.endDate) return false;
    const endDate = new Date(subscription.endDate);
    const today = new Date();
    return today > endDate;
  };
  
  const handleGoLive = () => {
    if (confirm("Once you go live, you will be logged out and you will have to log back in. Continue?")) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      sessionStorage.removeItem('dashboard-data');
      window.location.href = '/signup';
    }
  };
  
  const handlePasswordReset = () => {
    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    // Update cached credentials
    const cachedCreds = localStorage.getItem('trial_credentials');
    if (cachedCreds) {
      try {
        const trialCreds = JSON.parse(cachedCreds);
        trialCreds.password = newPassword;
        localStorage.setItem('trial_credentials', JSON.stringify(trialCreds));
        alert('Password updated successfully!');
        setShowPasswordModal(false);
        setNewPassword("");
        setConfirmPassword("");
      } catch (e) {
        alert('Failed to update password');
      }
    } else {
      alert('No cached credentials found');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    sessionStorage.removeItem('dashboard-data');
    window.location.href = '/signup';
  };

  const handleAddEvent = () => {
    if (isLiveMode) {
      setEditingEvent(null);
      setNewEvent({
        name: '',
        type: 'once',
        description: '',
        startDate: '',
        endDate: '',
        attendanceRequired: false,
        applicableTo: { teachers: false, students: false }
      });
      setDateError('');
      setShowEventModal(true);
    } else {
      setShowTestModeModal(true);
    }
  };

  const handleEditEvent = (event: any) => {
    setEditingEvent(event);
    setNewEvent({ ...event });
    setDateError('');
    setShowEventModal(true);
  };

  const handleSaveEvent = () => {
    if (!newEvent.name || !newEvent.startDate || !newEvent.endDate) {
      alert('Please fill in all required fields');
      return;
    }

    if (new Date(newEvent.endDate) < new Date(newEvent.startDate)) {
      setDateError('End date cannot be before start date');
      return;
    }

    setDateError('');
    saveEventToCache();
  };

  const saveEventToCache = () => {
    let updatedEvents;
    
    if (editingEvent) {
      updatedEvents = events.map(event => 
        event.id === editingEvent.id ? { ...newEvent, id: editingEvent.id } : event
      );
    } else {
      updatedEvents = [...events, { ...newEvent, id: Date.now() }];
    }
    
    setEvents(updatedEvents);
    localStorage.setItem('live_events', JSON.stringify(updatedEvents));
    setNewEvent({
      name: '',
      type: 'once',
      description: '',
      startDate: '',
      endDate: '',
      attendanceRequired: false,
      applicableTo: { teachers: false, students: false }
    });
    setShowEventModal(false);
    setShowHolidayWarning(false);
    setEditingEvent(null);
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateString = clickedDate.getFullYear() + '-' + 
                      String(clickedDate.getMonth() + 1).padStart(2, '0') + '-' + 
                      String(clickedDate.getDate()).padStart(2, '0');
    const eventOnDate = events.find(event => event.startDate === dateString);
    if (eventOnDate) {
      setSelectedEvent(eventOnDate);
    } else {
      setSelectedEvent(null);
    }
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      const updatedEvents = events.filter(event => event.id !== selectedEvent.id);
      setEvents(updatedEvents);
      localStorage.setItem('live_events', JSON.stringify(updatedEvents));
      setSelectedEvent(null);
    }
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
      
      const currentDateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateString = currentDateObj.getFullYear() + '-' + 
                        String(currentDateObj.getMonth() + 1).padStart(2, '0') + '-' + 
                        String(currentDateObj.getDate()).padStart(2, '0');
      const hasEvent = events.some(event => event.startDate === dateString);
      
      days.push(
        <div 
          key={day} 
          onClick={() => handleDateClick(day)}
          className={`h-8 flex items-center justify-center text-sm cursor-pointer hover:bg-blue-50 rounded ${
            isToday ? 'bg-blue-600 text-white font-semibold' : 
            hasEvent ? 'bg-green-100 text-green-800 font-medium' : 'text-gray-700'
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
            const isLocked = item.locked && !isLiveMode; // Unlock all items in live mode
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-blue-50 transition-colors ${
                  activeMenu === item.id 
                    ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                <Icon size={18} className="mr-3" />
                <span className="text-sm font-medium flex-1">{item.label}</span>
                {isLocked && <Lock size={14} className="text-gray-400" />}
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
            {!isLiveMode && (
              <>
                <div className="flex items-center bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                  <AlertTriangle size={16} className="mr-2" />
                  <span className="text-sm font-medium">You are on Test Mode</span>
                </div>
                <button 
                  onClick={() => setShowTestModeModal(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Go Live
                </button>
              </>
            )}
          </div>
        </div>

        {/* Sub Header */}
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Good Evening, {data?.schoolName || "JJ English Medium School"}
            </div>
            <div className="flex items-center space-x-4">
              {/* Upgrade Button - Show if not on Enterprise */}
              {showUpgradeButton && (
                <button 
                  onClick={() => window.location.href = '/pricing'}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center space-x-2"
                >
                  <CreditCard size={16} />
                  <span>Upgrade Plan</span>
                </button>
              )}
              
              <div className="relative">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowUserMenu(!showUserMenu);
                  }}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <User size={20} />
                  <span className="text-sm">Profile</span>
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {/* Subscription Info */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="text-xs text-gray-500 mb-1">Current Plan</div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">{getSubscriptionName(subscription.level)}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          subscription.level === 0 ? 'bg-gray-100 text-gray-700' :
                          subscription.level === 1 ? 'bg-blue-100 text-blue-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          Level {subscription.level}
                        </span>
                      </div>
                      {subscription.endDate && (
                        <div className="text-xs text-gray-500 mt-1">
                          Expires: {new Date(subscription.endDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                    
                    {isLiveMode && (
                      <button 
                        onClick={() => {
                          setShowUserMenu(false);
                          setActiveMenu('profile');
                        }}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <User size={16} className="mr-3" />
                        View Profile
                      </button>
                    )}
                    <button 
                      onClick={() => {
                        setShowUserMenu(false);
                        setShowPasswordModal(true);
                      }}
                      className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
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
                  {events.length === 0 ? 'No Events Found !' : `${events.length} Event(s) Found`}
                </div>

                <button 
                  onClick={handleAddEvent}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                >
                  Add Event
                </button>
                
                {/* Selected Event Details */}
                {selectedEvent && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">{selectedEvent.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{selectedEvent.description}</p>
                    <p className="text-xs text-gray-500 mb-2">
                      {selectedEvent.startDate} {selectedEvent.endDate !== selectedEvent.startDate ? `to ${selectedEvent.endDate}` : ''}
                    </p>
                    <p className="text-xs text-gray-500 mb-3">
                      Type: {selectedEvent.type} | Attendance: {selectedEvent.attendanceRequired ? 'Required' : 'Holiday'}
                    </p>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEditEvent(selectedEvent)}
                        className="text-xs bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={handleDeleteEvent}
                        className="text-xs bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Trial Warning - Only show in test mode */}
              {!isLiveMode && (
                <div className={`rounded-lg p-4 ${
                  isSubscriptionExpired() 
                    ? 'bg-red-50 border border-red-200' 
                    : 'bg-yellow-50 border border-yellow-200'
                }`}>
                  <div className="flex items-center mb-2">
                    <AlertTriangle size={16} className={`mr-2 ${
                      isSubscriptionExpired() ? 'text-red-600' : 'text-yellow-600'
                    }`} />
                    <span className={`text-sm font-medium ${
                      isSubscriptionExpired() ? 'text-red-800' : 'text-yellow-800'
                    }`}>
                      {isSubscriptionExpired() ? 'Subscription Expired' : 'Trial Warning'}
                    </span>
                  </div>
                  <p className={`text-sm mb-3 ${
                    isSubscriptionExpired() ? 'text-red-700' : 'text-yellow-700'
                  }`}>
                    {isSubscriptionExpired() 
                      ? 'Your trial has ended. Please choose a subscription plan to continue using all features.' 
                      : `Your Trial Ends in ${calculateTrialDays()} days`
                    }
                  </p>
                  {isSubscriptionExpired() && (
                    <button 
                      onClick={() => window.location.href = '/pricing?expired=true'}
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                      <CreditCard size={16} />
                      <span>Choose Subscription Plan</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Test Mode Modal */}
      <TestModeModal 
        isOpen={showTestModeModal}
        onClose={() => setShowTestModeModal(false)}
        data={data}
      />

      {/* Profile Modal */}
      <ProfileModal 
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />

      {/* Password Reset Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Reset Password</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm new password"
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handlePasswordReset}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium"
              >
                Update Password
              </button>
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setNewPassword("");
                  setConfirmPassword("");
                }}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Holiday Warning Modal */}
      {showHolidayWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-orange-600 mb-4">Warn</h3>
            <p className="text-gray-700 mb-6">
              This Event is being saved as a Holiday. Are you sure you want to proceed?
            </p>
            <div className="flex space-x-3">
              <button
                onClick={saveEventToCache}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg font-medium"
              >
                OK
              </button>
              <button
                onClick={() => setShowHolidayWarning(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">{editingEvent ? 'Edit Event' : 'Add Event'}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
                <input
                  type="text"
                  value={newEvent.name}
                  onChange={(e) => setNewEvent({...newEvent, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Independence day"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Event Type</label>
                <select
                  value={newEvent.type}
                  onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="once">Once</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Description</label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Independence day"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={newEvent.startDate}
                    onChange={(e) => setNewEvent({...newEvent, startDate: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    value={newEvent.endDate}
                    onChange={(e) => setNewEvent({...newEvent, endDate: e.target.value})}
                    min={newEvent.startDate || new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              {dateError && (
                <div className="text-red-500 text-sm">{dateError}</div>
              )}
              
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Is attendance required for this day?
                </label>
                <div className="flex items-center space-x-3">
                  <span className={`text-sm ${!newEvent.attendanceRequired ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>No</span>
                  <button
                    type="button"
                    onClick={() => setNewEvent({...newEvent, attendanceRequired: !newEvent.attendanceRequired})}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      newEvent.attendanceRequired ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-lg ${
                        newEvent.attendanceRequired ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <span className={`text-sm ${newEvent.attendanceRequired ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>Yes</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event applicable to:</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newEvent.applicableTo.teachers}
                      onChange={(e) => setNewEvent({...newEvent, applicableTo: {...newEvent.applicableTo, teachers: e.target.checked}})}
                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Teachers</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newEvent.applicableTo.students}
                      onChange={(e) => setNewEvent({...newEvent, applicableTo: {...newEvent.applicableTo, students: e.target.checked}})}
                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Students</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleSaveEvent}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium"
              >
                {editingEvent ? 'Update Event' : 'Save Event'}
              </button>
              <button
                onClick={() => setShowEventModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}