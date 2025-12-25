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

  useEffect(() => {
    fetch(getContentUrl('/pricing.json'))
      .then(res => res.json())
      .then(data => setPricingData(data))
      .catch(error => console.error('Failed to load pricing data:', error));
  }, []);

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
      
      <section className="pt-32 pb-24 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {pricingData.heading.split(' ')[0]} <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{pricingData.heading.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {pricingData.subheading}
            </p>
          </motion.div>
        </div>
      </section>

      {!selectedType ? (
        <section className="py-24 bg-white dark:bg-gray-950">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Choose Your Institution Type
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Select the type of academic institution to view relevant pricing plans
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card hover className="h-full cursor-pointer" onClick={() => setSelectedType('school')}>
                  <div className="text-center p-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-3xl text-white">🏫</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">School</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Comprehensive management solutions for K-12 schools, including student management, attendance, grades, and parent communication.
                    </p>
                    <Button className="w-full">View School Plans</Button>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card hover className="h-full cursor-pointer" onClick={() => setSelectedType('college')}>
                  <div className="text-center p-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-3xl text-white">🎓</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">University/College</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Advanced management systems for higher education institutions, including course management, faculty coordination, and student services.
                    </p>
                    <Button className="w-full">View College Plans</Button>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-24 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                  {selectedType === 'school' ? 'School' : 'University/College'} Management Plans
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 mt-2">
                  Choose the perfect plan for your institution
                </p>
              </motion.div>
              <Button 
                variant="secondary" 
                onClick={() => setSelectedType(null)}
                className="ml-4"
              >
                ← Back to Selection
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {currentPlans?.plans.map((plan: any, index: number) => (
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
                        <span className="text-4xl font-bold text-gray-900 dark:text-white">₹{plan.price}</span>
                        <span className="text-gray-600 dark:text-gray-400">/{plan.period}</span>
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
      )}

      <Footer />
      <FloatingContact />
    </>
  );
}