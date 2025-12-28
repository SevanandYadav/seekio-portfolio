import type { Route } from "./+types/contact";
import { Navbar } from "../components/layout/navbar";
import { Footer } from "../components/layout/footer";
import { motion } from "framer-motion";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { getContentUrl } from "../utils/config";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact Us - Seekio" },
    { name: "description", content: "Get in touch with Seekio for your digital transformation needs. We're here to help." },
  ];
}

export default function Contact() {
  const [contactData, setContactData] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: ""
  });
  const [formStatus, setFormStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch(getContentUrl('/contact.json'))
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => setContactData(data))
      .catch(error => {
        console.error('Contact page error:', error instanceof Error ? error.message.replace(/[\r\n]/g, '') : 'Unknown error');
        // Set minimal fallback to prevent crash
        setContactData({
          heading: "Get in Touch",
          subheading: "Contact us for your digital needs",
          contactMethods: [
            { icon: "Mail", title: "Email", description: "Email us", value: "info@seekio.in", link: "mailto:info@seekio.in" },
            { icon: "MessageSquare", title: "WhatsApp", description: "Chat with us", value: "Start Chat", link: "https://wa.me/919140044854" },
            { icon: "Phone", title: "Call", description: "Call us", value: "+91 91400 44854", link: "tel:+919140044854" }
          ]
        });
      });
  }, []);

  if (!contactData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading contact information...</p>
        </div>
      </div>
    );
  }

  const emailMethod = contactData.contactMethods.find((method: any) => method.icon === 'Mail');
  const whatsappMethod = contactData.contactMethods.find((method: any) => method.icon === 'MessageSquare');
  const phoneMethod = contactData.contactMethods.find((method: any) => method.icon === 'Phone');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.service || !formData.message) {
      setFormStatus("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    setFormStatus("Sending...");
    
    try {
      const response = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setFormStatus("Message sent successfully! We'll get back to you within 24 hours.");
        setFormData({ name: "", email: "", company: "", service: "", message: "" });
        setTimeout(() => setFormStatus(""), 5000);
      } else {
        throw new Error(data.message || 'Failed to send');
      }
    } catch (error) {
      setFormStatus(`Failed to send message. Please try emailing directly at ${emailMethod?.value}`);
      setTimeout(() => setFormStatus(""), 5000);
    } finally {
      setIsSubmitting(false);
    }
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
              {contactData.heading.split(' ')[0]} <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{contactData.heading.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {contactData.subheading}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card hover>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                  <Mail size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{emailMethod?.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {emailMethod?.description}
                </p>
                <a href={emailMethod?.link} className="text-blue-600 hover:text-blue-700 font-medium">
                  {emailMethod?.value}
                </a>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card hover>
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
                  <MessageSquare size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{whatsappMethod?.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {whatsappMethod?.description}
                </p>
                <a href={whatsappMethod?.link} className="text-blue-600 hover:text-blue-700 font-medium">
                  {whatsappMethod?.value}
                </a>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card hover>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                  <Phone size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{phoneMethod?.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {phoneMethod?.description}
                </p>
                <a href={phoneMethod?.link} className="text-blue-600 hover:text-blue-700 font-medium">
                  {phoneMethod?.value}
                </a>
              </Card>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Send Us a Message
              </h2>
              {formStatus && (
                <div className={`p-4 rounded-lg mb-6 ${
                  formStatus.includes('successfully') 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : formStatus.includes('Failed') 
                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                }`}>
                  {formStatus}
                </div>
              )}
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
                    <option value="rapid-dev">Rapid Application Development</option>
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

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
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
