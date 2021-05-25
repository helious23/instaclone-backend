import client from "../../client";

export default {
  Query: {
    seeProfile: (_, { username }) =>
      client.user.findUnique({
        where: {
          username,
        },
        include: {
          // relationship 기능을 켜야 db에서 읽어올 수 있음. size가 클 경우에는 비추.
          following: true,
          followers: true,
        },
      }),
  },
};
