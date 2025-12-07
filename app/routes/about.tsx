import type { Route } from "./+types/about";
import { Navbar } from "../components/layout/navbar";
import { Footer } from "../components/layout/footer";
import { FloatingContact } from "../components/ui/floating-contact";
import { motion } from "framer-motion";
import { Target, Eye, Heart, Users } from "lucide-react";
import { Card } from "../components/ui/card";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About Seekio - Our Mission & Vision" },
    { name: "description", content: "Learn about Seekio's mission to simplify digital transformation for businesses and academic institutions." },
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
              About <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Seekio</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We're on a mission to make digital transformation accessible, efficient, and impactful for every organization
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Who We Are</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                Seekio is a digital transformation company specializing in web-based solutions, business digitization, 
                and academic platform development. We bridge the gap between traditional operations and modern digital ecosystems.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                Founded by a team of experienced engineers and business strategists, we understand the challenges 
                organizations face in today's rapidly evolving digital landscape. Our approach combines technical 
                expertise with business acumen to deliver solutions that truly make a difference.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                From startups to established enterprises, from schools to universities, we've helped hundreds of 
                organizations streamline their operations, enhance their digital presence, and unlock new growth opportunities.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-12 text-white"
            >
              <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
              <p className="text-lg mb-8">
                To simplify digital transformation by delivering innovative, scalable, and user-friendly solutions 
                that empower businesses and academic institutions to thrive in the digital age.
              </p>
              <h3 className="text-3xl font-bold mb-6">Our Vision</h3>
              <p className="text-lg">
                A world where every organization, regardless of size or industry, has access to seamless digital 
                experiences that drive efficiency, growth, and meaningful impact.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
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
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">What We Do</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">
              We specialize in three core areas that drive digital transformation
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <Card hover>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Business Solutions</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Custom web applications</li>
                  <li>• Process automation</li>
                  <li>• Digital workflow optimization</li>
                  <li>• Online presence building</li>
                  <li>• Integration services</li>
                </ul>
              </Card>

              <Card hover>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Academic Platforms</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Teacher management panels</li>
                  <li>• Class scheduling systems</li>
                  <li>• Institute showcase websites</li>
                  <li>• Online fee payment modules</li>
                  <li>• Communication integrations</li>
                </ul>
              </Card>

              <Card hover>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Rapid Application Development</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Rapid app development</li>
                  <li>• Cross-platform solutions</li>
                  <li>• Admin dashboards</li>
                  <li>• Cost-effective builds</li>
                  <li>• Scalable architecture</li>
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
