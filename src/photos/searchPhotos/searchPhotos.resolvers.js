import client from "../../client";

export default {
  Query: {
    searchPhotos: (_, { keyword, page }) => {
      const photos = client.photo.findMany({
        where: {
          caption: {
            contains: keyword,
          },
        },
        take: 5,
        skip: page,
      });

      return {
        ok: true,
        photos,
      };
    },
  },
};
