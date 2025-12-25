import type { Route } from "./+types/onboarding";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { ArrowLeft, ArrowRight, Upload, Check } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Onboarding - Seekio Campus Solutions" },
    { name: "description", content: "Complete your institute setup" },
  ];
}

const phases = [
  "personal-identifier",
  "institute-type", 
  "institute-identifier",
  "institute-creds",
  "institute-fee-structure",
  "institute-authority",
  "choose-plan"
];

export default function Onboarding() {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [showTrialModal, setShowTrialModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedPlanForTrial, setSelectedPlanForTrial] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    instituteType: "",
    sessionCycle: "",
    instituteName: "",
    instituteEmail: "",
    logo: null,
    website: "",
    affiliateNumber: "",
    address: "",
    feeStructure: "",
    allowInstallments: "",
    principalSignature: null,
    selectedPlan: ""
  });

  const handleNext = () => {
    if (currentPhase < phases.length - 1) {
      setCurrentPhase(currentPhase + 1);
    }
  };

  const handleBack = () => {
    if (currentPhase > 0) {
      setCurrentPhase(currentPhase - 1);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleStartTrial = async (planName: string) => {
    setSelectedPlanForTrial(planName);
    setShowTrialModal(true);
  };

  const confirmStartTrial = async () => {
    setShowTrialModal(false);
    // Generate random password
    const password = Math.random().toString(36).slice(-8);
    
    // Store credentials in localStorage for login
    const trialCredentials = {
      email: formData.instituteEmail,
      password: password,
      isSessionEnabledTillBE: true,
      instituteName: formData.instituteName,
      createdAt: Date.now()
    };
    localStorage.setItem('trial_credentials', JSON.stringify(trialCredentials));
    
    try {
      // Send credentials email
      await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Seekio Campus Credentials',
          email: formData.instituteEmail,
          company: 'Seekio Campus',
          service: 'trial-credentials',
          message: `Your trial credentials:\nEmail: ${formData.instituteEmail}\nPassword: ${password}`,
          isCredentials: true,
          credentials: { email: formData.instituteEmail, password }
        })
      });
      
      // Send welcome email
      await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Seekio Campus Welcome',
          email: formData.instituteEmail,
          company: 'Seekio Campus',
          service: 'welcome-demo',
          message: 'Welcome to Seekio Campus Solutions',
          isWelcome: true,
          instituteName: formData.instituteName
        })
      });
      
      setShowSuccessModal(true);
    } catch (error) {
      setShowSuccessModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-8"
      >
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Step {currentPhase + 1} of {phases.length}</span>
            <span>{Math.round(((currentPhase + 1) / phases.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentPhase + 1) / phases.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Phase 1: Personal Identifier */}
        {currentPhase === 0 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What should we call you?</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </motion.div>
        )}

        {/* Phase 2: Institute Type */}
        {currentPhase === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Institute Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Institution Type</label>
                <select
                  value={formData.instituteType}
                  onChange={(e) => handleInputChange('instituteType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select institution type</option>
                  <option value="school">School</option>
                  <option value="college">College</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Session Cycle</label>
                <select
                  value={formData.sessionCycle}
                  onChange={(e) => handleInputChange('sessionCycle', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select session cycle</option>
                  <option value="april-march">April - March</option>
                  <option value="january-december">January - December</option>
                  <option value="june-may">June - May</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}

        {/* Phase 3: Institute Identifier */}
        {currentPhase === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Institute Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Institute Name</label>
                <input
                  type="text"
                  value={formData.instituteName}
                  onChange={(e) => handleInputChange('instituteName', e.target.value)}
                  placeholder="Enter institute name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Logo (Optional)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">Click to upload logo</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={formData.instituteEmail}
                  onChange={(e) => handleInputChange('instituteEmail', e.target.value)}
                  placeholder="institute@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Phase 4: Institute Credentials */}
        {currentPhase === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website URL (Optional)</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://www.example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Affiliate Number (Optional)</label>
                <input
                  type="text"
                  value={formData.affiliateNumber}
                  onChange={(e) => handleInputChange('affiliateNumber', e.target.value)}
                  placeholder="Enter affiliate number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Phase 5: Fee Structure */}
        {currentPhase === 4 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Fee Structure</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Institute Address *</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter complete address"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fee Structure *</label>
                <select
                  value={formData.feeStructure}
                  onChange={(e) => handleInputChange('feeStructure', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select fee structure</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Allow Fee in Installments *</label>
                <select
                  value={formData.allowInstallments}
                  onChange={(e) => handleInputChange('allowInstallments', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}

        {/* Phase 6: Institute Authority */}
        {currentPhase === 5 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Institute Authority</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Principal Signature (Optional)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">Click to upload signature</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Phase 7: Choose Plan */}
        {currentPhase === 6 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: 'Basic', price: 'Free', features: ['Up to 50 students', 'Basic features', 'Email support'] },
                { name: 'Professional', price: '₹999/month', features: ['Up to 500 students', 'Advanced features', 'Priority support'] },
                { name: 'Enterprise', price: '₹2999/month', features: ['Unlimited students', 'All features', '24/7 support'] }
              ].map((plan) => (
                <div
                  key={plan.name}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    formData.selectedPlan === plan.name ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                  onClick={() => handleInputChange('selectedPlan', plan.name)}
                >
                  <div className="text-center">
                    <h3 className="font-bold text-lg">{plan.name}</h3>
                    <p className="text-2xl font-bold text-blue-600 my-2">{plan.price}</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <Check size={16} className="text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    {formData.selectedPlan === plan.name && (
                      <Button
                        onClick={() => handleStartTrial(plan.name)}
                        className="w-full mt-4"
                      >
                        Start Trial
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            onClick={handleBack}
            disabled={currentPhase === 0}
            variant="outline"
            className="flex items-center"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back
          </Button>
          
          {currentPhase < phases.length - 1 && (
            <Button
              onClick={handleNext}
              disabled={
                (currentPhase === 0 && !formData.name) ||
                (currentPhase === 1 && (!formData.instituteType || !formData.sessionCycle)) ||
                (currentPhase === 2 && (!formData.instituteName || !formData.instituteEmail)) ||
                (currentPhase === 4 && (!formData.address || !formData.feeStructure || !formData.allowInstallments))
              }
              className="flex items-center"
            >
              Continue
              <ArrowRight size={16} className="ml-2" />
            </Button>
          )}
        </div>
      </motion.div>

      {/* Trial Confirmation Modal */}
      {showTrialModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Start Free Trial for {selectedPlanForTrial}?
            </h3>
            <p className="text-gray-600 mb-6">
              Your trial will expire after 30 days. You can upgrade or continue with the free plan anytime.
            </p>
            <div className="flex space-x-3">
              <Button
                onClick={confirmStartTrial}
                className="flex-1"
              >
                Start
              </Button>
              <Button
                onClick={() => setShowTrialModal(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full mx-4"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Trial Started Successfully!
              </h3>
              <p className="text-gray-600 mb-6">
                Credentials have been sent to your email. Check your inbox to get started.
              </p>
              <Button
                onClick={() => window.location.href = '/dashboard'}
                className="w-full"
              >
                Continue to Dashboard
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}