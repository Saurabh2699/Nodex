import prisma from "@/lib/prisma";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import z from "zod";

export const userRouter = createTRPCRouter({
  getOne: protectedProcedure.query(({ ctx }) => {
    return prisma.user.findUniqueOrThrow({
      where: {
        id: ctx.auth.user.id,
      },
      include: {
        workflows: true,
        credentials: true
      }
    });
  }),
  updateUser: protectedProcedure
    .input(
      z.object({
        firstName: z.string().min(1, "First Name is required"),
        lastName: z.string().min(1, "Last Name is required"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { firstName, lastName } = input;
      return await prisma.user.update({
        where: {
          id: ctx.auth.user.id,
        },
        data: {
          firstName,
          lastName,
        },
      });
    }),
});
