"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import toast from "react-hot-toast";
import { Star } from "lucide-react";

interface ReviewModalProps {
  courseId: string;
  isOpen: boolean;
  courseName?: string;
  onClose: () => void;
}

export const ReviewModal = ({ courseId, isOpen, courseName, onClose }: ReviewModalProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const ratingLabels = ["Buruk", "Kurang Baik", "Cukup Baik", "Baik", "Sangat Baik"];

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Silakan pilih rating sebelum mengirim ulasan");
      return;
    }
    
    try {
      setIsLoading(true);
      await axios.post(`/api/courses/${courseId}/reviews`, {
        rating,
        comment
      });
      toast.success("Ulasan berhasil dikirim!");
      setRating(0);
      setComment("");
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl font-bold">Bagikan Pengalaman Anda</DialogTitle>
          <DialogDescription className="text-gray-500">
          {courseName ? `Beri penilaian pengalaman Anda dengan "${courseName}"` : "Beri penilaian pengalaman Anda dengan kursus ini"}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Star Rating Section */}
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={32}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className={`cursor-pointer transition-all duration-150 ${
                    star <= (hoveredRating || rating) 
                      ? "fill-yellow-400 stroke-yellow-400 scale-110" 
                      : "stroke-gray-300 hover:stroke-yellow-200"
                  }`}
                />
              ))}
            </div>
            
            {/* Rating Label */}
            <div className="h-6">
              {(hoveredRating || rating) > 0 && (
                <span className="text-sm font-medium text-yellow-600">
                  {ratingLabels[(hoveredRating || rating) - 1]}
                </span>
              )}
            </div>
          </div>
          
          {/* Textarea with character counter */}
          <div className="space-y-2">
            <Textarea
              placeholder="Bagikan pendapat Anda tentang kursus ini..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={isLoading}
              className="min-h-24 resize-none focus:ring-2 focus:ring-blue-500"
              maxLength={500}
            />
            <div className="text-right text-xs text-gray-500">
              {comment.length}/500 karakter
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 justify-end">
          <Button 
            variant="outline" 
            onClick={onClose} 
            disabled={isLoading}
            className="sm:order-1 order-2"
          >
            Batal
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isLoading || rating === 0}
            className={`sm:order-2 order-1 ${
              rating === 0 ? 'opacity-70' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? "Mengirim..." : "Kirim Review"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};