import Link from "next/link";

type Props = {
  userType: 'user' | 'admin';
};

export const DashboardSidebar = ({ userType }: Props) => {
  return (
    <div className="bg-gray-800 text-white p-4 w-60 h-full">
      <div className="flex items-center mb-4">
        <span className="material-icons">account_circle</span>
        <span className="ml-2">{userType === 'user' ? 'User' : 'Admin'}</span>
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
          </>
        )}
      </ul>
    </div>
  );
};