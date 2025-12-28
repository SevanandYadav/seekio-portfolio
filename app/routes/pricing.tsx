import type { Route } from "./+types/pricing";
import { Navbar } from "../components/layout/navbar";
import { Footer } from "../components/layout/footer";
import { FloatingContact } from "../components/ui/floating-contact";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { AlertTriangle, Check, X } from "lucide-react";
import { useState, useEffect } from "react";
import { getContentUrl } from "../utils/config";
import { useAuth } from "../contexts/auth-context";

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
  const [paymentLoading, setPaymentLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  // Handle plan selection and payment
  const handlePlanSelection = async (plan: any) => {
    if (plan.price === "0") {
      // Free plan - check if user is authenticated
      if (isAuthenticated) {
        // Already logged in, go to dashboard
        window.location.href = '/dashboard';
      } else {
        // Not logged in, redirect to signup
        window.location.href = '/signup';
      }
      return;
    }

    // Paid plan - initiate Razorpay payment
    setPaymentLoading(true);
    
    try {
      const amount = billingPeriod === 'yearly' ? Math.round(plan.price * 0.8 * 12) : plan.price;
      const planName = `${plan.name} - ${selectedType === 'school' ? 'School' : 'College'} (${billingPeriod})`;
      
      // Create order
      const orderResponse = await fetch('/.netlify/functions/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amount * 100, // Convert to paise
          receipt: `receipt_${Date.now()}`,
          notes: {
            plan: planName,
            billing: billingPeriod,
            institutionType: selectedType
          }
        })
      });
      
      const orderData = await orderResponse.json();
      
      if (!orderResponse.ok) {
        throw new Error(orderData.error || 'Failed to create order');
      }
      
      // Get Razorpay key from environment
      const keyResponse = await fetch('/.netlify/functions/get-razorpay-key');
      const keyData = await keyResponse.json();
      
      if (!keyResponse.ok) {
        throw new Error('Failed to get payment configuration');
      }
      
      // Initialize Razorpay
      const userData = localStorage.getItem('user_data');
      const user = userData ? JSON.parse(userData) : null;
      
      const options = {
        key: keyData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Seekio Academic Solutions',
        description: planName,
        order_id: orderData.id,
        handler: async function (response: any) {
          try {
            // Verify payment
            const verifyResponse = await fetch('/.netlify/functions/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            });
            
            const verifyData = await verifyResponse.json();
            
            if (verifyResponse.ok) {
              // Payment successful - update user subscription
              const userData = localStorage.getItem('user_data');
              if (userData) {
                const user = JSON.parse(userData);
                user.subscription = {
                  level: plan.name === 'Professional' ? 1 : 2,
                  planName: planName,
                  startDate: new Date().toISOString(),
                  endDate: new Date(Date.now() + (billingPeriod === 'yearly' ? 365 : 30) * 24 * 60 * 60 * 1000).toISOString()
                };
                localStorage.setItem('user_data', JSON.stringify(user));
              }
              
              alert('Payment successful! Your subscription has been activated.');
              window.location.href = '/dashboard';
            } else {
              throw new Error(verifyData.error || 'Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error instanceof Error ? error.message.replace(/[\r\n]/g, '') : 'Unknown error');
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
          contact: user?.mobile || ''
        },
        theme: {
          color: '#3B82F6'
        }
      };
      
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
      
    } catch (error) {
      console.error('Payment initiation error:', error instanceof Error ? error.message.replace(/[\r\n]/g, '') : 'Unknown error');
      alert('Failed to initiate payment. Please try again.');
    } finally {
      setPaymentLoading(false);
    }
  };

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    
    // Check URL parameters for type and expired status
    const urlParams = new URLSearchParams(window.location.search);
    const typeParam = urlParams.get('type');
    const expiredParam = urlParams.get('expired');
    
    // If user is authenticated, skip modal and show pricing directly
    if (isAuthenticated) {
      const storedType = localStorage.getItem('selected_institution_type') || typeParam || 'school';
      setSelectedType(storedType as 'school' | 'college');
      setShowModal(false);
    } else if (typeParam && (typeParam === 'school' || typeParam === 'college')) {
      setSelectedType(typeParam);
      setShowModal(false);
      localStorage.removeItem('selected_institution_type');
    }
    
    // If coming from expired subscription, skip modal and show pricing
    if (expiredParam === 'true') {
      const userData = localStorage.getItem('user_data');
      const institutionType = localStorage.getItem('selected_institution_type') || 'school';
      setSelectedType(institutionType as 'school' | 'college');
      setShowModal(false);
    }
    
    fetch(getContentUrl('/pricing.json'))
      .then(res => res.json())
      .then(data => setPricingData(data))
      .catch(error => console.error('Failed to load pricing data:', error instanceof Error ? error.message.replace(/[\r\n]/g, '') : 'Unknown error'));
      
    return () => {
      // Cleanup script on unmount
      const scripts = document.querySelectorAll('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
      scripts.forEach(script => script.remove());
    };
  }, [isAuthenticated]);

  const handleTypeSelection = (type: 'school' | 'college') => {
    setSelectedType(type);
    localStorage.setItem('selected_institution_type', type);
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
      
      {/* Background content - only show when modal is open for blur effect */}
      {!selectedType && showModal && pricingData && (
        <div className="blur-sm pointer-events-none">
          {/* Header Section */}
          <section className="pt-32 pb-4 bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-4">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  Academic Management Pricing
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 font-medium mb-2">
                  Transparent and Flexible Pricing
                </p>
                <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                  Choose your institution type to view detailed pricing.
                </p>
              </div>
            </div>
          </section>

          {/* Placeholder pricing cards */}
          <section className="py-6 bg-white dark:bg-gray-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1,2,3].map((i) => (
                  <div key={i} className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-700 rounded-xl p-6 shadow-lg">
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-3/4"></div>
                    <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                    <div className="space-y-2">
                      {[1,2,3,4].map((j) => (
                        <div key={j} className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Modal Overlay for Type Selection - Only show when no type selected */}
      {!selectedType && showModal && (
        <div className="fixed inset-0 z-40 overflow-y-auto">
          <div className="min-h-screen px-4 text-center">
            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block w-full max-w-xl p-4 my-6 text-left align-middle bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 transform transition-all"
            >
              <div className="text-center mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  View Pricing For
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Select your institution type
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div 
                  className="cursor-pointer text-center p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/30 dark:border-gray-700/50 hover:border-blue-400/50 hover:scale-105 group" 
                  onClick={() => handleTypeSelection('school')}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <span className="text-xl text-white">🏫</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">School</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">
                    K-12 & Primary Education
                  </p>
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md text-sm">
                    Get Started
                  </div>
                </div>

                <div 
                  className="cursor-pointer text-center p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/30 dark:border-gray-700/50 hover:border-purple-400/50 hover:scale-105 group" 
                  onClick={() => handleTypeSelection('college')}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <span className="text-xl text-white">🎓</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">College</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">
                    Higher Education
                  </p>
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-md text-sm">
                    Get Started
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {selectedType && currentPlans && (
        <div>
          {/* Expired Subscription Banner */}
          {new URLSearchParams(window.location.search).get('expired') === 'true' && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">
                    <strong>Your trial has expired.</strong> Please choose a subscription plan to continue accessing all features.
                  </p>
                </div>
              </div>
            </div>
          )}
          
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
              className="text-sm md:text-xs px-3 py-2 md:px-3 md:py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-200 flex items-center gap-1.5 border border-blue-200 dark:border-blue-800 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label={`Switch to ${selectedType === 'school' ? 'college' : 'school'} pricing`}
            >
              {selectedType === 'school' ? (
                <>
                  <span className="text-base md:text-sm" aria-hidden="true">🎓</span>
                  <span className="hidden sm:inline">View College Pricing</span>
                  <span className="sm:hidden">College</span>
                </>
              ) : (
                <>
                  <span className="text-base md:text-sm" aria-hidden="true">🏫</span>
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
                role="banner"
              >
                <div className="text-center">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                    {selectedType === 'school' ? 'School' : 'University/College'} Management Pricing
                  </h1>
                  <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-medium mb-2">
                    Transparent and Flexible Pricing
                  </p>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-4">
                    Explore our detailed pricing for {selectedType === 'school' ? 'schools' : 'colleges and universities'} with integrations, services, and payment gateway charges.
                  </p>
                </div>
                {/* Billing Period Switcher - Mobile optimized */}
                <div className="flex justify-center mt-6">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-1 shadow-inner border border-gray-200 dark:border-gray-700" role="tablist" aria-label="Billing period selection">
                    <div className="flex gap-1">
                      <button
                        onClick={() => setBillingPeriod('monthly')}
                        role="tab"
                        aria-selected={billingPeriod === 'monthly'}
                        className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          billingPeriod === 'monthly'
                            ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-md'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        }`}
                      >
                        Monthly
                      </button>
                      <button
                        onClick={() => setBillingPeriod('yearly')}
                        role="tab"
                        aria-selected={billingPeriod === 'yearly'}
                        className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          billingPeriod === 'yearly'
                            ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-md'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        }`}
                      >
                        Yearly
                        <span className="ml-1 sm:ml-2 text-xs bg-green-500 text-white px-1.5 sm:px-2 py-0.5 rounded-full font-medium">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {currentPlans.plans
                  .filter((plan: any) => {
                    // If expired, only show Professional and Enterprise plans
                    const isExpired = new URLSearchParams(window.location.search).get('expired') === 'true';
                    if (isExpired) {
                      return plan.name === 'Professional' || plan.name === 'Enterprise';
                    }
                    return true; // Show all plans normally
                  })
                  .map((plan: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`h-full relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-700 ${plan.popular ? 'ring-2 ring-blue-500 shadow-xl' : 'shadow-lg'}`} role="article" aria-labelledby={`plan-${index}-title`}>
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-full text-xs font-medium" role="badge">
                          Most Popular
                        </span>
                      </div>
                    )}
                    
                    <div className="p-4 sm:p-6">
                      <h3 id={`plan-${index}-title`} className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 text-xs sm:text-sm">{plan.description}</p>
                      
                      <div className="mb-4">
                        <span className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                          {plan.price === "0" ? "Free" : 
                           plan.period === "student/month" ? 
                           `₹${billingPeriod === 'yearly' ? Math.round(plan.price * 0.8 * 12) : plan.price}` :
                           `₹${billingPeriod === 'yearly' ? Math.round(plan.price * 0.8 * 12) : plan.price}`}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
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

                      <ul className="space-y-2 mb-6 text-xs sm:text-sm max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600" role="list" aria-label={`${plan.name} plan features`}>
                        {plan.features.map((feature: any, idx: number) => (
                          <li key={idx} className="flex items-start" role="listitem">
                            {feature.included ? (
                              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                <Check size={10} className="text-green-600 dark:text-green-400 sm:w-3 sm:h-3" aria-hidden="true" />
                              </div>
                            ) : (
                              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                <X size={10} className="text-red-600 dark:text-red-400 sm:w-3 sm:h-3" aria-hidden="true" />
                              </div>
                            )}
                            <span className={`text-xs ${feature.included ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                              {feature.name}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <Button 
                        onClick={() => handlePlanSelection(plan)}
                        disabled={paymentLoading}
                        className={`w-full text-xs sm:text-sm py-2 sm:py-3 font-semibold transition-all duration-200 focus:ring-4 focus:ring-blue-300 ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105' : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50'}`}
                        aria-describedby={`plan-${index}-action`}
                      >
                        {paymentLoading ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white mr-2" aria-hidden="true"></div>
                            Processing...
                          </div>
                        ) : (
                          plan.price === "0" ? (isAuthenticated ? "Go to Dashboard" : "Start Free Trial") : "Choose Plan"
                        )}
                      </Button>
                      <p id={`plan-${index}-action`} className="sr-only">
                        {plan.price === "0" ? (isAuthenticated ? "Go to your dashboard" : "Start your free trial") : `Select the ${plan.name} plan`}
                      </p>
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
                
                <div className="relative">
                  {/* Sticky Header Container */}
                  <div className="sticky top-16 z-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700">
                    <div className="bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 dark:from-gray-800 dark:via-slate-800 dark:to-gray-900 rounded-t-xl border border-gray-200 dark:border-gray-700">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-gradient-to-r from-slate-100 to-gray-100 dark:from-slate-700 dark:to-gray-700">
                              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white min-w-48">Features</th>
                              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white hover:text-green-600 transition-colors min-w-32">Basic</th>
                              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white hover:text-blue-600 transition-colors min-w-32">Professional</th>
                              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white hover:text-purple-600 transition-colors min-w-32">Enterprise</th>
                              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white hover:text-orange-600 transition-colors min-w-32">Custom</th>
                            </tr>
                            <tr className="bg-gradient-to-r from-slate-200 to-gray-200 dark:from-slate-600 dark:to-gray-600">
                              <td className="px-6 py-3 text-sm font-medium text-gray-600 dark:text-gray-300">Pricing</td>
                              <td className="px-6 py-3 text-center text-sm font-bold text-green-600">
                                {currentPlans.plans[0]?.price === "0" ? "Free" : `₹${billingPeriod === 'yearly' ? Math.round(currentPlans.plans[0]?.price * 0.8 * 12) : currentPlans.plans[0]?.price}/${billingPeriod === 'yearly' ? 'year' : 'month'}`}
                              </td>
                              <td className="px-6 py-3 text-center text-sm font-bold text-blue-600">
                                {currentPlans.plans[1]?.price === "0" ? "Free" : `₹${billingPeriod === 'yearly' ? Math.round(currentPlans.plans[1]?.price * 0.8 * 12) : currentPlans.plans[1]?.price}/${billingPeriod === 'yearly' ? 'year' : currentPlans.plans[1]?.period || 'month'}`}
                              </td>
                              <td className="px-6 py-3 text-center text-sm font-bold text-purple-600">
                                {currentPlans.plans[2]?.price === "0" ? "Free" : `₹${billingPeriod === 'yearly' ? Math.round(currentPlans.plans[2]?.price * 0.8 * 12) : currentPlans.plans[2]?.price}/${billingPeriod === 'yearly' ? 'student/year' : currentPlans.plans[2]?.period || 'student/month'}`}
                              </td>
                              <td className="px-6 py-3 text-center text-sm font-bold text-orange-600">
                                {currentPlans.plans[3]?.price === "0" || !currentPlans.plans[3]?.price ? "Contact us" : `₹${billingPeriod === 'yearly' ? Math.round(currentPlans.plans[3]?.price * 0.8 * 12) : currentPlans.plans[3]?.price}/${billingPeriod === 'yearly' ? 'year' : currentPlans.plans[3]?.period || 'month'}`}
                              </td>
                            </tr>
                          </thead>
                        </table>
                      </div>
                    </div>
                  </div>
                  
                  {/* Scrollable Table Body */}
                  <div className="bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 dark:from-gray-800 dark:via-slate-800 dark:to-gray-900 rounded-b-xl shadow-lg border-x border-b border-gray-200 dark:border-gray-700">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {/* CRM Features - Scheduling */}
                        <tr className="bg-blue-50 dark:bg-blue-900/20">
                          <td colSpan={5} className="px-6 py-3 text-sm font-bold text-blue-800 dark:text-blue-200 uppercase tracking-wide">
                            📅 CRM Features - Scheduling
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-white min-w-48">Class Scheduling</td>
                          <td className="px-6 py-4 text-center min-w-32">
                            <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                              <Check size={14} className="text-green-600 dark:text-green-400" />
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center min-w-32">
                            <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                              <Check size={14} className="text-green-600 dark:text-green-400" />
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center min-w-32">
                            <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                              <Check size={14} className="text-green-600 dark:text-green-400" />
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center min-w-32">
                            <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                              <Check size={14} className="text-green-600 dark:text-green-400" />
                            </div>
                          </td>
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
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-white min-w-48">Attendance Tracking</td>
                          <td className="px-6 py-4 text-center min-w-32">
                            <div className="w-6 h-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto">
                              <X size={14} className="text-red-600 dark:text-red-400" />
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center min-w-32">
                            <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                              <Check size={14} className="text-green-600 dark:text-green-400" />
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center min-w-32">
                            <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                              <Check size={14} className="text-green-600 dark:text-green-400" />
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center min-w-32">
                            <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                              <Check size={14} className="text-green-600 dark:text-green-400" />
                            </div>
                          </td>
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
                          <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white min-w-48">Choose Plan</td>
                          <td className="px-6 py-4 text-center min-w-32">
                            <button
                              onClick={() => handlePlanSelection(currentPlans.plans[0])}
                              disabled={paymentLoading}
                              className="text-xs bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50"
                            >
                              {paymentLoading ? 'Processing...' : 'Choose Plan'}
                            </button>
                          </td>
                          <td className="px-6 py-4 text-center min-w-32">
                            <button
                              onClick={() => handlePlanSelection(currentPlans.plans[1])}
                              disabled={paymentLoading}
                              className="text-xs bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50"
                            >
                              {paymentLoading ? 'Processing...' : 'Choose Plan'}
                            </button>
                          </td>
                          <td className="px-6 py-4 text-center min-w-32">
                            <button
                              onClick={() => handlePlanSelection(currentPlans.plans[2])}
                              disabled={paymentLoading}
                              className="text-xs bg-gray-600 text-white px-3 py-1 rounded disabled:opacity-50"
                            >
                              {paymentLoading ? 'Processing...' : 'Choose Plan'}
                            </button>
                          </td>
                          <td className="px-6 py-4 text-center min-w-32">
                            <button
                              onClick={() => handlePlanSelection(currentPlans.plans[3] || {name: 'Custom', price: '0'})}
                              disabled={paymentLoading}
                              className="text-xs bg-gray-600 text-white px-3 py-1 rounded disabled:opacity-50"
                            >
                              {paymentLoading ? 'Processing...' : (currentPlans.plans[3]?.price === '0' || !currentPlans.plans[3]?.price ? 'Contact Us' : 'Choose Plan')}
                            </button>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
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
        </div>
      )}

      <Footer />
      <FloatingContact />
    </>
  );
}