require("dotenv").config(); // import dotenv from "dotdev", dotenv.config(); 와 동일한 코드
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { resolvers, typeDefs } from "./schema";
import { getUser, protectResolver } from "./users/users.utils";

const PORT = process.env.PORT;
const apollo = new ApolloServer({
  resolvers,
  typeDefs,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
      protectResolver,
    };
  },
});

const app = express(); // express server 생성
app.use(logger("tiny")); // middleware 전에 작성해야됨
app.use("/static", express.static("uploads")); // app.use("URL", express.static("폴더명") : 폴더명과 URL은 같지 않아도 됨
apollo.applyMiddleware({ app }); // express server와 같이 실행되도록 middleware 설정

app.listen({ port: PORT }, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT} ✅`); // express 형식으로 변경
});
