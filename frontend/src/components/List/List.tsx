import { HTMLAttributes, ReactNode } from "react";

interface ListProps<T> extends HTMLAttributes<HTMLElement> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor?: (item: T, index: number) => string | number;
  onItemClick?: (item: T, index: number) => void;
  listClassName?: string;
  itemClassName?: string;
}

export const List = <T,>({
  items,
  renderItem,
  keyExtractor,
  onItemClick,
  style,
  listClassName,
  itemClassName,
  ...props
}: ListProps<T>): ReactNode => {
  return (
    <ul className={listClassName} style={style} {...props}>
      {items.map((item, index) => (
        <li
          key={keyExtractor ? keyExtractor(item, index) : index}
          onClick={() => onItemClick?.(item, index)}
          style={{ cursor: onItemClick ? "pointer" : undefined }}
          className={itemClassName}
        >
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
};
