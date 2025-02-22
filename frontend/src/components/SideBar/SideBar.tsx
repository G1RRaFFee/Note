"use client";

import { HTMLAttributes, ReactNode } from "react";

interface SideBarProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const SideBar = ({
  children,
  className,
  ...props
}: SideBarProps): ReactNode => {
  return (
    <aside {...props} className={className}>
      {children}
    </aside>
  );
};
