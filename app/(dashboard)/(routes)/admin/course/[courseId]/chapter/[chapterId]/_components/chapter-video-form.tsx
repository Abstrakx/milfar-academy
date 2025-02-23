"use client";

import dynamic from "next/dynamic";
import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, Video } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getYoutubeVideoId } from "@/lib/youtube";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Plyr = dynamic(() => import("plyr-react"), { ssr: false });
import "plyr-react/plyr.css";

interface ChapterVideoFormProps {
    initialData: { videoUrl?: string | null };
    courseId: string;
    chapterId: string;
  }
  
const formSchema = z.object({
    videoUrl: z.string().url().min(1),
});
  
const ChapterVideoForm = ({
    initialData,
    courseId,
    chapterId,
}: ChapterVideoFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
  
    const toggleEdit = () => setIsEditing((current) => !current);
  
    const router = useRouter();
  
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try {
        await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
        toast.success("Video berhasil diperbarui!");
        toggleEdit();
        router.refresh();
      } catch {
        toast.error("Something went wrong");
      }
    };
  
    const videoId = initialData.videoUrl ? getYoutubeVideoId(initialData.videoUrl) : null;
  
    return (
      <div className="mt-6 border bg-slate-100 rounded-md p-4 dark:bg-gray-800 dark:text-slate-300">
        <div className="font-medium flex items-center justify-between">
          Chapter video
          <Button onClick={toggleEdit} variant="ghost">
            {isEditing && <>Cancel</>}
            {!isEditing && !initialData.videoUrl && (
              <>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add a video
              </>
            )}
            {!isEditing && initialData.videoUrl && (
              <>
                <Pencil className="h-4 w-4 mr-2" />
                Edit video
              </>
            )}
          </Button>
        </div>
        {!isEditing &&
        (videoId && videoId !== null ? (
        <div className="relative w-full mt-2">
          <Plyr
            id={videoId}
            source={{
              type: "video",
              sources: [
                {
                  src: videoId,
                  provider: "youtube",
                },
              ],
            }}
            options={{
              fullscreen: { enabled: false, fallback: true, iosNative: true },
              settings: 	['captions', 'quality', 'speed', 'loop'],
              controls: ['play', 'progress', 'current-time', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],
            }}
          />
        </div>
        ) : (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md dark:bg-gray-800 dark:text-slate-300">
            <Video className="h-10 w-10 text-slate-500" />
          </div>
        ))}
        {isEditing && (
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const videoUrl = formData.get("videoUrl") as string;
                const isValid = formSchema.safeParse({ videoUrl }).success;
  
                if (isValid) {
                  onSubmit({ videoUrl });
                } else {
                  toast.error("Invalid YouTube URL");
                }
              }}
            >
              <Input
                name="videoUrl"
                defaultValue={initialData.videoUrl || ""}
                placeholder="Paste YouTube URL here"
                className="mb-4"
              />
              <Button type="submit">Save Video</Button>
            </form>
            <div className="text-xs text-muted-foreground mt-4">
              Add a YouTube video URL for this chapter.
            </div>
          </div>
        )}
        {initialData.videoUrl && !isEditing && (
          <div className="text-xs text-muted-foreground mt-2">
            Refresh the page if the video does not appear.
          </div>
        )}
      </div>
    );
  };

export default ChapterVideoForm