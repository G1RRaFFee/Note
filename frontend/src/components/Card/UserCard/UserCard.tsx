"use client";

import { JSX } from "react";

import { useAuthStore } from "@/store/auth.store";

export const UserCard = (): JSX.Element => {
  const { user } = useAuthStore();
  console.log(user);
  return (
    <div>
      {user.username}
      {user.email}
    </div>
  );
};
