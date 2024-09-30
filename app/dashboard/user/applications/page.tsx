import { DashboardSidebar } from '@/app/components/common/Sidebar';
import { ApplicationList } from '@/app/components/application/ApplicationList';
import Link from 'next/link';

const UserApplicationPage = () => {

  const dummyApplications = [
    {
      id: 1,
      purpose: '部活動の機材購入',
      amount: 5000,
      status: '申請中',
      created_at: '2023-09-01T12:34:56Z',
    },
    {
      id: 2,
      purpose: 'イベント会場のレンタル費用',
      amount: 15000,
      status: '承認済み',
      created_at: '2023-08-21T08:22:34Z',
    },
    {
      id: 3,
      purpose: '備品の購入',
      amount: 3000,
      status: '却下',
      created_at: '2023-08-15T14:12:30Z',
    },
  ];
  return (
    <div className="flex h-screen">
      <DashboardSidebar userType="user" />

      <div className="flex-1 p-8 bg-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">申請一覧</h1>
          <Link href="applications/new" className="btn btn-primary">新しい申請を作成する</Link>
        </div>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">現在申請中</h2>
          <div className="bg-white p-4 rounded shadow">
            <ApplicationList applications={dummyApplications} />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">過去の申請</h2>
          <div className="bg-white p-4 rounded shadow">
            <ApplicationList applications={dummyApplications} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserApplicationPage;
