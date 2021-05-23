import bcrypt from "bcrypt";
import client from "../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      try {
        // check user or email are already existed on DB
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
        if (existingUser) {
          throw new Error("This username/email is already taken.");
        }
        // hash password
        const uglyPassword = await bcrypt.hash(password, 10);
        // save and return the user
        return client.user.create({
          // browser has automatically async await function
          data: {
            username,
            email,
            firstName,
            lastName,
            password: uglyPassword,
          },
        });
      } catch (error) {
        return error;
      }
    },
    login: async (_, { username, password }) => {
      // find user with args.username
      const user = await client.user.findFirst({ where: { username } });
      if (!user) {
        return {
          ok: false,
          error: "User not found.",
        };
      }
      // check password with args.password
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        return {
          ok: false,
          error: "Incorrect password",
        };
      }
      // issue a toke send it tothe user
    },
  },
};
