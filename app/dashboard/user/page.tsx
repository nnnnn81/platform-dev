import { DashboardSidebar } from '../../components/common/Sidebar';
import { DashboardContent } from '../../components/common/Dashboard';

const UserDashboardPage = () => {
  return (
    <div className="flex h-screen">
      <DashboardSidebar userType="user" />
      <DashboardContent />
    </div>
  );
};

export default UserDashboardPage;
