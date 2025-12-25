import { UserCheck, Calendar, Filter, BarChart3 } from "lucide-react";

interface AttendanceManagementProps {
  data: any;
}

export function AttendanceManagement({ data }: AttendanceManagementProps) {
  const attendance = data?.attendance || {
    present: 90,
    absent: 8,
    leave: 2,
    notMarked: 0,
    total: 100
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance Management</h1>
          <p className="text-gray-600">From here, you have the ability to mark students as absent or present, as well as manage their biometric information.</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {['Dashboard', 'Attendance', 'Biometric Attendance', 'Late Attendance', 'Attendance Reports'].map((tab) => (
              <button
                key={tab}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  tab === 'Dashboard' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="date" 
                  defaultValue="2025-12-25"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Class</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Select...</option>
                <option>Class 1</option>
                <option>Class 2</option>
                <option>Class 3</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Section</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Select...</option>
                <option>Section A</option>
                <option>Section B</option>
                <option>Section C</option>
              </select>
            </div>
          </div>

          {/* Attendance Overview */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Attendance (% of total students)</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{attendance.present}</div>
                <div className="text-sm text-gray-600">Present</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">{attendance.absent}</div>
                <div className="text-sm text-gray-600">Absent</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600">{attendance.leave}</div>
                <div className="text-sm text-gray-600">Leave</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-600">{attendance.notMarked}</div>
                <div className="text-sm text-gray-600">Not Marked</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{attendance.total}</div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
            </div>

            {/* Progress Bars */}
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="w-16 text-sm text-gray-600">Present</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2 mx-3">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${attendance.present}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">{attendance.present}</span>
              </div>
              
              <div className="flex items-center">
                <span className="w-16 text-sm text-gray-600">Absent</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2 mx-3">
                  <div 
                    className="bg-red-500 h-2 rounded-full" 
                    style={{ width: `${attendance.absent}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">{attendance.absent}</span>
              </div>
              
              <div className="flex items-center">
                <span className="w-16 text-sm text-gray-600">Leave</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2 mx-3">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full" 
                    style={{ width: `${attendance.leave}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">{attendance.leave}</span>
              </div>
            </div>
          </div>

          {/* Charts Placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <BarChart3 className="mx-auto text-gray-400 mb-4" size={48} />
              <h4 className="font-medium text-gray-900 mb-2">Attendance Trends</h4>
              <p className="text-sm text-gray-600">Weekly attendance chart</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <BarChart3 className="mx-auto text-gray-400 mb-4" size={48} />
              <h4 className="font-medium text-gray-900 mb-2">Class-wise Attendance</h4>
              <p className="text-sm text-gray-600">Attendance by class comparison</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}