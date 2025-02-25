"use client";

// TODO: Перейти на shadcn
import React, { JSX } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import GenericForm from "../GenericForm/GenericForm";
import { CONTACT_FORM_SCHEMA } from "@/constants/yupSchema.constant";
import useYupValidationResolver from "@/hooks/yupValidationResolver.hook";
import { ContactDto } from "@/types/contact/contact.type";
import ContactService from "@/services/contact.service";

interface ContactFormProps {
  folderId: number;
  defaultValues?: ContactDto.Request.Create;
  onSubmit: SubmitHandler<ContactDto.Request.Create>;
}

const ContactForm = ({
  defaultValues,
  onSubmit,
  folderId,
}: ContactFormProps): JSX.Element => {
  const resolver =
    useYupValidationResolver<ContactDto.Request.Create>(CONTACT_FORM_SCHEMA);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactDto.Request.Create>({
    defaultValues,
    resolver,
    mode: "onSubmit",
  });

  const handleContactFormSubmit = async (
    data: ContactDto.Request.Create
  ): Promise<void> => {
    const formData = { ...data, folderId: folderId };
    onSubmit(formData);
    await ContactService.createContact(formData);
    reset();
  };

  return (
    <GenericForm handleSubmit={handleSubmit} onSubmit={handleContactFormSubmit}>
      <Controller
        name="firstName"
        control={control}
        rules={{}}
        defaultValue=""
        render={({ field }) => <input {...field} placeholder="Имя" />}
      />

      <Controller
        name="lastName"
        control={control}
        defaultValue=""
        render={({ field }) => <input {...field} placeholder="Фамилия" />}
      />

      <Controller
        name="middleName"
        control={control}
        defaultValue=""
        render={({ field }) => <input {...field} placeholder="Отчество" />}
      />

      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <input {...field} placeholder="Email" type="email" />
        )}
      />

      <Controller
        name="phone"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <input {...field} placeholder="Телефон" type="tel" />
        )}
      />

      <Controller
        name="birthday"
        control={control}
        defaultValue=""
        render={({ field }) => {
          return (
            <input
              {...field}
              onChange={(event) => {
                const isoDate = new Date(event.target.value).toISOString();
                field.onChange(isoDate);
              }}
              value={field.value ? field.value.split("T")[0] : ""}
              placeholder="Дата рождения"
              type="date"
            />
          );
        }}
      />

      <Controller
        name="about"
        control={control}
        defaultValue=""
        render={({ field }) => <input {...field} placeholder="О себе" />}
      />
    </GenericForm>
  );
};

export default ContactForm;
