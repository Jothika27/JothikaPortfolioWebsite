import { useState } from "react";
import Navigation from "@/components/navigation";
import PortfolioGallery from "@/components/portfolio-gallery";
import Footer from "@/components/footer";
import Lightbox from "@/components/lightbox";
import type { PortfolioItem } from "@shared/schema";

export default function Portfolio() {
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
      <div className="pt-16">
        <PortfolioGallery onItemClick={handlePortfolioItemClick} />
      </div>
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
