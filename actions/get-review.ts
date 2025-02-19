import { db } from "@/lib/db";

export const getCourseReviews = async (courseId: string) => {
    try {
      const reviews = await db.review.findMany({
        where: {
          courseId
        },
        include: {
          user: {
            select: {
              name: true,
              imageUrl: true
            }
          }
        },
        orderBy: {
          createdAt: "desc"
        }
      });

      const course = await db.course.findUnique({
        where: {
          id: courseId
        },
        select: {
            title: true
        }
      });
  
      return reviews.map(review => ({
        id: review.id,
        name: review.user.name,
        avatar: review.user.imageUrl || "/default-avatar.png",
        rating: review.rating,
        text: review.comment || "",
        courseTitle: course?.title || "",
      }));
    } catch (error) {
      console.log("[GET_REVIEWS]", error);
      return [];
    }
  };