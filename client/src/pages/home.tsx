import { useState } from "react";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import PortfolioGallery from "@/components/portfolio-gallery";
import CaseStudiesSection from "@/components/case-studies-section";
import ProcessSection from "@/components/process-section";
import CTASection from "@/components/cta-section";
import Footer from "@/components/footer";
import Lightbox from "@/components/lightbox";
import type { PortfolioItem } from "@shared/schema";

export default function Home() {
  const [lightboxData, setLightboxData] = useState<{
    isOpen: boolean;
    imageUrl: string;
    imageAlt: string;
  }>({
    isOpen: false,
    imageUrl: "",
    imageAlt: "",
  });

  const handlePortfolioItemClick = (item: PortfolioItem) => {
    setLightboxData({
      isOpen: true,
      imageUrl: item.imageUrl,
      imageAlt: item.title,
    });
  };

  const closeLightbox = () => {
    setLightboxData(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <PortfolioGallery onItemClick={handlePortfolioItemClick} />
      <CaseStudiesSection />
      <ProcessSection />
      <CTASection />
      <Footer />
      
      <Lightbox
        isOpen={lightboxData.isOpen}
        imageUrl={lightboxData.imageUrl}
        imageAlt={lightboxData.imageAlt}
        onClose={closeLightbox}
      />
    </div>
  );
}
