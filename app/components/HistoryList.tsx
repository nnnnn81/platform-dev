export const HistoryList = ({ history }: { history: Array<any> }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>申請ID</th>
            <th>ユーザー</th>
            <th>目的</th>
            <th>金額</th>
            <th>ステータス</th>
            <th>申請日</th>
            <th>更新日</th>
          </tr>
        </thead>
        <tbody>
          {history.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>{entry.user_id}</td>
              <td>{entry.purpose}</td>
              <td>{entry.amount}</td>
              <td>{entry.status}</td>
              <td>{new Date(entry.created_at).toLocaleDateString()}</td>
              <td>{new Date(entry.updated_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
