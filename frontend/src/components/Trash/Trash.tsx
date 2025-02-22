"use client";

import { JSX } from "react";

import { Trash2 } from "lucide-react";
import { Title } from "../Title/Title";

import styles from "./Trash.module.css";
import Link from "next/link";
import ROUTES from "@/constants/routes.constant";

export const Trash = (): JSX.Element => {
  return (
    <Link href={ROUTES.trash} className={styles.trash}>
      <Trash2 size={20} className={styles.icon} />
      <Title className={styles.title} size="m" text="Корзина" />
    </Link>
  );
};
