import { DashboardSidebar } from '@/app/components/Sidebar';
import { ApplicationList } from '@/app/components/ApplicationList';

const UserDashboardPage = () => {
  return (
    <div className="flex h-screen">
      <DashboardSidebar userType="user" />
      hoge
    </div>
  );
};

export default UserDashboardPage;
