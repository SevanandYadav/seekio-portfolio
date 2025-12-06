import { Link } from "react-router";
import { Mail, MessageSquare, Linkedin, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg"></div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Seekio</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
              Transforming businesses and academic institutions through innovative digital solutions. We simplify complexity and deliver excellence.
            </p>
            <div className="flex space-x-4">
              <a href="mailto:contact@seekio.com" className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-blue-600 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
              <a href="https://wa.me/1234567890" className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-blue-600 hover:text-white transition-colors">
                <MessageSquare size={20} />
              </a>
              <a href="#" className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-blue-600 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-blue-600 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">About Us</Link></li>
              <li><Link to="/services" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Services</Link></li>
              <li><Link to="/portfolio" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Portfolio</Link></li>
              <li><Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 dark:text-gray-400">Digital Solutions</li>
              <li className="text-gray-600 dark:text-gray-400">Business Digitization</li>
              <li className="text-gray-600 dark:text-gray-400">Academic Platforms</li>
              <li className="text-gray-600 dark:text-gray-400">Low-Code Development</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} Seekio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
