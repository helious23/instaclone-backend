import client from "../../client";

// cursor based pagination
export default {
  Query: {
    seeFollowing: async (_, { username, lastId }) => {
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true }, // id 만 확인해도 충분
      });
      if (!ok) {
        return {
          ok: false,
          error: "User not found.",
        };
      }
      const following = await client.user
        .findUnique({ where: { username } })
        .following({
          take: 5,
          skip: lastId ? 1 : 0, // lastId null 인 경우 skip 하면 X
          ...(lastId && { cursor: { id: lastId } }), // unique field 사용해야됨
        });
      return {
        ok: true,
        following,
      };
    },
  },
};
