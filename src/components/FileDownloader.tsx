
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Lock, File as FileIcon } from "lucide-react";
import { formatFileSize } from "@/lib/fileUtils";
import { useToast } from "@/hooks/use-toast";

interface FileDownloaderProps {
  fileId: string;
  fileName?: string;
  fileSize?: number;
  pinCode: string;
  downloadUrl?: string;
  onPinSubmit: (enteredPin: string) => void;
  loading: boolean;
  verified: boolean;
}

const FileDownloader = ({
  fileId,
  fileName = "File",
  fileSize = 0,
  pinCode,
  downloadUrl,
  onPinSubmit,
  loading,
  verified,
}: FileDownloaderProps) => {
  const [enteredPin, setEnteredPin] = useState("");
  const { toast } = useToast();

  const handlePinSubmit = () => {
    if (enteredPin.length !== 6) {
      toast({
        title: "Invalid PIN",
        description: "Please enter a 6-digit PIN code",
        variant: "destructive",
      });
      return;
    }

    onPinSubmit(enteredPin);
  };

  const handleDownload = () => {
    if (downloadUrl) {
      window.open(downloadUrl, "_blank");
      toast({
        title: "Download started",
        description: "Your file is being downloaded",
      });
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardContent className="pt-6">
        <div className="flex items-center justify-center mb-6">
          <FileIcon className="mr-2 h-5 w-5 text-ezy-purple" />
          <h3 className="text-lg font-semibold">Download File</h3>
        </div>

        <div className="bg-ezy-gray/50 p-4 rounded-lg mb-5">
          <p className="text-sm font-medium mb-2">File Details</p>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-ezy-purple/10 p-2">
              <FileIcon className="h-4 w-4 text-ezy-purple" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-sm truncate">{fileName}</p>
              {fileSize > 0 && (
                <p className="text-xs text-gray-500">{formatFileSize(fileSize)}</p>
              )}
            </div>
          </div>
        </div>

        {!verified ? (
          <div className="space-y-4">
            <div>
              <div className="flex items-center text-sm font-medium mb-2">
                <Lock className="h-4 w-4 mr-1 text-ezy-purple" />
                <span>Enter PIN code to download</span>
              </div>
              <Input
                type="text"
                placeholder="6-digit PIN"
                maxLength={6}
                value={enteredPin}
                onChange={(e) => setEnteredPin(e.target.value.replace(/\D/g, ''))}
                className="text-center text-lg"
              />
            </div>
            <Button
              onClick={handlePinSubmit}
              className="w-full bg-ezy-purple hover:bg-ezy-darkPurple"
              disabled={enteredPin.length !== 6 || loading}
            >
              {loading ? "Verifying..." : "Verify PIN"}
            </Button>
          </div>
        ) : (
          <Button
            onClick={handleDownload}
            className="w-full bg-ezy-purple hover:bg-ezy-darkPurple"
          >
            <Download className="mr-2 h-4 w-4" /> Download File
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default FileDownloader;
