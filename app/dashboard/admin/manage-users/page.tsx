import { DashboardSidebar } from '@/app/components/common/Sidebar';
import { ApplicationList } from '@/app/components/application/ApplicationList';

const ManageUserPage = () => {
  return (
    <div className="flex h-screen">
      <DashboardSidebar userType="admin" />
      <div className="flex-1 p-8 bg-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">ユーザ管理</h1>
        </div>

        <section className="mb-6">

          <h2 className="text-xl font-semibold mb-2">所属ユーザ</h2>
          <div className="bg-white p-4 rounded shadow">
            {/* <UserList status="ongoing" /> */}
          </div>
        </section>
        <section className="mb-6">

          <h2 className="text-xl font-semibold mb-2">ユーザを招待する</h2>
          <div className="bg-white p-4 rounded shadow">
            fo-mu
          </div>
        </section>
      </div>
    </div>
  );
};

export default ManageUserPage;
