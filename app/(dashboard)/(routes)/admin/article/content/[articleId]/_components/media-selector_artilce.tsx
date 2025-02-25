"use client";

import { useState } from "react";
import ImageForm from "./image-form_article";
import VideoForm from "./video-form_article";

interface MediaSelectorFormProps {
  initialData: { imageUrl?: string | null; videoUrl?: string | null };
  articleId: string;
}

const MediaSelectorForm = ({ initialData, articleId }: MediaSelectorFormProps) => {
  const [mediaType, setMediaType] = useState(
    initialData.videoUrl 
      ? "video" 
      : initialData.imageUrl 
        ? "image" 
        : "image" 
  );

  return (
    <div className="mt-6 border rounded-lg overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b">
        <h3 className="text-lg font-medium text-gray-900">Media Artikel</h3>
        <p className="mt-1 text-sm text-gray-500">
          Pilih jenis media yang ingin ditampilkan pada artikel ini
        </p>
      </div>

      {/* Tab Selector */}
      <div className="flex border-b">
        <button
          onClick={() => setMediaType("image")}
          className={`flex-1 py-3 text-sm font-medium text-center ${
            mediaType === "image"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Gambar
        </button>
        <button
          onClick={() => setMediaType("video")}
          className={`flex-1 py-3 text-sm font-medium text-center ${
            mediaType === "video"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Video YouTube
        </button>
      </div>

      {/* Content Area */}
      <div className="bg-white p-6">
        {mediaType === "image" ? (
          <ImageForm initialData={initialData} articleId={articleId} />
        ) : (
          <VideoForm initialData={initialData} articleId={articleId} />
        )}
      </div>
    </div>
  );
};

export default MediaSelectorForm;