import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    readMessage: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const message = await client.message.findFirst({
        where: {
          id,
          userId: {
            not: loggedInUser.id, // 내가 보낸 메세지가 아님
          },
          room: {
            users: {
              some: {
                id: loggedInUser.id, // 내가 속한 대화방에서 보낸 메세지
              },
            },
          },
        },
        select: {
          id: true, // id만 필요함
        },
      });
      if (!message) {
        return {
          ok: false,
          error: "Message not found.",
        };
      }
      await client.message.update({
        where: {
          id,
        },
        data: {
          read: true,
        },
      });
      return {
        ok: true,
      };
    }),
  },
};
