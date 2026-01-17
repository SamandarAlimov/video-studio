import { useState, useEffect } from 'react';
import { X, Save, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useFileUpload } from '@/hooks/useFileUpload';
import { FileUpload } from './FileUpload';
import { toast } from 'sonner';

interface VideoProject {
  id: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  video_url?: string | null;
  status: string;
  duration_seconds: number | null;
  created_at: string;
  updated_at: string;
  user_id: string;
}

interface ProjectEditModalProps {
  project: VideoProject;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (project: VideoProject) => void;
}

export const ProjectEditModal = ({
  project,
  isOpen,
  onClose,
  onUpdate,
}: ProjectEditModalProps) => {
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description || '');
  const [status, setStatus] = useState(project.status);
  const [thumbnailUrl, setThumbnailUrl] = useState(project.thumbnail_url);
  const [videoUrl, setVideoUrl] = useState(project.video_url);
  const [saving, setSaving] = useState(false);

  const { uploadFile, uploading } = useFileUpload();

  useEffect(() => {
    setTitle(project.title);
    setDescription(project.description || '');
    setStatus(project.status);
    setThumbnailUrl(project.thumbnail_url);
    setVideoUrl(project.video_url);
  }, [project]);

  const handleThumbnailUpload = async (file: File) => {
    const result = await uploadFile(file, 'project-thumbnails', project.id);
    if (result) {
      setThumbnailUrl(result.url);
      toast.success('Thumbnail uploaded successfully');
    } else {
      toast.error('Failed to upload thumbnail');
    }
  };

  const handleVideoUpload = async (file: File) => {
    const result = await uploadFile(file, 'project-videos', project.id);
    if (result) {
      setVideoUrl(result.url);
      toast.success('Video uploaded successfully');
    } else {
      toast.error('Failed to upload video');
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data, error } = await supabase
        .from('video_projects')
        .update({
          title,
          description: description || null,
          status,
          thumbnail_url: thumbnailUrl,
          video_url: videoUrl,
        })
        .eq('id', project.id)
        .select()
        .single();

      if (error) throw error;

      onUpdate(data);
      toast.success('Project saved successfully');
      onClose();
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card border border-border rounded-2xl shadow-2xl mx-4">
        {/* Header */}
        <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">Edit Project</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Project Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
              placeholder="Enter project title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none"
              placeholder="Enter project description"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
            >
              <option value="draft">Draft</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="published">Published</option>
            </select>
          </div>

          {/* Thumbnail Upload */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Thumbnail
            </label>
            <FileUpload
              accept="image/jpeg,image/png,image/webp,image/gif"
              type="thumbnail"
              currentUrl={thumbnailUrl}
              onUpload={handleThumbnailUpload}
              onRemove={() => setThumbnailUrl(null)}
              uploading={uploading}
            />
          </div>

          {/* Video Upload */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Video File
            </label>
            <FileUpload
              accept="video/mp4,video/webm,video/quicktime"
              type="video"
              currentUrl={videoUrl}
              onUpload={handleVideoUpload}
              onRemove={() => setVideoUrl(null)}
              uploading={uploading}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-card/95 backdrop-blur-sm border-t border-border px-6 py-4 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving || uploading}
            className="btn-primary flex items-center gap-2"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
