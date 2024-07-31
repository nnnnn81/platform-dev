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
        <li className="mb-2">
          <a href="#" className="block">申請一覧</a>
        </li>
        <li className="mb-2">
          <a href="#" className="block">お知らせ</a>
        </li>
        <li>
          <a href="#" className="block">各種設定</a>
        </li>
      </ul>
    </div>
  );
};
