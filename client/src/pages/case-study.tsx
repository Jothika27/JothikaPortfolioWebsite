import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { fadeInUp } from "@/lib/animations";
import type { CaseStudy } from "@shared/schema";
import { Link } from "wouter";

export default function CaseStudyPage() {
  const [, params] = useRoute("/case-study/:id");
  const caseStudyId = params?.id ? parseInt(params.id) : null;

  const { data: caseStudy, isLoading, error } = useQuery<CaseStudy>({
    queryKey: [`/api/case-studies/${caseStudyId}`],
    enabled: !!caseStudyId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-16 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-4" />
              <div className="h-64 bg-gray-200 rounded-2xl mb-8" />
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded" />
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !caseStudy) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-16 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Case Study Not Found</h1>
            <p className="text-gray-600 mb-8">The case study you're looking for doesn't exist or has been moved.</p>
            <Link href="/">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-16">
        {/* Header */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <Link href="/">
                <Button variant="ghost" className="mb-8">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Portfolio
                </Button>
              </Link>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-portfolio-primary mb-4">
                {caseStudy.title}
              </h1>
              <p className="text-xl text-gray-600 mb-6">{caseStudy.subtitle}</p>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  {caseStudy.duration}
                </div>
                <div className="flex items-center">
                  <Tag className="mr-2 h-4 w-4" />
                  {caseStudy.category}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              src={caseStudy.imageUrl}
              alt={caseStudy.title}
              className="w-full rounded-2xl shadow-2xl"
            />
          </div>
        </section>

        {/* Content */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="prose prose-lg max-w-none"
            >
              <h2 className="text-3xl font-bold text-portfolio-primary mb-6">Project Overview</h2>
              <p className="text-gray-700 leading-relaxed mb-8">
                {caseStudy.description}
              </p>

              {/* Metrics */}
              <div className="grid md:grid-cols-3 gap-8 my-12 not-prose">
                {Object.entries(caseStudy.metrics as Record<string, string>).map(([key, value]) => (
                  <motion.div
                    key={key}
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-6 bg-gray-50 rounded-2xl"
                  >
                    <div className="text-3xl font-bold text-accent mb-2">{value}</div>
                    <div className="text-gray-600">{key}</div>
                  </motion.div>
                ))}
              </div>

              <h2 className="text-3xl font-bold text-portfolio-primary mb-6">Design Process</h2>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {caseStudy.content}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl font-bold text-portfolio-primary mb-4">
                Interested in working together?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Let's discuss how we can bring your vision to life.
              </p>
              <Button size="lg" className="bg-accent text-white hover:bg-accent/90 px-8 py-4 rounded-full">
                Start Your Project
              </Button>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
