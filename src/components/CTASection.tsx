import React from "react";
import { Link } from "react-router-dom";
import { Upload, Download, ArrowRight } from "lucide-react";

interface CTASectionProps {
  onUploadClick: () => void;
}

const CTASection = ({ onUploadClick }: CTASectionProps) => {
  return (
    <section className="bg-gradient-to-br from-ezyshare-flame to-orange-500 text-white py-20 overflow-hidden">
      <div className="section-container text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to share content the easy way?
        </h2>
        <p className="max-w-2xl mx-auto text-white/90 mb-10 text-lg">
          Start using EzyShare today - no registration, no hassle, just simple and secure sharing.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <button 
            onClick={onUploadClick}
            className="px-8 py-4 bg-white text-ezyshare-eerieBlack rounded-full font-bold flex items-center gap-2 
              shadow-lg hover:shadow-xl hover:bg-ezyshare-floralWhite transition-all"
          >
            <Upload className="h-5 w-5" />
            Share Now
            <ArrowRight className="h-5 w-5 ml-2" />
          </button>
          <Link 
            to="/receive" 
            className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold 
              flex items-center gap-2 hover:bg-white/10 transition-all"
          >
            <Download className="h-5 w-5" />
            Receive Files
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
