"use client";

import ConfirmModal from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ActionsProps {
    disabled: boolean,
    courseId: string,
    isPublished: boolean,
}

const Actions = ({
    disabled,
    courseId,
    isPublished,
} : ActionsProps) => {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
        setIsLoading(true);

        if (isPublished) {
            await axios.patch(`/api/courses/${courseId}/unpublish`);
            toast.success("Course unpublished");
        } else {
            await axios.patch(`/api/courses/${courseId}/publish`);
            toast.success("Course published");
        }
        router.refresh();
        setIsLoading(false);
        return;
        
    } catch (error: any) {
        if (error.response) {
            toast.error(`Server responded with ${error.response.status} error`);
        } else if (error.request) {
            toast.error("No response received from the server");
        } else {
            toast.error(`Error: ${error.message}`);
        }
    }
  }

  const onDelete = async () => {
    try {
        setIsLoading(true);
        await axios.delete(`/api/courses/${courseId}`);
        toast.success("Course deleted");
        router.push(`/admin/course`);
        router.refresh();
    } catch (error: any) {
        if (error.response) {
            toast.error(`Server responded with ${error.response.status} error`);
        } else if (error.request) {
            toast.error("No response received from the server");
        } else {
            toast.error(`Error: ${error.message}`);
        }
    }
  }

  return (
    <div>
        <div className="flex items-center gap-x-2">
            <Button
                onClick={onClick}
                disabled={isLoading}
                variant="outline"
                size="sm"
            >
                {isPublished ? "Unpublish" : "Publish"}
            </Button>
            <ConfirmModal onConfirm={onDelete}>
                <Button disabled={isLoading}>
                    <Trash className="h-4 w-4" />
                </Button>
            </ConfirmModal>
        </div>
    </div>
  )
}

export default Actions