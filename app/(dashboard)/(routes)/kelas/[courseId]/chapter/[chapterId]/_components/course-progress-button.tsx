"use client";

import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { ReviewModal } from "@/components/modals/review-modal";

import { Button } from "@/components/ui/button";

interface CourseProgressButtonProps {
  chapterId: string;
  courseId: string;
  isCompleted?: boolean;
  nextChapterId?: string;
};

export const CourseProgressButton = ({
  chapterId,
  courseId,
  isCompleted,
  nextChapterId
}: CourseProgressButtonProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false); 

  const onClick = async () => {
    try {
      setIsLoading(true);

      await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
        isCompleted: !isCompleted
      });

      if (!isCompleted && !nextChapterId) {
        setIsReviewModalOpen(true);
      }

      if (!isCompleted && nextChapterId) {
        router.push(`/kelas/${courseId}/chapter/${nextChapterId}`);
      }

      toast.success("Progress updated");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  const Icon = isCompleted ? XCircle : CheckCircle

  return (
    <>
      <Button
        onClick={onClick}
        disabled={isLoading || isCompleted}
        type="button"
        variant={isCompleted ? "outline" : "default"}
        className="w-auto"
      >
        {isCompleted ? "Complete" : "Selesai"}
        <Icon className="h-4 w-4 ml-2" />
      </Button>
          
      <ReviewModal
        courseId={courseId}
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />
    </>
  )
}