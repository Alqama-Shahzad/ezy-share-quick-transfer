
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
import { Download, QrCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  fileId: z.string().min(1, { message: "File ID is required" }),
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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setSubmitting(true);
    
    try {
      // Extract the file ID (handle both full URLs and just IDs)
      const fileIdRegex = /\/download\/([a-zA-Z0-9-]+)/;
      const match = values.fileId.match(fileIdRegex);
      const fileId = match ? match[1] : values.fileId;
      
      // Navigate to the download page with PIN in URL
      navigate(`/download/${fileId}?pin=${values.pin}`);
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
    <div className="min-h-screen bg-gradient-radial from-white to-ezy-gray flex flex-col">
      <header className="p-6 flex justify-center">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-ezy-purple rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">E</span>
          </div>
          <h1 className="text-2xl font-bold text-ezy-darkBackground">EzyShare</h1>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Download className="h-5 w-5 text-ezy-purple" />
              <span>Receive a File</span>
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="fileId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>File ID or Download URL</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter file ID or paste download link"
                          {...field}
                          className="text-sm" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PIN Code</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-ezy-purple hover:bg-ezy-darkPurple"
                >
                  <Download className="mr-2 h-4 w-4" />
                  {submitting ? "Processing..." : "Access File"}
                </Button>
                
                <div className="relative flex items-center justify-center my-4">
                  <div className="border-t border-gray-300 flex-grow"></div>
                  <span className="px-2 text-sm text-gray-500">or</span>
                  <div className="border-t border-gray-300 flex-grow"></div>
                </div>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/")}
                  className="w-full"
                >
                  <QrCode className="mr-2 h-4 w-4 text-ezy-purple" />
                  Upload a File
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
      
      <footer className="py-4 text-center text-sm text-gray-500">
        <p>&copy; 2025 EzyShare. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Receive;
