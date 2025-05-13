
import React from "react";
import { 
  Lock, 
  QrCode, 
  Users, 
  Shield, 
  List, 
  Clock 
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <QrCode className="h-8 w-8 text-ezyshare-flame" />,
      title: "QR Code Sharing",
      description: "Generate QR codes for easy file sharing across devices"
    },
    {
      icon: <Lock className="h-8 w-8 text-ezyshare-flame" />,
      title: "PIN Protection",
      description: "Secure access with PIN codes that only you and your recipient know"
    },
    {
      icon: <Users className="h-8 w-8 text-ezyshare-flame" />,
      title: "No Registration",
      description: "Start sharing immediately without creating an account"
    },
    {
      icon: <Shield className="h-8 w-8 text-ezyshare-flame" />,
      title: "End-to-End Encryption",
      description: "Files are encrypted during transfer for maximum security"
    },
    {
      icon: <List className="h-8 w-8 text-ezyshare-flame" />,
      title: "Easy to Use",
      description: "Intuitive interface designed for simplicity and efficiency"
    },
    {
      icon: <Clock className="h-8 w-8 text-ezyshare-flame" />,
      title: "7-Day Expiry",
      description: "Files automatically expire after 7 days for added security"
    }
  ];

  return (
    <section className="bg-ezyshare-floralWhite py-16" id="features">
      <div className="section-container">
        <h2 className="section-title text-center">Features That Make a Difference</h2>
        <p className="section-subtitle text-center">
          EzyShare combines security, simplicity, and convenience to give you the best file sharing experience.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 stagger-animation">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card animate-fade-in hover:border-ezyshare-flame/30 group"
            >
              <div className="bg-ezyshare-flame/10 w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:bg-ezyshare-flame/20 transition-all">
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-2 text-ezyshare-eerieBlack">{feature.title}</h3>
              <p className="text-ezyshare-blackOlive">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
