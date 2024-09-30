import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardSidebar } from '@/app/components/common/Sidebar';

const NewApplicationPage = () => {
  // フォームの状態を管理するフック
  const [purpose, setPurpose] = useState(''); // 用途
  const [amount, setAmount] = useState('');   // 金額
  const router = useRouter();

  // フォーム送信時の処理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // フォームのバリデーションチェック
    if (purpose.trim() === '' || amount.trim() === '') {
      alert('用途と金額を入力してください');
      return;
    }

    // 金額が数値かどうかを確認
    if (isNaN(Number(amount))) {
      alert('金額は数値で入力してください');
      return;
    }

    // 簡易的な申請データの送信（例: コンソール表示）
    console.log('申請内容:', { purpose, amount });

    // 申請が成功した後、申請一覧ページにリダイレクト
    router.push('/dashboard/user/applications');
  };

  return (
    <div className="flex-1 p-8 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">新しい申請を作成する</h1>

      {/* 申請フォーム */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="purpose" className="block text-lg font-medium mb-2">用途</label>
          <input
            type="text"
            id="purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            placeholder="例: 部活動で使う機材の購入"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="amount" className="block text-lg font-medium mb-2">金額</label>
          <input
            type="text"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            placeholder="例: 5000"
          />
        </div>

        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary">
            申請を作成する
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewApplicationPage;
