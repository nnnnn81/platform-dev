import { DashboardSidebar } from '@/app/components/Sidebar';
import { ApplicationList } from '@/app/components/ApplicationList';

const AdminApplicationPage = () => {
  return (
    <div className="flex h-screen">
      <DashboardSidebar userType="admin" />
      申請一覧
    </div>
  );
};

export default AdminApplicationPage;
