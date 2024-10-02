export const ApprovalList = ({ applications }: { applications: Array<any> }) => {
  const handleApproval = (id: number, status: 'approved' | 'rejected') => {
    承認または拒否のロジックを追加
  };

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>申請ID</th>
            <th>ユーザー</th>
            <th>目的</th>
            <th>金額</th>
            <th>申請日</th>
            <th>アクション</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application.id}>
              <td>{application.id}</td>
              <td>{application.user_id}</td>
              <td>{application.purpose}</td>
              <td>{application.amount}</td>
              <td>{new Date(application.created_at).toLocaleDateString()}</td>
              <td>
                <button
                  className="btn btn-success btn-sm mr-2"
                  onClick={() => handleApproval(application.id, 'approved')}
                >
                  承認
                </button>
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => handleApproval(application.id, 'rejected')}
                >
                  拒否
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
