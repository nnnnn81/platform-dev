'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

type Notification = {
  id: number;
  message: string;
  isRead: boolean;
  createdAt: string;
  application?: {
    id: number;
    purpose: string;
    amount: number;
  };
};

export const NotificationList = ({ notifications }: { notifications: Notification[] }) => {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);


  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;


        const response = await fetch('/api/users', {

          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserRole(data.role);
        } else {
          console.error('Failed to fetch user role');
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchUserRole();
  }, []);


  const handleNotificationClick = async (notificationId: number, applicationId: number | undefined) => {
    try {
      await fetch(`/api/notifications/${notificationId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (userRole === 'ADMIN') {

        if (applicationId) {
          router.push(`/dashboard/admin/applications/${applicationId}`);
        } else {
          router.push(`/dashboard/admin/applications`);
        }
      } else {
        if (applicationId) {
          router.push(`/dashboard/user/applications/${applicationId}`);
        } else {
          router.push(`/dashboard/user/applications`);
        }
      }
    } catch (error) {
      console.error('Error updating notification status:', error);
    }
  };

  return (
    <div>
      {notifications.length === 0 ? (
        <p>お知らせはありません</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`p-4 mb-2 cursor-pointer ${notification.isRead ? 'bg-gray-200' : 'bg-white'
                }`}
              onClick={() => handleNotificationClick(notification.id, notification.application?.id)}
            >
              <p className="font-bold">{notification.message}</p>
              {notification.application && (
                <div className="text-sm text-gray-600">
                  <p>申請ID: {notification.application.id}</p>
                  <p>目的: {notification.application.purpose}</p>
                  <p>金額: ¥{notification.application.amount}</p>
                </div>
              )}
              <span className="text-xs text-gray-400">
                {new Date(notification.createdAt).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
