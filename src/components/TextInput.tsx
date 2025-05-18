import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare } from "lucide-react";

interface TextInputProps {
  onTextSubmit: (text: string) => void;
  isSubmitting: boolean;
}

const TextInput = ({ onTextSubmit, isSubmitting }: TextInputProps) => {
  const [text, setText] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!text.trim()) {
      toast({
        title: "Empty text",
        description: "Please enter some text to share",
        variant: "destructive",
      });
      return;
    }

    onTextSubmit(text);
  };

  return (
    <div className="w-full space-y-3 sm:space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-ezyshare-flame" />
        <h3 className="text-sm sm:text-base font-medium">Share Text Message</h3>
      </div>

      <Textarea
        placeholder="Enter text you want to share..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="min-h-[120px] text-sm sm:text-base"
      />

      <Button
        onClick={handleSubmit}
        disabled={isSubmitting || !text.trim()}
        className="w-full bg-ezyshare-flame hover:bg-ezyshare-flame/90 text-white py-2 h-9 sm:h-10 text-sm sm:text-base"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin h-4 w-4 border-2 border-white border-r-transparent rounded-full mr-2" />
            Sharing...
          </>
        ) : (
          <>
            <MessageSquare className="mr-2 h-4 w-4" />
            Share Text
          </>
        )}
      </Button>
    </div>
  );
};

export default TextInput; 