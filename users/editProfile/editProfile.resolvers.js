import bcrypt from "bcrypt";
import client from "../../client";
import { protectResolver } from "../users.utils";

export default {
  Mutation: {
    editProfile: protectResolver(
      async (
        _,
        { firstName, lastName, username, email, password: newPassword },
        { loggedInUser } // 3rd argument : context by the server.js (Apolloserver)
      ) => {
        let uglyPassword = null;
        if (newPassword) {
          uglyPassword = await bcrypt.hash(newPassword, 10); // hash password
        }
        const updatedUser = await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            firstName,
            lastName,
            username,
            email,
            ...(uglyPassword && { password: uglyPassword }), // if uglyPassword true, ...때문에 {} 사라짐
          },
        });
        if (updatedUser.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "Could not update profile",
          };
        }
      }
    ),
  },
};
