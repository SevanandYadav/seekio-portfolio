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
    { title: "Our Services - Seekio Digital Solutions" },
    { name: "description", content: "Comprehensive digital transformation services including web development, business digitization, and rapid application development." },
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
              End-to-end digital solutions designed to transform your business operations and accelerate growth
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
              Digital Business Solutions
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card hover>
                <Globe size={40} className="text-blue-600 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Website Creation</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Professional, responsive websites that capture your brand essence and convert visitors into customers. 
                  Built with modern frameworks for optimal performance and SEO.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Corporate websites</li>
                  <li>• E-commerce platforms</li>
                  <li>• Landing pages</li>
                  <li>• Portfolio sites</li>
                </ul>
              </Card>

              <Card hover>
                <Zap size={40} className="text-blue-600 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Process Automation</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Eliminate repetitive tasks and streamline workflows with intelligent automation solutions. 
                  Increase efficiency and reduce operational costs.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Workflow automation</li>
                  <li>• Data processing</li>
                  <li>• Report generation</li>
                  <li>• Task scheduling</li>
                </ul>
              </Card>

              <Card hover>
                <Smartphone size={40} className="text-blue-600 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Online Presence Optimization</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Build and enhance your digital footprint across multiple channels. From SEO to social media integration, 
                  we help you reach your target audience effectively.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• SEO optimization</li>
                  <li>• Social media integration</li>
                  <li>• Analytics setup</li>
                  <li>• Content management</li>
                </ul>
              </Card>

              <Card hover>
                <BarChart size={40} className="text-blue-600 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Business Workflow Tools</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Custom tools and dashboards tailored to your specific business needs. Manage operations, 
                  track metrics, and make data-driven decisions.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Admin dashboards</li>
                  <li>• CRM systems</li>
                  <li>• Inventory management</li>
                  <li>• Project tracking</li>
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
              Academic Digitization Platform
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
              Rapid Application Development
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card hover>
                <Code size={40} className="text-blue-600 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Custom App Development</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Leverage modern development platforms like Bubble.io, Webflow, and Airtable to build sophisticated 
                  applications in a fraction of the time and cost.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Rapid prototyping</li>
                  <li>• MVP development</li>
                  <li>• Custom workflows</li>
                  <li>• API integrations</li>
                </ul>
              </Card>

              <Card hover>
                <Smartphone size={40} className="text-blue-600 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Cross-Platform Apps</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Build once, deploy everywhere. Create applications that work seamlessly across web, iOS, and Android 
                  with responsive design and native-like performance.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Web applications</li>
                  <li>• Mobile apps</li>
                  <li>• Progressive web apps</li>
                  <li>• Responsive design</li>
                </ul>
              </Card>

              <Card hover>
                <BarChart size={40} className="text-blue-600 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Lightweight Admin Dashboards</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Intuitive dashboards that give you complete control over your data and operations without the complexity 
                  of traditional enterprise software.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Data visualization</li>
                  <li>• User management</li>
                  <li>• Real-time analytics</li>
                  <li>• Custom reports</li>
                </ul>
              </Card>

              <Card hover>
                <Zap size={40} className="text-blue-600 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Fast, Affordable, Scalable</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Get to market faster with lower development costs while maintaining the flexibility to scale as your 
                  business grows. Perfect for startups and SMEs.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• 3-5x faster development</li>
                  <li>• 50-70% cost reduction</li>
                  <li>• Easy maintenance</li>
                  <li>• Scalable architecture</li>
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
              Let's discuss which services are right for your organization
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
