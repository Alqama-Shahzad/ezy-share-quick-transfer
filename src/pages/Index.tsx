
import { useState } from "react";
import { Button } from "@/components/ui/button";
import FileUploader from "@/components/FileUploader";
import QRCodeDisplay from "@/components/QRCodeDisplay";
import { uploadFile } from "@/lib/fileService";
import { useToast } from "@/hooks/use-toast";
import { FileUploadResponse } from "@/lib/types";

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
    <div className="min-h-screen bg-gradient-radial from-white to-ezy-gray flex flex-col">
      <header className="p-6 flex justify-center">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-ezy-purple rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">E</span>
          </div>
          <h1 className="text-2xl font-bold text-ezy-darkBackground">EzyShare</h1>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto flex flex-col items-center justify-center px-4 py-6">
        <div className="text-center mb-8 max-w-md">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-br from-ezy-purple to-ezy-darkPurple bg-clip-text text-transparent">
            Share files with ease
          </h1>
          <p className="text-gray-600">
            Upload any file (up to 25MB) and share it instantly with a QR code and PIN
          </p>
        </div>
        
        <div className="w-full max-w-md space-y-6">
          {!uploaded ? (
            <>
              <FileUploader onFileSelected={handleFileSelected} />
              
              {file && (
                <Button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="w-full bg-ezy-purple hover:bg-ezy-darkPurple"
                >
                  {uploading ? "Uploading..." : "Upload File"}
                </Button>
              )}
            </>
          ) : uploadResponse && (
            <>
              <QRCodeDisplay 
                downloadUrl={uploadResponse.downloadUrl} 
                pinCode={uploadResponse.pinCode} 
              />
              
              <Button
                onClick={handleReset}
                variant="outline"
                className="w-full"
              >
                Upload Another File
              </Button>
            </>
          )}
        </div>
      </main>
      
      <footer className="py-4 text-center text-sm text-gray-500">
        <p>&copy; 2025 EzyShare. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
