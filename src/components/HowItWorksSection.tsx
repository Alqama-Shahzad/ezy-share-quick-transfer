import React from "react";
import { Upload, QrCode, Download } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: <Upload className="h-12 w-12 text-ezyshare-flame" />,
      title: "Upload Your File",
      description: "Select or drag & drop any file up to 25MB. Our system will securely encrypt it."
    },
    {
      icon: <QrCode className="h-12 w-12 text-ezyshare-flame" />,
      title: "Get QR Code & PIN",
      description: "Receive a unique QR code and PIN for your file. Share these with the intended recipient."
    },
    {
      icon: <Download className="h-12 w-12 text-ezyshare-flame" />,
      title: "Download Securely",
      description: "Recipient scans the QR code and enters the PIN to access and download the file."
    }
  ];

  return (
    <section className="bg-white py-16 overflow-hidden" id="how-it-works">
      <div className="section-container">
        <h2 className="section-title text-center">How It Works</h2>
        <p className="section-subtitle text-center">
          Sharing files shouldn't be complicated. EzyShare makes the process simple and secure in just three easy steps.
        </p>
        
        <div className="flex flex-col md:flex-row gap-8 mt-12 stagger-animation">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="flex-1 bg-ezyshare-floralWhite p-6 rounded-xl shadow-md animate-fade-in relative"
            >
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center shadow-md mx-auto mb-6">
                {step.icon}
              </div>
              
              <div className="relative mb-8">
                <h3 className="text-2xl font-bold mb-2 text-center text-ezyshare-eerieBlack">{step.title}</h3>
                <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-ezyshare-flame/30"></div>
              </div>
              
              <p className="text-center text-ezyshare-blackOlive">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 z-10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#EB5E28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
