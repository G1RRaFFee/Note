import { JSX, CSSProperties, FC } from "react";

interface TitleProps {
  size?: "xs" | "s" | "m" | "l" | "xl" | "2xl";
  text: string;
  className?: string;
  style?: CSSProperties;
}

export const Title: FC<TitleProps> = ({
  size = "m",
  text,
  className = "",
  style,
}) => {
  const sizeToLevel = {
    xs: 6,
    s: 5,
    m: 4,
    l: 3,
    xl: 2,
    "2xl": 1,
  };

  const level: number = sizeToLevel[size];
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  const sizeClasses = {
    xs: "text-xs",
    s: "text-sm",
    m: "text-base",
    l: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
  };

  const sizeClass: string = sizeClasses[size];

  const combinedClassName: string = `${sizeClass} ${className}`.trim();

  return (
    <Tag className={combinedClassName} style={style}>
      {text}
    </Tag>
  );
};
