'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { DashboardSidebar } from '@/app/components/common/Sidebar';

type ApplicationDetailProps = {
  id: number;
  userId: number;
  purpose: string;
  amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    name: string;
  };
};

const ApplicationDetailPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [application, setApplication] = useState<ApplicationDetailProps | null>(null);

  useEffect(() => {
    if (!id) {
      router.push('/dashboard/user/applications');
      return;
    }

    const fetchApplicationDetail = async () => {
      try {
        const res = await fetch(`/api/applications/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setApplication(data);
        } else {
          console.error('Failed to fetch application details');
          router.push('/dashboard/user/applications');
        }
      } catch (error) {
        console.error('Error fetching application details:', error);
        router.push('/dashboard/user/applications');
      }
    };

    fetchApplicationDetail();
  }, [id, router]);

  if (!application) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      <DashboardSidebar userType="user" />
      <div className="flex-1 p-8 bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">申請詳細</h1>
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">申請ID: {application.id}</h2>
          <p className="mb-2"><strong>用途:</strong> {application.purpose}</p>
          <p className="mb-2"><strong>金額:</strong> ¥{application.amount}</p>
          <p className="mb-2"><strong>ステータス:</strong> {application.status}</p>
          {/* その他の情報を必要に応じて追加 */}
        </div>
        <button
          onClick={() => router.push('/dashboard/admin/applications')}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          戻る
        </button>
      </div>
    </div>
  );
};

export default ApplicationDetailPage;
