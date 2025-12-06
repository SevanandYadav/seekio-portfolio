import { motion } from "framer-motion";
import { Card } from "../ui/card";
import { Globe, Building2, GraduationCap, Zap, Workflow, Smartphone } from "lucide-react";

export const ServicesPreview = () => {
  const services = [
    {
      icon: Globe,
      title: "Web Solutions",
      description: "Custom websites and web applications built with modern technologies for optimal performance and user experience."
    },
    {
      icon: Building2,
      title: "Business Digitization",
      description: "Transform traditional business processes into efficient digital workflows with automation and integration."
    },
    {
      icon: GraduationCap,
      title: "Academic Platforms",
      description: "Comprehensive digital solutions for educational institutions including management systems and online portals."
    },
    {
      icon: Zap,
      title: "Low-Code Development",
      description: "Rapid application development using cutting-edge low-code platforms for faster time-to-market."
    },
    {
      icon: Workflow,
      title: "Process Automation",
      description: "Streamline operations with intelligent automation, reducing manual work and increasing productivity."
    },
    {
      icon: Smartphone,
      title: "Digital Presence",
      description: "Build and optimize your online presence across multiple channels to reach and engage your audience."
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Comprehensive digital solutions tailored to your unique business needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover>
                <service.icon size={40} className="text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {service.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
