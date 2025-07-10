import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, FileText, Image, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FileAttachment as FileAttachmentType } from '@/store/chatStore';
interface FileAttachmentProps {
  files: FileAttachmentType[];
  onFilesAdded: (files: FileAttachmentType[]) => void;
  onFileRemoved: (fileId: string) => void;
  disabled?: boolean;
}
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB
const ACCEPTED_FILE_TYPES = {
  'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'text/plain': ['.txt']
};
export const FileAttachmentComponent: React.FC<FileAttachmentProps> = ({
  files,
  onFilesAdded,
  onFileRemoved,
  disabled
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const processFiles = useCallback((acceptedFiles: File[]) => {
    const newFiles: FileAttachmentType[] = acceptedFiles.map(file => {
      const id = Date.now().toString() + Math.random();
      const url = URL.createObjectURL(file);
      let preview = url;
      if (file.type.startsWith('image/')) {
        preview = url;
      }
      return {
        id,
        name: file.name,
        type: file.type,
        size: file.size,
        url,
        preview
      };
    });
    onFilesAdded(newFiles);
  }, [onFilesAdded]);
  const {
    getRootProps,
    getInputProps,
    open
  } = useDropzone({
    onDrop: processFiles,
    onDragEnter: () => setIsDragOver(true),
    onDragLeave: () => setIsDragOver(false),
    accept: ACCEPTED_FILE_TYPES,
    maxSize: MAX_FILE_SIZE,
    maxFiles: 5,
    disabled,
    noClick: true
  });
  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };
  return <div className="w-full">
      {/* File Upload Area */}
      <div {...getRootProps()} className={cn("relative transition-all duration-200", isDragOver && "bg-violet-900/20 rounded-lg")}>
        <input {...getInputProps()} />
        
        {isDragOver && <div className="absolute inset-0 border-2 border-dashed border-violet-500 rounded-lg bg-violet-900/10 flex items-center justify-center z-10">
            <div className="text-center">
              <Upload className="w-6 h-6 text-violet-400 mx-auto mb-2" />
              <p className="text-sm text-violet-300">Drop files here</p>
            </div>
          </div>}

        {/* File Previews */}
        {files.length > 0 && <div className="flex flex-wrap gap-2 p-2 border-t border-violet-800">
            {files.map(file => <div key={file.id} className="relative group bg-black/50 border border-violet-700 rounded-lg p-2 flex items-center gap-2 max-w-xs">
                {file.type.startsWith('image/') ? <div className="flex-shrink-0">
                    <img src={file.preview} alt={file.name} className="w-8 h-8 object-cover rounded" />
                  </div> : <div className="flex-shrink-0 text-violet-400">
                    {getFileIcon(file.type)}
                  </div>}
                
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white truncate">{file.name}</p>
                  <p className="text-xs text-gray-400">{formatFileSize(file.size)}</p>
                </div>
                
                <Button variant="ghost" size="sm" onClick={() => onFileRemoved(file.id)} className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <X className="w-3 h-3" />
                </Button>
              </div>)}
          </div>}
      </div>

      {/* File Actions */}
      <div className="flex items-center gap-2">
        
      </div>
    </div>;
};