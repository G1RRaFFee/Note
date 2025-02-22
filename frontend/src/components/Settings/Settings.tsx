import { JSX } from "react";

import { Cog } from "lucide-react";
import { Title } from "../Title/Title";

import styles from "./Settings.module.css";
import Link from "next/link";
import ROUTES from "@/constants/routes.constant";

export const Settings = (): JSX.Element => {
  return (
    <Link href={ROUTES.settings} className={styles.settings}>
      <Cog size={20} className={styles.icon} />
      <Title className={styles.title} size="m" text="Настройки" />
    </Link>
  );
};
