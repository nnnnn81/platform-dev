import { DashboardSidebar } from '@/app/components/common/Sidebar';

const UserNotificationPage = () => {
  return (
    <div className="flex h-screen">
      <DashboardSidebar userType="user" />

      <div className="flex-1 p-8 bg-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">お知らせ</h1>
        </div>

        <section className="mb-6">

          <div className="bg-white p-4 rounded shadow">
            {/* <NotificationList status="ongoing" /> */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserNotificationPage;
