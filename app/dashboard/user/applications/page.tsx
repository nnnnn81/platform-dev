'use client'
import { DashboardSidebar } from '@/app/components/common/Sidebar';
import { ApplicationList } from '@/app/components/application/ApplicationList';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Application {
  id: number;
  purpose: string;
  amount: number;
  status: string;
  // その他のプロパティも必要に応じて追加
}

const UserApplicationPage = () => {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    // ダミーデータを使用してアプリケーションリストを設定
    // const dummyData: Application[] = [
    //   { id: 1, purpose: 'イベント費用', amount: 5000, status: 'PENDING' },
    //   { id: 2, purpose: '備品購入', amount: 3000, status: 'PENDING' },
    //   { id: 3, purpose: '旅行費用', amount: 10000, status: 'APPROVED' },
    //   { id: 4, purpose: '研修参加費', amount: 15000, status: 'REJECTED' },
    // ];

    // setApplications(dummyData);

    const fetchApplications = async () => {
      const response = await fetch('/api/applications', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      }); // すべての申請を取得
      if (response.ok) {
        const data = await response.json();
        setApplications(data);
      } else {
        console.error('Error fetching applications:', response.statusText);
      }
    };
    fetchApplications();
  }, []);

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
            <ApplicationList applications={applications} />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">過去の申請</h2>
          <div className="bg-white p-4 rounded shadow">
            <ApplicationList applications={applications} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserApplicationPage;
