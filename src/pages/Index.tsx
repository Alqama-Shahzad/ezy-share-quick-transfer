
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FileUploader from "@/components/FileUploader";
import QRCodeDisplay from "@/components/QRCodeDisplay";
import { uploadFile } from "@/lib/fileService";
import { useToast } from "@/hooks/use-toast";
import { FileUploadResponse } from "@/lib/types";
import { Send, Download, Upload, Shield, Sparkles } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-ezy-gray/30 to-ezy-purple/10 flex flex-col">
      {/* Modern Header with improved logo */}
      <header className="p-6 flex justify-center">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 bg-gradient-to-br from-ezy-purple to-ezy-darkPurple rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-all">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-br from-ezy-purple to-ezy-darkPurple bg-clip-text text-transparent">
            EzyShare
          </h1>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto flex flex-col items-center justify-center px-4 py-6">
        <div className="text-center mb-8 max-w-lg">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-br from-ezy-purple to-ezy-darkPurple bg-clip-text text-transparent">
            Share files with ease
          </h1>
          <p className="text-gray-600 mb-6 text-lg">
            Upload any file (up to 25MB) and share it instantly with a QR code and PIN
          </p>
          
          {!uploaded && (
            <div className="flex justify-center gap-4 mb-6">
              <Link 
                to="/" 
                className={`px-6 py-3 rounded-full flex items-center gap-2 shadow-md transition-all ${
                  !file ? 'bg-ezy-purple text-white' : 'bg-white text-ezy-darkPurple border border-ezy-purple'
                }`}
              >
                <Upload className="h-4 w-4" />
                Upload
              </Link>
              <Link 
                to="/receive" 
                className="px-6 py-3 rounded-full bg-white text-ezy-darkPurple border border-ezy-purple flex items-center gap-2 shadow-md hover:bg-ezy-gray/50 transition-all"
              >
                <Download className="h-4 w-4" />
                Receive
              </Link>
            </div>
          )}
          
          <div className="flex justify-center gap-3 items-center">
            <Shield className="h-4 w-4 text-ezy-purple" />
            <span className="text-sm text-gray-500">End-to-end encrypted transfers</span>
          </div>
        </div>
        
        <div className="w-full max-w-md space-y-6">
          {!uploaded ? (
            <>
              <div className="glass-card p-6 rounded-2xl shadow-xl">
                <FileUploader onFileSelected={handleFileSelected} />
              
                {file && (
                  <div className="mt-4">
                    <Button
                      onClick={handleUpload}
                      disabled={uploading}
                      className="w-full bg-ezy-purple hover:bg-ezy-darkPurple text-white shadow-md flex items-center justify-center gap-2 py-6"
                    >
                      {uploading ? (
                        <>
                          <div className="animate-spin h-4 w-4 border-2 border-white border-r-transparent rounded-full mr-2" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Upload File
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </>
          ) : uploadResponse && (
            <div className="bg-white p-6 rounded-2xl shadow-xl animate-fade-in">
              <QRCodeDisplay 
                downloadUrl={uploadResponse.downloadUrl} 
                pinCode={uploadResponse.pinCode} 
              />
              
              <div className="flex gap-3 mt-6">
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="flex-1 border-ezy-purple text-ezy-purple hover:bg-ezy-purple/10"
                >
                  Upload Another File
                </Button>
                
                <Link to="/receive" className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full border-ezy-purple text-ezy-purple hover:bg-ezy-purple/10"
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
        <p className="text-sm text-gray-500 mb-1">&copy; 2025 EzyShare. All rights reserved.</p>
        <p className="text-xs text-ezy-purple">Created by Alqama-Dev</p>
      </footer>
    </div>
  );
};

export default Index;
