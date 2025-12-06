import { motion } from "framer-motion";
import { Shield, Rocket, Users, Award, Clock, TrendingUp } from "lucide-react";

export const WhyChoose = () => {
  const reasons = [
    {
      icon: Shield,
      title: "Trusted Expertise",
      description: "Years of experience delivering enterprise-grade solutions with proven results"
    },
    {
      icon: Rocket,
      title: "Fast Delivery",
      description: "Agile methodology ensures rapid development without compromising quality"
    },
    {
      icon: Users,
      title: "Client-Centric",
      description: "Your success is our priority. We work closely with you at every step"
    },
    {
      icon: Award,
      title: "Quality Assured",
      description: "Rigorous testing and best practices guarantee reliable, scalable solutions"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock assistance to keep your operations running smoothly"
    },
    {
      icon: TrendingUp,
      title: "Scalable Solutions",
      description: "Built to grow with your business, from startup to enterprise"
    }
  ];

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
            Why Choose Seekio?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We combine technical excellence with business understanding to deliver exceptional results
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                <reason.icon size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {reason.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
