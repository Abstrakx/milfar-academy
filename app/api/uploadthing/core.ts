import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();
 
const handleAuth = async () => {
    const { userId } = await auth();

    if (!userId) {
        throw new UploadThingError("Unauthorized");
    }
    return { userId };
}
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    courseImage: f({ image: { maxFileSize: "2MB", maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => {}),
    courseAttachment: f({ pdf: { maxFileSize: "32MB", maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => {}),
    chapterVideo: f({ video: { maxFileSize: "2GB", maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => {}),
    articleImage: f({ image: { maxFileSize: "1MB", maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => {}),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;