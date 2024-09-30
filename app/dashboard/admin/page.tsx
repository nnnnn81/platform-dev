import { DashboardSidebar } from '../../components/common/Sidebar';
import { DashboardContent } from '../../components/common/Dashboard';

const AdminDashboardPage = () => {
  return (
    <div className="flex h-screen">
      <DashboardSidebar userType="admin" />
      <DashboardContent />
    </div>
  );
};

export default AdminDashboardPage;
