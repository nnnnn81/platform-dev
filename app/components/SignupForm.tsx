export const SignupForm = () => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Signup</h2>
        <input type="text" placeholder="Name" className="input input-bordered w-full mb-4" />
        <input type="email" placeholder="Email" className="input input-bordered w-full mb-4" />
        <input type="password" placeholder="Password" className="input input-bordered w-full mb-4" />
        <button className="btn btn-primary w-full">Signup</button>
      </div>
    </div>
  );
};
