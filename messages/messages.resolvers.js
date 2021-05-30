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
    unreadTotals: () => 0,
  },
};
