import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        if (caption) {
          // parse caption
          const hashtags = caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g);
          console.log(hashtags);
          // get or create Hasntags
          client.photo.create({
            data: {
              file,
              caption,
              hashtag: {
                connectOrCreate: [
                  {
                    where: {
                      hashtag: "#food",
                    },
                    create: {
                      hashtag: "#food",
                    },
                  },
                ],
              },
            },
          });
        }
        // save the photo WITH the parsed Hashtags
        // add the photo to the Hashtags
      }
    ),
  },
};
