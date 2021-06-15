import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeFeed: protectedResolver((_, { offset }, { loggedInUser }) =>
      client.photo.findMany({
        take: 5,
        skip: offset,
        where: {
          OR: [
            {
              user: {
                followers: {
                  some: {
                    id: loggedInUser.id, // followers 목록에 내 아이디가 있는 유저(내가 following 하는 유저)들의 photo 를 찾음
                  },
                },
              },
            },
            {
              userId: loggedInUser.id, // 내가 올린 photo
            },
          ],
        },
        orderBy: {
          createdAt: "desc", // 내림차순 : 최신이 위로
        },
      })
    ),
  },
};
