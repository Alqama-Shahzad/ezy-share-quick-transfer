
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FileDownloader from "@/components/FileDownloader";
import { useToast } from "@/hooks/use-toast";

const Download = () => {
  const { fileId } = useParams<{ fileId: string }>();
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [fileInfo, setFileInfo] = useState({
    fileName: "",
    fileSize: 0,
    pinCode: "",
    downloadUrl: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    // In a real implementation with Supabase, you would fetch the file info from Supabase here
    // For now, we'll just simulate the fetch with a timeout
    const fetchFileInfo = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simulate file data
        // In a real app, this would come from Supabase
        setFileInfo({
          fileName: "sample-document.pdf",
          fileSize: 2.5 * 1024 * 1024, // 2.5MB
          pinCode: "123456", // In a real app, this would be stored securely
          downloadUrl: "#", // In a real app, this would be a Supabase URL
        });
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching file:", error);
        toast({
          title: "Error",
          description: "Could not find the requested file",
          variant: "destructive",
        });
      }
    };

    if (fileId) {
      fetchFileInfo();
    }
  }, [fileId, toast]);

  const handlePinSubmit = async (enteredPin: string) => {
    setVerifying(true);
    
    try {
      // In a real implementation, you would verify the PIN against Supabase
      // For now, we'll just simulate the verification with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (enteredPin === fileInfo.pinCode) {
        setVerified(true);
        toast({
          title: "PIN verified",
          description: "You can now download the file",
        });
      } else {
        toast({
          title: "Invalid PIN",
          description: "The PIN you entered is incorrect",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error verifying PIN:", error);
      toast({
        title: "Error",
        description: "Could not verify PIN",
        variant: "destructive",
      });
    } finally {
      setVerifying(false);
    }
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
      
      <main className="flex-1 container mx-auto flex items-center justify-center p-4">
        {loading ? (
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-ezy-purple border-r-transparent" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <p className="mt-2 text-gray-600">Loading file information...</p>
          </div>
        ) : (
          <FileDownloader
            fileId={fileId || ""}
            fileName={fileInfo.fileName}
            fileSize={fileInfo.fileSize}
            pinCode={fileInfo.pinCode}
            downloadUrl={fileInfo.downloadUrl}
            onPinSubmit={handlePinSubmit}
            loading={verifying}
            verified={verified}
          />
        )}
      </main>
      
      <footer className="py-4 text-center text-sm text-gray-500">
        <p>&copy; 2025 EzyShare. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Download;
