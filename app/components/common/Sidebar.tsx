'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  userType: 'user' | 'admin';
};

export const DashboardSidebar = ({ userType }: Props) => {
  const [username, setUsername] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/");
        return;
      }

      try {
        // API からユーザー情報を取得
        const response = await fetch('/api/users', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUsername(userData.name);  // ユーザー名をステートに設定
        } else {
          console.error('Failed to fetch user info:', response.statusText);
          router.push("/"); // エラー時にはホームにリダイレクト
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        router.push("/"); // エラー時にはホームにリダイレクト
      }
    };

    fetchUserInfo();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  }

  return (
    <div className="bg-gray-800 text-white p-4 w-60 h-full">
      {/* ユーザー情報を表示 */}
      <div className="flex items-center mb-4">
        <span className="material-icons">account_circle</span>
        <span className="ml-2">
          {username || 'ユーザー名を取得中...'}
        </span>
      </div>

      <ul>
        {/* 共通メニュー */}
        <li className="mb-2">
          <Link href={userType === 'user' ? "/dashboard/user" : "/dashboard/admin"} className="block">
            ホーム
          </Link>
        </li>

        {/* ユーザー専用メニュー */}
        {userType === 'user' && (
          <>
            <li className="mb-2">
              <Link href="/dashboard/user/applications" className="block">申請一覧</Link>
            </li>
            <li className="mb-2">
              <Link href="/dashboard/user/notifications" className="block">お知らせ</Link>
            </li>
            <li>
              <Link href="/dashboard/user/setting" className="block">各種設定</Link>
            </li>
            <li>
              <button className="mb-2" onClick={handleLogout}>ログアウト</button>
            </li>
          </>
        )}

        {/* 管理者専用メニュー */}
        {userType === 'admin' && (
          <>
            <li className="mb-2">
              <Link href="/dashboard/admin/applications" className="block">申請一覧</Link>
            </li>
            <li className="mb-2">
              <Link href="/dashboard/admin/notifications" className="block">お知らせ</Link>
            </li>
            <li className="mb-2">
              <Link href="/dashboard/admin/manage-users" className="block">ユーザー管理</Link>
            </li>
            <li className="mb-2">
              <Link href="/dashboard/admin/setting" className="block">管理者設定</Link>
            </li>
            <li>
              <button className="mb-2" onClick={handleLogout}>ログアウト</button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};
