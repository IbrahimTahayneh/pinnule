"use server";
import prisma from "@/db";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import CustomError, { ERROR_CODES_BY_KEY } from "./customError";

const authCallback = async () => {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  if (!user.id || !user.email) {
    const unauthorizedError = new CustomError({
      code: "UNAUTHORIZED",
      message: "You are not authorized to access this resource",
    });
    throw unauthorizedError;
  }

  const dbUser = await prisma.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    await prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        firstname: user.given_name,
        lastname: user.family_name,
      },
    });
  }
  return { success: true };
};

export default authCallback;
