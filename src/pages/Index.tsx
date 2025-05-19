import { useState, useRef, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import FileUploader from "@/components/FileUploader";
import TextInput from "@/components/TextInput";
import QRCodeDisplay from "@/components/QRCodeDisplay";
import { uploadFile, shareText } from "@/lib/fileService";
import { useToast } from "@/hooks/use-toast";
import { FileUploadResponse, TextShareResponse } from "@/lib/types";
import { Flame, Download, Upload, Shield, Sparkles, MessageSquare } from "lucide-react";

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
  const [showUploadInterface, setShowUploadInterface] = useState(false);
  const [uploadResponse, setUploadResponse] = useState<FileUploadResponse | TextShareResponse | null>(null);
  const [isTextMode, setIsTextMode] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Check URL parameters on component mount
  useEffect(() => {
    const showUpload = searchParams.get('showUpload');
    const showText = searchParams.get('showText');
    const showResult = searchParams.get('showResult');
    
    if (showUpload === 'true') {
      setShowUploadInterface(true);
      setIsTextMode(false);
      // Trigger file input dialog after a short delay to ensure component is mounted
      setTimeout(() => {
        if (fileInputRef.current) {
          fileInputRef.current.click();
        }
      }, 500);
    } else if (showText === 'true') {
      setShowUploadInterface(true);
      setIsTextMode(true);
    } else if (showResult === 'true') {
      // Try to restore from session storage if we have upload results
      const savedResponse = sessionStorage.getItem('uploadResponse');
      if (savedResponse) {
        try {
          setUploadResponse(JSON.parse(savedResponse));
          setUploaded(true);
          setShowUploadInterface(true);
          setIsTextMode(sessionStorage.getItem('isTextMode') === 'true');
        } catch (error) {
          console.error('Error restoring upload state:', error);
        }
      }
    }
  }, [searchParams]);

  // Update URL when state changes
  useEffect(() => {
    if (uploaded && uploadResponse) {
      // Save results to session storage for restoration on refresh
      sessionStorage.setItem('uploadResponse', JSON.stringify(uploadResponse));
      sessionStorage.setItem('isTextMode', isTextMode.toString());
      setSearchParams({ showResult: 'true' });
    } else if (showUploadInterface) {
      if (isTextMode) {
        setSearchParams({ showText: 'true' });
      } else {
        setSearchParams({ showUpload: 'true' });
      }
    } else {
      // Clear session storage when returning to homepage
      sessionStorage.removeItem('uploadResponse');
      sessionStorage.removeItem('isTextMode');
      setSearchParams({});
    }
  }, [showUploadInterface, isTextMode, uploaded, uploadResponse, setSearchParams]);

  const handleFileSelected = (selectedFile: File) => {
    setFile(selectedFile);
    setUploaded(false);
    setShowUploadInterface(true);
    setIsTextMode(false);
    setSearchParams({ showUpload: 'true' });
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

  const handleTextSubmit = async (text: string) => {
    setUploading(true);
    
    try {
      toast({
        title: "Sharing text...",
        description: "Please wait while we process your text",
      });
      
      const response = await shareText(text);
      
      setUploadResponse(response);
      setUploaded(true);
      
      toast({
        title: "Text shared successfully!",
        description: "Your text is now ready to be shared",
      });
    } catch (error) {
      console.error("Error sharing text:", error);
      toast({
        title: "Sharing failed",
        description: "There was an error sharing your text. Please try again.",
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
    setIsTextMode(false);
    setSearchParams({ showUpload: 'true' });
    setTimeout(() => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    }, 100);
  };

  const handleShowUploadInterface = () => {
    setShowUploadInterface(true);
    setIsTextMode(false);
    setSearchParams({ showUpload: 'true' });
    // Wait for state to update, then trigger file dialog
    setTimeout(() => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    }, 100);
  };

  const handleShowTextInterface = () => {
    setShowUploadInterface(true);
    setIsTextMode(true);
    setFile(null);
    setSearchParams({ showText: 'true' });
  };

  const returnToHome = () => {
    setFile(null);
    setUploaded(false);
    setUploadResponse(null);
    setShowUploadInterface(false);
    setIsTextMode(false);
    sessionStorage.removeItem('uploadResponse');
    sessionStorage.removeItem('isTextMode');
    navigate('/');
  };

  // If a file is being uploaded or has been uploaded, or if we want to show upload interface, show the upload UI
  if (file || uploaded || showUploadInterface) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-ezyshare-timberwolf/10 to-ezyshare-timberwolf/20 flex flex-col">
        {/* Modern Header with improved logo */}
        <header className="p-4 sm:p-6 flex justify-between items-center container mx-auto">
          <Link to="/" className="flex items-center gap-2" onClick={(e) => {
            e.preventDefault();
            returnToHome();
          }}>
            <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gradient-to-br from-ezyshare-flame to-orange-500 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-all">
              <Flame className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-br from-ezyshare-flame to-orange-500 bg-clip-text text-transparent">
              EzyShare
            </h1>
          </Link>
          
          <button 
            onClick={returnToHome}
            className="text-ezyshare-blackOlive hover:text-ezyshare-flame text-sm sm:text-base flex items-center gap-1 transition-colors"
          >
            ← Return to Home
          </button>
        </header>
        
        <main className="flex-1 container mx-auto flex flex-col items-center justify-center px-4 py-4 sm:py-6">
          <div className="w-full max-w-md space-y-4 sm:space-y-6">
            {!uploaded ? (
              <>
                <div className="glass-card p-4 sm:p-6 rounded-2xl shadow-xl border border-ezyshare-timberwolf/30">
                  <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-ezyshare-eerieBlack">
                    Share Content
                  </h2>
                  
                  <Tabs defaultValue={isTextMode ? "text" : "file"} onValueChange={(value) => {
                    setIsTextMode(value === "text");
                    if (value === "file") {
                      setSearchParams({ showUpload: 'true' });
                      setTimeout(() => {
                        if (fileInputRef.current) {
                          fileInputRef.current.click();
                        }
                      }, 100);
                    } else {
                      setSearchParams({ showText: 'true' });
                    }
                  }}>
                    <TabsList className="w-full mb-4 bg-ezyshare-timberwolf/20 p-1 rounded-xl">
                      <TabsTrigger 
                        value="file" 
                        className="flex-1 data-[state=active]:bg-ezyshare-flame data-[state=active]:text-white transition-all rounded-lg py-2.5"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload File
                      </TabsTrigger>
                      <TabsTrigger 
                        value="text" 
                        className="flex-1 data-[state=active]:bg-ezyshare-flame data-[state=active]:text-white transition-all rounded-lg py-2.5"
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Share Text
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="file" className="mt-0">
                      <FileUploader onFileSelected={handleFileSelected} />
                      
                      {file && (
                        <div className="mt-3 sm:mt-4">
                          <Button
                            onClick={handleUpload}
                            disabled={uploading}
                            className="w-full bg-ezyshare-flame hover:bg-ezyshare-flame/90 hover:text-black text-white shadow-md flex items-center justify-center gap-2 py-4 sm:py-6 mb-3 transition-colors"
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
                          
                          <Button
                            variant="outline"
                            onClick={returnToHome}
                            className="w-full mt-3 border-ezyshare-flame text-ezyshare-flame hover:bg-ezyshare-flame/10 hover:text-black transition-colors"
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
                      
                      {!file && (
                        <p className="text-center text-sm text-ezyshare-blackOlive/70 mt-4">
                          Select a file above or drag and drop to upload
                        </p>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="text" className="mt-0">
                      <TextInput onTextSubmit={handleTextSubmit} isSubmitting={uploading} />
                      
                      <Button
                        variant="outline"
                        onClick={returnToHome}
                        className="w-full mt-3 border-ezyshare-flame text-ezyshare-flame hover:bg-ezyshare-flame/10 hover:text-black transition-colors"
                      >
                        Cancel
                      </Button>
                    </TabsContent>
                  </Tabs>
                </div>
              </>
            ) : uploadResponse && (
              <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl border border-ezyshare-timberwolf/30 animate-fade-in">
                <QRCodeDisplay 
                  downloadUrl={uploadResponse.downloadUrl} 
                  pinCode={uploadResponse.pinCode} 
                  expiresAt={uploadResponse.expiresAt}
                />
                
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6">
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="w-full sm:flex-1 border-ezyshare-flame text-ezyshare-flame hover:bg-ezyshare-flame/10 hover:text-black transition-colors"
                  >
                    {isTextMode ? "Share Another Text" : "Upload Another File"}
                  </Button>
                  
                  <Link to="/receive" className="w-full sm:flex-1">
                    <Button
                      variant="outline"
                      className="w-full border-ezyshare-flame text-ezyshare-flame hover:bg-ezyshare-flame/10 hover:text-black transition-colors"
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
        
        <footer className="py-4 sm:py-6 text-center">
          <p className="text-xs sm:text-sm text-ezyshare-blackOlive mb-1">&copy; 2025 EzyShare. All rights reserved.</p>
          <p className="text-xs text-ezyshare-flame">Created by Alqama-Dev</p>
        </footer>
      </div>
    );
  }

  // Otherwise show the landing page with all sections
  return (
    <div className="min-h-screen flex flex-col bg-ezyshare-floralWhite overflow-x-hidden">
      {/* Modern Header */}
      <header className="bg-white p-3 sm:p-4 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center px-3 sm:px-4">
          <Link 
            to="/" 
            className="flex items-center gap-2"
            onClick={(e) => {
              e.preventDefault();
              returnToHome();
            }}
          >
            <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gradient-to-br from-ezyshare-flame to-orange-500 rounded-xl flex items-center justify-center shadow-md">
              <Flame className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-br from-ezyshare-flame to-orange-500 bg-clip-text text-transparent">
              EzyShare
            </h1>
          </Link>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <Link 
              to="/receive" 
              className="px-2 sm:px-4 py-1.5 sm:py-2 text-ezyshare-blackOlive hover:text-ezyshare-flame transition-colors hidden sm:flex items-center gap-1"
            >
              <Download className="h-4 w-4" />
              Receive
            </Link>
            
            <Button 
              onClick={handleShowUploadInterface}
              className="bg-ezyshare-flame hover:bg-ezyshare-flame/90 text-white"
            >
              <Upload className="mr-2 h-4 w-4" />
              Share Content
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection onUploadClick={handleShowUploadInterface} />
        
        {/* How It Works Section */}
        <HowItWorksSection />
        
        {/* Features Section */}
        <FeaturesSection />
        
        {/* Testimonials Section */}
        <TestimonialsSection />
        
        {/* CTA Section */}
        <CTASection onUploadClick={handleShowUploadInterface} />
      </main>
      
      {/* Footer */}
      <footer className="bg-white py-6 sm:py-8 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="h-8 w-8 bg-gradient-to-br from-ezyshare-flame to-orange-500 rounded-xl flex items-center justify-center shadow-md mr-2">
                <Flame className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-br from-ezyshare-flame to-orange-500 bg-clip-text text-transparent">
                EzyShare
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
              <Link to="/" className="text-sm text-ezyshare-blackOlive hover:text-ezyshare-flame transition-colors">Home</Link>
              <Link to="/receive" className="text-sm text-ezyshare-blackOlive hover:text-ezyshare-flame transition-colors">Receive Files</Link>
              <a href="#features" className="text-sm text-ezyshare-blackOlive hover:text-ezyshare-flame transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm text-ezyshare-blackOlive hover:text-ezyshare-flame transition-colors">How It Works</a>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs sm:text-sm text-ezyshare-blackOlive mb-1">&copy; 2025 EzyShare. All rights reserved.</p>
            <p className="text-xs text-ezyshare-flame">Created by Alqama-Dev</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
