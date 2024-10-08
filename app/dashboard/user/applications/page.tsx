'use client';
import { DashboardSidebar } from '@/app/components/common/Sidebar';
import { ApplicationList } from '@/app/components/application/ApplicationList';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Application {
  id: number;
  purpose: string;
  amount: number;
  status: string;
}

const UserApplicationPage = () => {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const response = await fetch('/api/applications', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setApplications(data);
      } else {
        console.error('Error fetching applications:', response.statusText);
      }
    };
    fetchApplications();
  }, []);

  const pendingApplications = applications.filter(app => app.status === 'PENDING');
  const pastApplications = applications.filter(app => app.status !== 'PENDING');

  return (
    <div className="flex h-screen">
      <DashboardSidebar userType="user" />

      <div className="flex-1 p-8 bg-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">申請一覧</h1>
          <Link href="applications/new" className="btn btn-primary">新しい申請を作成する</Link>
        </div>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">現在申請中</h2>
          <div className="bg-white p-4 rounded shadow">
            {pendingApplications.length === 0 ? (
              <p className="text-gray-500">現在、申請中のものはありません。</p>
            ) : (
              <ApplicationList applications={pendingApplications} />
            )}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">過去の申請</h2>
          <div className="bg-white p-4 rounded shadow">
            {pastApplications.length === 0 ? (
              <p className="text-gray-500">過去の申請はありません。</p>
            ) : (
              <ApplicationList applications={pastApplications} />
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserApplicationPage;
