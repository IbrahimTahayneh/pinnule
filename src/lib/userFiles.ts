"use server";

import prisma from "@/db";
import { getUserFromKindeID } from "./auth";
import CustomError from "./customError";
import { revalidatePath } from "next/cache";

const user = getUserFromKindeID();

export const getUserFiles = async () => {
  return await prisma.file.findMany({
    where: {
      userId: (await user).id,
    },
  });

  revalidatePath("/dashboard");
};

export const deleteFile = async (id: string) => {
  const file = await prisma.file.findFirst({
    where: {
      id: id,
      userId: (await user).id,
    },
  });

  if (!file)
    throw new CustomError({ code: "NOT_FOUND", message: "File not exsist" });

  await prisma.file.delete({
    where: {
      id: id,
    },
  });

  return file;
};
