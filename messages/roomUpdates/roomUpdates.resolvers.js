import { withFilter } from "graphql-subscriptions";
import client from "../../client";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";

export default {
  Subscription: {
    roomUpdates: {
      subscribe: async (root, args, context, info) => {
        // listen 전에 loggedInUser 인지 check
        const room = await client.room.findFirst({
          where: {
            id: args.id,
            users: {
              some: {
                id: context.loggedInUser.Id,
              },
            },
          },
          select: {
            id: true,
          },
        });
        if (!room) {
          throw new Error("You shall not see this.");
        }
        return withFilter(
          () => pubsub.asyncIterator(NEW_MESSAGE),
          async ({ roomUpdates }, { id }, { loggedInUser }) => {
            // Checking after listening
            if (roomUpdates.roomId === id) {
              const room = await client.room.findFirst({
                where: {
                  id,
                  users: {
                    some: {
                      id: loggedInUser.id,
                    },
                  },
                },
                select: {
                  id: true,
                },
              });
              if (!room) {
                return false;
              }
              return true;
            }
            // payload, variables
            return roomUpdates.roomId === id; // payload.roomUpdates.roomId === variables.id
          }
        )(root, args, context, info);
      },
    },
  },
};
