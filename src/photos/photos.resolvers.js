import client from "../client";

export default {
  Photo: {
    user: ({ userId }) =>
      client.user.findUnique({
        where: {
          id: userId,
        },
      }), // userId : photo 를 upload 한 user의 id
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
    likes: ({ id }) =>
      client.like.count({
        where: {
          photoId: id,
        },
      }),
    commentNumber: ({ id }) =>
      client.comment.count({
        where: {
          photoId: id,
        },
      }),
    comments: ({ id }) =>
      client.comment.findMany({
        where: { photoId: id },
        include: { user: true },
      }),
    isMine: ({ userId }, _, { loggedInUser }) => {
      // if (!loggedInUser) {
      //   return false;
      // }
      return userId === loggedInUser?.id;
    },
    isLiked: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const ok = await client.like.findUnique({
        where: {
          photoId_userId: {
            photoId: id,
            userId: loggedInUser.id,
          },
        },
        select: {
          id: true,
        },
      });
      if (ok) {
        return true;
      }
      return false;
    },
  },

  Hashtag: {
    photos: async ({ id }, { page }, { loggedInUser }) => {
      return client.hashtag
        .findUnique({
          where: {
            id, // hashtag 의 id
          },
        })
        .photos({
          take: 5,
          skip: (page - 1) * 5,
        });
    },
    totalPhotos: (
      { id } // hashtag 의 id
    ) =>
      client.photo.count({
        // photo 에 있는 hashtags 중 id 가 같은 hashtag 의 갯수
        where: {
          hashtags: {
            some: {
              id,
            },
          },
        },
      }),
  },
};
