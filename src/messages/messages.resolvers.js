import client from "../client";

export default {
  Room: {
    users: ({ id }) => client.room.findUnique({ where: { id } }).users(),
    messages: ({ id }, { lastId }) =>
      client.message.findMany({
        where: {
          roomId: id,
        },
        take: 20,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
    unreadTotal: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return 0;
      }
      return client.message.count({
        where: {
          read: false, //아직 읽지 않음
          roomId: id, // 이 채팅방에 있음
          user: {
            id: {
              not: loggedInUser.id, // 로그인한 user가 만든게 아님
            },
          },
        },
      });
    },
  },
  Message: {
    user: ({ id }) => client.message.findUnique({ where: { id } }).user(),
  },
};
