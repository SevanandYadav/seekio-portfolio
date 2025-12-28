import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import { getContentUrl } from "../../utils/config";

export const Hero = () => {
  const [content, setContent] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    Promise.all([
      fetch(getContentUrl('/hero.json')).then(res => res.json()),
      fetch(getContentUrl('/stats.json')).then(res => res.json())
    ]).then(([heroData, statsData]) => {
      setContent(heroData);
      setStats(statsData.stats);
    });
  }, []);

  if (!content || !stats) return null;
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full mb-8"
          >
            <Sparkles size={16} className="text-blue-600" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{content.badge}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6"
          >
            {content.headline}
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {content.headlineHighlight}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto"
          >
            {content.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/pricing">
              <Button size="lg" className="group">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="inline-block mr-2"
                >
                  <Sparkles size={20} />
                </motion.span>
                {content.primaryCTA}
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" size="lg">
                {content.secondaryCTA}
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {stats.map((stat: any, index: number) => (
            <div key={index}>
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
