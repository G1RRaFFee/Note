"use client";

import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "next/navigation";
import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import styles from "./SignIn.module.css";

interface LoginFormProps {
  handleIsLogin: (isLogin: boolean) => void;
}

const SignInForm: FC<LoginFormProps> = ({ handleIsLogin }) => {
  const { signIn, isLoading, error } = useAuthStore();
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  useEffect(() => {
    if (error) {
      // Автоскролл к ошибке
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [error]);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateEmail(credentials.email)) return;

    try {
      await signIn(credentials.email, credentials.password);
      router.push("/home");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const emailError = touched.email && !validateEmail(credentials.email);
  const passwordError = touched.password && credentials.password.length < 6;

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && (
        <div className={styles.errorBanner}>
          {typeof error === "string" ? error : "Authentication failed"}
        </div>
      )}

      <div className={styles.inputGroup}>
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          placeholder="Email"
          aria-invalid={emailError ? "true" : "false"}
          className={emailError ? styles.invalid : ""}
        />
        {emailError && (
          <span className={styles.validationError}>
            Please enter a valid email
          </span>
        )}
      </div>

      <div className={styles.inputGroup}>
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
          minLength={6}
          aria-invalid={passwordError ? "true" : "false"}
          className={passwordError ? styles.invalid : ""}
        />
        {passwordError && (
          <span className={styles.validationError}>
            Minimum 6 characters required
          </span>
        )}
      </div>

      <div className={styles.buttonGroup}>
        <button
          type="button"
          onClick={() => handleIsLogin(false)}
          disabled={isLoading}
          className={styles.secondaryButton}
        >
          Create Account
        </button>

        <button
          type="submit"
          disabled={isLoading || !validateEmail(credentials.email)}
          className={styles.primaryButton}
        >
          {isLoading ? "Signing In..." : "Sign In"}
          {isLoading && <span className={styles.spinner} />}
        </button>
      </div>
    </form>
  );
};

export default SignInForm;
