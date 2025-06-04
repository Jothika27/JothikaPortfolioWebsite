import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { staggerContainer, fadeInUp, portfolioItemHover } from "@/lib/animations";
import type { PortfolioItem } from "@shared/schema";

interface PortfolioGalleryProps {
  onItemClick?: (item: PortfolioItem) => void;
}

export default function PortfolioGallery({ onItemClick }: PortfolioGalleryProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const { data: portfolioItems = [], isLoading } = useQuery<PortfolioItem[]>({
    queryKey: ["/api/portfolio"],
  });

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web Design" },
    { id: "mobile", label: "Mobile Apps" },
    { id: "branding", label: "Branding" },
    { id: "ui", label: "UI/UX" },
  ];

  const filteredItems = activeFilter === "all" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-portfolio-primary mb-4">Featured Portfolio</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse through carefully selected design projects showcasing creativity, innovation, and excellence.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse rounded-2xl h-80" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-portfolio-primary mb-4">Featured Portfolio</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse through carefully selected design projects showcasing creativity, innovation, and excellence.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={fadeInUp}>
              <Button
                onClick={() => setActiveFilter(category.id)}
                variant={activeFilter === category.id ? "default" : "outline"}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  activeFilter === category.id
                    ? "bg-accent text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.label}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                variants={fadeInUp}
                whileHover="hover"
                className="portfolio-item bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer group"
                onClick={() => onItemClick?.(item)}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <motion.img 
                    src={item.imageUrl} 
                    alt={item.title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      className="glass-effect text-white px-6 py-3 rounded-full"
                    >
                      <Eye className="inline mr-2 h-4 w-4" />
                      View Project
                    </motion.div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-portfolio-primary">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-accent font-medium capitalize">{item.category}</span>
                    <div className="flex space-x-2">
                      {item.colors.map((color, index) => (
                        <div 
                          key={index}
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
