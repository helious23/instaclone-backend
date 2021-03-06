import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";

export default {
  Mutation: {
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
      const passwordOk = await bcrypt.compare(password, user.password); // comnpare(data, encrypedpassword)
      if (!passwordOk) {
        return {
          ok: false,
          error: "Incorrect password",
        };
      }
      // issue a toke send it tothe user
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY); // issue the token by sign
      return {
        ok: true,
        token,
      };
    },
  },
};
