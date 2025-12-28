import type { Route } from "./+types/signup";
import { Navbar } from "../components/layout/navbar";
import { Footer } from "../components/layout/footer";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { useState, useEffect, Suspense, lazy } from "react";
import { Phone, MessageSquare, Shield, CheckCircle, Mail, Lock, Eye, EyeOff, UserPlus } from "lucide-react";
import { getContentUrl } from "../utils/config";
import { PageSkeleton } from "../components/ui/loading-skeleton";
import { useAuth } from "../contexts/auth-context";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sign Up - Seekio Academic Solutions" },
    { name: "description", content: "Create your account to get started with Seekio's academic management platform." },
  ];
}

export default function Signup() {
  const [activeTab, setActiveTab] = useState<'initial' | 'signup' | 'login'>('initial');
  const [contactMethod, setContactMethod] = useState<'mobile' | 'email'>('email');
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('password');
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<'contact' | 'otp' | 'success'>('contact');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{email?: string; mobile?: string; password?: string}>({});
  const [selectedInstitutionType, setSelectedInstitutionType] = useState<string | null>(null);
  const { login } = useAuth();

  // Check for selected institution type from pricing page and URL parameters
  useEffect(() => {
    const institutionType = localStorage.getItem('selected_institution_type');
    if (institutionType) {
      setSelectedInstitutionType(institutionType);
    }
    
    // Check URL parameters for default tab
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode'); // 'login' or 'signup'
    const source = urlParams.get('source'); // 'dashboard', 'navbar', 'pricing', etc.
    
    // Set default tab based on source/mode
    if (mode === 'login') {
      setActiveTab('login');
    } else if (mode === 'signup') {
      setActiveTab('signup');
    } else {
      // Default behavior based on source
      if (source === 'dashboard' || source === 'golive') {
        setActiveTab('login'); // Dashboard users likely want to login
      } else if (source === 'navbar' || source === 'getstarted' || source === 'pricing') {
        setActiveTab('signup'); // New users likely want to signup
      } else {
        setActiveTab('initial'); // Show modal for unclear cases
      }
    }
  }, []);

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMobile = (mobile: string) => {
    return mobile.length === 10 && /^[0-9]+$/.test(mobile);
  };

  // Reset form when switching tabs
  const handleTabSwitch = (tab: 'initial' | 'signup' | 'login') => {
    setActiveTab(tab);
    setMobile("");
    setEmail("");
    setPassword("");
    setOtp("");
    setStep('contact');
    setLoading(false);
    setShowPassword(false);
    setErrors({});
    if (tab === 'signup') {
      setContactMethod('email');
    } else if (tab === 'login') {
      setLoginMethod('password');
    }
  };
  const [signupData, setSignupData] = useState<any>(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    // Preload critical data with cache
    const cachedData = sessionStorage.getItem('signup-data');
    if (cachedData) {
      try {
        const parsed = JSON.parse(cachedData);
        setSignupData(parsed);
        setDataLoaded(true);
      } catch (e) {
        console.warn('Failed to parse cached signup data');
      }
    }
    
    // Fetch fresh data in background
    fetch(getContentUrl('/signup.json'))
      .then(res => res.json())
      .then(data => {
        setSignupData(data);
        setDataLoaded(true);
        sessionStorage.setItem('signup-data', JSON.stringify(data));
      })
      .catch(error => {
        console.error('Failed to load signup data:', error);
        if (!cachedData) setDataLoaded(true); // Show fallback UI
      });
  }, []);

  const handleSendOTP = async () => {
    // Force email method for signup
    if (activeTab === 'signup') {
      setContactMethod('email');
    }
    
    const contact = contactMethod === 'mobile' ? mobile : email;
    const newErrors: {mobile?: string; email?: string} = {};
    
    if (contactMethod === 'mobile' && activeTab === 'signup') {
      newErrors.mobile = 'Phone signup not supported. Please use email.';
      setErrors(newErrors);
      return;
    }
    
    if (contactMethod === 'mobile') {
      if (!mobile || !validateMobile(mobile)) {
        newErrors.mobile = 'Please enter a valid 10-digit mobile number';
      }
    } else {
      if (!email || !validateEmail(email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }
    
    if (Object.keys(newErrors).length > 0 || !signupData) {
      setErrors(newErrors);
      return;
    }
    
    // Test credentials bypass
    if ((contactMethod === 'mobile' && mobile === signupData?.testCredentials?.mobile) || 
        (contactMethod === 'email' && email === signupData?.testCredentials?.email)) {
      setLoading(true);
      setTimeout(() => {
        setStep('otp');
        setLoading(false);
      }, 1000);
      return;
    }
    
    setErrors({});
    setLoading(true);
    
    try {
      // For signup, always use email
      if (activeTab === 'signup') {
        const otpCode = Math.floor(100000 + Math.random() * 900000);
        console.log('Sending OTP to:', email, 'OTP:', otpCode);
        
        const response = await fetch('/.netlify/functions/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: 'Seekio Campus Signup',
            email: email,
            company: 'Seekio Campus',
            service: 'signup-otp',
            message: `Your OTP for Seekio Campus signup is: ${otpCode}`,
            isOTP: true,
            otpCode: otpCode
          })
        });
        
        console.log('Email API response status:', response.status);
        const responseData = await response.json();
        console.log('Email API response:', responseData);
        
        if (response.ok) {
          // Store OTP for verification
          sessionStorage.setItem('signup_otp', otpCode.toString());
          setStep('otp');
        } else {
          setErrors({email: `Failed to send OTP: ${responseData.message || 'Please try again'}`});
        }
      } else {
        // Login flow - use existing logic
        const endpoint = contactMethod === 'mobile' ? signupData.api.smsOtpEndpoint : signupData.api.emailOtpEndpoint;
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            [contactMethod]: contact,
            message: contactMethod === 'mobile' ? signupData.api.smsMessage : signupData.api.emailMessage
          })
        });
        
        if (response.ok) {
          setStep('otp');
        } else {
          const errorKey = contactMethod === 'mobile' ? 'mobile' : 'email';
          setErrors({[errorKey]: 'Failed to send OTP. Please try again.'});
        }
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setStep('otp');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    const newErrors: {email?: string; password?: string} = {};
    
    if (!email || !validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!password || password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    setLoading(true);
    
    try {
      // Check if API endpoint exists
      if (!signupData?.api?.loginEndpoint) {
        // No API configured - use test credentials
        const testEmail = signupData?.testCredentials?.email;
        const testPassword = signupData?.testCredentials?.password;
        const testIsLive = signupData?.testCredentials?.isLive === "true";
        
        if (testEmail && testPassword && email === testEmail && password === testPassword) {
          setTimeout(() => {
            const userData = {
              id: 1, 
              email: testEmail, 
              name: signupData?.testCredentials?.name || 'Test User',
              isLive: testIsLive,
              subscription: signupData?.testCredentials?.subscription || {
                level: 0,
                planName: 'Free Trial',
                startDate: new Date().toISOString(),
                endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
              }
            };
            login(testIsLive ? 'live_token_123' : 'test_token_123', userData);
            
            const institutionType = localStorage.getItem('selected_institution_type');
            if (institutionType) {
              window.location.href = `/pricing?type=${institutionType}`;
            } else {
              window.location.href = '/dashboard';
            }
          }, 1000);
          return;
        } else {
          setErrors({email: 'Invalid email or password'});
          return;
        }
      }
      
      // Try API first
      const response = await fetch(signupData.api.loginEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: email,
          password: password
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        
        // Use actual user data from API response
        if (data.token && data.user) {
          login(data.token, {
            id: data.user.id,
            email: data.user.email,
            name: data.user.name || data.user.fullName || 'User',
            subscription: data.user.subscription || {
              level: 0,
              planName: 'Free Trial',
              startDate: new Date().toISOString(),
              endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
            }
          });
        }
        
        const institutionType = localStorage.getItem('selected_institution_type');
        if (institutionType) {
          window.location.href = `/pricing?type=${institutionType}`;
        } else {
          window.location.href = '/dashboard';
        }
      } else {
        // API failed - try test credentials as fallback
        const testEmail = signupData?.testCredentials?.email;
        const testPassword = signupData?.testCredentials?.password;
        
        if (testEmail && testPassword && email === testEmail && password === testPassword) {
          const userData = {
            id: 1, 
            email: testEmail, 
            name: signupData?.testCredentials?.name || 'Test User',
            subscription: signupData?.testCredentials?.subscription || {
              level: 0,
              planName: 'Free Trial',
              startDate: new Date().toISOString(),
              endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
            }
          };
          login('test_fallback_token', userData);
          
          const institutionType = localStorage.getItem('selected_institution_type');
          if (institutionType) {
            window.location.href = `/pricing?type=${institutionType}`;
          } else {
            window.location.href = '/dashboard';
          }
        } else {
          const errorData = await response.json().catch(() => ({}));
          setErrors({email: errorData.message || 'Invalid email or password'});
        }
      }
    } catch (error) {
      console.error('API Error:', error);
      
      // Network error - try test credentials as fallback
      const testEmail = signupData?.testCredentials?.email;
      const testPassword = signupData?.testCredentials?.password;
      
      if (testEmail && testPassword && email === testEmail && password === testPassword) {
        const userData = {
          id: 1, 
          email: testEmail, 
          name: signupData?.testCredentials?.name || 'Test User',
          subscription: signupData?.testCredentials?.subscription || {
            level: 0,
            planName: 'Free Trial',
            startDate: new Date().toISOString(),
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
          }
        };
        login('test_network_fallback_token', userData);
        
        const institutionType = localStorage.getItem('selected_institution_type');
        if (institutionType) {
          window.location.href = `/pricing?type=${institutionType}`;
        } else {
          window.location.href = '/dashboard';
        }
      } else {
        setErrors({email: 'Login failed. Please try again.'});
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length < 4) return;
    
    // For signup, check stored OTP
    if (activeTab === 'signup') {
      const storedOtp = sessionStorage.getItem('signup_otp');
      if (otp === storedOtp) {
        setLoading(true);
        setTimeout(() => {
          setStep('success');
          setLoading(false);
        }, 1000);
        return;
      } else {
        setErrors({email: 'Invalid OTP. Please try again.'});
        return;
      }
    }
    
    // Test OTP bypass for login
    if (otp === signupData?.testCredentials?.otp) {
      setLoading(true);
      setTimeout(() => {
        if (activeTab === 'login') {
          const userData = {
            id: 1, 
            mobile: mobile || undefined,
            email: email || undefined,
            name: signupData?.testCredentials?.name || 'Test User',
            subscription: signupData?.testCredentials?.subscription || {
              level: 0,
              planName: 'Free Trial',
              startDate: new Date().toISOString(),
              endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
            }
          };
          login('test_token_otp_123', userData);
          window.location.href = '/dashboard';
        } else {
          setStep('success');
          setLoading(false);
        }
      }, 1000);
      return;
    }
    
    setLoading(true);
    try {
      const contact = contactMethod === 'mobile' ? mobile : email;
      const endpoint = activeTab === 'login' 
        ? signupData?.api?.verifyLoginOtpEndpoint || signupData?.api?.verifyOtpEndpoint
        : signupData?.api?.verifyOtpEndpoint;
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [contactMethod]: contact,
          otp: otp,
          action: activeTab // 'login' or 'signup'
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        
        // Store auth token if login
        if (activeTab === 'login' && data.token) {
          login(data.token, data.user);
        }
        
        setStep('success');
      } else {
        const errorData = await response.json();
        setErrors({email: errorData.message || 'Invalid OTP. Please try again.'});
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setErrors({email: 'Verification failed. Please try again.'});
    } finally {
      setLoading(false);
    }
  };

  if (!dataLoaded) {
    return (
      <>
        <Navbar />
        <PageSkeleton />
      </>
    );
  }

  return (
    <>
      <Navbar />
      
      <section className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full border border-gray-200 dark:border-gray-700"
        >
          <div className="flex flex-col lg:flex-row min-h-[600px]">
            {/* Left Side - Branding */}
            <div className="w-full lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 p-6 lg:p-8 flex flex-col justify-center text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-full bg-white opacity-10 transform skew-x-12 translate-x-16 hidden lg:block"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 lg:mb-6">
                  <Shield className="text-white" size={24} aria-hidden="true" />
                </div>
                <h1 className="text-2xl lg:text-3xl font-bold mb-3 lg:mb-4">Seekio Campus Solutions®</h1>
                <p className="text-base lg:text-lg text-blue-100 mb-6 lg:mb-8">
                  Manage attendance, fees, and student data seamlessly. Please sign in to continue.
                </p>
                <div className="space-y-3 lg:space-y-4">
                  <div className="flex items-center text-blue-100">
                    <CheckCircle className="mr-3 flex-shrink-0" size={18} aria-hidden="true" />
                    <span className="text-sm lg:text-base">Secure & Safe Platform</span>
                  </div>
                  <div className="flex items-center text-blue-100">
                    <CheckCircle className="mr-3 flex-shrink-0" size={18} aria-hidden="true" />
                    <span className="text-sm lg:text-base">SMS & Email OTP Verification</span>
                  </div>
                  <div className="flex items-center text-blue-100">
                    <CheckCircle className="mr-3 flex-shrink-0" size={18} aria-hidden="true" />
                    <span className="text-sm lg:text-base">24/7 Customer Support</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Auth Options */}
            <div className="w-full lg:w-1/2 p-6 lg:p-8 flex flex-col justify-center">
              {activeTab === 'initial' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center space-y-6 lg:space-y-8"
                  role="main"
                  aria-labelledby="welcome-heading"
                >
                  <div>
                    <h2 id="welcome-heading" className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedInstitutionType ? `Welcome to ${selectedInstitutionType === 'school' ? 'School' : 'College'} Solutions!` : 'Welcome!'}
                    </h2>
                    <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400">
                      Choose how you'd like to continue
                    </p>
                    {selectedInstitutionType && (
                      <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">
                        <span className="mr-2" aria-hidden="true">{selectedInstitutionType === 'school' ? '🏫' : '🎓'}</span>
                        {selectedInstitutionType === 'school' ? 'School Management' : 'College Management'}
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-3 lg:space-y-4">
                    <button
                      onClick={() => setActiveTab('login')}
                      className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white py-3 lg:py-4 px-4 lg:px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center text-sm lg:text-base"
                      aria-describedby="signin-description"
                    >
                      <Mail className="mr-2 lg:mr-3 flex-shrink-0" size={18} aria-hidden="true" />
                      Sign In to Your Account
                    </button>
                    <p id="signin-description" className="sr-only">Sign in to access your existing account</p>
                    
                    <div className="flex items-center" role="separator" aria-label="or">
                      <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
                      <span className="px-4 text-gray-500 text-sm">or</span>
                      <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
                    </div>
                    
                    <button
                      onClick={() => setActiveTab('signup')}
                      className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-4 focus:ring-blue-300 py-3 lg:py-4 px-4 lg:px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center text-sm lg:text-base"
                      aria-describedby="signup-description"
                    >
                      <UserPlus className="mr-2 lg:mr-3 flex-shrink-0" size={18} aria-hidden="true" />
                      Create New Account
                    </button>
                    <p id="signup-description" className="sr-only">Create a new account to get started</p>
                  </div>
                </motion.div>
              )}

            {/* Signup Flow */}
            {activeTab === 'signup' && (
              <>
                {/* Contact Method Step */}
                {step === 'contact' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4 lg:space-y-6"
                    role="main"
                    aria-labelledby="signup-heading"
                  >
                    <div className="text-center">
                      <h2 id="signup-heading" className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2">Create Account</h2>
                      <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400">Join Seekio Campus Solutions today</p>
                    </div>

                    {/* Navigation Options */}
                    <div className="flex justify-center text-sm">
                      <button
                        onClick={() => setActiveTab('login')}
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:underline"
                      >
                        Already have account? Sign in
                      </button>
                    </div>

                    {/* Method Selector */}
                    <div className="flex bg-gray-50 dark:bg-gray-800 rounded-lg p-1 mb-4" role="tablist" aria-label="Contact method selection">
                      <button
                        onClick={() => setContactMethod('email')}
                        role="tab"
                        aria-selected={contactMethod === 'email'}
                        aria-controls="contact-form"
                        className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          contactMethod === 'email'
                            ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                            : 'text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        <span aria-hidden="true">✉️</span> Email
                      </button>
                      <button
                        disabled
                        role="tab"
                        aria-selected="false"
                        className="flex-1 py-2 px-3 rounded-md text-sm font-medium text-gray-400 cursor-not-allowed"
                        aria-describedby="phone-disabled-reason"
                      >
                        <span aria-hidden="true">📱</span> Phone (Not Supported)
                      </button>
                    </div>
                    <p id="phone-disabled-reason" className="sr-only">Phone number signup is currently not supported</p>

                    {contactMethod === 'mobile' && (
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mb-4" role="alert">
                        <p className="text-sm text-yellow-800 dark:text-yellow-200">
                          Phone number signup is not supported. Please use email to create your account.
                        </p>
                      </div>
                    )}

                    <div id="contact-form">
                      <label htmlFor="contact-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                          id="contact-input"
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) setErrors({...errors, email: undefined});
                          }}
                          placeholder="Enter your email address"
                          required
                          aria-invalid={errors.email ? 'true' : 'false'}
                          aria-describedby={errors.email ? 'email-error' : 'email-help'}
                          className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                            errors.email ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <p id="email-error" className="text-xs text-red-600 dark:text-red-400 mt-1" role="alert">
                          {errors.email}
                        </p>
                      )}
                      <p id="email-help" className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        We'll send a verification code to this email address
                      </p>
                    </div>

                    <Button
                      onClick={handleSendOTP}
                      disabled={!email || !validateEmail(email) || loading}
                      className="w-full py-3 text-sm font-semibold focus:ring-4 focus:ring-blue-300"
                      aria-describedby="send-otp-status"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" aria-hidden="true"></div>
                          <span>Sending verification code...</span>
                        </div>
                      ) : (
                        <>
                          <MessageSquare className="mr-2" size={16} aria-hidden="true" />
                          Send Verification Code
                        </>
                      )}
                    </Button>
                    <p id="send-otp-status" className="sr-only">
                      {loading ? 'Sending verification code' : 'Ready to send verification code'}
                    </p>

                    <div className="text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        By continuing, you agree to our Terms of Service and Privacy Policy
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* OTP Verification Step */}
                {step === 'otp' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        {contactMethod === 'mobile' ? (
                          <MessageSquare className="text-green-600 dark:text-green-400" size={20} />
                        ) : (
                          <Mail className="text-green-600 dark:text-green-400" size={20} />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {contactMethod === 'mobile' 
                          ? signupData.signup.steps.otp.mobileSubtitle.replace('{mobile}', mobile)
                          : signupData.signup.steps.otp.emailSubtitle.replace('{email}', email)
                        }
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {contactMethod === 'mobile' ? signupData.signup.steps.otp.mobileHelp : signupData.signup.steps.otp.emailHelp}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {signupData.signup.steps.otp.title}
                      </label>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => {
                          setOtp(e.target.value.replace(/\D/g, '').slice(0, 6));
                          if (errors.email) setErrors({...errors, email: undefined});
                        }}
                        placeholder={signupData.signup.steps.otp.placeholder}
                        className={`block w-full px-3 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-center text-lg tracking-widest ${
                          errors.email ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        maxLength={6}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.email}</p>
                      )}
                    </div>

                    <Button
                      onClick={handleVerifyOTP}
                      disabled={!otp || otp.length < 4 || loading}
                      className="w-full py-3 text-sm font-semibold"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          {signupData.signup.steps.otp.loadingText}
                        </div>
                      ) : (
                        signupData.signup.steps.otp.buttonText
                      )}
                    </Button>

                    <div className="text-center">
                      <button
                        onClick={() => setStep('contact')}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {signupData.signup.steps.otp.changeContactText}
                      </button>
                      <span className="mx-2 text-gray-400">•</span>
                      <button
                        onClick={handleSendOTP}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {signupData.signup.steps.otp.resendText}
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Success Step */}
                {step === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-6"
                  >
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="text-green-600 dark:text-green-400" size={32} />
                    </div>
                    
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {signupData.signup.steps.success.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {signupData.signup.steps.success.subtitle}
                      </p>
                    </div>

                    <button 
                      onClick={() => window.location.href = '/onboarding'}
                      className="w-full py-3 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
                    >
                      Continue to Onboarding
                    </button>
                  </motion.div>
                )}
              </>
            )}

                {/* Login Form */}
              {activeTab === 'login' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4 lg:space-y-6"
                  role="main"
                  aria-labelledby="login-heading"
                >
                  <div className="flex items-center mb-4 lg:mb-6">
                    <button
                      onClick={() => setActiveTab('initial')}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 mr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
                      aria-label="Go back to welcome screen"
                    >
                      ←
                    </button>
                    <h2 id="login-heading" className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">
                      Sign In
                    </h2>
                  </div>

                  <div>
                    <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <input
                        id="login-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors({...errors, email: undefined});
                        }}
                        placeholder="Enter your email address"
                        required
                        aria-invalid={errors.email ? 'true' : 'false'}
                        aria-describedby={errors.email ? 'login-email-error' : undefined}
                        className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                          errors.email ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p id="login-email-error" className="text-xs text-red-600 dark:text-red-400 mt-1" role="alert">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Password *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (errors.password) setErrors({...errors, password: undefined});
                        }}
                        placeholder="Enter your password"
                        required
                        minLength={6}
                        aria-invalid={errors.password ? 'true' : 'false'}
                        aria-describedby={errors.password ? 'login-password-error' : 'password-requirements'}
                        className={`block w-full pl-10 pr-10 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                          errors.password ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p id="login-password-error" className="text-xs text-red-600 dark:text-red-400 mt-1" role="alert">{errors.password}</p>
                    )}
                    <p id="password-requirements" className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Password must be at least 6 characters long
                    </p>
                  </div>

                  <Button
                    onClick={handleLogin}
                    disabled={!email || !password || !validateEmail(email) || password.length < 6 || loading}
                    className="w-full py-3 text-sm font-semibold focus:ring-4 focus:ring-blue-300"
                    aria-describedby="login-status"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" aria-hidden="true"></div>
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                  <p id="login-status" className="sr-only">
                    {loading ? 'Signing in to your account' : 'Ready to sign in'}
                  </p>

                  <div className="text-center">
                    <button
                      onClick={() => setActiveTab('signup')}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline focus:outline-none focus:underline"
                    >
                      Don't have an account? Sign up
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </>
  );
}