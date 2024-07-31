'use client';
import { useRouter } from 'next/navigation';

export const SignupForm = () => {
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // サインアップ処理を追加
    router.push('/dashboard/user'); // サインアップ成功後にユーザーのダッシュボードへ遷移
  };

  return (
    <form onSubmit={handleSignup}>
      <input type="text" placeholder="Name" className="input input-bordered w-full mb-4" required />
      <input type="email" placeholder="Email" className="input input-bordered w-full mb-4" required />
      <input type="password" placeholder="Password" className="input input-bordered w-full mb-4" required />
      <button type="submit" className="btn btn-primary w-full">Signup</button>
    </form>
  );
};
