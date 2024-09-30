'use client';
import { useRouter } from 'next/navigation';

export const LoginForm = () => {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // ログイン処理を追加
    router.push('/dashboard/user'); // ログイン成功後にユーザーのダッシュボードへ遷移
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="text" placeholder="Email" className="input input-bordered w-full mb-4" required />
      <input type="password" placeholder="Password" className="input input-bordered w-full mb-4" required />
      <button type="submit" className="btn btn-primary w-full">Login</button>
    </form>
  );
};
