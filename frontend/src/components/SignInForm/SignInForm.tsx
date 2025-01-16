"use client";

import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { ChangeEvent, FC, FormEvent, useState } from "react";

import styles from "./SignIn.module.css";

interface LoginFormProps {
  handleIsLogin: (isLogin: boolean) => void;
}

const LoginForm: FC<LoginFormProps> = ({ handleIsLogin }) => {
  const { signIn } = useAuthStore();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const response = await signIn(credentials.email, credentials.password);
    if (response) router.push("/home");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        name="email"
        value={credentials.email}
        onChange={handleChange}
        placeholder="email"
      />
      <input
        type="password"
        name="password"
        value={credentials.password}
        onChange={handleChange}
        placeholder="password"
      />
      <div className={styles.buttonWrapper}>
        <button onClick={() => handleIsLogin(false)}>SignUp</button>
        <button type="submit">SignIn</button>
      </div>
    </form>
  );
};

export default LoginForm;
