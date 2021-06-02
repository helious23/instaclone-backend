import client from "../client";

export default {
  User: {
    totalFollowing: ({ id }) =>
      client.user.count({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
      }),
    totalFollowers: ({ id }) =>
      client.user.count({
        where: {
          following: {
            some: {
              id,
            },
          },
        },
      }),
    isMe: ({ id }, _, { loggedInUser }) => {
      return id === loggedInUser?.id;
    },
    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      /*
      const exists = await client.user
        .findUnique({ where: { username: loggedInUser.username } })
        .following({ where: { id } }); loggedIn User 의 following array 중 id 가 있는지 : return array
      return exists.length !== 0; javascript 로 count 하므로 db에 무리를 줄 수 있음
      */
      const exists = await client.user.count({
        where: {
          username: loggedInUser.username,
          following: {
            some: {
              id,
            },
          },
        }, // loggedInUser 의 following array 중 id로 검색한 갯수가 있는지 : 0 or 1
      });
      return Boolean(exists); // 0: false, 1: true
    },

    photos: ({ id }, { page }) => {
      return client.user
        .findUnique({
          where: {
            id,
          },
        })
        .photos({
          take: 5,
          skip: (page - 1) * 5,
        });
    },
  },
};
