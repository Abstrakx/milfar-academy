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

interface VideoFormProps {
  initialData: { videoUrl?: string | null };
  articleId: string;
}

const formSchema = z.object({
  videoUrl: z.string().url().min(1),
});

const VideoForm = ({ initialData, articleId }: VideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();
  const videoId = initialData.videoUrl ? getYoutubeVideoId(initialData.videoUrl) : null;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/article/${articleId}`, values);
      toast.success("Video berhasil diperbarui!");
      toggleEdit();
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
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Video Artikel
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? "Batal" : initialData.videoUrl ? "Edit Video" : "Tambah Video"}
        </Button>
      </div>

      {!isEditing && (
        videoId ? (
          <div className="relative w-full mt-2">
            <Plyr
              id={videoId}
              source={{
                type: "video",
                sources: [{ src: videoId, provider: "youtube" }],
              }}
              options={{
                fullscreen: { enabled: false, fallback: true, iosNative: true },
                settings: ["captions", "quality", "speed", "loop"],
                controls: ["play", "progress", "current-time", "settings", "fullscreen"],
              }}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <Video className="h-10 w-10 text-slate-500" />
          </div>
        )
      )}

      {isEditing && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const videoUrl = formData.get("videoUrl") as string;
            if (formSchema.safeParse({ videoUrl }).success) {
              onSubmit({ videoUrl });
            } else {
              toast.error("URL YouTube tidak valid");
            }
          }}
        >
          <Input
            name="videoUrl"
            defaultValue={initialData.videoUrl || ""}
            placeholder="Masukkan URL YouTube"
            className="mb-4"
          />
          <Button type="submit">Simpan Video</Button>
        </form>
      )}
    </div>
  );
};

export default VideoForm;
