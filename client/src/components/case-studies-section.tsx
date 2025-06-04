import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart, Smartphone, BarChart3, Palette } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import type { CaseStudy } from "@shared/schema";
import { Link } from "wouter";

const categoryIcons = {
  "E-commerce": ShoppingCart,
  "Healthcare": Smartphone,
  "Analytics": BarChart3,
  "Branding": Palette,
} as const;

const categoryColors = {
  "E-commerce": "bg-accent",
  "Healthcare": "bg-green-500",
  "Analytics": "bg-purple-500",
  "Branding": "bg-orange-500",
} as const;

export default function CaseStudiesSection() {
  const { data: caseStudies = [], isLoading } = useQuery<CaseStudy[]>({
    queryKey: ["/api/case-studies"],
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-portfolio-primary mb-4">Detailed Case Studies</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-xl animate-pulse">
                <div className="h-48 bg-gray-200 rounded-xl mb-6" />
                <div className="h-4 bg-gray-200 rounded mb-4" />
                <div className="h-4 bg-gray-200 rounded mb-6 w-2/3" />
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="h-16 bg-gray-200 rounded" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="case-studies" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-portfolio-primary mb-4">Detailed Case Studies</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Dive deep into the design process with comprehensive case studies showcasing methodology, challenges, and solutions.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid lg:grid-cols-2 gap-12"
        >
          {caseStudies.map((study) => {
            const IconComponent = categoryIcons[study.category as keyof typeof categoryIcons] || BarChart3;
            const colorClass = categoryColors[study.category as keyof typeof categoryColors] || "bg-accent";
            
            return (
              <motion.div
                key={study.id}
                variants={fadeInUp}
                whileHover={{ scale: 1.02, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)" }}
                className="bg-white rounded-2xl p-8 shadow-xl cursor-pointer group transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 ${colorClass} rounded-xl flex items-center justify-center mr-4`}>
                    <IconComponent className="text-white h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-portfolio-primary">{study.title}</h3>
                    <p className="text-gray-600">{study.subtitle}</p>
                  </div>
                </div>
                
                <motion.img 
                  src={study.imageUrl} 
                  alt={study.title}
                  className="w-full h-48 object-cover rounded-xl mb-6 group-hover:scale-105 transition-transform duration-300"
                />
                
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {study.description}
                </p>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {Object.entries(study.metrics as Record<string, string>).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className={`text-2xl font-bold ${colorClass.replace('bg-', 'text-')}`}>
                        {value}
                      </div>
                      <div className="text-sm text-gray-600">{key}</div>
                    </div>
                  ))}
                </div>
                
                <Link href={`/case-study/${study.id}`}>
                  <Button 
                    className={`w-full ${colorClass} hover:opacity-90 py-3 rounded-xl text-white font-medium transition-all duration-200 group-hover:transform group-hover:scale-105`}
                  >
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Read Full Case Study
                  </Button>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
