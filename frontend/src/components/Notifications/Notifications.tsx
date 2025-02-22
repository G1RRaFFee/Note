"use client";

import { JSX } from "react";

import { CalendarDays } from "lucide-react";
import { Title } from "../Title/Title";

import styles from "./Notifications.module.css";
import Link from "next/link";
import ROUTES from "@/constants/routes.constant";
// import { useNotifications } from "@/hooks/notifications.hook";

export const Notifications = (): JSX.Element => {
  // const { notifications } = useNotifications();
  return (
    <Link href={ROUTES.notifications} className={styles.events}>
      <CalendarDays size={20} className={styles.icon} />
      <Title className={styles.title} size="m" text="Предстоящее событие" />
      <span className={styles.eventsCount}>2</span>
    </Link>
  );
};
