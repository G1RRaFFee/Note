import { ContactDto } from "@/types/contact/contact.type";
import { object, ObjectSchema, string } from "yup";

export const CONTACT_FORM_SCHEMA: ObjectSchema<
  Omit<ContactDto.Request.Create, "folderId">
> = object().shape({
  firstName: string().required("FirstName is required"),
  lastName: string().notRequired(),
  middleName: string().notRequired(),
  email: string().email("Invalid email").notRequired(),
  avatarUrl: string().notRequired(),
  phone: string()
    .nullable()
    .notRequired()
    .test("is-valid-phone", "Invalid phone", (value) => {
      if (!value) return true;
      return /^\+?[0-9]{10,15}$/.test(value);
    }),
  birthday: string().datetime().notRequired(),
  about: string().notRequired(),
});
