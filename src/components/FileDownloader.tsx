import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatFileSize } from "@/lib/fileUtils";
import { 
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Download, File, Lock, Check, ArrowDown, Copy, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FileDownloaderProps {
  fileId: string;
  fileName: string;
  fileSize: number;
  pinCode: string;
  downloadUrl: string;
  onPinSubmit: (pin: string) => void;
  loading: boolean;
  verified: boolean;
  isText?: boolean;
  textContent?: string;
}

const FileDownloader = ({
  fileId,
  fileName,
  fileSize,
  pinCode,
  downloadUrl,
  onPinSubmit,
  loading,
  verified,
  isText = false,
  textContent = "",
}: FileDownloaderProps) => {
  const [pin, setPin] = useState("");
  const { toast } = useToast();

  const handlePinComplete = (value: string) => {
    setPin(value);
    if (value.length === 6) {
      onPinSubmit(value);
    }
  };

  const handleDownload = () => {
    if (downloadUrl && !isText) {
      // Create a temporary anchor element
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName; // Set the download attribute with the filename
      document.body.appendChild(link);
      link.click(); // Trigger the download
      document.body.removeChild(link); // Clean up

      toast({
        title: "Download started",
        description: "Your file is being downloaded",
      });
    }
  };

  const copyTextToClipboard = () => {
    if (textContent) {
      navigator.clipboard.writeText(textContent);
      toast({
        title: "Copied to clipboard",
        description: "Text has been copied to your clipboard",
      });
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg animate-fade-in">
      <CardHeader className="text-center py-4 sm:py-6">
        <CardTitle className="flex items-center justify-center gap-2 text-lg sm:text-xl">
          {isText ? (
            <>
              <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-ezyshare-flame" />
              <span>View Shared Text</span>
            </>
          ) : (
            <>
              <Download className="h-4 w-4 sm:h-5 sm:w-5 text-ezyshare-flame" />
              <span>Download File</span>
            </>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
        <div className="bg-ezyshare-floralWhite p-3 sm:p-4 rounded-lg border border-ezyshare-timberwolf/50">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-ezyshare-flame/20 p-2 flex-shrink-0">
              {isText ? (
                <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-ezyshare-flame" />
              ) : (
                <File className="h-4 w-4 sm:h-5 sm:w-5 text-ezyshare-flame" />
              )}
            </div>
            <div className="overflow-hidden">
              <p className="font-medium text-sm sm:text-base truncate">{isText ? "Text Message" : fileName}</p>
              <p className="text-xs text-ezyshare-blackOlive/70">{isText ? "Shared Text" : formatFileSize(fileSize)}</p>
            </div>
          </div>
        </div>
        
        {!verified ? (
          <div className="glass-card p-3 sm:p-4 rounded-lg bg-white/80 border border-ezyshare-timberwolf/20 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 text-ezyshare-eerieBlack mb-1">
              <Lock className="h-4 w-4 text-ezyshare-flame" />
              <p className="text-sm sm:text-base font-medium">Enter 6-digit PIN to {isText ? "view" : "download"}</p>
            </div>
            
            <div className="max-w-full pb-2 flex justify-center">
              <InputOTP
                maxLength={6}
                value={pin}
                onChange={handlePinComplete}
                disabled={loading}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="h-9 w-9 sm:h-10 sm:w-10 text-sm sm:text-base" />
                  <InputOTPSlot index={1} className="h-9 w-9 sm:h-10 sm:w-10 text-sm sm:text-base" />
                  <InputOTPSlot index={2} className="h-9 w-9 sm:h-10 sm:w-10 text-sm sm:text-base" />
                  <InputOTPSlot index={3} className="h-9 w-9 sm:h-10 sm:w-10 text-sm sm:text-base" />
                  <InputOTPSlot index={4} className="h-9 w-9 sm:h-10 sm:w-10 text-sm sm:text-base" />
                  <InputOTPSlot index={5} className="h-9 w-9 sm:h-10 sm:w-10 text-sm sm:text-base" />
                </InputOTPGroup>
              </InputOTP>
            </div>
            
            <Button
              disabled={loading || pin.length !== 6}
              onClick={() => onPinSubmit(pin)}
              className="w-full bg-ezyshare-flame hover:bg-ezyshare-flame/90 text-white py-2 h-9 sm:h-10 text-sm sm:text-base"
            >
              {loading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent" />
                  Verifying...
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  Verify PIN
                </>
              )}
            </Button>
            
            <p className="text-xs text-center text-ezyshare-blackOlive/70">
              PIN was sent to the person who shared this {isText ? "text" : "file"} with you
            </p>
          </div>
        ) : isText && textContent ? (
          <div className="text-center space-y-4">
            <div className="bg-green-100 text-green-800 p-3 sm:p-4 rounded-lg flex items-center justify-center gap-2">
              <Check className="h-4 w-4 sm:h-5 sm:w-5" />
              <p className="text-sm sm:text-base">PIN verified successfully</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="text-left text-sm sm:text-base whitespace-pre-wrap break-words max-h-60 overflow-y-auto">
                {textContent}
              </div>
            </div>
            
            <Button
              onClick={copyTextToClipboard}
              className="w-full py-3 bg-ezyshare-flame hover:bg-ezyshare-flame/90 gap-2 text-white"
            >
              <Copy className="h-4 w-4 sm:h-5 sm:w-5" />
              Copy Text to Clipboard
            </Button>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="bg-green-100 text-green-800 p-3 sm:p-4 rounded-lg flex items-center justify-center gap-2">
              <Check className="h-4 w-4 sm:h-5 sm:w-5" />
              <p className="text-sm sm:text-base">PIN verified successfully</p>
            </div>
            
            <Button
              onClick={handleDownload}
              className="w-full py-6 bg-ezyshare-flame hover:bg-ezyshare-flame/90 gap-3 text-white text-base sm:text-lg h-auto"
            >
              <ArrowDown className="h-5 w-5 sm:h-6 sm:w-6" />
              Download {formatFileSize(fileSize)}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FileDownloader;
