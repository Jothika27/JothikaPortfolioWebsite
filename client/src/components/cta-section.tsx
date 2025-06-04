import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Calendar } from "lucide-react";
import { fadeInUp } from "@/lib/animations";

export default function CTASection() {
  return (
    <section className="py-20 gradient-bg text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let's collaborate to create something amazing together. Get in touch to discuss your design needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-white text-accent hover:bg-gray-100 px-8 py-4 rounded-full font-semibold"
              >
                <Mail className="mr-2 h-5 w-5" />
                Start a Project
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-accent px-8 py-4 rounded-full font-semibold transition-all duration-300"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Schedule a Call
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
