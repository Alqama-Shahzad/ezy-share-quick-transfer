import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode, Copy, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import QRCode from 'qrcode';

interface QRCodeDisplayProps {
  downloadUrl: string;
  pinCode: string;
  expiresAt?: string;
}

const QRCodeDisplay = ({ downloadUrl, pinCode, expiresAt }: QRCodeDisplayProps) => {
  const { toast } = useToast();
  const [qrSize, setQrSize] = useState(200);
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  // Create a URL that includes the PIN code
  const directDownloadUrl = `${downloadUrl}?pin=${pinCode}`;

  // Format expiration time
  useEffect(() => {
    if (expiresAt) {
      // Update time remaining every minute
      const updateTimeRemaining = () => {
        const now = new Date();
        const expiryDate = new Date(expiresAt);
        const diffMs = expiryDate.getTime() - now.getTime();
        
        if (diffMs <= 0) {
          setTimeRemaining("Expired");
          return;
        }
        
        const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        
        if (diffHrs > 0) {
          setTimeRemaining(`${diffHrs} hr ${diffMins} min`);
        } else {
          setTimeRemaining(`${diffMins} min`);
        }
      };
      
      updateTimeRemaining();
      const interval = setInterval(updateTimeRemaining, 60000); // Update every minute
      
      return () => clearInterval(interval);
    }
  }, [expiresAt]);

  // Handle responsive QR code size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 375) {
        setQrSize(160);
      } else if (window.innerWidth < 640) {
        setQrSize(180);
      } else {
        setQrSize(200);
      }
    };

    handleResize(); // Set initial size
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Generate QR code as an image data URL
  useEffect(() => {
    if (!downloadUrl) return;
    
    setIsLoading(true);
    
    try {
      // Generate QR code as data URL
      QRCode.toDataURL(directDownloadUrl, {
        width: qrSize,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
        errorCorrectionLevel: 'H'
      })
        .then(url => {
          setQrCodeUrl(url);
          setIsLoading(false);
        })
        .catch(err => {
          console.error("QR Code generation error:", err);
          setIsLoading(false);
        });
    } catch (error) {
      console.error("Exception generating QR code:", error);
      setIsLoading(false);
    }
  }, [directDownloadUrl, qrSize, downloadUrl]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Link has been copied to clipboard",
    });
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardContent className="flex flex-col items-center pt-4 sm:pt-6 px-3 sm:px-6">
        <div className="flex items-center justify-center mb-3 sm:mb-4">
          <QrCode className="mr-2 h-4 sm:h-5 w-4 sm:w-5 text-ezyshare-flame" />
          <h3 className="text-base sm:text-lg font-semibold">Share your file</h3>
        </div>

        <div className="bg-white p-3 sm:p-4 rounded-lg shadow-inner w-fit mx-auto mb-2">
          {isLoading ? (
            <div 
              style={{ width: qrSize, height: qrSize }}
              className="flex items-center justify-center bg-gray-50"
            >
              <div className="animate-spin h-10 w-10 border-4 border-ezyshare-flame border-r-transparent rounded-full" />
            </div>
          ) : qrCodeUrl ? (
            <img 
              src={qrCodeUrl} 
              alt="QR Code for download" 
              width={qrSize} 
              height={qrSize}
              className="mx-auto"
            />
          ) : (
            <div 
              style={{ width: qrSize, height: qrSize }}
              className="flex flex-col items-center justify-center bg-red-50 text-red-500"
            >
              <QrCode className="h-10 w-10 mb-2" />
              <p className="text-xs text-center">Could not generate QR code</p>
            </div>
          )}
          <p className="text-xs text-center text-gray-500 mt-2">
            PIN included in QR code for direct download
          </p>
        </div>

        {expiresAt && (
          <div className="w-full bg-amber-50 border border-amber-200 p-2 rounded-lg mt-2 mb-2">
            <div className="flex items-center justify-center gap-1 text-amber-700">
              <Clock className="h-3 w-3" />
              <p className="text-xs font-medium">
                Expires in {timeRemaining} (24h limit)
              </p>
            </div>
          </div>
        )}

        <div className="mt-3 sm:mt-4 w-full">
          <div className="bg-ezyshare-floralWhite p-3 sm:p-4 rounded-lg mb-2 sm:mb-3">
            <p className="text-xs sm:text-sm font-medium mb-1">PIN Code</p>
            <div className="flex items-center justify-between">
              <div className="flex gap-1 sm:gap-2">
                {pinCode.split('').map((digit, index) => (
                  <span 
                    key={index} 
                    className="bg-white w-6 sm:w-8 h-8 sm:h-10 flex items-center justify-center rounded-md shadow-sm text-base sm:text-lg font-bold text-ezyshare-flame"
                  >
                    {digit}
                  </span>
                ))}
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => copyToClipboard(pinCode)}
                className="hover:bg-ezyshare-flame/10 hover:text-black transition-colors"
              >
                <Copy className="h-4 w-4 text-ezyshare-flame hover:text-black transition-colors" />
              </Button>
            </div>
          </div>

          <div className="bg-ezyshare-floralWhite p-3 sm:p-4 rounded-lg mb-3 sm:mb-4">
            <p className="text-xs sm:text-sm font-medium mb-1">Download Link</p>
            <div className="flex items-center justify-between">
              <p className="text-xs truncate max-w-[150px] sm:max-w-[230px]">{downloadUrl}</p>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => copyToClipboard(downloadUrl)}
                className="hover:bg-ezyshare-flame/10 hover:text-black transition-colors"
              >
                <Copy className="h-4 w-4 text-ezyshare-flame hover:text-black transition-colors" />
              </Button>
            </div>
          </div>

          <Button 
            onClick={() => copyToClipboard(directDownloadUrl)} 
            className="w-full bg-ezyshare-flame hover:bg-ezyshare-flame/90 hover:text-black text-xs sm:text-sm py-2 sm:py-3 transition-colors"
          >
            <Copy className="mr-1 sm:mr-2 h-3 sm:h-4 w-3 sm:w-4" /> Copy Direct Download Link
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QRCodeDisplay;
