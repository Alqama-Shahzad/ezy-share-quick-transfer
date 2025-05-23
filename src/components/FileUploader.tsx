import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { isFileSizeValid, formatFileSize } from "@/lib/fileUtils";
import { Upload, File, X } from "lucide-react";
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
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <div
        className={`drop-area border-2 border-dashed rounded-xl p-4 sm:p-6 md:p-8 text-center transition-all cursor-pointer ${
          isDragging ? "border-ezyshare-flame bg-ezyshare-flame/5" : selectedFile ? "border-ezyshare-flame/40" : "border-gray-200 hover:border-ezyshare-flame/50 hover:bg-ezyshare-flame/5"
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
        
        {!selectedFile ? (
          <div className="flex flex-col items-center justify-center gap-2 sm:gap-3">
            <div className="rounded-full bg-ezyshare-flame/10 p-2 sm:p-3 transition-all group-hover:bg-ezyshare-flame/20">
              <Upload className="h-5 w-5 sm:h-6 sm:w-6 text-ezyshare-flame" />
            </div>
            <div className="space-y-1 sm:space-y-2">
              <h3 className="text-base sm:text-lg font-semibold">Upload your file</h3>
              <p className="text-xs sm:text-sm text-gray-500">
                Drag & drop or click to select a file
                <br className="hidden xs:block" />
                <span className="xs:hidden"> · </span>
                Max file size: 25MB
              </p>
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="rounded-full bg-ezyshare-flame/20 p-1.5 sm:p-2 flex-shrink-0">
                <File className="h-4 w-4 sm:h-5 sm:w-5 text-ezyshare-flame" />
              </div>
              <div className="text-left overflow-hidden">
                <p className="font-medium truncate text-sm sm:text-base max-w-[120px] xs:max-w-[180px] sm:max-w-[200px] md:max-w-[300px]">{selectedFile.name}</p>
                <p className="text-xs text-gray-500">{formatFileSize(selectedFile.size)}</p>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="ml-auto rounded-full hover:bg-red-100 hover:text-red-500 h-7 w-7 sm:h-8 sm:w-8"
                onClick={removeFile}
              >
                <X className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
            <p className="text-xs text-ezyshare-flame mt-2 sm:mt-3">Click to change file</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
