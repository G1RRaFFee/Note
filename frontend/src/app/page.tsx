"use client";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SignInForm from "@/components/SignInForm/SignInForm";
import SignUpForm from "@/components/SignUpForm/SignUpForm";
import styles from "./page.module.css";
import { useAuthStore } from "@/stores/auth.store";

const HomePage: FC = () => {
  const { checkAuth, isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        await checkAuth();
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, [checkAuth]);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/home");
    }
  }, [isAuthenticated, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className={styles.main}>
      {isLogin ? (
        <SignInForm handleIsLogin={setIsLogin} />
      ) : (
        <SignUpForm handleIsLogin={setIsLogin} />
      )}
    </main>
  );
};

export default HomePage;
