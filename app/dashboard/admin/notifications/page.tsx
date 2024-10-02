import { DashboardSidebar } from '@/app/components/common/Sidebar';
import { NotificationList } from '@/app/components/notification/notificationList';

const AdminNotificationPage = () => {
  return (
    <div className="flex h-screen">
      <DashboardSidebar userType="admin" />
      <div className="flex-1 p-8 bg-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">お知らせ</h1>
        </div>

        <section className="mb-6">

          <div className="bg-white p-4 rounded shadow">
            <NotificationList />
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminNotificationPage;
