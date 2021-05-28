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
        skip: (page - 1) * 5,
      });
      const totalPhotos = client.photo.count({
        where: {
          caption: {
            contains: keyword,
          },
        },
      });
      return {
        ok: true,
        photos,
        totalPhotos,
      };
    },
  },
};
