import client from "../../client";

export default {
  Query: {
    searchPhotos: (_, { keyword }) => {
      const photos = client.photo.findMany({
        where: {
          caption: {
            contains: keyword,
          },
        },
      });

      return {
        ok: true,
        photos,
      };
    },
  },
};
