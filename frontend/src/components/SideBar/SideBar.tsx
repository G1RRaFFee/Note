"use client";

import { ReactNode } from "react";

import styles from "./SideBar.module.css";

interface SideBarProps {
  children: ReactNode;
}

export const SideBar = ({ children }: SideBarProps): ReactNode => {
  return <aside className={styles.aside}>{children}</aside>;
};
