import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { 
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from "@/components/ui/input-otp";
import { Download, QrCode, Flame } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link } from "react-router-dom";
import { findFileByPin } from "@/lib/fileService";

const formSchema = z.object({
  fileId: z.string().optional(),
  pin: z.string().length(6, { message: "PIN must be 6 digits" }),
});

const Receive = () => {
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fileId: "",
      pin: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setSubmitting(true);
    
    try {
      // If fileId is provided, use the regular flow
      if (values.fileId && values.fileId.trim() !== "") {
        // Extract the file ID (handle both full URLs and just IDs)
        const fileIdRegex = /\/download\/([a-zA-Z0-9-]+)/;
        const match = values.fileId.match(fileIdRegex);
        const fileId = match ? match[1] : values.fileId;
        
        // Navigate to the download page with PIN in URL
        navigate(`/download/${fileId}?pin=${values.pin}`);
      } else {
        // PIN-only access flow
        const fileInfo = await findFileByPin(values.pin);
        
        if (fileInfo) {
          // Navigate to the download page with the file ID and PIN
          navigate(`/download/${fileInfo.id}?pin=${values.pin}`);
        } else {
          toast({
            title: "File not found",
            description: "Could not find a file with the provided PIN",
            variant: "destructive",
          });
          setSubmitting(false);
        }
      }
    } catch (error) {
      console.error("Error processing receive request:", error);
      toast({
        title: "Error",
        description: "Could not process your request",
        variant: "destructive",
      });
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-ezyshare-timberwolf/10 to-ezyshare-timberwolf/20 flex flex-col">
      <header className="p-4 sm:p-6 flex justify-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gradient-to-br from-ezyshare-flame to-orange-500 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-all">
            <Flame className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-br from-ezyshare-flame to-orange-500 bg-clip-text text-transparent">
            EzyShare
          </h1>
        </Link>
      </header>
      
      <main className="flex-1 container mx-auto flex flex-col items-center justify-center px-4 py-2 sm:py-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center py-4 sm:py-6">
            <CardTitle className="flex items-center justify-center gap-2 text-lg sm:text-xl">
              <Download className="h-4 w-4 sm:h-5 sm:w-5 text-ezyshare-flame" />
              <span>Receive a File</span>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="px-4 sm:px-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                <FormField
                  control={form.control}
                  name="fileId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base">File ID or Download URL (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter file ID or paste download link"
                          {...field}
                          className="text-xs sm:text-sm h-9 sm:h-10" 
                        />
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base">PIN Code</FormLabel>
                      <FormControl>
                        <div className="max-w-full pb-2 flex justify-center">
                          <InputOTP maxLength={6} {...field}>
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
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />
                
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-ezyshare-flame hover:bg-ezyshare-flame/90 text-white h-9 sm:h-10 text-sm sm:text-base"
                >
                  <Download className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  {submitting ? "Processing..." : "Access File"}
                </Button>
                
                <div className="relative flex items-center justify-center my-3 sm:my-4">
                  <div className="border-t border-gray-300 flex-grow"></div>
                  <span className="px-2 text-xs sm:text-sm text-gray-500">or</span>
                  <div className="border-t border-gray-300 flex-grow"></div>
                </div>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/?showUpload=true")}
                  className="w-full border-ezyshare-flame text-ezyshare-flame hover:bg-ezyshare-flame/10 hover:text-black h-9 sm:h-10 text-sm sm:text-base"
                >
                  <QrCode className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  Upload a File
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
      
      <footer className="py-4 sm:py-6 text-center">
        <p className="text-xs sm:text-sm text-ezyshare-blackOlive mb-1">&copy; 2025 EzyShare. All rights reserved.</p>
        <p className="text-xs text-ezyshare-flame">Created by Alqama-Dev</p>
      </footer>
    </div>
  );
};

export default Receive;
