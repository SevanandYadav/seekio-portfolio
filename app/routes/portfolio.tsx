import type { Route } from "./+types/portfolio";
import { Navbar } from "../components/layout/navbar";
import { Footer } from "../components/layout/footer";
import { FloatingContact } from "../components/ui/floating-contact";
import { motion } from "framer-motion";
import { Card } from "../components/ui/card";
import { GraduationCap, Building2, Globe, MessageSquare, ShoppingCart, Calendar } from "lucide-react";
import { useState, useEffect } from "react";

const iconMap: any = { GraduationCap, Building2, Globe, MessageSquare, ShoppingCart, Calendar };

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Portfolio - Seekio Projects" },
    { name: "description", content: "Explore our portfolio of successful digital transformation projects across various industries." },
  ];
}

export default function Portfolio() {
  const [content, setContent] = useState<any>(null);
  const [assets, setAssets] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    Promise.all([
      fetch('/content/portfolio.json').then(res => res.json()),
      fetch('/content/assets.json').then(res => res.json()),
      fetch('/content/stats.json').then(res => res.json())
    ]).then(([portfolioData, assetsData, statsData]) => {
      setContent(portfolioData);
      setAssets(assetsData);
      setStats(statsData.stats);
    });
  }, []);

  if (!content || !assets || !stats) return null;

  const imageKeys = ['academic', 'business', 'corporate', 'whatsapp', 'ecommerce', 'events'];
  const projects = content.projects.map((project: any, index: number) => ({
    ...project,
    image: assets.projectImages[imageKeys[index]]
  }));

  const oldProjects = [
    {
      icon: GraduationCap,
      title: "Academic Institute Digitization",
      category: "Education",
      description: "Complete digital transformation of a multi-campus educational institution with 5,000+ students. Implemented teacher panels, online fee payment, automated scheduling, and parent communication systems.",
      features: ["Teacher Management", "Fee Payment Gateway", "Automated Scheduling", "WhatsApp Integration"],
      gradient: "from-blue-600 to-cyan-600"
    },
    {
      icon: Building2,
      title: "Business Workflow Automation",
      category: "Enterprise",
      description: "Streamlined operations for a manufacturing company by automating inventory management, order processing, and supplier communications. Reduced processing time by 60%.",
      features: ["Inventory System", "Order Automation", "Supplier Portal", "Real-time Analytics"],
      gradient: "from-purple-600 to-pink-600"
    },
    {
      icon: Globe,
      title: "Corporate Digital Presence",
      category: "Business",
      description: "Built a comprehensive digital ecosystem for a consulting firm including website, client portal, and automated marketing workflows. Increased lead generation by 150%.",
      features: ["Corporate Website", "Client Portal", "Marketing Automation", "SEO Optimization"],
      gradient: "from-green-600 to-teal-600"
    },
    {
      icon: MessageSquare,
      title: "WhatsApp Business Automation",
      category: "Automation",
      description: "Developed an intelligent WhatsApp automation system for a retail chain to handle customer inquiries, order updates, and promotional campaigns. Serves 10,000+ customers monthly.",
      features: ["Chatbot Integration", "Order Tracking", "Bulk Messaging", "Analytics Dashboard"],
      gradient: "from-orange-600 to-red-600"
    },
    {
      icon: ShoppingCart,
      title: "E-Commerce Platform",
      category: "Retail",
      description: "Created a full-featured e-commerce platform with inventory management, payment processing, and customer analytics. Processed $500K+ in transactions in the first year.",
      features: ["Product Catalog", "Payment Gateway", "Order Management", "Customer Analytics"],
      gradient: "from-indigo-600 to-blue-600"
    },
    {
      icon: Calendar,
      title: "Event Management System",
      category: "SaaS",
      description: "Built a low-code event management platform for conference organizers. Features include registration, ticketing, scheduling, and attendee engagement tools.",
      features: ["Registration System", "Ticketing", "Schedule Builder", "Attendee App"],
      gradient: "from-pink-600 to-rose-600"
    }
  ];

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
              {content.heading.split(' ')[0]} <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{content.heading.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {content.subheading}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project: any, index: number) => {
              const Icon = iconMap[project.icon];
              return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  {project.image && (
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover rounded-xl mb-4"
                    />
                  )}
                  <div className="flex items-start space-x-4 mb-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${project.gradient} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon size={28} className="text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">
                        {project.category}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {project.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                      Key Features:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Success by the Numbers
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
              Our projects deliver measurable impact across industries
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-950 rounded-2xl p-8 shadow-lg"
                >
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <FloatingContact />
    </>
  );
}
