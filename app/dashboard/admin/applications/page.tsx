'use client'
import { DashboardSidebar } from '@/app/components/common/Sidebar';


const AdminApplicationPage = () => {
  return (
    <div className="flex h-screen">
      <DashboardSidebar userType="admin" />

      <div className="flex-1 p-8 bg-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">申請一覧</h1>
          <button className="btn btn-primary">新しい申請を作成する</button>
        </div>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">現在申請中の申請</h2>
          <div className="bg-white p-4 rounded shadow">
            {/* <ApplicationList status="ongoing" /> */}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">過去に申請した申請</h2>
          <div className="bg-white p-4 rounded shadow">
            {/* <ApplicationList status="completed" /> */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminApplicationPage;
