import bcrypt from "bcrypt";
import client from "../client";

export default {
  Mutation: {
    // check user or email are already existed on DB
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      const existingUser = await client.user.findFirst({
        where: {
          OR: [
            {
              username,
            },
            {
              email,
            },
          ],
        },
      });
      console.log(existingUser);
      // hash password
      const uglyPassword = await bcrypt.hash(password, 10);
      // save and return the user
      return client.user.create({
        data: {
          username,
          email,
          firstName,
          lastName,
          password: uglyPassword,
        },
      });
    },
  },
};
