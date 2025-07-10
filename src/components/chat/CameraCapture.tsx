import React, { useState, useRef, useCallback } from 'react';
import { Camera, X, RotateCcw, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FileAttachment } from '@/store/chatStore';

interface CameraCaptureProps {
  onCapture: (file: FileAttachment) => void;
  disabled?: boolean;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = useCallback(async () => {
    try {
      const constraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsCameraActive(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      // Fallback to file input
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          handleFileCapture(file);
        }
      };
      input.click();
    }
  }, [facingMode]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
    setCapturedImage(null);
  }, []);

  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedImage(imageDataUrl);
      }
    }
  }, []);

  const handleFileCapture = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setCapturedImage(result);
    };
    reader.readAsDataURL(file);
  }, []);

  const saveCapture = useCallback(() => {
    if (capturedImage) {
      // Convert data URL to blob
      fetch(capturedImage)
        .then(res => res.blob())
        .then(blob => {
          const id = Date.now().toString();
          const url = URL.createObjectURL(blob);
          const filename = `camera-capture-${Date.now()}.jpg`;
          
          const attachment: FileAttachment = {
            id,
            name: filename,
            type: 'image/jpeg',
            size: blob.size,
            url,
            preview: capturedImage
          };
          
          onCapture(attachment);
          setIsOpen(false);
          setCapturedImage(null);
          stopCamera();
        });
    }
  }, [capturedImage, onCapture, stopCamera]);

  const switchCamera = useCallback(() => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
    if (isCameraActive) {
      stopCamera();
      setTimeout(startCamera, 100);
    }
  }, [isCameraActive, startCamera, stopCamera]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    stopCamera();
    setCapturedImage(null);
  }, [stopCamera]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) {
        handleClose();
      }
    }}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          disabled={disabled}
          className="p-2 hover:bg-violet-900/50 rounded-lg transition-colors"
          onClick={() => setIsOpen(true)}
        >
          <Camera className="w-5 h-5 text-violet-500" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl bg-black border border-violet-800">
        <DialogHeader>
          <DialogTitle className="text-white">Capture Photo</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {!isCameraActive && !capturedImage && (
            <div className="text-center py-8">
              <Camera className="w-12 h-12 text-violet-400 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">Ready to capture a photo?</p>
              <Button onClick={startCamera} className="bg-violet-600 hover:bg-violet-700">
                Start Camera
              </Button>
            </div>
          )}
          
          {isCameraActive && !capturedImage && (
            <div className="relative">
              <video
                ref={videoRef}
                className="w-full h-64 object-cover rounded-lg bg-black"
                autoPlay
                playsInline
                muted
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                <Button
                  onClick={switchCamera}
                  variant="secondary"
                  size="icon"
                  className="bg-black/50 hover:bg-black/70 text-white"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
                <Button
                  onClick={capturePhoto}
                  className="bg-violet-600 hover:bg-violet-700 px-6"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Capture
                </Button>
              </div>
            </div>
          )}
          
          {capturedImage && (
            <div className="space-y-4">
              <img
                src={capturedImage}
                alt="Captured"
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="flex gap-2 justify-center">
                <Button
                  onClick={() => setCapturedImage(null)}
                  variant="secondary"
                >
                  <X className="w-4 h-4 mr-2" />
                  Retake
                </Button>
                <Button
                  onClick={saveCapture}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Use Photo
                </Button>
              </div>
            </div>
          )}
          
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </DialogContent>
    </Dialog>
  );
};