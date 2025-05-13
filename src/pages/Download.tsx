import { useState, useEffect } from "react";
import { useParams, useSearchParams, Link, useNavigate } from "react-router-dom";
import FileDownloader from "@/components/FileDownloader";
import { useToast } from "@/hooks/use-toast";
import { getFileInfo, verifyFilePin } from "@/lib/fileService";
import { FileShare } from "@/lib/types";
import { Flame, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

const Download = () => {
  const { fileId } = useParams<{ fileId: string }>();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [fileInfo, setFileInfo] = useState<FileShare | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFileInfo = async () => {
      if (!fileId) return;
      
      try {
        setLoading(true);
        const info = await getFileInfo(fileId);
        
        if (info) {
          setFileInfo(info);
          
          // Auto-verify if PIN is in URL
          const pinFromUrl = searchParams.get("pin");
          if (pinFromUrl && pinFromUrl.length === 6) {
            handlePinSubmit(pinFromUrl);
          }
        } else {
          toast({
            title: "Error",
            description: "Could not find the requested file",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching file:", error);
        toast({
          title: "Error",
          description: "Could not find the requested file",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (fileId) {
      fetchFileInfo();
    }
  }, [fileId, searchParams, toast]);

  const handlePinSubmit = async (enteredPin: string) => {
    if (!fileId) return;
    
    setVerifying(true);
    
    try {
      const result = await verifyFilePin(fileId, enteredPin);
      
      if (result.verified) {
        setVerified(true);
        setDownloadUrl(result.downloadUrl);
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
    <div className="min-h-screen bg-gradient-to-br from-white via-ezyshare-timberwolf/10 to-ezyshare-timberwolf/20 flex flex-col">
      <header className="p-4 sm:p-6 flex justify-between items-center container mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gradient-to-br from-ezyshare-flame to-orange-500 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-all">
            <Flame className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-br from-ezyshare-flame to-orange-500 bg-clip-text text-transparent">
            EzyShare
          </h1>
        </Link>
        
        <Button
          variant="outline"
          onClick={() => navigate("/?showUpload=true")}
          className="border-ezyshare-flame text-ezyshare-flame hover:bg-ezyshare-flame/10 hover:text-black transition-colors"
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload a File
        </Button>
      </header>
      
      <main className="flex-1 container mx-auto flex items-center justify-center px-4 py-2 sm:py-4">
        {loading ? (
          <div className="text-center">
            <div className="inline-block h-6 w-6 sm:h-8 sm:w-8 animate-spin rounded-full border-3 sm:border-4 border-solid border-ezyshare-flame border-r-transparent" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <p className="mt-2 text-sm sm:text-base text-ezyshare-blackOlive">Loading file information...</p>
          </div>
        ) : (
          <FileDownloader
            fileId={fileId || ""}
            fileName={fileInfo?.original_name || "Unknown file"}
            fileSize={fileInfo?.size_bytes || 0}
            pinCode={fileInfo?.pin_code || ""}
            downloadUrl={downloadUrl || ""}
            onPinSubmit={handlePinSubmit}
            loading={verifying}
            verified={verified}
          />
        )}
      </main>
      
      <footer className="py-4 sm:py-6 text-center">
        <p className="text-xs sm:text-sm text-ezyshare-blackOlive mb-1">&copy; 2025 EzyShare. All rights reserved.</p>
        <p className="text-xs text-ezyshare-flame">Created by Alqama-Dev</p>
      </footer>
    </div>
  );
};

export default Download;
