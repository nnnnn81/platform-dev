'use client'
import { DashboardSidebar } from '@/app/components/common/Sidebar';
import { NotificationList } from '@/app/components/notification/notificationList';
import { useEffect, useState } from 'react';
type Notification = {
  id: number;
  userId: number;
  message: string;
  isRead: boolean;
  createdAt: string;
  application?: {
    id: number;
    purpose: string;
    amount: number;
  };
};
const UserNotificationPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/notifications', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      } else {
        console.error('Failed to fetch notifications');
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);
  return (
    <div className="flex h-screen">
      <DashboardSidebar userType="user" />

      <div className="flex-1 p-8 bg-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">お知らせ</h1>
        </div>

        <section className="mb-6">

          <div className="bg-white p-4 rounded shadow">
            <NotificationList notifications={notifications} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserNotificationPage;
