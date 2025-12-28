import type { Route } from "./+types/services";
import { Navbar } from "../components/layout/navbar";
import { Footer } from "../components/layout/footer";
import { FloatingContact } from "../components/ui/floating-contact";
import { motion } from "framer-motion";
import { Globe, Building2, GraduationCap, Zap, Code, Smartphone, Mail, MessageSquare, BarChart, Shield } from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Academic Management Services - Seekio Campus Solutions®" },
    { name: "description", content: "Comprehensive academic management solutions for schools, colleges, and universities. Student management, faculty administration, and communication systems." },
  ];
}

export default function Services() {
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
              Our <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Services</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Comprehensive academic management solutions designed to transform educational institutions and enhance learning outcomes
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Student Management Solutions
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card hover>
                <GraduationCap size={40} className="text-blue-600 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Student Enrollment & Records</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Comprehensive student information system that manages enrollment, academic records, and personal data 
                  with secure access controls and easy data retrieval.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Online enrollment forms</li>
                  <li>• Academic transcripts</li>
                  <li>• Document management</li>
                  <li>• Student profiles</li>
                </ul>
              </Card>

              <Card hover>
                <BarChart size={40} className="text-blue-600 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Attendance Tracking</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Automated attendance management with real-time tracking, parent notifications, and comprehensive 
                  reporting for better student engagement monitoring.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Digital attendance marking</li>
                  <li>• Absence notifications</li>
                  <li>• Attendance reports</li>
                  <li>• Parent alerts</li>
                </ul>
              </Card>

              <Card hover>
                <Shield size={40} className="text-blue-600 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Grade Management</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Streamlined grading system with customizable grade scales, progress tracking, and automated 
                  report card generation for efficient academic assessment.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Online gradebooks</li>
                  <li>• Progress tracking</li>
                  <li>• Report card generation</li>
                  <li>• Grade analytics</li>
                </ul>
              </Card>

              <Card hover>
                <MessageSquare size={40} className="text-blue-600 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Parent Communication</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Integrated communication platform that keeps parents informed about their child's academic progress, 
                  school events, and important announcements.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Parent portals</li>
                  <li>• Progress notifications</li>
                  <li>• Event updates</li>
                  <li>• Direct messaging</li>
                </ul>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Faculty & Administrative Solutions
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card hover>
                <GraduationCap size={40} className="text-blue-600 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Teacher Interaction Panels</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Comprehensive management systems for educators to handle classes, assignments, grades, and student communication efficiently.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Assignment management</li>
                  <li>• Grade tracking</li>
                  <li>• Student communication</li>
                  <li>• Attendance monitoring</li>
                </ul>
              </Card>

              <Card hover>
                <Building2 size={40} className="text-blue-600 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Class Scheduling</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Intelligent scheduling systems that optimize resource allocation, prevent conflicts, and provide 
                  real-time updates to all stakeholders.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Automated timetables</li>
                  <li>• Room allocation</li>
                  <li>• Conflict resolution</li>
                  <li>• Calendar integration</li>
                </ul>
              </Card>

              <Card hover>
                <Globe size={40} className="text-blue-600 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Institute Showcase Pages</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Beautiful, informative websites that highlight your institution's strengths, programs, and achievements 
                  to attract students and parents.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Program catalogs</li>
                  <li>• Faculty profiles</li>
                  <li>• News & events</li>
                  <li>• Virtual tours</li>
                </ul>
              </Card>

              <Card hover>
                <Shield size={40} className="text-blue-600 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Online Fee Payment Modules</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Secure, user-friendly payment gateways integrated with your systems for seamless fee collection 
                  and financial management.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Multiple payment methods</li>
                  <li>• Automated receipts</li>
                  <li>• Payment tracking</li>
                  <li>• Financial reporting</li>
                </ul>
              </Card>

              <Card hover className="lg:col-span-2">
                <div className="flex items-start space-x-4">
                  <div>
                    <MessageSquare size={40} className="text-blue-600 mb-4" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">WhatsApp & Email Integration</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Automated communication systems that keep students, parents, and staff informed through their preferred channels.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                        <li>• Automated notifications</li>
                        <li>• Bulk messaging</li>
                        <li>• Event reminders</li>
                      </ul>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                        <li>• Grade updates</li>
                        <li>• Fee reminders</li>
                        <li>• Emergency alerts</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Financial & Communication Systems
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card hover>
                <Shield size={40} className="text-blue-600 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Online Fee Payment System</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Secure, user-friendly payment gateway integrated with your academic system for seamless fee collection 
                  and automated financial management.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Multiple payment methods</li>
                  <li>• Automated receipts</li>
                  <li>• Payment tracking</li>
                  <li>• Financial reporting</li>
                </ul>
              </Card>

              <Card hover>
                <BarChart size={40} className="text-blue-600 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Financial Reporting</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Comprehensive financial analytics and reporting tools that provide insights into fee collection, 
                  outstanding payments, and institutional revenue streams.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Revenue analytics</li>
                  <li>• Outstanding reports</li>
                  <li>• Payment trends</li>
                  <li>• Custom dashboards</li>
                </ul>
              </Card>

              <Card hover>
                <MessageSquare size={40} className="text-blue-600 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">SMS & Email Integration</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Automated communication systems that keep students, parents, and staff informed through SMS and email 
                  notifications for important updates and announcements.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Automated notifications</li>
                  <li>• Bulk messaging</li>
                  <li>• Event reminders</li>
                  <li>• Grade updates</li>
                </ul>
              </Card>

              <Card hover>
                <Globe size={40} className="text-blue-600 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">WhatsApp Integration</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Direct WhatsApp integration for instant communication with parents and students, including automated 
                  messages for fee reminders, attendance alerts, and emergency notifications.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Instant messaging</li>
                  <li>• Fee reminders</li>
                  <li>• Emergency alerts</li>
                  <li>• Group communications</li>
                </ul>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Let's discuss how we can transform your educational institution
            </p>
            <Link to="/contact">
              <Button variant="secondary" size="lg">
                Schedule a Consultation
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
      <FloatingContact />
    </>
  );
}
