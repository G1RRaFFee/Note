"use client";

import {
  useState,
  ReactNode,
  Children,
  isValidElement,
  cloneElement,
} from "react";

import styles from "./Accordion.module.css";

interface AccordionProps {
  children: ReactNode;
  multiple?: boolean;
}

interface AccordionItemProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  headerClassName?: string;
}

export const Accordion = ({
  children,
  multiple = false,
}: AccordionProps): ReactNode => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenIndexes((prev) => {
      if (multiple) {
        return prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index];
      } else {
        return prev.includes(index) ? [] : [index];
      }
    });
  };

  return (
    <div>
      {Children.map(children, (child, index) => {
        if (!isValidElement<AccordionItemProps>(child)) return null;
        return cloneElement(child, {
          key: index,
          isOpen: openIndexes.includes(index),
          onToggle: () => toggleItem(index),
        });
      })}
    </div>
  );
};

export const AccordionItem = ({
  title,
  children,
  isOpen,
  icon,
  onToggle,
  headerClassName,
}: AccordionItemProps): ReactNode => {
  return (
    <div>
      <button className={headerClassName} onClick={onToggle}>
        <span>{title}</span>
        <span className={isOpen ? styles.rotateIcon : styles.defaultIcon}>
          {icon}
        </span>
      </button>
      {isOpen && <div>{children}</div>}
    </div>
  );
};
