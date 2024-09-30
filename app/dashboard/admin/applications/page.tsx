import { DashboardSidebar } from '@/app/components/common/Sidebar';
import { ApplicationList } from '@/app/components/application/ApplicationList';

const AdminApplicationPage = () => {
  return (
    <div className="flex h-screen">
      <DashboardSidebar userType="admin" />
      申請一覧
    </div>
  );
};

export default AdminApplicationPage;
