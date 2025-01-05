"use client";

import { useAuthStore } from "@/store/auth.store";
import { FC, useState } from "react";

const LoginForm: FC = () => {
  const { signIn, signUp } = useAuthStore();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <div>
      <input
        type="text"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="email"
      />
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="password"
      />
      <button onClick={() => signIn(email, password)}>SignIn</button>
      <button onClick={() => signUp("Testet", email, password)}>SignUp</button>
    </div>
  );
};

export default LoginForm;
