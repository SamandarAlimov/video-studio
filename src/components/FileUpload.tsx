import { useRef, useState } from 'react';
import { Upload, X, FileVideo, Image, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  accept: string;
  type: 'video' | 'thumbnail';
  currentUrl?: string | null;
  onUpload: (file: File) => Promise<void>;
  onRemove?: () => void;
  uploading?: boolean;
  disabled?: boolean;
}

export const FileUpload = ({
  accept,
  type,
  currentUrl,
  onUpload,
  onRemove,
  uploading = false,
  disabled = false,
}: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleClick = () => {
    if (!disabled && !uploading) {
      inputRef.current?.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await onUpload(file);
    }
    // Reset input so same file can be selected again
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled && !uploading) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled || uploading) return;

    const file = e.dataTransfer.files?.[0];
    if (file) {
      await onUpload(file);
    }
  };

  const Icon = type === 'video' ? FileVideo : Image;

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled || uploading}
      />

      {currentUrl ? (
        <div className="relative group">
          {type === 'thumbnail' ? (
            <img
              src={currentUrl}
              alt="Thumbnail"
              className="w-full aspect-video object-cover rounded-lg border border-border"
            />
          ) : (
            <video
              src={currentUrl}
              className="w-full aspect-video object-cover rounded-lg border border-border"
              controls
            />
          )}
          {onRemove && (
            <button
              onClick={onRemove}
              className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              disabled={disabled || uploading}
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={handleClick}
            className="absolute bottom-2 right-2 px-3 py-1.5 bg-background/80 backdrop-blur-sm border border-border rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
            disabled={disabled || uploading}
          >
            Replace
          </button>
        </div>
      ) : (
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            'flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors',
            isDragging
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/50 hover:bg-secondary/50',
            (disabled || uploading) && 'opacity-50 cursor-not-allowed'
          )}
        >
          {uploading ? (
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          ) : (
            <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
              <Icon className="w-7 h-7 text-muted-foreground" />
            </div>
          )}
          <div className="text-center">
            <p className="font-medium text-foreground">
              {uploading ? 'Uploading...' : `Upload ${type === 'video' ? 'Video' : 'Thumbnail'}`}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {type === 'video'
                ? 'MP4, WebM, MOV up to 500MB'
                : 'JPG, PNG, WebP up to 5MB'}
            </p>
          </div>
          {!uploading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Upload className="w-4 h-4" />
              <span>Drag & drop or click to browse</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
