'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // useRouterをインポート
import Link from 'next/link';

export const DashboardContent = () => {
  const router = useRouter(); // useRouterフックを使用
  const [userRole, setUserRole] = useState<string>(''); // ユーザーの役割を格納
  const [applications, setApplications] = useState<any[]>([]); // 申請データ
  const [totalAmount, setTotalAmount] = useState<number>(0); // 合計金額
  const [notifications, setNotifications] = useState<any[]>([]); // お知らせデータ

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        // ユーザー情報を取得
        const response = await fetch('/api/users', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUserRole(userData.role); // ユーザーの役割を設定

          // ダッシュボードにリダイレクト
          if (userData.role === 'USER') {
            router.push('/dashboard/user'); // ユーザー用ダッシュボード
          } else if (userData.role === 'ADMIN') {
            router.push('/dashboard/admin'); // 管理者用ダッシュボード
          }

          // 申請履歴を取得
          const appResponse = await fetch(userData.role === 'ADMIN' ? '/api/applications/admin' : `/api/applications`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (appResponse.ok) {
            const appData = await appResponse.json();
            setApplications(appData);

            // 合計金額を計算
            const approvedApps = appData.filter((app: any) => app.status === 'APPROVED');
            const total = approvedApps.reduce((acc: number, app: any) => acc + app.amount, 0);
            setTotalAmount(total);
          }

          // お知らせを取得
          const notifResponse = await fetch(`/api/notifications`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (notifResponse.ok) {
            const notifData = await notifResponse.json();
            setNotifications(notifData);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [router]);

  // userRoleがセットされるまでダッシュボードを表示しない
  if (!userRole) return <div>Loading...</div>;

  return (
    <div className="flex-grow p-6 bg-gray-100">
      <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-bold text-center text-blue-600">承認された申請の合計金額</h2>
        <p className="text-2xl font-semibold text-center text-green-500">¥{totalAmount}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="card bg-base-100 shadow-xl mt-4">
          <div className="card-body">
            <h2 className="card-title text-center">申請一覧</h2>
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 border">用途</th>
                  <th className="py-2 px-4 border">金額</th>
                  <th className="py-2 px-4 border">ステータス</th>
                </tr>
              </thead>
              <tbody>
                {applications.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4">申請がありません</td>
                  </tr>
                ) : (
                  applications.map((application) => (
                    <tr key={application.id} className={application.status === 'APPROVED' ? 'bg-green-100' : application.status === 'REJECTED' ? 'bg-red-100' : 'bg-yellow-100'}>
                      {userRole === 'ADMIN' && <td className="py-2 px-4 border">{application.userName}</td>}
                      <td className="py-2 px-4 border">
                        <Link
                          href={userRole === 'ADMIN' ? `admin/applications/${application.id}` : `user/applications/${application.id}`} // 役割に応じたリンク先
                          className="text-blue-500 hover:underline"
                        >
                          {application.purpose}
                        </Link> {/* リンクを追加 */}
                      </td>
                      <td className="py-2 px-4 border">¥{application.amount}</td>
                      <td className="py-2 px-4 border">{application.status}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl mt-4">
          <div className="card-body">
            <h2 className="card-title text-center">お知らせ</h2>
            <ul>
              {notifications.length === 0 ? (
                <p>お知らせはありません</p>
              ) : (
                notifications.filter(notification => !notification.isRead).map((notification) => (
                  <li key={notification.id} className="flex justify-between py-2 border-b">
                    <span>・{notification.message}</span>
                    <span className="text-xs text-gray-400">
                      {new Date(notification.createdAt).toLocaleString()} {/* 日付のフォーマット */}
                    </span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
