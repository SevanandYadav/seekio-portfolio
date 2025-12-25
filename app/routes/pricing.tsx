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
          <section className="pt-32 pb-12 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <div className="text-center">
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                    {selectedType === 'school' ? 'School' : 'University/College'} Management Pricing
                  </h1>
                  <p className="text-lg text-blue-600 dark:text-blue-400 font-medium mb-2">
                    Transparent and Flexible Pricing
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                    Explore our detailed pricing for {selectedType === 'school' ? 'schools' : 'colleges and universities'} with integrations, services, and payment gateway charges.
                  </p>
                </div>
                {/* Billing Period Switcher - Fixed overlapping */}
                <div className="flex justify-center mt-8">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-1 shadow-inner border border-gray-200 dark:border-gray-700">
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
          <section className="py-24 bg-white dark:bg-gray-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {currentPlans.plans.map((plan: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`h-full relative ${plan.popular ? 'ring-2 ring-blue-600' : ''}`}>
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                          Most Popular
                        </span>
                      </div>
                    )}
                    
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">{plan.description}</p>
                      
                      <div className="mb-6">
                        <span className="text-4xl font-bold text-gray-900 dark:text-white">
                          ₹{billingPeriod === 'yearly' ? Math.round(plan.price * 0.8 * 12) : plan.price}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">
                          /{billingPeriod === 'yearly' ? 'year' : 'month'}
                        </span>
                        {billingPeriod === 'yearly' && (
                          <div className="text-sm text-green-600 dark:text-green-400 mt-1">
                            Save ₹{Math.round(plan.price * 12 * 0.2)} per year
                          </div>
                        )}
                      </div>

                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature: any, idx: number) => (
                          <li key={idx} className="flex items-start">
                            {feature.included ? (
                              <Check size={20} className="text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                            ) : (
                              <X size={20} className="text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                            )}
                            <span className={`${feature.included ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                              {feature.name}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <Button 
                        className="w-full" 
                        variant={plan.popular ? "default" : "secondary"}
                      >
                        {plan.buttonText}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
              </div>

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