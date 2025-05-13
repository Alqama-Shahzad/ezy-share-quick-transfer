import { supabase } from "@/integrations/supabase/client";
import { FileShare, FileUploadResponse, FileDownloadResponse } from "./types";

// Upload a file to Supabase storage and create a record in the database
export async function uploadFile(file: File): Promise<FileUploadResponse> {
  try {
    // Generate a unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `uploads/${fileName}`;
    
    // Generate a 6-digit PIN code
    const pinCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Upload file to Supabase Storage
    const { data: storageData, error: storageError } = await supabase.storage
      .from('file_shares')
      .upload(filePath, file);
      
    if (storageError) {
      throw new Error(`Storage error: ${storageError.message}`);
    }
    
    // Create a record in the database
    const { data: fileData, error: dbError } = await supabase
      .from('file_shares')
      .insert({
        original_name: file.name,
        size_bytes: file.size,
        content_type: file.type,
        storage_path: filePath,
        pin_code: pinCode,
      })
      .select('id')
      .single();
      
    if (dbError) {
      throw new Error(`Database error: ${dbError.message}`);
    }
    
    // Get the download URL
    const fileId = fileData.id;
    const downloadUrl = `${window.location.origin}/download/${fileId}`;
    
    return {
      fileId,
      downloadUrl,
      pinCode,
      originalName: file.name,
      fileSize: file.size,
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

// Get file information by ID
export async function getFileInfo(fileId: string): Promise<FileShare | null> {
  try {
    const { data, error } = await supabase
      .from('file_shares')
      .select('*')
      .eq('id', fileId)
      .single();
      
    if (error) {
      console.error('Error fetching file info:', error);
      return null;
    }
    
    return data as FileShare;
  } catch (error) {
    console.error('Error getting file info:', error);
    return null;
  }
}

// Verify PIN code for a file
export async function verifyFilePin(fileId: string, enteredPin: string): Promise<FileDownloadResponse> {
  try {
    const fileInfo = await getFileInfo(fileId);
    
    if (!fileInfo) {
      return { fileInfo: null, downloadUrl: null, verified: false };
    }
    
    // Check if PIN is correct
    const verified = fileInfo.pin_code === enteredPin;
    
    let downloadUrl = null;
    
    if (verified) {
      // Get download URL from Supabase Storage with download options
      const { data } = await supabase.storage
        .from('file_shares')
        .createSignedUrl(fileInfo.storage_path, 60, {
          download: fileInfo.original_name, // Force download with original filename
          transform: {
            // No transformations needed
          }
        });
        
      if (data) {
        downloadUrl = data.signedUrl;
        
        // Increment download count
        await supabase.rpc('increment_download_count', { file_id: fileId });
      }
    }
    
    return { fileInfo, downloadUrl, verified };
  } catch (error) {
    console.error('Error verifying PIN:', error);
    throw error;
  }
}

// Find file by PIN code
export async function findFileByPin(pinCode: string): Promise<FileShare | null> {
  try {
    const { data, error } = await supabase
      .from('file_shares')
      .select('*')
      .eq('pin_code', pinCode)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
      
    if (error) {
      console.error('Error finding file by PIN:', error);
      return null;
    }
    
    return data as FileShare;
  } catch (error) {
    console.error('Error finding file by PIN:', error);
    return null;
  }
}
