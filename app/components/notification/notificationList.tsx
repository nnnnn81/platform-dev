'use client'
import { useEffect, useState } from 'react';

// 通知の型を定義
interface Notification {
  id: number;
  userId: number;
  message: string;
  isRead: boolean;
  createdAt: string; // 日付形式は後で変換
}

export const NotificationList = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // 通知データを取得
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`/api/notifications`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });
        if (response.ok) {
          const data = await response.json();
          setNotifications(data);
        } else {
          console.error('Failed to fetch notifications:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  // 通知を既読にする関数
  const handleMarkAsRead = async (id: number) => {
    try {
      const response = await fetch(`/api/notifications/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ isRead: true }),
      });

      if (response.ok) {
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) =>
            notification.id === id ? { ...notification, isRead: true } : notification
          )
        );
      } else {
        console.error('Failed to mark notification as read:', response.statusText);
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <div>
      {notifications.length === 0 ? (
        <p className="text-gray-500">現在表示するお知らせはありません。</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li key={notification.id} className={`p-4 border rounded bg-white shadow ${notification.isRead ? 'opacity-50' : ''}`}>
              <p className="text-gray-700 mb-2">{notification.message}</p>
              <p className="text-sm text-gray-500">
                作成日: {new Date(notification.createdAt).toLocaleDateString()}
              </p>
              {!notification.isRead && (
                <button
                  onClick={() => handleMarkAsRead(notification.id)}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  既読にする
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
