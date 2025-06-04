import { motion } from "framer-motion";
import { Search, Lightbulb, PenTool, Rocket } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const processSteps = [
  {
    icon: Search,
    title: "Research",
    description: "Understanding user needs, market analysis, and competitive research to inform design decisions.",
    color: "bg-accent",
  },
  {
    icon: Lightbulb,
    title: "Ideation",
    description: "Brainstorming creative solutions, sketching concepts, and exploring different design directions.",
    color: "bg-green-500",
  },
  {
    icon: PenTool,
    title: "Design",
    description: "Creating wireframes, prototypes, and high-fidelity designs with attention to detail and usability.",
    color: "bg-purple-500",
  },
  {
    icon: Rocket,
    title: "Launch",
    description: "Testing, refinement, and successful deployment with ongoing optimization and support.",
    color: "bg-orange-500",
  },
];

export default function ProcessSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-portfolio-primary mb-4">Our Design Process</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A systematic approach to creating exceptional user experiences through research-driven design.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              className="text-center group"
            >
              <motion.div
                className={`w-20 h-20 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                whileHover={{ rotate: 5 }}
              >
                <step.icon className="text-white h-8 w-8" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-4 text-portfolio-primary">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
