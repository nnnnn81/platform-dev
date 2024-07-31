import { DashboardSidebar } from '../../components/Sidebar';
import { DashboardContent } from '../../components/Dashboard';

const AdminDashboardPage = () => {
  return (
    <div className="flex h-screen">
      <DashboardSidebar userType="admin" />
      <DashboardContent />
    </div>
  );
};

export default AdminDashboardPage;
