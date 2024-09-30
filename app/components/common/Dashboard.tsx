export const DashboardContent = () => {
  return (
    <div className="flex-grow p-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">申請一覧</h2>
            {/* 申請一覧の内容 */}
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">お知らせ</h2>
            {/* お知らせの内容 */}
          </div>
        </div>
      </div>
    </div>
  );
};
