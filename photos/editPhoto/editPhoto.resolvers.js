import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";

export default {
  Mutation: {
    editPhoto: protectedResolver(
      async (_, { id, caption }, { loggedInUser }) => {
        const oldPhoto = await client.photo.findFirst({
          where: {
            id,
            userId: loggedInUser.id, // findFirst 로 unique 가 아닌 값도 filter
          },
          include: {
            hashtags: {
              select: {
                hashtag: true, // oldPhoto 에 hashtag 를 불러옴
              },
            },
          },
        });
        if (!oldPhoto) {
          return {
            ok: false,
            error: "Photo not found",
          };
        }
        const photo = await client.photo.update({
          where: {
            id,
          },
          data: {
            caption,
            hashtags: {
              disconnect: oldPhoto.hashtags, // [{hashtag:"#something"}, ...]
              connectOrCreate: processHashtags(caption),
            },
          },
        });
        console.log(photo);
      }
    ),
  },
};
