import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        if (caption) {
          // parse caption
          // get or create Hasntags
        }
        // save the photo WITH the parsed Hashtags
        // add the photo to the Hashtags
      }
    ),
  },
};
