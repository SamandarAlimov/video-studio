import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface UploadResult {
  url: string;
  path: string;
}

export const useFileUpload = () => {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadFile = async (
    file: File,
    bucket: 'project-videos' | 'project-thumbnails',
    projectId: string
  ): Promise<UploadResult | null> => {
    if (!user) return null;

    setUploading(true);
    setProgress(0);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${projectId}/${fileName}`;

      // Upload the file
      const { error: uploadError, data } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      setProgress(100);

      // Get the public URL for thumbnails, signed URL for videos
      if (bucket === 'project-thumbnails') {
        const { data: urlData } = supabase.storage
          .from(bucket)
          .getPublicUrl(filePath);

        return {
          url: urlData.publicUrl,
          path: filePath,
        };
      } else {
        // For private videos, create a signed URL
        const { data: urlData, error: urlError } = await supabase.storage
          .from(bucket)
          .createSignedUrl(filePath, 60 * 60 * 24 * 7); // 7 days

        if (urlError) throw urlError;

        return {
          url: urlData.signedUrl,
          path: filePath,
        };
      }
    } catch (error) {
      console.error('File upload failed:', error);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const deleteFile = async (
    bucket: 'project-videos' | 'project-thumbnails',
    path: string
  ): Promise<boolean> => {
    try {
      const { error } = await supabase.storage.from(bucket).remove([path]);
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Delete failed:', error);
      return false;
    }
  };

  return {
    uploadFile,
    deleteFile,
    uploading,
    progress,
  };
};
