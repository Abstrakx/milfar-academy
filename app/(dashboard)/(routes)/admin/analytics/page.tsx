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
      },
      coupon: {
        select: {
          name: true,
          discountPercentage: true,
        }
      },
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const users = await db.profile.findMany({
    select: {
      userId: true,
      name: true,
    }
  });

  const courses = await db.course.findMany({
    select: {
      id: true,
      title: true,
      price: true,
      hasDiscount: true,
      discountPrice: true
    },
    where: { isPublished: true }
  });

  const coupons = await db.coupon.findMany({
    where: {
      isActive: true
    },
    select: {
      id: true,
      name: true,
      discountPercentage: true,
      courseId: true,
      isActive: true
    }
  });

  return <AnalyticsDashboard 
    transactions={transactions.map(t => ({
      ...t,
      transactionStatus: t.transactionStatus || 'MANUAL' 
    }))} 
    users={users} 
    courses={courses} 
    coupons={coupons}
  />;
};

export default AnalyticsPage;