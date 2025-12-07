import { motion } from "framer-motion";
import { Shield, Rocket, Users, Award, Clock, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { getContentUrl } from "../../utils/config";

const iconMap: any = { Shield, Rocket, Users, Award, Clock, TrendingUp };

export const WhyChoose = () => {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    fetch(getContentUrl('/why-choose.json'))
      .then(res => res.json())
      .then(data => setContent(data));
  }, []);

  if (!content) return null;

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-950">
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
          {content.reasons.map((reason: any, index: number) => {
            const Icon = iconMap[reason.icon];
            return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                <Icon size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {reason.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {reason.description}
              </p>
            </motion.div>
          );
          })}
        </div>
      </div>
    </section>
  );
};
