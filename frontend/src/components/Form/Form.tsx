import React, { useState, useCallback } from "react";
import ContactService from "@/services/contact.service";

export const ContactForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    photo?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validateForm = useCallback(() => {
    const newErrors: { name?: string; email?: string; photo?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Имя обязательно";
    }

    if (!email.trim()) {
      newErrors.email = "Почта обязательна";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Некорректный адрес почты";
    }

    if (!photo) {
      newErrors.photo = "Фотография обязательна";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [name, email, photo]);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] || null;
      if (file) {
        setPhoto(file);
      } else {
        setPhoto(null);
        setErrors((prevErrors) => ({ ...prevErrors, photo: "Выберите файл" }));
      }
    },
    []
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      // Валидация формы
      if (!validateForm()) {
        return;
      }

      // Установка состояния отправки
      setIsSubmitting(true);

      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        if (photo) {
          formData.append("avatarUrl", photo);
        }

        // Отправка данных
        const response = await ContactService.createContact(formData);
        console.log("Ответ сервера:", response.data);
        alert("Данные успешно отправлены!");

        // Очистка формы после успешной отправки
        setName("");
        setEmail("");
        setPhoto(null);
        setErrors({});
      } catch (error) {
        console.error("Ошибка при отправке данных:", error);

        // Сообщение пользователю об ошибке
        const errorMessage =
          error.response?.data?.message || "Произошла ошибка при отправке.";
        alert(errorMessage);
      } finally {
        // Сброс состояния отправки
        setIsSubmitting(false);
      }
    },
    [name, email, photo, validateForm]
  );

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "16px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div style={{ marginBottom: "16px" }}>
        <label htmlFor="name" style={{ display: "block", marginBottom: "8px" }}>
          Имя:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        {errors.name && (
          <span style={{ color: "red", fontSize: "14px" }}>{errors.name}</span>
        )}
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label
          htmlFor="email"
          style={{ display: "block", marginBottom: "8px" }}
        >
          Почта:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        {errors.email && (
          <span style={{ color: "red", fontSize: "14px" }}>{errors.email}</span>
        )}
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label
          htmlFor="photo"
          style={{ display: "block", marginBottom: "8px" }}
        >
          Фотография:
        </label>
        <input
          type="file"
          id="photo"
          accept="image/*"
          onChange={handleFileChange}
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        {errors.photo && (
          <span style={{ color: "red", fontSize: "14px" }}>{errors.photo}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: isSubmitting ? "#ccc" : "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: isSubmitting ? "not-allowed" : "pointer",
          fontSize: "16px",
        }}
      >
        {isSubmitting ? "Отправка..." : "Отправить"}
      </button>
    </form>
  );
};
