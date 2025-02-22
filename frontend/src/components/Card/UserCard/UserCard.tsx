"use client";
// FIXME: "User Card блокирует рендер."
import { JSX } from "react";
import Image from "next/image";

import styles from "./UserCard.module.css";
import Link from "next/link";
import { UserDto } from "@/types/user/user.type";

interface UserCardProps {
  user: UserDto.User;
}

export const UserCard = ({ user }: UserCardProps): JSX.Element => {
  if (!user) return;
  return (
    <>
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
      <hr className={styles.divider} />
    </>
  );
};
