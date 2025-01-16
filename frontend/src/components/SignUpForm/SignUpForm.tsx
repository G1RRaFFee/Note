"use client";

import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { useAuthStore } from "@/store/auth.store";

import styles from "./SignUp.module.css";

interface RegisterFormProps {
  handleIsLogin: (isLogin: boolean) => void;
}

const RegisterForm: FC<RegisterFormProps> = ({ handleIsLogin }) => {
  const { signUp } = useAuthStore();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isRegistered, setIsRegistered] = useState(false); // Состояние для отслеживания успешной регистрации

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await signUp(formData.username, formData.email, formData.password);

      setIsRegistered(true);

      handleIsLogin(true);
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
    }
  };

  if (isRegistered) {
    return (
      <div className={styles.successMessage}>
        <p>Регистрация прошла успешно! Пожалуйста, войдите в систему.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <div className={styles.buttonWrapper}>
        <button type="button" onClick={() => handleIsLogin(true)}>
          SignIn
        </button>
        <button type="submit">Register</button>
      </div>
    </form>
  );
};

export default RegisterForm;
