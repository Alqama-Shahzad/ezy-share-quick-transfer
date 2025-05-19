import React from "react";
import { Link } from "react-router-dom";
import { FileIcon, Send, Download, Lock, Shield, MessageSquare } from "lucide-react";

interface HeroSectionProps {
  onUploadClick: () => void;
  onTextClick?: () => void;
}

const HeroSection = ({ onUploadClick }: HeroSectionProps) => {
  return (
    <section className="bg-ezyshare-floralWhite py-8 sm:py-12 lg:py-20 overflow-hidden" id="hero">
      <div className="section-container px-4 sm:px-6 md:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left content */}
          <div className="flex-1 text-center lg:text-left animate-slide-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-ezyshare-eerieBlack">
              Share files & text with
              <span className="text-ezyshare-flame block mt-1">ultimate simplicity</span>
            </h1>
            
            <p className="text-ezyshare-blackOlive text-base sm:text-lg md:text-xl max-w-lg mx-auto lg:mx-0 mb-6 sm:mb-8">
              Upload files up to 25MB or share text messages instantly with a QR code and PIN.
              No registration required, end-to-end encrypted. All files expire after 24 hours.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start flex-wrap gap-4 mb-6 sm:mb-8">
              <button 
                onClick={onUploadClick}
                className="px-5 sm:px-6 py-3 rounded-full bg-ezyshare-flame text-white flex items-center justify-center sm:justify-start gap-2 
                  shadow-lg hover:shadow-xl hover:bg-ezyshare-flame/90 transition-all w-full sm:w-auto"
              >
                <Send className="h-5 w-5" />
                Share Content
              </button>
              <Link 
                to="/receive" 
                className="px-5 sm:px-6 py-3 rounded-full bg-white border border-ezyshare-timberwolf 
                  text-ezyshare-eerieBlack flex items-center justify-center sm:justify-start gap-2 shadow-md hover:bg-ezyshare-timberwolf/20 transition-all w-full sm:w-auto"
              >
                <Download className="h-5 w-5" />
                Receive Files
              </Link>
            </div>
            
            <div className="flex items-center justify-center lg:justify-start gap-4 text-sm text-ezyshare-blackOlive">
              <div className="flex items-center gap-1">
                <Shield className="h-4 w-4 text-ezyshare-flame" />
                <span>Encrypted</span>
              </div>
              <div className="flex items-center gap-1">
                <Lock className="h-4 w-4 text-ezyshare-flame" />
                <span>Secure</span>
              </div>
            </div>
          </div>
          
          {/* Right content - Illustration */}
          <div className="flex-1 animate-slide-right mt-8 lg:mt-0 max-w-[90%] sm:max-w-[70%] md:max-w-[60%] lg:max-w-full mx-auto">
            <div className="bg-white p-5 sm:p-8 rounded-2xl shadow-xl relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 sm:w-16 sm:h-16 bg-ezyshare-flame rounded-full flex items-center justify-center text-white">
                <FileIcon className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              
              <div className="bg-ezyshare-floralWhite rounded-lg p-3 sm:p-4 mb-4 border border-ezyshare-timberwolf">
                <div className="h-4 sm:h-6 w-2/3 bg-ezyshare-timberwolf/50 rounded-full mb-2"></div>
                <div className="h-3 sm:h-4 w-1/2 bg-ezyshare-timberwolf/30 rounded-full"></div>
              </div>
              
              <div className="flex justify-center mb-4">
                <div className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-ezyshare-flame/20 rounded-lg flex items-center justify-center">
                  <div className="grid grid-cols-4 grid-rows-4 gap-1">
                    {[...Array(16)].map((_, i) => (
                      <div key={i} className={`h-4 sm:h-5 w-4 sm:w-5 rounded-sm ${Math.random() > 0.5 ? 'bg-ezyshare-flame' : 'bg-ezyshare-timberwolf/30'}`}></div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="px-4 sm:px-6 py-2 sm:py-3 bg-ezyshare-flame/90 text-white rounded-lg animate-pulse-slow">
                  <span className="font-mono font-bold text-sm sm:text-base">PIN: 1234</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
