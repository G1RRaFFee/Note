"use client";

import SignInForm from "@/components/SignInForm/SignInForm";
import SignUpForm from "@/components/SignUpForm/SignUpForm";

import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

import styles from "./page.module.css";

const HomePage: FC = () => {
  const { checkAuth, isAuthenticated } = useAuthStore();
  const [isLogin, setIslogin] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkAuth();
    }
    if (isAuthenticated) router.push("/home");
  }, []);

  return (
    <main className={styles.main}>
      {isLogin ? (
        <SignInForm handleIsLogin={setIslogin} />
      ) : (
        <SignUpForm handleIsLogin={setIslogin} />
      )}
    </main>
  );
};

export default HomePage;
