import { DashboardSidebar } from '@/app/components/Sidebar';

const UserDashboardPage = () => {
  return (
    <div className="flex h-screen">
      <DashboardSidebar userType="admin" />
      hoge
    </div>
  );
};

export default UserDashboardPage;
