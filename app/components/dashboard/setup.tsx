import { Settings, Plus, Edit, Trash2, AlertTriangle, Lock } from "lucide-react";
import { useState } from "react";
import { TestModeModal } from "./test-mode-modal";

interface SetupProps {
  data: any;
}

export function Setup({ data }: SetupProps) {
  const classes = data?.setup?.classes || [];
  const [showTestModeModal, setShowTestModeModal] = useState(false);
  const [activeTab, setActiveTab] = useState('setup');
  const [liveClasses, setLiveClasses] = useState<any[]>([]);
  const [newClass, setNewClass] = useState({ class: '', sections: '', reportCardType: '' });
  
  // Check if user is in live mode
  const userData = localStorage.getItem('user_data');
  const isLiveMode = userData && JSON.parse(userData).isLive;
  
  const handleSaveClass = () => {
    if (isLiveMode) {
      // Save to cache in live mode
      const updatedClasses = [...liveClasses, { ...newClass, id: Date.now() }];
      setLiveClasses(updatedClasses);
      localStorage.setItem('live_classes', JSON.stringify(updatedClasses));
      setNewClass({ class: '', sections: '', reportCardType: '' });
    } else {
      // Show test mode modal
      setShowTestModeModal(true);
    }
  };
  
  const handleEditClass = (index: number) => {
    if (isLiveMode) {
      // Allow editing in live mode
      console.log('Edit class:', index);
    } else {
      setShowTestModeModal(true);
    }
  };
  
  const handleDeleteClass = (index: number) => {
    if (isLiveMode) {
      // Allow deletion in live mode
      const updatedClasses = liveClasses.filter((_, i) => i !== index);
      setLiveClasses(updatedClasses);
      localStorage.setItem('live_classes', JSON.stringify(updatedClasses));
    } else {
      setShowTestModeModal(true);
    }
  };
  
  // Load live classes from cache on component mount
  useState(() => {
    if (isLiveMode) {
      const cachedClasses = localStorage.getItem('live_classes');
      if (cachedClasses) {
        setLiveClasses(JSON.parse(cachedClasses));
      }
    }
  });
  
  const displayClasses = isLiveMode ? liveClasses : classes;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Setup</h1>
          <p className="text-gray-600">Here are all the settings of your need for Institution Setup and Management.</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        {/* Upload Section */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Documents</h3>
          <div className="grid grid-cols-3 gap-6">
            {/* School Logo */}
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-gray-400 text-xs">No Logo</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-1">School Logo</h4>
              <p className="text-xs text-gray-600 mb-3">Used on reports</p>
              <button 
                onClick={() => setShowTestModeModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
              >
                Upload
              </button>
            </div>
            
            {/* Institute Seal */}
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-gray-400 text-xs">No Seal</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Institute Seal</h4>
              <p className="text-xs text-gray-600 mb-3">Used on documents</p>
              <button 
                onClick={() => setShowTestModeModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
              >
                Upload
              </button>
            </div>
            
            {/* Principal Sign */}
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-gray-400 text-xs">No Sign</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Principal Sign</h4>
              <p className="text-xs text-gray-600 mb-3">Used on certificates</p>
              <button 
                onClick={() => setShowTestModeModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
              >
                Upload
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('setup')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'setup'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Setup
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'settings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Settings
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'setup' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Settings className="mr-2" size={20} />
              Class Setup
            </h3>
            
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
                  {/* Add Class Row */}
                  <tr className="border-b border-gray-100 bg-blue-50">
                    <td className="py-3 px-4 text-gray-900">-</td>
                    <td className="py-3 px-4">
                      <select 
                        value={newClass.class}
                        onChange={(e) => setNewClass({...newClass, class: e.target.value})}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      >
                        <option value="">Select...</option>
                        <option value="Pre Primary">Pre Primary</option>
                        <option value="Primary">Primary</option>
                        <option value="Secondary">Secondary</option>
                        <option value="Sr. Secondary">Sr. Secondary</option>
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <input 
                        type="text" 
                        placeholder="eg. LKG" 
                        value={newClass.sections}
                        onChange={(e) => setNewClass({...newClass, sections: e.target.value})}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <input 
                        type="text" 
                        placeholder="eg A,B,C,D,E,F" 
                        value={newClass.reportCardType}
                        onChange={(e) => setNewClass({...newClass, reportCardType: e.target.value})}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <button 
                        onClick={handleSaveClass}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                      >
                        Save
                      </button>
                    </td>
                  </tr>
                  {displayClasses.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 px-4 text-center text-gray-500">
                        {isLiveMode ? 'No classes added yet. Add your first class above.' : 'No classes found. Check console for data loading issues.'}
                      </td>
                    </tr>
                  ) : (
                    displayClasses.map((classItem: any, index: number) => (
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
                            <button 
                              onClick={() => handleEditClass(index)}
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            >
                              <Edit size={16} />
                            </button>
                            <button 
                              onClick={() => handleDeleteClass(index)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                            >
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
        )}

        {activeTab === 'settings' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <Settings className="mr-2" size={20} />
              Form Settings
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  School short name to use in messages
                </label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. SEC"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Send absent alert (SMS) to Students</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>NO</option>
                    <option>YES</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Send absent alert (Email) to Students</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>NO</option>
                    <option>YES</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Send absent alert (SMS) to Employees</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>NO</option>
                    <option>YES</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Send absent alert (Email) to Employees</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>NO</option>
                    <option>YES</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reminder will be triggered if student is late for - days
                  </label>
                  <input 
                    type="number" 
                    min="1"
                    max="365"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter number of days"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reminder will be triggered if employee is late for - days
                  </label>
                  <input 
                    type="number" 
                    min="1"
                    max="365"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter number of days"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selected Progress Report Template
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Choose a template</option>
                  <option>Template 1</option>
                  <option>Template 2</option>
                  <option>Template 3</option>
                </select>
              </div>
              
              <div className="flex justify-end">
                <button 
                  onClick={() => setShowTestModeModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Test Mode Modal */}
      <TestModeModal 
        isOpen={showTestModeModal}
        onClose={() => setShowTestModeModal(false)}
        data={data}
      />
    </div>
  );
}