
import { toast } from "@/components/ui/use-toast";

// Generate a random PIN code (6 digits)
export function generatePinCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Generate a unique file ID
export function generateFileId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Convert bytes to readable format
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// Check if file size is within limit (25MB)
export function isFileSizeValid(file: File): boolean {
  const maxSizeBytes = 25 * 1024 * 1024; // 25MB in bytes
  return file.size <= maxSizeBytes;
}

// Handle file upload errors
export function handleFileError(error: any): void {
  console.error("File upload error:", error);
  toast({
    title: "Upload Failed",
    description: "There was an error uploading your file. Please try again.",
    variant: "destructive",
  });
}

// Get file extension
export function getFileExtension(fileName: string): string {
  return fileName.split('.').pop()?.toLowerCase() || '';
}

// Get file icon based on extension
export function getFileIcon(extension: string): string {
  // Logic to return appropriate icon based on file type
  // For simplicity, we'll just return a generic file icon
  return "file-text";
}
