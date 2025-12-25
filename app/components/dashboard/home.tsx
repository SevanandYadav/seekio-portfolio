import { AlertTriangle, Users, DollarSign, UserCheck, BookOpen, MessageSquare, Mail, Phone } from "lucide-react";

interface DashboardHomeProps {
  data: any;
}

export function DashboardHome({ data }: DashboardHomeProps) {
  const stats = data?.dashboard || {};
  const employees = data?.employees || [];
  const communication = data?.communication || {};

  return (
    <div className="space-y-6">
      {/* Trial Warning */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center">
        <AlertTriangle className="text-yellow-600 mr-3" size={20} />
        <span className="text-yellow-800 font-medium">Your Trial Ends in 29 days</span>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="text-blue-600" size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Student Management</h3>
              <p className="text-gray-600">Manage students</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="text-green-600" size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Fees Management</h3>
              <p className="text-gray-600">Track payments</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <UserCheck className="text-purple-600" size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Employee Management</h3>
              <p className="text-gray-600">Staff records</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <BookOpen className="text-orange-600" size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Assignment & Notices</h3>
              <p className="text-gray-600">Communications</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-lg">
              <BookOpen className="text-red-600" size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Progress Report</h3>
              <p className="text-gray-600">Academic progress</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <UserCheck className="text-indigo-600" size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Attendance Management</h3>
              <p className="text-gray-600">Track attendance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Employee Attendance */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Employee Attendance</h3>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Department</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Designation</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody>
                {employees.slice(0, 3).map((employee: any, index: number) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                          <Users size={16} className="text-gray-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{employee.name}</div>
                          <button className="text-blue-600 text-sm hover:underline">Preview</button>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{employee.department}</td>
                    <td className="py-3 px-4 text-gray-600">{employee.designation}</td>
                    <td className="py-3 px-4">
                      <span className="text-red-600 text-sm">Not marked</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Communication Balance */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Communication Balance</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="p-4 bg-green-50 rounded-lg mb-3">
                <MessageSquare className="text-green-600 mx-auto" size={32} />
              </div>
              <h4 className="font-semibold text-gray-900">SMS Balance</h4>
              <p className="text-green-600 font-medium">Good Balance</p>
              <p className="text-2xl font-bold text-gray-900">{communication.sms || 200}</p>
            </div>
            
            <div className="text-center">
              <div className="p-4 bg-red-50 rounded-lg mb-3">
                <Phone className="text-red-600 mx-auto" size={32} />
              </div>
              <h4 className="font-semibold text-gray-900">WhatsApp Balance</h4>
              <p className="text-red-600 font-medium">No Balance</p>
              <p className="text-2xl font-bold text-gray-900">{communication.whatsapp || 0}</p>
            </div>
            
            <div className="text-center">
              <div className="p-4 bg-red-50 rounded-lg mb-3">
                <Mail className="text-red-600 mx-auto" size={32} />
              </div>
              <h4 className="font-semibold text-gray-900">Email Balance</h4>
              <p className="text-red-600 font-medium">No Balance</p>
              <p className="text-2xl font-bold text-gray-900">{communication.email || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}