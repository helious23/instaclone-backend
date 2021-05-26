import client from "../../client";

// offset based pagination
export default {
  Query: {
    seeFollowers: async (_, { username, page }) => {
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
      const followers = await client.user
        .findUnique({ where: { username } })
        .followers({
          take: 5,
          skip: (page - 1) * 5, // 5개씩 page 수에 따라 skip
        });
      const totalFollowers = await client.user.count({
        where: {
          following: { some: { username } }, // following list 에 username 이 있는 user 만 count
        },
      });
      return {
        ok: true,
        followers,
        totalPages: Math.ceil(totalFollowers / 5),
      };
    },
  },
};
