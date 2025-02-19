"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { Lock, Loader2 } from "lucide-react";

const Plyr = dynamic(() => import("plyr-react"), { ssr: false });
import "plyr-react/plyr.css";

interface CourseVideoPlayerProps {
  playbackId?: string | null;
  courseId: string;
  chapterId: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  title: string;
}

export const CourseVideoPlayer = ({
  playbackId,
  courseId,
  chapterId,
  isLocked,
  completeOnEnd,
}: CourseVideoPlayerProps) => {
  const [isReady] = useState(false);
  const playerRef = useRef<any>(null);

  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 dark:bg-slate-200">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 dark:bg-slate-200 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">This chapter is locked</p>
        </div>
      )}
      {!isLocked && playbackId && (
        <Plyr
          ref={playerRef}
          source={{
            type: "video",
            sources: [
              {
                src: playbackId,
                provider: "youtube",
              },
            ],
          }}
          options={{
            autoplay: true,
            youtube: { 
              modestbranding: 1,
              rel: 0,
              showinfo: 0,  
              iv_load_policy: 3,
              cc_load_policy: 1,
              vq: "hd1080",
            },
          }}
        />
      )}
    </div>
  );
};
