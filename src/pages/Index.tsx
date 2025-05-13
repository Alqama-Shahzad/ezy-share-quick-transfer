
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FileUploader from "@/components/FileUploader";
import QRCodeDisplay from "@/components/QRCodeDisplay";
import { uploadFile } from "@/lib/fileService";
import { useToast } from "@/hooks/use-toast";
import { FileUploadResponse } from "@/lib/types";
import { Flame, Download, Upload, Shield, Sparkles } from "lucide-react";

// Import our section components
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [uploadResponse, setUploadResponse] = useState<FileUploadResponse | null>(null);
  const { toast } = useToast();

  const handleFileSelected = (selectedFile: File) => {
    setFile(selectedFile);
    setUploaded(false);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    
    try {
      toast({
        title: "Uploading file...",
        description: "Please wait while we upload your file",
      });
      
      const response = await uploadFile(file);
      
      setUploadResponse(response);
      setUploaded(true);
      
      toast({
        title: "Upload successful!",
        description: "Your file has been uploaded successfully",
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setUploaded(false);
    setUploadResponse(null);
  };

  // If a file is being uploaded or has been uploaded, show the upload UI
  if (file || uploaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-ezyshare-timberwolf/10 to-ezyshare-timberwolf/20 flex flex-col">
        {/* Modern Header with improved logo */}
        <header className="p-6 flex justify-center">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 bg-gradient-to-br from-ezyshare-flame to-orange-500 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-all">
              <Flame className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-br from-ezyshare-flame to-orange-500 bg-clip-text text-transparent">
              EzyShare
            </h1>
          </div>
        </header>
        
        <main className="flex-1 container mx-auto flex flex-col items-center justify-center px-4 py-6">
          <div className="w-full max-w-md space-y-6">
            {!uploaded ? (
              <>
                <div className="glass-card p-6 rounded-2xl shadow-xl border border-ezyshare-timberwolf/30">
                  <h2 className="text-2xl font-bold mb-4 text-ezyshare-eerieBlack">Upload Your File</h2>
                  <FileUploader onFileSelected={handleFileSelected} />
                
                  {file && (
                    <div className="mt-4">
                      <Button
                        onClick={handleUpload}
                        disabled={uploading}
                        className="w-full bg-ezyshare-flame hover:bg-ezyshare-flame/90 text-white shadow-md flex items-center justify-center gap-2 py-6"
                      >
                        {uploading ? (
                          <>
                            <div className="animate-spin h-4 w-4 border-2 border-white border-r-transparent rounded-full mr-2" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="h-4 w-4" />
                            Upload File
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </>
            ) : uploadResponse && (
              <div className="bg-white p-6 rounded-2xl shadow-xl border border-ezyshare-timberwolf/30 animate-fade-in">
                <QRCodeDisplay 
                  downloadUrl={uploadResponse.downloadUrl} 
                  pinCode={uploadResponse.pinCode} 
                />
                
                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="flex-1 border-ezyshare-flame text-ezyshare-flame hover:bg-ezyshare-flame/10"
                  >
                    Upload Another File
                  </Button>
                  
                  <Link to="/receive" className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full border-ezyshare-flame text-ezyshare-flame hover:bg-ezyshare-flame/10"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Receive Files
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </main>
        
        <footer className="py-6 text-center">
          <p className="text-sm text-ezyshare-blackOlive mb-1">&copy; 2025 EzyShare. All rights reserved.</p>
          <p className="text-xs text-ezyshare-flame">Created by Alqama-Dev</p>
        </footer>
      </div>
    );
  }

  // Otherwise show the landing page with all sections
  return (
    <div className="min-h-screen flex flex-col bg-ezyshare-floralWhite">
      {/* Modern Header */}
      <header className="bg-white p-4 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 bg-gradient-to-br from-ezyshare-flame to-orange-500 rounded-xl flex items-center justify-center shadow-md">
              <Flame className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-br from-ezyshare-flame to-orange-500 bg-clip-text text-transparent">
              EzyShare
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Link 
              to="/receive" 
              className="px-4 py-2 text-ezyshare-blackOlive hover:text-ezyshare-flame transition-colors hidden md:flex items-center gap-1"
            >
              <Download className="h-4 w-4" />
              Receive
            </Link>
            <Link 
              to="/" 
              onClick={(e) => { 
                e.preventDefault();
                if (fileInputRef && fileInputRef.current) {
                  fileInputRef.current.click();
                }
              }}
              className="px-5 py-2 bg-ezyshare-flame text-white rounded-full flex items-center gap-1 hover:bg-ezyshare-flame/90 transition-colors"
            >
              <Upload className="h-4 w-4" />
              Upload
            </Link>
          </div>
        </div>
      </header>
      
      {/* Hidden file input for header upload button */}
      <input 
        type="file" 
        id="fileInputRef"
        ref={(el) => {
          // @ts-ignore - We're setting a global reference to access from click handler
          window.fileInputRef = el;
        }}
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileSelected(e.target.files[0]);
          }
        }}
      />
      
      {/* Landing Page Sections */}
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      
      {/* Footer */}
      <footer className="bg-ezyshare-eerieBlack text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-10 w-10 bg-gradient-to-br from-ezyshare-flame to-orange-500 rounded-xl flex items-center justify-center">
                <Flame className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">EzyShare</h2>
            </div>
            
            <div className="flex flex-wrap gap-4 md:gap-8 mb-8 justify-center">
              <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="text-white/80 hover:text-white transition-colors">Home</a>
              <Link to="/receive" className="text-white/80 hover:text-white transition-colors">Receive Files</Link>
              <a href="#features" onClick={(e) => { e.preventDefault(); document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' }) }} className="text-white/80 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" onClick={(e) => { e.preventDefault(); document.querySelector('#how-it-works')?.scrollIntoView({ behavior: 'smooth' }) }} className="text-white/80 hover:text-white transition-colors">How It Works</a>
            </div>
            
            <div className="flex items-center gap-2 mb-2 text-white/80">
              <Shield className="h-4 w-4 text-ezyshare-flame" />
              <span>Secure, End-to-End Encrypted File Transfers</span>
            </div>
            
            <p className="text-white/60 mb-1">&copy; 2025 EzyShare. All rights reserved.</p>
            <p className="text-ezyshare-flame">Created by Alqama-Dev</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
