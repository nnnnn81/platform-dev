import { DashboardSidebar } from '@/app/components/common/Sidebar';

const AdminSettingPage = () => {
  return (
    <div className="flex h-screen">
      <DashboardSidebar userType="admin" />
      <div className="flex-1 p-8 bg-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">設定
          </h1>
        </div>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">メールアドレスの変更</h2>
          <div className="bg-white p-4 rounded shadow">
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">団体から抜ける</h2>
          <div className="bg-white p-4 rounded shadow">
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminSettingPage;
