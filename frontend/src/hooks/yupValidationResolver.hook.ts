import { useCallback } from "react";
import { AnyObjectSchema, ValidationError } from "yup";
import { Resolver, FieldErrors } from "react-hook-form";

const useYupValidationResolver = <T extends Record<string, any>>(
  validationSchema: AnyObjectSchema
): Resolver<T> =>
  useCallback(
    async (data: T) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {} as FieldErrors<T>,
        };
      } catch (error) {
        const validationErrors: FieldErrors<T> = {} as FieldErrors<T>;

        if (error instanceof ValidationError) {
          error.inner.forEach((error) => {
            if (error.path) {
              validationErrors[error.path as keyof T] = {
                type: error.type ?? "validation",
                message: error.message,
                ref: undefined,
              } as any;
            }
          });
        }

        return {
          values: {} as T,
          errors: validationErrors,
        };
      }
    },
    [validationSchema]
  );

export default useYupValidationResolver;
