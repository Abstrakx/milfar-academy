"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { Loader2 } from "lucide-react";

const Plyr = dynamic(() => import("plyr-react"), { ssr: false });
import "plyr-react/plyr.css";

interface ArticleVideoPlayerProps {
  playbackId?: string | null;
}

export const ArticleVideoPlayer = ({
  playbackId,
}: ArticleVideoPlayerProps) => {
  const [isReady] = useState(false);
  const playerRef = useRef<any>(null);

  return (
    <div className="relative aspect-video">
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 dark:bg-slate-200">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}

      {playbackId && (
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
          }}
        />
      )}
    </div>
  );
};
