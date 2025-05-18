// Custom types for our application
export interface FileShare {
  id: string;
  original_name: string;
  size_bytes: number;
  content_type: string;
  storage_path: string;
  pin_code: string;
  created_at: string;
  expires_at: string;
  download_count: number;
  is_text?: boolean;
  text_content?: string;
}

export interface FileUploadResponse {
  fileId: string;
  downloadUrl: string;
  pinCode: string;
  originalName: string;
  fileSize: number;
  isText?: boolean;
  textContent?: string;
}

export interface FileDownloadResponse {
  fileInfo: FileShare | null;
  downloadUrl: string | null;
  verified: boolean;
}

export interface TextShareResponse {
  fileId: string;
  downloadUrl: string;
  pinCode: string;
  textContent: string;
}
