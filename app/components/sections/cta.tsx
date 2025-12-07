import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import { getContentUrl } from "../../utils/config";

export const CTA = () => {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    fetch(getContentUrl('/public/content/cta.json'))
      .then(res => res.json())
      .then(data => setContent(data));
  }, []);

  if (!content) return null;

  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-6"
          >
            <Sparkles size={48} className="text-yellow-300" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {content.heading}
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            {content.subheading}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="secondary" size="lg" className="group">
                {content.primaryCTA}
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href={content.whatsappLink}>
              <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
                {content.secondaryCTA}
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
