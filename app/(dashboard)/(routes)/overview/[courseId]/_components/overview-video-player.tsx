"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { Lock, Loader2 } from "lucide-react";
import { APITypes } from "plyr-react"; 

const Plyr = dynamic(() => import("plyr-react"), { ssr: false });
import "plyr-react/plyr.css";

interface OverviewVideoPlayerProps {
  playbackId?: string | null;
  isLocked: boolean;
}

export const OverviewVideoPlayer = ({
  playbackId,
  isLocked,
}: OverviewVideoPlayerProps) => {
  const [isReady] = useState(false);
  const playerRef = useRef<APITypes | null>(null); 

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
