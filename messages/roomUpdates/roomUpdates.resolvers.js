import { withFilter } from "graphql-subscriptions";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";

export default {
  Subscription: {
    roomUpdates: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(NEW_MESSAGE),
        ({ roomUpdates }, { id }) => {
          // payload, variables
          return roomUpdates.roomId === id; // payload.roomUpdates.roomId === variables.id
        }
      ),
    },
  },
};
