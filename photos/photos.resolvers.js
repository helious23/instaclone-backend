import client from "../client";

export default {
  Photo: {
    user: ({ userId }) => client.user.findUnique({ where: { id: userId } }), // userId : photo 를 upload 한 user의 id
    hashtags: (
      { id } // 개별 photo 의 id
    ) =>
      client.hashtag.findMany({
        where: {
          photos: {
            some: {
              id,
            },
          },
        },
      }),
  },
};
