export const ApplicationList = ({ applications }: { applications: Array<any> }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>申請ID</th>
            <th>目的</th>
            <th>金額</th>
            <th>ステータス</th>
            <th>申請日</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application.id}>
              <td>{application.id}</td>
              <td>{application.purpose}</td>
              <td>{application.amount}</td>
              <td>{application.status}</td>
              <td>{new Date(application.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
