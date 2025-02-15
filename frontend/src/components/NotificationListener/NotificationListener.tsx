"use client";

import { useEffect, useState } from "react";

export default function NotificationListener() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource(
      "http://localhost:5000/api/notifications/stream"
    );

    eventSource.onmessage = (event) => {
      console.log("Пришло уведомление:", event.data);
      const newNotification = JSON.parse(event.data);
      setNotifications((prev) => [...prev, newNotification]);
    };

    eventSource.onerror = (error) => {
      console.error("Ошибка SSE:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h2>Уведомления</h2>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((n, index) => (
            <li key={index}>
              {n.name} — День рождения {n.date}
            </li>
          ))}
        </ul>
      ) : (
        <p>Нет уведомлений</p>
      )}
    </div>
  );
}
