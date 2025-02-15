"use client";
// FIXME: "User Card блокирует рендер."
import { JSX, useEffect, useState } from "react";
import Image from "next/image";
import AuthService from "@/services/auth.service";

import styles from "./UserCard.module.css";
import Link from "next/link";

export const UserCard = (): JSX.Element => {
  const [user, setUser] = useState<{
    id: number;
    username: string;
    avatarUrl?: string;
  } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { statusCode, data } = await AuthService.getMe();
      console.log(data);
      if (statusCode === 200) {
        setUser(data);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <section className={styles.card}>
      <Link href={`contacts/me`} className={styles.link}>
        <Image
          className={styles.image}
          src={user.avatarUrl}
          alt="User image"
          width={40}
          height={40}
        />
        <span className={styles.contentWrapper}>
          {user.username}
          <span className={styles.details}>Ваша карточка</span>
        </span>
      </Link>
    </section>
  );
};
