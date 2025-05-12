
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode, Download, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useRef } from "react";
import QRCode from 'qrcode';

interface QRCodeDisplayProps {
  downloadUrl: string;
  pinCode: string;
}

const QRCodeDisplay = ({ downloadUrl, pinCode }: QRCodeDisplayProps) => {
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && downloadUrl) {
      QRCode.toCanvas(
        canvasRef.current,
        downloadUrl,
        {
          width: 200,
          margin: 2,
          color: {
            dark: '#7E69AB',
            light: '#ffffff',
          },
        },
        (error) => {
          if (error) console.error("Error generating QR Code", error);
        }
      );
    }
  }, [downloadUrl]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Link has been copied to clipboard",
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardContent className="flex flex-col items-center pt-6">
        <div className="flex items-center justify-center mb-4">
          <QrCode className="mr-2 h-5 w-5 text-ezy-purple" />
          <h3 className="text-lg font-semibold">Share your file</h3>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-inner w-fit mx-auto">
          <canvas ref={canvasRef} className="mx-auto" />
        </div>

        <div className="mt-4 w-full">
          <div className="bg-ezy-gray/50 p-4 rounded-lg mb-3">
            <p className="text-sm font-medium mb-1">PIN Code</p>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {pinCode.split('').map((digit, index) => (
                  <span 
                    key={index} 
                    className="bg-white w-8 h-10 flex items-center justify-center rounded-md shadow-sm text-lg font-bold text-ezy-darkPurple"
                  >
                    {digit}
                  </span>
                ))}
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => copyToClipboard(pinCode)}
                className="hover:bg-ezy-purple/10"
              >
                <Copy className="h-4 w-4 text-ezy-darkPurple" />
              </Button>
            </div>
          </div>

          <div className="bg-ezy-gray/50 p-4 rounded-lg mb-4">
            <p className="text-sm font-medium mb-1">Download Link</p>
            <div className="flex items-center justify-between">
              <p className="text-xs truncate max-w-[230px]">{downloadUrl}</p>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => copyToClipboard(downloadUrl)}
                className="hover:bg-ezy-purple/10"
              >
                <Copy className="h-4 w-4 text-ezy-darkPurple" />
              </Button>
            </div>
          </div>

          <Button 
            onClick={() => copyToClipboard(downloadUrl)} 
            className="w-full bg-ezy-purple hover:bg-ezy-darkPurple"
          >
            <Copy className="mr-2 h-4 w-4" /> Copy Download Link
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QRCodeDisplay;
