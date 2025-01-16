import { CSSProperties, ReactNode } from "react";

interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor?: (item: T, index: number) => string | number;
  onItemClick?: (item: T, index: number) => void;
  className?: string;
  style?: CSSProperties;
}

export const List = <T,>({
  items,
  renderItem,
  keyExtractor,
  onItemClick,
  className,
  style,
}: ListProps<T>) => {
  return (
    <ul className={className} style={style}>
      {items.map((item, index) => (
        <li
          key={keyExtractor ? keyExtractor(item, index) : index}
          onClick={() => onItemClick?.(item, index)}
          style={{ cursor: onItemClick ? "pointer" : undefined }}
        >
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
};
