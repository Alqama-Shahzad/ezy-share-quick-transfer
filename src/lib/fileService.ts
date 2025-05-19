import { supabase } from "@/integrations/supabase/client";
import { FileShare, FileUploadResponse, FileDownloadResponse, TextShareResponse } from "./types";

// Calculate expiration date (1 day from now)
function getExpirationDate(): string {
  const date = new Date();
  date.setDate(date.getDate() + 1); // Add 1 day
  return date.toISOString();
}

// Upload a file to Supabase storage and create a record in the database
export async function uploadFile(file: File): Promise<FileUploadResponse> {
  try {
    // Generate a unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `uploads/${fileName}`;
    
    // Generate a 6-digit PIN code
    const pinCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Calculate expiration date (1 day from now)
    const expiresAt = getExpirationDate();
    
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
        expires_at: expiresAt // Set expiration date
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
      expiresAt: expiresAt // Include expiration in response
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
    
    // Check if file has expired
    if (data && data.expires_at) {
      const now = new Date();
      const expiryDate = new Date(data.expires_at);
      
      if (now > expiryDate) {
        console.log('This file has expired.');
        return null;
      }
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
      // For text content, we don't need a storage URL
      if (fileInfo.is_text) {
        // Just increment download count
        await supabase.rpc('increment_download_count', { file_id: fileId });
      } else {
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

// Share text content (no actual file, just text)
export async function shareText(textContent: string): Promise<TextShareResponse> {
  try {
    // Generate a 6-digit PIN code
    const pinCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Generate a dummy storage path for text messages
    const dummyPath = `text_messages/${crypto.randomUUID()}.txt`;
    
    // Calculate expiration date (1 day from now)
    const expiresAt = getExpirationDate();
    
    // Create a record in the database
    const { data: fileData, error: dbError } = await supabase
      .from('file_shares')
      .insert({
        original_name: 'text_message.txt',
        size_bytes: new Blob([textContent]).size,
        content_type: 'text/plain',
        storage_path: dummyPath, // Use dummy path instead of null
        pin_code: pinCode,
        is_text: true,
        text_content: textContent,
        expires_at: expiresAt // Set expiration date
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
      textContent,
      expiresAt: expiresAt // Include expiration in response
    };
  } catch (error) {
    console.error('Error sharing text:', error);
    throw error;
  }
}
