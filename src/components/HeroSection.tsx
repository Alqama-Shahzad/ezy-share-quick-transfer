
import React from "react";
import { Link } from "react-router-dom";
import { FileIcon, Send, Download, Lock, Shield } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="bg-ezyshare-floralWhite py-12 lg:py-20">
      <div className="section-container">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left content */}
          <div className="flex-1 text-left animate-slide-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-ezyshare-eerieBlack">
              Share files with
              <span className="text-ezyshare-flame block mt-1">ultimate simplicity</span>
            </h1>
            
            <p className="text-ezyshare-blackOlive text-lg md:text-xl max-w-lg mb-8">
              Upload any file up to 25MB and share it instantly with a QR code and PIN.
              No registration required, end-to-end encrypted.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <Link 
                to="/" 
                className="px-6 py-3 rounded-full bg-ezyshare-flame text-white flex items-center gap-2 
                  shadow-lg hover:shadow-xl hover:bg-ezyshare-flame/90 transition-all"
              >
                <Send className="h-5 w-5" />
                Upload File
              </Link>
              <Link 
                to="/receive" 
                className="px-6 py-3 rounded-full bg-white border border-ezyshare-timberwolf 
                  text-ezyshare-eerieBlack flex items-center gap-2 shadow-md hover:bg-ezyshare-timberwolf/20 transition-all"
              >
                <Download className="h-5 w-5" />
                Receive File
              </Link>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-ezyshare-blackOlive">
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
          <div className="flex-1 animate-slide-right">
            <div className="bg-white p-8 rounded-2xl shadow-xl relative">
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-ezyshare-flame rounded-full flex items-center justify-center text-white">
                <FileIcon className="h-8 w-8" />
              </div>
              
              <div className="bg-ezyshare-floralWhite rounded-lg p-4 mb-4 border border-ezyshare-timberwolf">
                <div className="h-6 w-2/3 bg-ezyshare-timberwolf/50 rounded-full mb-2"></div>
                <div className="h-4 w-1/2 bg-ezyshare-timberwolf/30 rounded-full"></div>
              </div>
              
              <div className="flex justify-center mb-4">
                <div className="h-32 w-32 border-4 border-ezyshare-flame/20 rounded-lg flex items-center justify-center">
                  <div className="grid grid-cols-4 grid-rows-4 gap-1">
                    {[...Array(16)].map((_, i) => (
                      <div key={i} className={`h-5 w-5 rounded-sm ${Math.random() > 0.5 ? 'bg-ezyshare-flame' : 'bg-ezyshare-timberwolf/30'}`}></div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="px-6 py-3 bg-ezyshare-flame/90 text-white rounded-lg animate-pulse-slow">
                  <span className="font-mono font-bold">PIN: 1234</span>
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
