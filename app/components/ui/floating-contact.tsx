import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

export const FloatingContact = () => {
  return (
    <motion.a
      href="https://wa.me/1234567890"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full p-3 md:p-4 shadow-2xl hover:shadow-green-500/50 transition-shadow"
      animate={{
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        <MessageSquare className="w-6 h-6 md:w-7 md:h-7" />
      </motion.div>
      
      <motion.div
        className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        1
      </motion.div>
    </motion.a>
  );
};
