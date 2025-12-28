import type { Route } from "./+types/about";
import { Navbar } from "../components/layout/navbar";
import { Footer } from "../components/layout/footer";
import { FloatingContact } from "../components/ui/floating-contact";
import { motion } from "framer-motion";
import { Target, Eye, Heart, Users } from "lucide-react";
import { Card } from "../components/ui/card";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About Seekio Campus Solutions® - Academic Management Platform" },
    { name: "description", content: "Learn about Seekio Campus Solutions' mission to transform educational institutions with comprehensive academic management systems." },
  ];
}

export default function About() {
  const values = [
    {
      icon: Target,
      title: "Innovation",
      description: "We constantly explore new technologies and methodologies to deliver cutting-edge solutions"
    },
    {
      icon: Heart,
      title: "Client Success",
      description: "Your growth and success drive everything we do. We're invested in your journey"
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "We work as an extension of your team, fostering transparent communication"
    },
    {
      icon: Eye,
      title: "Excellence",
      description: "We maintain the highest standards in code quality, design, and delivery"
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
              About <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Seekio Campus Solutions®</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We're on a mission to transform educational institutions with comprehensive academic management solutions
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Who We Are</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                Seekio Campus Solutions® is a specialized academic management platform designed for schools, colleges, 
                and universities. We focus exclusively on transforming educational institutions through comprehensive 
                digital solutions that streamline academic operations.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                Founded by a team of experienced educators and technology experts, we understand the unique challenges 
                that educational institutions face in managing students, faculty, and administrative processes. Our 
                platform combines pedagogical expertise with cutting-edge technology.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                From small schools to large universities, we've helped hundreds of educational institutions 
                modernize their operations, improve student outcomes, and enhance the overall academic experience 
                for all stakeholders.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-12 text-white"
            >
              <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
              <p className="text-lg mb-8">
                To empower educational institutions with innovative academic management solutions that enhance 
                learning outcomes, streamline administrative processes, and foster better communication between 
                students, faculty, and parents.
              </p>
              <h3 className="text-3xl font-bold mb-6">Our Vision</h3>
              <p className="text-lg">
                A world where every educational institution has access to modern, efficient, and user-friendly 
                academic management systems that support excellence in education and institutional growth.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                    <value.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">What We Do</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">
              We specialize in comprehensive academic management solutions for educational institutions
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <Card hover>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Student Management</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Student enrollment & records</li>
                  <li>• Attendance tracking</li>
                  <li>• Grade management</li>
                  <li>• Parent communication</li>
                  <li>• Progress reporting</li>
                </ul>
              </Card>

              <Card hover>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Faculty & Administration</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Teacher management panels</li>
                  <li>• Class scheduling systems</li>
                  <li>• Curriculum planning</li>
                  <li>• Resource allocation</li>
                  <li>• Administrative dashboards</li>
                </ul>
              </Card>

              <Card hover>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Financial & Communication</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Online fee payment systems</li>
                  <li>• Financial reporting</li>
                  <li>• SMS & email integration</li>
                  <li>• WhatsApp notifications</li>
                  <li>• Institute showcase websites</li>
                </ul>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <FloatingContact />
    </>
  );
}
