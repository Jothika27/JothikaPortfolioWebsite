import { motion } from "framer-motion";
import { Palette } from "lucide-react";
import { Twitter, Instagram, Linkedin } from "lucide-react";

const footerSections = [
  {
    title: "Portfolio",
    links: [
      { label: "Web Design", href: "#" },
      { label: "Mobile Apps", href: "#" },
      { label: "Branding", href: "#" },
      { label: "UI/UX", href: "#" },
    ],
  },
  {
    title: "Case Studies",
    links: [
      { label: "E-commerce", href: "#" },
      { label: "Healthcare", href: "#" },
      { label: "Analytics", href: "#" },
      { label: "Branding", href: "#" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "About Us", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-portfolio-primary text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <Palette className="text-white h-4 w-4" />
              </div>
              <span className="text-xl font-bold">Portfolio Hub</span>
            </div>
            <p className="text-gray-300 mb-6">
              Showcasing the world's best design work and inspiring the next generation of creative professionals.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Linkedin, href: "#" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, backgroundColor: "hsl(var(--accent))" }}
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center transition-colors duration-200"
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-6">{section.title}</h3>
              <ul className="space-y-3 text-gray-300">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a 
                      href={link.href} 
                      className="hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-300"
        >
          <p>&copy; 2024 Portfolio Hub. All rights reserved. Designed with ❤️ for creatives worldwide.</p>
        </motion.div>
      </div>
    </footer>
  );
}
