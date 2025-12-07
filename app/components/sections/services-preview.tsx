import { motion } from "framer-motion";
import { Card } from "../ui/card";
import { Globe, Building2, GraduationCap, Zap, Workflow, Smartphone } from "lucide-react";
import { useState, useEffect } from "react";
import { getContentUrl } from "../../utils/config";

const iconMap: any = { Globe, Building2, GraduationCap, Zap, Workflow, Smartphone };

export const ServicesPreview = () => {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    fetch(getContentUrl('/services.json'))
      .then(res => res.json())
      .then(data => setContent(data));
  }, []);

  if (!content) return null;

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
            {content.heading}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {content.subheading}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.services.map((service: any, index: number) => {
            const Icon = iconMap[service.icon];
            return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover>
                <Icon size={40} className="text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {service.description}
                </p>
              </Card>
            </motion.div>
          );
          })}
        </div>
      </div>
    </section>
  );
};
