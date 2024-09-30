'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const ApplicationForm = () => {
  const router = useRouter();
  const [purpose, setPurpose] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 申請を送信するロジック
    router.push('/dashboard/user/applications'); // 申請後に申請状況のページへ遷移
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="目的"
        className="textarea textarea-bordered w-full mb-4"
        value={purpose}
        onChange={(e) => setPurpose(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="金額"
        className="input input-bordered w-full mb-4"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button type="submit" className="btn btn-primary w-full">申請する</button>
    </form>
  );
};
