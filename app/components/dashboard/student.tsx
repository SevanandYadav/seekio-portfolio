import { GraduationCap, Search, Eye, Edit, Trash2, Plus, Filter } from "lucide-react";

interface StudentManagementProps {
  data: any;
}

export function StudentManagement({ data }: StudentManagementProps) {
  const students = data?.students || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Students</h1>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center">
          <Plus size={16} className="mr-2" />
          Add Student
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search by Name"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search by ID"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search by Email"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search by Phone"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Select Class...</option>
                <option>Class 1</option>
                <option>Class 2</option>
                <option>Class 3</option>
              </select>
            </div>
            
            <div>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Select Section...</option>
                <option>Section A</option>
                <option>Section B</option>
                <option>Section C</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Filter By Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          {/* Students Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Student Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Class</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Section</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Roll No.</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Father's Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Mobile</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student: any, index: number) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                          <GraduationCap size={16} className="text-gray-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{student.name}</div>
                          <button className="text-blue-600 text-sm hover:underline flex items-center">
                            <Eye size={12} className="mr-1" />
                            Preview
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{student.class}</td>
                    <td className="py-3 px-4 text-gray-600">{student.section}</td>
                    <td className="py-3 px-4 text-gray-600">{student.rollNo}</td>
                    <td className="py-3 px-4 text-gray-600">{student.fatherName}</td>
                    <td className="py-3 px-4 text-gray-600">{student.mobile}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                          <Eye size={16} />
                        </button>
                        <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                          <Edit size={16} />
                        </button>
                        <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}