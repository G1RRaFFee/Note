import { HTMLAttributes, ReactNode } from "react";

interface ActionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const Action = ({ className, children }: ActionProps): ReactNode => {
  return <div className={className}>{children}</div>;
};
