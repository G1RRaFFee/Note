import { ReactNode } from "react";

interface NotificationLayoutProps {
  children: ReactNode;
}

const NotificationLayout = ({
  children,
}: NotificationLayoutProps): ReactNode => {
  const notificationMock = [
    {
      id: 1,
      folderId: 1,
      firstName: "Анна",
      lastName: "Иванова",
      message: "День рождения",
    },
  ];
  return (
    <>
      <div>
        <ul>
          {notificationMock.map((notification) => (
            <li key={notification.id}>
              {notification.lastName}
              {notification.firstName}
              {notification.message}
            </li>
          ))}
        </ul>
      </div>
      {children}
    </>
  );
};

export default NotificationLayout;
