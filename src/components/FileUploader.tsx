
import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { isFileSizeValid, formatFileSize } from "@/lib/fileUtils";
import { Upload, File } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FileUploaderProps {
  onFileSelected: (file: File) => void;
}

const FileUploader = ({ onFileSelected }: FileUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    if (!isFileSizeValid(file)) {
      toast({
        title: "File too large",
        description: "Maximum file size is 25MB",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    onFileSelected(file);
    toast({
      title: "File selected",
      description: `${file.name} (${formatFileSize(file.size)})`,
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="w-full max-w-md">
      <CardContent className="pt-6">
        <div
          className={`drop-area border-2 border-dashed rounded-xl p-8 text-center transition-all ${
            isDragging ? "active border-ezy-purple bg-ezy-purple/5" : "border-gray-200"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileInput}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="rounded-full bg-ezy-purple/10 p-3">
              <Upload className="h-6 w-6 text-ezy-purple" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Upload your file</h3>
              <p className="text-sm text-gray-500">
                Drag & drop or click to select a file
                <br />
                Max file size: 25MB
              </p>
            </div>
          </div>
        </div>

        {selectedFile && (
          <div className="mt-4 p-3 bg-ezy-gray/50 rounded-lg flex items-center gap-3">
            <div className="rounded-full bg-ezy-purple/10 p-2">
              <File className="h-4 w-4 text-ezy-purple" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-sm truncate">{selectedFile.name}</p>
              <p className="text-xs text-gray-500">{formatFileSize(selectedFile.size)}</p>
            </div>
          </div>
        )}

        <div className="mt-4">
          <Button
            onClick={triggerFileInput}
            variant="outline"
            className="w-full"
          >
            Select a different file
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUploader;
