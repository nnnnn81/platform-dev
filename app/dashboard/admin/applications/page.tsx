'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardSidebar } from '@/app/components/common/Sidebar';
import jwt from 'jsonwebtoken';

interface Application {
  id: number;
  userId: number;
  purpose: string;
  amount: number;
  status: string;
}

const AdminApplicationsPage = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        // トークンが存在しない場合はログアウト処理
        localStorage.removeItem('token');
        router.push('/'); // ログインページにリダイレクト
        return;
      }

      // 既存のユーザー情報を取得するAPIを利用
      try {
        const response = await fetch('/api/users', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();

          // 管理者かどうかを確認
          if (userData.role === 'ADMIN') {
            setIsAdmin(true);

            // 申請データを取得する処理
            const fetchApplications = async () => {
              const appResponse = await fetch('/api/applications/admin', {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${token}`,
                },
              });
              if (appResponse.ok) {
                const appData = await appResponse.json();
                setApplications(appData);
              } else {
                console.error('Error fetching applications:', appResponse.statusText);
              }
            };

            fetchApplications();
          } else {
            // 管理者でない場合はユーザーダッシュボードにリダイレクト
            router.push('/dashboard/user');
          }
        } else {
          // ユーザー情報の取得に失敗した場合
          console.error('Error fetching user data:', response.statusText);
          router.push('/dashboard/user');
        }
      } catch (error) {
        console.error('Error verifying admin status:', error);
        router.push('/dashboard/user');
      }
    };

    checkAdmin();
  }, [router]);



  const handleUpdateStatus = async (id: number, userId: number, status: string) => {
    const response = await fetch(`/api/applications/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ status }),
    });

    const response2 = await fetch(`/api/notifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ userId: userId, message: `申請が${status}されました` }),
    });

    if (response.ok && response2.ok) {
      const updatedApplication = await response.json();
      if (updatedApplication && updatedApplication.id) {
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
      <DashboardSidebar userType="admin" />
      <div className="flex-1 p-8 bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">申請一覧</h1>

        {/* 現在申請中の申請 */}
        <h2 className="text-xl font-semibold mb-4">承認待ち</h2>
        {pendingApplications.length === 0 ? (
          <p className="text-gray-500">現在、承認待ちの申請はありません。</p>
        ) : (
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
                    <div className='flex space-x-2'>

                      <button
                        onClick={() => handleUpdateStatus(application.id, application.userId, 'APPROVED')}
                        className="mr-2 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 flex items-center"
                      >
                        <span className="material-icons mr-1">check_circle</span>
                        承認
                      </button>

                      <button
                        onClick={() => handleUpdateStatus(application.id, application.userId, 'REJECTED')}
                        className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 flex items-center"
                      >
                        <span className="material-icons mr-1">cancel</span>
                        却下
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* 履歴セクション */}
        <h2 className="text-xl font-semibold mb-4">申請履歴</h2>
        {historyApplications.length === 0 ? (
          <p className="text-gray-500">申請履歴はありません。</p>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default AdminApplicationsPage;
