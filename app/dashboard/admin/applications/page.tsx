'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardSidebar } from '@/app/components/common/Sidebar';
import jwt from 'jsonwebtoken';

interface Application {
  id: number;
  purpose: string;
  amount: number;
  status: string;
  // その他のプロパティも必要に応じて追加
}

const AdminApplicationsPage = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        // トークンが存在しない場合はリダイレクト
        localStorage.removeItem('token');
        router.push('/'); // 適切なログインページにリダイレクト
        return;
      }

      try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        if (decoded.role === 'ADMIN') {
          setIsAdmin(true); // 管理者の場合
        } else {
          router.push('/dashboard/user'); // 管理者でない場合はホームにリダイレクト
        }
      } catch (error) {
        console.error('Token verification failed:', error);
        router.push('/dashboard/user'); // トークン検証に失敗した場合もリダイレクト
      }
    };

    checkAdmin();
  }, [router]);

  useEffect(() => {
    if (!isAdmin) return; // 管理者でない場合はデータを取得しない

    const fetchApplications = async () => {
      const response = await fetch('/api/applications/admin', {
        method: 'GET',
        headers: {
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
  }, [isAdmin]);

  const handleUpdateStatus = async (id: number, status: string) => {
    const response = await fetch(`/api/applications/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
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

  // ステータスがPENDINGの申請のみをフィルタリング
  const pendingApplications = applications.filter(app => app.status === 'PENDING');
  // ステータスがAPPROVEDまたはREJECTEDの申請をフィルタリング
  const historyApplications = applications.filter(app => app.status === 'APPROVED' || app.status === 'REJECTED');

  return (
    <div className="flex h-screen">
      <DashboardSidebar userType="user" />
      <div className="flex-1 p-8 bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">申請一覧</h1>

        {/* 現在申請中の申請 */}
        <h2 className="text-xl font-semibold mb-4">現在申請中</h2>
        <table className="min-w-full bg-white border border-gray-300 mb-6">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">用途</th>
              <th className="py-2 px-4 border-b">金額</th>
              <th className="py-2 px-4 border-b">ステータス</th>
              <th className="py-2 px-4 border-b">アクション</th>
            </tr>
          </thead>
          <tbody>
            {pendingApplications.map((application) => (
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

        {/* 履歴セクション */}
        <h2 className="text-xl font-semibold mb-4">申請履歴</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">用途</th>
              <th className="py-2 px-4 border-b">金額</th>
              <th className="py-2 px-4 border-b">ステータス</th>
            </tr>
          </thead>
          <tbody>
            {historyApplications.map((application) => (
              <tr key={application.id}>
                <td className="py-2 px-4 border-b">{application.purpose}</td>
                <td className="py-2 px-4 border-b">{application.amount}</td>
                <td className="py-2 px-4 border-b">{application.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminApplicationsPage;
