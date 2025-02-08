// page.tsx
import { db } from "@/lib/db";
import AnalyticsDashboard from "./_components/analytics-dashboard";

const AnalyticsPage = async () => {
  const transactions = await db.purchase.findMany({
    include: {
      course: {
        select: {
          title: true,
          price: true,
        }
      }
    }
  });

  const users = await db.profile.findMany({
    select: {
      id: true,
      name: true,
    }
  });

  const courses = await db.course.findMany({
    select: {
      id: true,
      title: true,
    },
    where: {isPublished: true}
  });

  return <AnalyticsDashboard 
    transactions={transactions} 
    users={users} 
    courses={courses} 
  />;
};

export default AnalyticsPage;