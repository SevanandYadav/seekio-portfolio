import { motion } from "framer-motion";

export const TechStack = () => {
  const technologies = [
    { name: "React", category: "Frontend" },
    { name: "Node.js", category: "Backend" },
    { name: "TypeScript", category: "Language" },
    { name: "Python", category: "Backend" },
    { name: "AWS", category: "Cloud" },
    { name: "Docker", category: "DevOps" },
    { name: "PostgreSQL", category: "Database" },
    { name: "MongoDB", category: "Database" },
    { name: "Next.js", category: "Framework" },
    { name: "TailwindCSS", category: "Styling" },
    { name: "Bubble.io", category: "Low-Code" },
    { name: "Zapier", category: "Automation" }
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
            Technology Stack
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We leverage cutting-edge technologies to build robust, scalable solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {tech.name}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {tech.category}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
