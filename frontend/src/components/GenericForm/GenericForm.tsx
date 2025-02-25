"use client";

import React, { ReactNode } from "react";
import {
  UseFormHandleSubmit,
  FieldValues,
  SubmitHandler,
} from "react-hook-form";

interface GenericFormProps<T extends FieldValues> {
  onSubmit: SubmitHandler<T>;
  handleSubmit: UseFormHandleSubmit<T>;
  children: ReactNode;
  className?: string;
}

const GenericForm = <T extends FieldValues>({
  onSubmit,
  handleSubmit,
  children,
  className,
}: GenericFormProps<T>): ReactNode => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      {children}
      <button type="submit">Сохранить</button>
    </form>
  );
};

export default GenericForm;
