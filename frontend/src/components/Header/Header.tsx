import { HTMLAttributes, ReactNode } from "react";

import styles from "./Header.module.css";

interface HeaderProps extends HTMLAttributes<HTMLElement> {
  customProps?: string;
}

export const Header = ({ children, ...props }: HeaderProps): ReactNode => {
  return (
    <header className={styles.header} {...props}>
      {children}
    </header>
  );
};
