import React, { useState, useEffect } from "react";
import { 
  Lock, 
  QrCode, 
  Users, 
  Shield, 
  List, 
  Clock 
} from "lucide-react";
import useLazyData from "@/hooks/useLazyData";

const FeaturesSection = () => {
  const [featuresData, setFeaturesData] = useState([
    {
      icon: <QrCode className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-ezyshare-flame" />,
      title: "QR Code Sharing",
      description: "Generate QR codes for easy file sharing across devices"
    },
    {
      icon: <Lock className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-ezyshare-flame" />,
      title: "PIN Protection",
      description: "Secure access with PIN codes that only you and your recipient know"
    },
    {
      icon: <Users className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-ezyshare-flame" />,
      title: "No Registration",
      description: "Start sharing immediately without creating an account"
    },
    {
      icon: <Shield className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-ezyshare-flame" />,
      title: "End-to-End Encryption",
      description: "Files are encrypted during transfer for maximum security"
    },
    {
      icon: <List className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-ezyshare-flame" />,
      title: "Easy to Use",
      description: "Intuitive interface designed for simplicity and efficiency"
    },
    {
      icon: <Clock className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-ezyshare-flame" />,
      title: "24-Hour Expiry",
      description: "Files automatically expire after 24 hours for enhanced security"
    }
  ]);

  // Simulating async data loading with the features data
  const fetchFeatures = async () => {
    return new Promise((resolve) => {
      // Simulate network delay
      setTimeout(() => {
        resolve(featuresData);
      }, 100);
    });
  };

  // Using the lazy data loading hook
  const { data: lazyFeatures, loading, triggerRef } = useLazyData(fetchFeatures, {
    threshold: 0.1,
    rootMargin: '100px 0px',
  });

  return (
    <section className="bg-ezyshare-floralWhite py-10 sm:py-12 md:py-16 overflow-hidden" id="features">
      <div className="section-container px-4 sm:px-6 md:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-center text-ezyshare-eerieBlack">Features That Make a Difference</h2>
        <p className="text-sm sm:text-base md:text-xl text-ezyshare-blackOlive mb-8 sm:mb-12 max-w-2xl mx-auto text-center">
          EzyShare combines security, simplicity, and convenience to give you the best file sharing experience.
        </p>
        
        {/* This div serves as the trigger for lazy loading */}
        <div ref={triggerRef as React.RefObject<HTMLDivElement>} className="h-4"></div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-12 stagger-animation">
          {loading ? (
            // Show skeleton loaders while loading
            Array.from({ length: 6 }).map((_, index) => (
              <div 
                key={index} 
                className="feature-card p-4 sm:p-6 animate-pulse"
              >
                <div className="bg-gray-200 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl mb-3 sm:mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-2/3 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              </div>
            ))
          ) : (
            (lazyFeatures || featuresData).map((feature, index) => (
              <div 
                key={index} 
                className="feature-card p-4 sm:p-6 animate-fade-in hover:border-ezyshare-flame/30 group"
              >
                <div className="bg-ezyshare-flame/10 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-ezyshare-flame/20 transition-all">
                  {feature.icon}
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-ezyshare-eerieBlack">{feature.title}</h3>
                <p className="text-sm sm:text-base text-ezyshare-blackOlive">{feature.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
