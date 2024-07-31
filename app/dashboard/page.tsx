import { DashboardSidebar } from '../components/Sidebar';
import { DashboardContent } from '../components/Dashboard';

const UserDashboardPage = () => {
  return (
    <div className="flex h-screen">
      <DashboardSidebar userType="user" />
      <DashboardContent />
    </div>
  );
};

export default UserDashboardPage;
