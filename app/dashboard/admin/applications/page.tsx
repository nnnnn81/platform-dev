'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { NextResponse } from 'next/server';
import { DashboardSidebar } from '@/app/components/common/Sidebar';
interface Application {
  id: number;
  purpose: string;
  amount: number;
  status: string;
  // その他のプロパティも必要に応じて追加
}

const AdminApplicationsPage = () => {
  const [applications, setApplications] = useState<Application[]>([]);

  const router = useRouter();


  useEffect(() => {
    // ダミーデータを使用してアプリケーションリストを設定
    const dummyData: Application[] = [
      { id: 1, purpose: 'イベント費用', amount: 5000, status: 'PENDING' },
      { id: 2, purpose: '備品購入', amount: 3000, status: 'PENDING' },
      { id: 3, purpose: '旅行費用', amount: 10000, status: 'APPROVED' },
      { id: 4, purpose: '研修参加費', amount: 15000, status: 'REJECTED' },
    ];

    setApplications(dummyData);

    // もしAPIからデータを取得する場合は、以下のコードを使用
    // const fetchApplications = async () => {
    //   const response = await fetch('/api/applications/admin'); // すべての申請を取得
    //   if (response.ok) {
    //     const data = await response.json();
    //     setApplications(data);
    //   } else {
    //     console.error('Error fetching applications:', response.statusText);
    //   }
    // };
    // fetchApplications();
  }, []);

  const handleUpdateStatus = async (id: number, status: string) => {
    const response = await fetch(`/api/applications/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    if (response.ok) {
      const updatedApplication = await response.json();
      if (updatedApplication && updatedApplication.id) {
        // ステータスが正常に更新された場合のみアプリケーションリストを更新
        setApplications((prev) =>
          prev.map((app) => (app.id === id ? updatedApplication : app))
        );
      } else {
        console.error('Invalid response format:', updatedApplication);
      }
    } else {
      console.error('Error updating application:', response.statusText);
    }
  };


  return (
    <div className="flex h-screen">
      <DashboardSidebar userType="user" />
      <div className="flex-1 p-8 bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">申請一覧</h1>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">用途</th>
              <th className="py-2 px-4 border-b">金額</th>
              <th className="py-2 px-4 border-b">ステータス</th>
              <th className="py-2 px-4 border-b">アクション</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.id}>
                <td className="py-2 px-4 border-b">{application.purpose}</td>
                <td className="py-2 px-4 border-b">{application.amount}</td>
                <td className="py-2 px-4 border-b">{application.status}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleUpdateStatus(application.id, 'APPROVED')}
                    className="mr-2 text-green-600 hover:underline"
                  >
                    承認
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(application.id, 'REJECTED')}
                    className="text-red-600 hover:underline"
                  >
                    却下
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminApplicationsPage;
