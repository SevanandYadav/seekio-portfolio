import { X } from "lucide-react";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  if (!isOpen) return null;

  // Get live profile data
  const liveProfile = localStorage.getItem('live_profile');
  const profileData = liveProfile ? JSON.parse(liveProfile) : {};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Profile Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">School Name:</span>
                <p className="font-medium">{profileData.instituteName || "JJ English Medium School"}</p>
              </div>
              <div>
                <span className="text-gray-600">Role:</span>
                <p className="font-medium">ADMIN</p>
              </div>
              <div>
                <span className="text-gray-600">Email:</span>
                <p className="font-medium">{profileData.email || "admin@school.com"}</p>
              </div>
              <div>
                <span className="text-gray-600">Phone:</span>
                <p className="font-medium">9140153683</p>
              </div>
              <div className="col-span-2">
                <span className="text-gray-600">Address:</span>
                <p className="font-medium">Dehradun</p>
              </div>
              <div>
                <span className="text-gray-600">Contact Person:</span>
                <p className="font-medium">Shiv Jadhav</p>
              </div>
            </div>
          </div>

          {/* Balance Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Balance</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">SMS Balance:</span>
                <p className="font-medium">200</p>
              </div>
              <div>
                <span className="text-gray-600">WhatsApp Balance:</span>
                <p className="font-medium">0</p>
              </div>
              <div>
                <span className="text-gray-600">Email Balance:</span>
                <p className="font-medium">0</p>
              </div>
            </div>
          </div>

          {/* Current Plan */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Plan</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">MLC Basic</h4>
              <p className="text-sm text-blue-800 mb-3">This plan is free to use for your school up to 100 students</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <span className="text-blue-700">Start Date:</span>
                  <p className="font-medium">December 25, 2024</p>
                </div>
                <div>
                  <span className="text-blue-700">End Date:</span>
                  <p className="font-medium">January 24, 2026</p>
                </div>
              </div>

              <div>
                <span className="text-blue-700 text-sm">Granted Modules:</span>
                <div className="grid grid-cols-2 gap-1 mt-2 text-xs">
                  {[
                    "Fees Management", "Progress Report", "Attendance Management", "Employee Management",
                    "User Management", "Student Management", "Time-Table Management", "Certificates",
                    "Passout", "Assignments & Notices", "Transport Management", "Hostel Management",
                    "Canteen Management", "App Notifications", "Library Management", "Birthdays",
                    "Setup", "SMS Counts", "Other Charges", "Academic Planner",
                    "Admission Management", "Admission Query", "Whatsapp Messages", "Recharge"
                  ].map((module) => (
                    <span key={module} className="text-blue-800">• {module}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Plan Options */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Plans</h3>
            <div className="space-y-4">
              {/* MLC Basic */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">MLC Basic</h4>
                  <span className="text-lg font-bold text-green-600">₹0</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">Up to 100 students - Free plan</p>
                <p className="text-xs text-gray-500">Yearly - ₹0 total per year</p>
              </div>

              {/* MLC Standard */}
              <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-blue-900">MLC Standard</h4>
                  <span className="text-lg font-bold text-blue-600">₹1,500</span>
                </div>
                <p className="text-sm text-blue-800 mb-2">Up to 200 students</p>
                <p className="text-xs text-blue-600">Monthly - ₹1,500 per month</p>
                <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded mt-2">Most Popular</span>
              </div>

              {/* MLC Enterprise */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">MLC Enterprise</h4>
                  <span className="text-lg font-bold">₹15</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">Rs 15 per student per month</p>
                <p className="text-xs text-gray-500">Monthly - Contact for details</p>
              </div>
            </div>

            {/* Integration Options */}
            <div className="mt-6">
              <h4 className="font-medium text-gray-900 mb-3">Integration Options</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 border border-gray-200 rounded">
                  <span>WhatsApp Integration</span>
                  <span className="font-medium">₹1,000.00</span>
                </div>
                <div className="flex justify-between items-center p-2 border border-gray-200 rounded">
                  <span>Tally Integration</span>
                  <span className="font-medium">₹3,000.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}