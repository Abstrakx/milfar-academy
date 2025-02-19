// components/review-modal.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import toast from "react-hot-toast";
import { Star } from "lucide-react";

interface ReviewModalProps {
  courseId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ReviewModal = ({ courseId, isOpen, onClose }: ReviewModalProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await axios.post(`/api/courses/${courseId}/reviews`, {
        rating,
        comment
      });
      toast.success("Review submitted!");
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rate this Course</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                onClick={() => setRating(star)}
                className={`h-8 w-8 cursor-pointer ${
                  star <= rating ? "fill-yellow-400 stroke-yellow-400" : "stroke-gray-300"
                }`}
              />
            ))}
          </div>
          <Textarea
            placeholder="Share your experience with this course..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={isLoading}
          />
          <Button onClick={handleSubmit} disabled={isLoading || rating === 0}>
            Submit Review
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};