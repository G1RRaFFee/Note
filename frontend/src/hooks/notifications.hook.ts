import { notificationService } from "@/services/notification.service";
import { useEffect, useState } from "react";

import { Notification } from "@/types/notification/entity.type";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  useEffect(() => {
    const handleNotifications = (newNotifications: Notification[]) => {
      setNotifications(newNotifications);
    };

    notificationService.addListener(handleNotifications);

    return () => {
      notificationService.removeListener(handleNotifications);
    };
  }, []);
  return { notifications };
};
