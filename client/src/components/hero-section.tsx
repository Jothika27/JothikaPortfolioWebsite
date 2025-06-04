import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Rocket, Play } from "lucide-react";
import { fadeInUp, slideIn } from "@/lib/animations";

export default function HeroSection() {
  return (
    <section className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-portfolio-primary leading-tight mb-6">
              Discover 
              <span className="text-accent"> Amazing</span>
              <br />
              Design Work
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Explore a curated collection of stunning portfolio examples with detailed case studies. 
              Get inspired by the world's best designers and their creative processes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-accent text-white hover:bg-accent/90 px-8 py-4 rounded-full text-lg font-medium transform hover:scale-105 transition-all duration-300"
              >
                <Rocket className="mr-2 h-5 w-5" />
                Explore Portfolio
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 text-gray-700 hover:border-accent hover:text-accent px-8 py-4 rounded-full text-lg font-medium transition-all duration-300"
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideIn}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.img 
              src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Modern design workspace" 
              className="rounded-2xl shadow-2xl w-full h-auto transform rotate-2 hover:rotate-0 transition-transform duration-500"
              whileHover={{ rotate: 0, scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
