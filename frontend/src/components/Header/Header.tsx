import { HTMLAttributes, ReactNode } from "react";

interface HeaderProps extends HTMLAttributes<HTMLElement> {
  customProps?: string;
}

export const Header = ({ children, ...props }: HeaderProps): ReactNode => {
  return <header {...props}>{children}</header>;
};
