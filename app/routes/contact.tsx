import type { Route } from "./+types/contact";
import { Navbar } from "../components/layout/navbar";
import { Footer } from "../components/layout/footer";
import { motion } from "framer-motion";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact Us - Seekio" },
    { name: "description", content: "Get in touch with Seekio for your digital transformation needs. We're here to help." },
  ];
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your inquiry! We'll get back to you within 24 hours.");
    setFormData({ name: "", email: "", company: "", service: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
              Get in <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Ready to transform your business? Let's start a conversation about your digital needs
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card hover>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                  <Mail size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Email Us</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Send us an email and we'll respond within 24 hours
                </p>
                <a href="mailto:contact@seekio.com" className="text-blue-600 hover:text-blue-700 font-medium">
                  contact@seekio.com
                </a>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card hover>
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
                  <MessageSquare size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">WhatsApp</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Chat with us directly for quick responses
                </p>
                <a href="https://wa.me/1234567890" className="text-blue-600 hover:text-blue-700 font-medium">
                  Start Chat
                </a>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card hover>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                  <Phone size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Call Us</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Speak with our team during business hours
                </p>
                <a href="tel:+1234567890" className="text-blue-600 hover:text-blue-700 font-medium">
                  +1 (234) 567-890
                </a>
              </Card>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Your Company"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Service Interested In *
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="">Select a service</option>
                    <option value="web-development">Web Development</option>
                    <option value="business-digitization">Business Digitization</option>
                    <option value="academic-platform">Academic Platform</option>
                    <option value="low-code">Low-Code Development</option>
                    <option value="automation">Process Automation</option>
                    <option value="consultation">General Consultation</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Why Work With Us?
              </h2>
              
              <div className="space-y-6">
                <Card>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Quick Response Time
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    We respond to all inquiries within 24 hours. For urgent matters, reach us on WhatsApp for immediate assistance.
                  </p>
                </Card>

                <Card>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Free Consultation
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Get a complimentary 30-minute consultation to discuss your project requirements and explore solutions.
                  </p>
                </Card>

                <Card>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Transparent Pricing
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    No hidden costs. We provide detailed quotes and work within your budget to deliver maximum value.
                  </p>
                </Card>

                <Card>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Ongoing Support
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Our relationship doesn't end at delivery. We provide continuous support and maintenance for all projects.
                  </p>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
