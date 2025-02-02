import { HTMLAttributes, ReactNode } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  customProps?: string;
}

export const Container = ({
  children,
  ...props
}: ContainerProps): ReactNode => {
  return <div {...props}>{children}</div>;
};
