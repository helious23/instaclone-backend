import client from "../../client";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    sendMessage: protectedResolver(
      async (_, { payload, roomId, userId }, { loggedInUser }) => {
        let room = null;
        if (userId) {
          const user = await client.user.findUnique({
            where: {
              id: userId,
            },
            select: {
              id: true,
            },
          });
          if (!user) {
            return {
              ok: false,
              error: "This user does not exist.",
            };
          }
          room = await client.room.create({
            data: {
              users: {
                connect: [
                  {
                    id: userId, // 우리가 찾는 user
                  },
                  {
                    id: loggedInUser.id, // login 한 user
                  },
                ],
              },
            }, // newRoom 생성
          });
        } else if (roomId) {
          room = await client.room.findUnique({
            where: {
              id: roomId,
            },
            select: {
              id: true,
            },
          });
          if (!room) {
            return {
              ok: false,
              error: "Room not found.",
            };
          }
        }
        const message = await client.message.create({
          data: {
            payload, // sending message
            room: {
              connect: {
                id: room.id, // 방금 만든 room
              },
            },
            user: {
              connect: {
                id: loggedInUser.id, // login 한 user
              },
            },
          },
        });
        pubsub.publish(NEW_MESSAGE, { roomUpdates: { ...message } }); // reolver name : {...item}
        return {
          ok: true,
        };
      }
    ),
  },
};
