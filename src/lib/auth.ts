import prisma from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const getUserFromKindeID = async (select = { id: true }) => {
  const { getUser } = getKindeServerSession();
  const user = getUser();
  const data = await prisma.user.findUniqueOrThrow({
    where: {
      id: user.id as string,
    },
    select,
  });
  return data;
};
