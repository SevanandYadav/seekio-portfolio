import type { Route } from "./+types/signup";
import { Navbar } from "../components/layout/navbar";
import { Footer } from "../components/layout/footer";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { useState, useEffect, Suspense, lazy } from "react";
import { Phone, MessageSquare, Shield, CheckCircle, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { getContentUrl } from "../utils/config";
import { PageSkeleton } from "../components/ui/loading-skeleton";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sign Up - Seekio Academic Solutions" },
    { name: "description", content: "Create your account to get started with Seekio's academic management platform." },
  ];
}

export default function Signup() {
  const [activeTab, setActiveTab] = useState<'signup' | 'login'>('signup');
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

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMobile = (mobile: string) => {
    return mobile.length === 10 && /^[0-9]+$/.test(mobile);
  };

  // Reset form when switching tabs
  const handleTabSwitch = (tab: 'signup' | 'login') => {
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
    } else {
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
    const contact = contactMethod === 'mobile' ? mobile : email;
    const newErrors: {mobile?: string; email?: string} = {};
    
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
    
    setErrors({});
    setLoading(true);
    try {
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
        
        // Store auth token and user data
        if (data.token) {
          localStorage.setItem('auth_token', data.token);
          localStorage.setItem('user_data', JSON.stringify(data.user));
        }
        
        setStep('success');
      } else {
        const errorData = await response.json();
        setErrors({email: errorData.message || 'Invalid email or password'});
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrors({email: 'Login failed. Please try again.'});
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length < 4) return;
    
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
          localStorage.setItem('auth_token', data.token);
          localStorage.setItem('user_data', JSON.stringify(data.user));
        }
        
        setStep('success');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Verification failed. Please try again.');
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
      
      <section className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {signupData?.title || "Welcome to Seekio"}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {signupData?.subtitle || "Access your academic management platform"}
              </p>
            </div>

            {/* Tabs */}
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1 mb-8">
              <button
                onClick={() => handleTabSwitch('signup')}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeTab === 'signup'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {signupData?.tabs?.signup || "Create Account"}
              </button>
              <button
                onClick={() => handleTabSwitch('login')}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeTab === 'login'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {signupData?.tabs?.login || "Sign In"}
              </button>
            </div>

            {/* Signup Flow */}
            {activeTab === 'signup' && (
              <>
                {/* Contact Method Step */}
                {step === 'contact' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    {/* Method Selector */}
                    <div className="flex bg-gray-50 dark:bg-gray-800 rounded-lg p-1 mb-4">
                      <button
                        onClick={() => setContactMethod('email')}
                        className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                          contactMethod === 'email'
                            ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                            : 'text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        ✉️ {signupData.signup.contactMethods.email}
                      </button>
                      <button
                        onClick={() => setContactMethod('mobile')}
                        className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                          contactMethod === 'mobile'
                            ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                            : 'text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        📱 {signupData.signup.contactMethods.mobile}
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {contactMethod === 'mobile' ? signupData.signup.steps.contact.mobileTitle : signupData.signup.steps.contact.emailTitle}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          {contactMethod === 'mobile' ? (
                            <Phone className="h-5 w-5 text-gray-400" />
                          ) : (
                            <Mail className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                        <input
                          type={contactMethod === 'mobile' ? 'tel' : 'email'}
                          value={contactMethod === 'mobile' ? mobile : email}
                          onChange={(e) => {
                            if (contactMethod === 'mobile') {
                              setMobile(e.target.value.replace(/\D/g, '').slice(0, 10));
                              if (errors.mobile) setErrors({...errors, mobile: undefined});
                            } else {
                              setEmail(e.target.value);
                              if (errors.email) setErrors({...errors, email: undefined});
                            }
                          }}
                          placeholder={contactMethod === 'mobile' ? signupData.signup.steps.contact.mobilePlaceholder : signupData.signup.steps.contact.emailPlaceholder}
                          className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                            (contactMethod === 'mobile' ? errors.mobile : errors.email) ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                          }`}
                        />
                      </div>
                      {(contactMethod === 'mobile' ? errors.mobile : errors.email) && (
                        <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                          {contactMethod === 'mobile' ? errors.mobile : errors.email}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {contactMethod === 'mobile' ? signupData.signup.steps.contact.mobileHelp : signupData.signup.steps.contact.emailHelp}
                      </p>
                    </div>

                    <Button
                      onClick={handleSendOTP}
                      disabled={(!mobile && !email) || (contactMethod === 'mobile' && mobile.length < 10) || loading}
                      className="w-full py-3 text-sm font-semibold"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          {signupData.signup.steps.contact.loadingText}
                        </div>
                      ) : (
                        <>
                          <MessageSquare className="mr-2" size={16} />
                          {contactMethod === 'mobile' ? signupData.signup.steps.contact.mobileButton : signupData.signup.steps.contact.emailButton}
                        </>
                      )}
                    </Button>

                    <div className="text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {signupData.signup.steps.contact.termsText}
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
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        placeholder={signupData.signup.steps.otp.placeholder}
                        className="block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-center text-lg tracking-widest"
                        maxLength={6}
                      />
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

                    <Button className="w-full py-3 text-sm font-semibold">
                      {signupData.signup.steps.success.buttonText}
                    </Button>
                  </motion.div>
                )}
              </>
            )}

            {/* Login Form */}
            {activeTab === 'login' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Login Method Selector */}
                <div className="flex bg-gray-50 dark:bg-gray-800 rounded-lg p-1 mb-4">
                  <button
                    onClick={() => setLoginMethod('password')}
                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                      loginMethod === 'password'
                        ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    🔐 {signupData?.login?.methods?.password || "Password"}
                  </button>
                  <button
                    onClick={() => setLoginMethod('otp')}
                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                      loginMethod === 'otp'
                        ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    📱 {signupData?.login?.methods?.otp || "OTP"}
                  </button>
                </div>

                {/* Email/Password Login */}
                {loginMethod === 'password' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) setErrors({...errors, email: undefined});
                          }}
                          placeholder="Enter your email address"
                          className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                            errors.email ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {signupData?.login?.fields?.password?.title || "Password"}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            if (errors.password) setErrors({...errors, password: undefined});
                          }}
                          placeholder={signupData?.login?.fields?.password?.placeholder || "Enter your password"}
                          className={`block w-full pl-10 pr-10 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                            errors.password ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.password}</p>
                      )}
                      <div className="text-right mt-1">
                        <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                          {signupData?.login?.fields?.password?.forgotText || "Forgot password?"}
                        </button>
                      </div>
                    </div>

                    <Button
                      onClick={handleLogin}
                      disabled={!email || !password || loading}
                      className="w-full py-3 text-sm font-semibold"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          {signupData?.login?.passwordLogin?.loadingText || "Signing in..."}
                        </div>
                      ) : (
                        signupData?.login?.passwordLogin?.buttonText || "Sign In"
                      )}
                    </Button>
                  </>
                )}

                {/* Mobile OTP Login */}
                {loginMethod === 'otp' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Mobile Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          value={mobile}
                          onChange={(e) => {
                            setMobile(e.target.value.replace(/\D/g, '').slice(0, 10));
                            if (errors.mobile) setErrors({...errors, mobile: undefined});
                          }}
                          placeholder="Enter your mobile number"
                          className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                            errors.mobile ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                          }`}
                        />
                      </div>
                      {errors.mobile && (
                        <p className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.mobile}</p>
                      )}
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        We'll send an OTP to verify your number
                      </p>
                    </div>

                    {step === 'contact' && (
                      <Button
                        onClick={() => {
                          setContactMethod('mobile');
                          handleSendOTP();
                        }}
                        disabled={!mobile || mobile.length < 10 || loading}
                        className="w-full py-3 text-sm font-semibold"
                      >
                        {loading ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            {signupData?.login?.otpLogin?.loadingText || "Sending OTP..."}
                          </div>
                        ) : (
                          <>
                            <MessageSquare className="mr-2" size={16} />
                            {signupData?.login?.otpLogin?.buttonText || "Send OTP"}
                          </>
                        )}
                      </Button>
                    )}

                    {step === 'otp' && (
                      <>
                        <div className="text-center mb-4">
                          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MessageSquare className="text-green-600 dark:text-green-400" size={20} />
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            OTP sent to +91 {mobile}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Check your SMS messages
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Enter OTP
                          </label>
                          <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                            placeholder="Enter 6-digit OTP"
                            className="block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-center text-lg tracking-widest"
                            maxLength={6}
                          />
                        </div>

                        <Button
                          onClick={handleVerifyOTP}
                          disabled={!otp || otp.length < 4 || loading}
                          className="w-full py-3 text-sm font-semibold"
                        >
                          {loading ? (
                            <div className="flex items-center justify-center">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              {signupData?.login?.otpLogin?.verifyLoading || "Signing in..."}
                            </div>
                          ) : (
                            signupData?.login?.otpLogin?.verifyButton || "Verify & Sign In"
                          )}
                        </Button>

                        <div className="text-center">
                          <button
                            onClick={() => setStep('contact')}
                            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            Change mobile number
                          </button>
                          <span className="mx-2 text-gray-400">•</span>
                          <button
                            onClick={() => {
                              setContactMethod('mobile');
                              handleSendOTP();
                            }}
                            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            Resend OTP
                          </button>
                        </div>
                      </>
                    )}
                  </>
                )}

                <div className="text-center">
                  <button
                    onClick={() => handleTabSwitch('signup')}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {signupData?.login?.switchText || "Don't have an account? Create one"}
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                <Shield className="text-blue-600 dark:text-blue-400" size={16} />
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Secure & Safe</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                <MessageSquare className="text-green-600 dark:text-green-400" size={16} />
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">SMS OTP</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="text-purple-600 dark:text-purple-400" size={16} />
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Quick Setup</p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}