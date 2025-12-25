import type { Route } from "./+types/pricing";
import { Navbar } from "../components/layout/navbar";
import { Footer } from "../components/layout/footer";
import { FloatingContact } from "../components/ui/floating-contact";
import { motion } from "framer-motion";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Check, X } from "lucide-react";
import { useState, useEffect } from "react";
import { getContentUrl } from "../utils/config";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Pricing - Seekio Academic Solutions" },
    { name: "description", content: "Affordable pricing plans for school and college management systems." },
  ];
}

export default function Pricing() {
  const [selectedType, setSelectedType] = useState<'school' | 'college' | null>(null);
  const [pricingData, setPricingData] = useState<any>(null);
  const [showModal, setShowModal] = useState(true);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    fetch(getContentUrl('/pricing.json'))
      .then(res => res.json())
      .then(data => setPricingData(data))
      .catch(error => console.error('Failed to load pricing data:', error));
  }, []);

  const handleTypeSelection = (type: 'school' | 'college') => {
    setSelectedType(type);
    setShowModal(false);
  };

  const resetSelection = () => {
    setSelectedType(null);
    setShowModal(true);
  };

  if (!pricingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading pricing information...</p>
        </div>
      </div>
    );
  }

  const currentPlans = selectedType ? pricingData[selectedType] : null;

  return (
    <>
      <Navbar />
      
      {/* Modal Overlay for Type Selection - Only show when no type selected */}
      {!selectedType && showModal && (
        <div className="fixed inset-0 bg-blue-900 bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-40">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-2xl mx-4 shadow-2xl z-50 relative"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                View Pricing For
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Please select your institution category.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                className="cursor-pointer text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-gray-700 hover:border-blue-500" 
                onClick={() => handleTypeSelection('school')}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">🏫</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">School</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  K-12 Schools & Primary Education
                </p>
              </div>

              <div 
                className="cursor-pointer text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-gray-700 hover:border-purple-500" 
                onClick={() => handleTypeSelection('college')}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">🎓</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">University / College</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Higher Education Institutions
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {selectedType && currentPlans && (
        <>
          {/* Switch Button - Fixed to extreme right with mobile-first design */}
          <div className="fixed top-20 right-2 md:right-4 z-30">
            <button 
              onClick={() => {
                if (selectedType === 'school') {
                  setSelectedType('college');
                } else {
                  setSelectedType('school');
                }
              }}
              className="text-sm md:text-xs px-4 py-2 md:px-3 md:py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-200 flex items-center gap-2 md:gap-1.5 border border-blue-200 dark:border-blue-800 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {selectedType === 'school' ? (
                <>
                  <span className="text-base md:text-sm">🎓</span>
                  <span className="hidden sm:inline">View College Pricing</span>
                  <span className="sm:hidden">College</span>
                </>
              ) : (
                <>
                  <span className="text-base md:text-sm">🏫</span>
                  <span className="hidden sm:inline">View School Pricing</span>
                  <span className="sm:hidden">School</span>
                </>
              )}
            </button>
          </div>

          {/* Header Section */}
          <section className="pt-32 pb-4 bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4"
              >
                <div className="text-center">
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                    {selectedType === 'school' ? 'School' : 'University/College'} Management Pricing
                  </h1>
                  <p className="text-lg text-slate-600 dark:text-slate-400 font-medium mb-2">
                    Transparent and Flexible Pricing
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                    Explore our detailed pricing for {selectedType === 'school' ? 'schools' : 'colleges and universities'} with integrations, services, and payment gateway charges.
                  </p>
                </div>
                {/* Billing Period Switcher - Minimal gap */}
                <div className="flex justify-center mt-4">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-1 shadow-inner border border-gray-200 dark:border-gray-700">
                    <div className="flex gap-1">
                      <button
                        onClick={() => setBillingPeriod('monthly')}
                        className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                          billingPeriod === 'monthly'
                            ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-md'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        }`}
                      >
                        Monthly
                      </button>
                      <button
                        onClick={() => setBillingPeriod('yearly')}
                        className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center ${
                          billingPeriod === 'yearly'
                            ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-md'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        }`}
                      >
                        Yearly
                        <span className="ml-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full font-medium">
                          20% OFF
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Pricing Plans Section */}
          <section className="py-6 bg-white dark:bg-gray-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {currentPlans.plans.map((plan: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`h-full relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-700 ${plan.popular ? 'ring-2 ring-blue-500 shadow-xl' : 'shadow-lg'}`}>
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                          Most Popular
                        </span>
                      </div>
                    )}
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">{plan.description}</p>
                      
                      <div className="mb-4">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">
                          {plan.price === "0" ? "Free" : 
                           plan.period === "student/month" ? 
                           `₹${billingPeriod === 'yearly' ? Math.round(plan.price * 0.8 * 12) : plan.price}` :
                           `₹${billingPeriod === 'yearly' ? Math.round(plan.price * 0.8 * 12) : plan.price}`}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400 text-sm">
                          {plan.price === "0" ? "" : 
                           plan.period === "student/month" ? 
                           `/${billingPeriod === 'yearly' ? 'student/year' : plan.period}` :
                           `/${billingPeriod === 'yearly' ? 'year' : plan.period}`}
                        </span>
                        {plan.subtitle && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {plan.subtitle}
                          </div>
                        )}
                      </div>

                      <ul className="space-y-2 mb-6 text-sm">
                        {plan.features.slice(0, 6).map((feature: any, idx: number) => (
                          <li key={idx} className="flex items-start">
                            {feature.included ? (
                              <Check size={16} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            ) : (
                              <X size={16} className="text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                            )}
                            <span className={`text-xs ${feature.included ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                              {feature.name}
                            </span>
                          </li>
                        ))}
                        {plan.features.length > 6 && (
                          <li className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                            +{plan.features.length - 6} more features
                          </li>
                        )}
                      </ul>

                      <Button 
                        className="w-full text-sm py-2" 
                        variant={plan.popular ? "default" : "secondary"}
                      >
                        {plan.buttonText}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
              </div>

              {/* Comparison Table */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-16"
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
                  Compare Features
                </h3>
                
                <div className="bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 dark:from-gray-800 dark:via-slate-800 dark:to-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-slate-100 to-gray-100 dark:from-slate-700 dark:to-gray-700 sticky top-20 z-50 transition-all duration-300 hover:shadow-lg">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Features</th>
                          <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white hover:text-green-600 transition-colors">Basic</th>
                          <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white hover:text-blue-600 transition-colors">Professional</th>
                          <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white hover:text-purple-600 transition-colors">Enterprise</th>
                          <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white hover:text-orange-600 transition-colors">Custom</th>
                        </tr>
                        <tr className="bg-gradient-to-r from-slate-200 to-gray-200 dark:from-slate-600 dark:to-gray-600 sticky top-36 z-40">
                          <td className="px-6 py-3 text-sm font-medium text-gray-600 dark:text-gray-300">Pricing</td>
                          <td className="px-6 py-3 text-center text-sm font-bold text-green-600">Free</td>
                          <td className="px-6 py-3 text-center text-sm font-bold text-blue-600">₹3,200/month</td>
                          <td className="px-6 py-3 text-center text-sm font-bold text-purple-600">₹35/student/month</td>
                          <td className="px-6 py-3 text-center text-sm font-bold text-orange-600">Contact us</td>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {/* CRM Features - Scheduling */}
                        <tr className="bg-blue-50 dark:bg-blue-900/20">
                          <td colSpan={5} className="px-6 py-3 text-sm font-bold text-blue-800 dark:text-blue-200 uppercase tracking-wide">
                            📅 CRM Features - Scheduling
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">Class Scheduling</td>
                          <td className="px-6 py-4 text-center"><Check size={16} className="text-green-600 mx-auto" /></td>
                          <td className="px-6 py-4 text-center"><Check size={16} className="text-green-600 mx-auto" /></td>
                          <td className="px-6 py-4 text-center"><Check size={16} className="text-green-600 mx-auto" /></td>
                          <td className="px-6 py-4 text-center"><Check size={16} className="text-green-600 mx-auto" /></td>
                        </tr>
                        <tr className="bg-gray-50 dark:bg-gray-800">
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">Teacher Management</td>
                          <td className="px-6 py-4 text-center"><Check size={16} className="text-green-600 mx-auto" /></td>
                          <td className="px-6 py-4 text-center"><Check size={16} className="text-green-600 mx-auto" /></td>
                          <td className="px-6 py-4 text-center"><Check size={16} className="text-green-600 mx-auto" /></td>
                          <td className="px-6 py-4 text-center"><Check size={16} className="text-green-600 mx-auto" /></td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">Student Enrollment</td>
                          <td className="px-6 py-4 text-center"><Check size={16} className="text-green-600 mx-auto" /></td>
                          <td className="px-6 py-4 text-center"><Check size={16} className="text-green-600 mx-auto" /></td>
                          <td className="px-6 py-4 text-center"><Check size={16} className="text-green-600 mx-auto" /></td>
                          <td className="px-6 py-4 text-center"><Check size={16} className="text-green-600 mx-auto" /></td>
                        </tr>
                        <tr className="bg-gray-50 dark:bg-gray-800">
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">Attendance Tracking</td>
                          <td className="px-6 py-4 text-center"><X size={16} className="text-red-500 mx-auto" /></td>
                          <td className="px-6 py-4 text-center"><Check size={16} className="text-green-600 mx-auto" /></td>
                          <td className="px-6 py-4 text-center"><Check size={16} className="text-green-600 mx-auto" /></td>
                          <td className="px-6 py-4 text-center"><Check size={16} className="text-green-600 mx-auto" /></td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">Parent Communication</td>
                          <td className="px-6 py-4 text-center"><X size={16} className="text-red-500 mx-auto" /></td>
                          <td className="px-6 py-4 text-center"><Check size={16} className="text-green-600 mx-auto" /></td>
                          <td className="px-6 py-4 text-center"><Check size={16} className="text-green-600 mx-auto" /></td>
                          <td className="px-6 py-4 text-center"><Check size={16} className="text-green-600 mx-auto" /></td>
                        </tr>
                        
                        {/* ERP Features - Management */}
                        <tr className="bg-purple-50 dark:bg-purple-900/20">
                          <td colSpan={5} className="px-6 py-3 text-sm font-bold text-purple-800 dark:text-purple-200 uppercase tracking-wide">
                            🏢 ERP Features - Management
                          </td>
                        </tr>
                        <tr className="bg-gray-50 dark:bg-gray-800">
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">Fee Management</td>
                          <td className="px-6 py-4 text-center"><Check size={16} className="text-green-600 mx-auto" /></td>
                          <td className="px-6 py-4 text-center"><Check size={16} className="text-green-600 mx-auto" /></td>
                          <td className="px-6 py-4 text-center"><Check size={16} className="text-green-600 mx-auto" /></td>
                          <td className="px-6 py-4 text-center"><Check size={16} className="text-green-600 mx-auto" /></td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">Academic Records</td>
                          <td className="px-6 py-4 text-center"><X size={16} className="text-red-500 mx-auto" /></td>
                          <td className="px-6 py-4 text-center"><Check size={16} className="text-green-600 mx-auto" /></td>
                          <td className="px-6 py-4 text-center"><Check size={16} className="text-green-600 mx-auto" /></td>
                          <td className="px-6 py-4 text-center"><Check size={16} className="text-green-600 mx-auto" /></td>
                        </tr>
                        <tr className="bg-gray-50 dark:bg-gray-800">
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">Report Generation</td>
                          <td className="px-6 py-4 text-center"><X size={16} className="text-red-500 mx-auto" /></td>
                          <td className="px-6 py-4 text-center"><Check size={16} className="text-green-600 mx-auto" /></td>
                          <td className="px-6 py-4 text-center"><Check size={16} className="text-green-600 mx-auto" /></td>
                          <td className="px-6 py-4 text-center"><Check size={16} className="text-green-600 mx-auto" /></td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">Multi-branch Support</td>
                          <td className="px-6 py-4 text-center"><X size={16} className="text-red-500 mx-auto" /></td>
                          <td className="px-6 py-4 text-center"><X size={16} className="text-red-500 mx-auto" /></td>
                          <td className="px-6 py-4 text-center"><Check size={16} className="text-green-600 mx-auto" /></td>
                          <td className="px-6 py-4 text-center"><Check size={16} className="text-green-600 mx-auto" /></td>
                        </tr>
                        
                        {/* General Features */}
                        <tr className="bg-green-50 dark:bg-green-900/20">
                          <td colSpan={5} className="px-6 py-3 text-sm font-bold text-green-800 dark:text-green-200 uppercase tracking-wide">
                            ⚙️ General Features
                          </td>
                        </tr>
                        <tr className="bg-gray-50 dark:bg-gray-800">
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">Max Students</td>
                          <td className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400">100</td>
                          <td className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400">200</td>
                          <td className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400">Unlimited</td>
                          <td className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400">Unlimited</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">Users</td>
                          <td className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400">1</td>
                          <td className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400">Up to 2</td>
                          <td className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400">Unlimited</td>
                          <td className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400">Unlimited</td>
                        </tr>
                        <tr className="bg-gray-50 dark:bg-gray-800">
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">WhatsApp Integration</td>
                          <td className="px-6 py-4 text-center"><X size={16} className="text-red-500 mx-auto" /></td>
                          <td className="px-6 py-4 text-center"><X size={16} className="text-red-500 mx-auto" /></td>
                          <td className="px-6 py-4 text-center"><Check size={16} className="text-green-600 mx-auto" /></td>
                          <td className="px-6 py-4 text-center"><Check size={16} className="text-green-600 mx-auto" /></td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">Priority Support</td>
                          <td className="px-6 py-4 text-center"><X size={16} className="text-red-500 mx-auto" /></td>
                          <td className="px-6 py-4 text-center"><X size={16} className="text-red-500 mx-auto" /></td>
                          <td className="px-6 py-4 text-center"><Check size={16} className="text-green-600 mx-auto" /></td>
                          <td className="px-6 py-4 text-center"><Check size={16} className="text-green-600 mx-auto" /></td>
                        </tr>
                        
                        {/* Action Row */}
                        <tr className="bg-gray-100 dark:bg-gray-700">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">Get Started</td>
                          <td className="px-6 py-4 text-center">
                            <Button size="sm" className="text-xs">Get Started Free</Button>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <Button size="sm" className="text-xs">Try for Free</Button>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <Button size="sm" variant="secondary" className="text-xs">Contact Sales</Button>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <Button size="sm" variant="secondary" className="text-xs">Contact Sales</Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>

              {currentPlans?.note && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-12 text-center"
                >
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    {currentPlans.note}
                  </p>
                </motion.div>
              )}
            </div>
          </section>
        </>
      )}

      <Footer />
      <FloatingContact />
    </>
  );
}