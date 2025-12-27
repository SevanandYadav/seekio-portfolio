import { useState } from "react";
import { Check } from "lucide-react";

interface ProfilePageProps {
  data: any;
}

export function ProfilePage({ data }: ProfilePageProps) {
  const [selectedPlan, setSelectedPlan] = useState("MLC Basic");
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>([]);
  const [showIntegrations, setShowIntegrations] = useState(false);

  // Get live profile data
  const liveProfile = localStorage.getItem('live_profile');
  const profileData = liveProfile ? JSON.parse(liveProfile) : {};

  const plans = [
    {
      name: "MLC Basic",
      price: "₹0",
      period: "per year",
      students: "Up to 100 students",
      description: "This plan is free to use for your school up to 100 students",
      modules: [
        "Fees Management", "Progress Report", "Attendance Management", "Employee Management",
        "User Management", "Student Management", "Time-Table Management", "Certificates",
        "Passout", "Assignments & Notices", "Transport Management", "Hostel Management",
        "Canteen Management", "App Notifications", "Library Management", "Birthdays",
        "Setup", "SMS Counts", "Other Charges", "Academic Planner",
        "Admission Management", "Admission Query", "Whatsapp Messages", "Recharge"
      ]
    },
    {
      name: "MLC Standard",
      price: "₹1,500",
      period: "per month",
      students: "Up to 200 students",
      description: "This plan is valid till 200 students",
      popular: true,
      modules: [
        "All Basic modules", "Subject Management", "House Management", "Online Classes",
        "Apply Leave", "Leave Management"
      ]
    },
    {
      name: "MLC Enterprise",
      price: "₹15",
      period: "per student per month",
      students: "Contact for details",
      description: "Rs 15 per student per month",
      modules: ["All Standard modules", "Custom features", "Priority support"]
    }
  ];

  const integrations = [
    { name: "WhatsApp Integration", price: 1000 },
    { name: "Tally Integration", price: 3000 }
  ];

  const handlePlanSelect = (planName: string) => {
    setSelectedPlan(planName);
    setShowIntegrations(planName !== "MLC Basic");
    if (planName === "MLC Basic") {
      setSelectedIntegrations([]);
    }
  };

  const handleIntegrationToggle = (integrationName: string) => {
    setSelectedIntegrations(prev => 
      prev.includes(integrationName)
        ? prev.filter(name => name !== integrationName)
        : [...prev, integrationName]
    );
  };

  const calculateTotal = () => {
    const planPrice = selectedPlan === "MLC Basic" ? 0 : 
                     selectedPlan === "MLC Standard" ? 1500 : 0;
    const integrationPrice = selectedIntegrations.reduce((total, name) => {
      const integration = integrations.find(i => i.name === name);
      return total + (integration?.price || 0);
    }, 0);
    return planPrice + integrationPrice;
  };

  return (
    <div className="space-y-8">
      {/* Basic Information */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">School Name</label>
            <p className="text-gray-900 font-medium">{profileData.instituteName || "Your School Name"}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <p className="text-gray-900 font-medium">ADMIN</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <p className="text-gray-900 font-medium">{profileData.email || "admin@school.com"}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <p className="text-gray-900 font-medium">9140153683</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <p className="text-gray-900 font-medium">Dehradun</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person</label>
            <p className="text-gray-900 font-medium">Shiv Jadhav</p>
          </div>
        </div>
      </div>

      {/* Account Balance */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Balance</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">200</p>
            <p className="text-sm text-gray-600">SMS Balance</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">0</p>
            <p className="text-sm text-gray-600">WhatsApp Balance</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">0</p>
            <p className="text-sm text-gray-600">Email Balance</p>
          </div>
        </div>
      </div>

      {/* Plan Selection */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Choose Your Plan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                selectedPlan === plan.name 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              } ${plan.popular ? 'relative' : ''}`}
              onClick={() => handlePlanSelect(plan.name)}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Most Popular
                </span>
              )}
              <div className="text-center">
                <h4 className="font-bold text-lg mb-2">{plan.name}</h4>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-blue-600">{plan.price}</span>
                  <span className="text-gray-600 text-sm ml-1">{plan.period}</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{plan.students}</p>
                <p className="text-xs text-gray-500 mb-4">{plan.description}</p>
                
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-700 mb-2">Modules Included:</p>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {plan.modules.map((module, idx) => (
                      <div key={idx} className="flex items-center text-xs text-gray-600">
                        <Check size={12} className="text-green-500 mr-2 flex-shrink-0" />
                        {module}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Integration Options */}
      {showIntegrations && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Integration Options</h3>
          <p className="text-gray-600 mb-4">Select additional integrations to enhance your system:</p>
          
          <div className="space-y-3">
            {integrations.map((integration) => (
              <label key={integration.name} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedIntegrations.includes(integration.name)}
                    onChange={() => handleIntegrationToggle(integration.name)}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="font-medium">{integration.name}</span>
                </div>
                <span className="font-bold text-gray-900">₹{integration.price.toLocaleString()}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Selected Plan:</span>
            <span className="font-medium">{selectedPlan}</span>
          </div>
          <div className="flex justify-between">
            <span>Duration:</span>
            <span className="font-medium">
              {selectedPlan === "MLC Basic" ? "Yearly" : selectedPlan === "MLC Standard" ? "Monthly" : "Monthly"}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Students:</span>
            <span className="font-medium">
              {plans.find(p => p.name === selectedPlan)?.students}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Integration(s) selected:</span>
            <span className="font-medium">{selectedIntegrations.length}</span>
          </div>
          <div className="border-t pt-2 mt-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total Amount:</span>
              <span className="text-blue-600">₹{calculateTotal().toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        {calculateTotal() > 0 && (
          <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
            Proceed to Payment
          </button>
        )}
      </div>
    </div>
  );
}