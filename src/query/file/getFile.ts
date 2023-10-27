"use server";
import prisma from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const getFile = async (key: string) => {
  const { getUser } = getKindeServerSession();
  const user = getUser();
  console.log("key", key);
  const file = await prisma.file.findFirst({
    where: {
      key: key,
      userId: user.id,
    },
  });

  if (!file) {
    throw new Error("not found");
  }

  return file;
};
