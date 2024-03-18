"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import prisma from "@/prisma";
import bcrypt from "bcrypt";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().min(1),
  createdAt: z.date(),
  password: z.string().min(6),
  confirm: z.string().min(6),
});

const RegisterUser = UserSchema.omit({ id: true, createdAt: true }).refine(
  (data) => data.password === data.confirm,
  { message: "Passwords don't match", path: ["confirm"] }
);

export type RegisterFormState = {
  errors: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirm?: string[];
  };
  message?: string;
};

export async function register(
  prevState: RegisterFormState,
  formData: FormData
): Promise<RegisterFormState> {
  const validateFields = await RegisterUser.safeParseAsync({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm: formData.get("confirm"),
  });
  if (!validateFields.success)
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Failed to Create User",
    };
  try {
    const user = await prisma.user.create({
      data: {
        name: validateFields.data.name,
        email: validateFields.data.email,
        password: await bcrypt.hash(validateFields.data.password, 10),
        active: false,
      },
    });
  } catch (error) {
    console.error(error);
    return { ...prevState, message: "Failed to Create User" };
  }
  return {
    ...prevState,
    message:
      "Successfully Registered. Contact the Administrator to confirm your account",
  };
}
