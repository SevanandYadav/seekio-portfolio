import { Settings, Plus, Edit, Trash2 } from "lucide-react";

interface SetupProps {
  data: any;
}

export function Setup({ data }: SetupProps) {
  const classes = data?.setup?.classes || [];
  
  console.log('Setup component data:', data);
  console.log('Classes array:', classes);
  console.log('Classes length:', classes.length);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Setup</h1>
          <p className="text-gray-600">Here are all the settings of your need for Institution Setup and Management.</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Settings className="mr-2" size={20} />
              Settings
            </h3>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center">
              <Plus size={16} className="mr-2" />
              Add Class
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Add New Class Form */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Select...</option>
                <option>Pre Primary</option>
                <option>Primary</option>
                <option>Secondary</option>
                <option>Sr. Secondary</option>
              </select>
            </div>
            <div>
              <input 
                type="text" 
                placeholder="eg. LKG" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <input 
                type="text" 
                placeholder="eg A,B,C,D,E,F" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Select...</option>
                <option>Pre Primary</option>
                <option>Primary</option>
                <option>Secondary</option>
                <option>Sr. Secondary</option>
              </select>
            </div>
          </div>

          {/* Classes Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Sr. No</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Class</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Section</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Report Card Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {classes.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 px-4 text-center text-gray-500">
                      No classes found. Check console for data loading issues.
                    </td>
                  </tr>
                ) : (
                  classes.map((classItem: any, index: number) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{index + 1}</td>
                      <td className="py-3 px-4 text-gray-900 font-medium">{classItem.class}</td>
                      <td className="py-3 px-4 text-gray-600">{classItem.sections}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          classItem.reportCardType === 'Primary' ? 'bg-blue-100 text-blue-800' :
                          classItem.reportCardType === 'Secondary' ? 'bg-green-100 text-green-800' :
                          classItem.reportCardType === 'Sr. Secondary' ? 'bg-purple-100 text-purple-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {classItem.reportCardType}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                            <Edit size={16} />
                          </button>
                          <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}