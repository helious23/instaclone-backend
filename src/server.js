require("dotenv").config(); // import dotenv from "dotdev", dotenv.config(); 와 동일한 코드
import http from "http";
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { resolvers, typeDefs } from "./schema";
import { getUser, protectResolver } from "./users/users.utils";

const PORT = process.env.PORT;
const apollo = new ApolloServer({
  resolvers,
  typeDefs,
  playground: true,
  context: async (ctx) => {
    // http
    if (ctx.req) {
      return {
        loggedInUser: await getUser(ctx.req.headers.token),
        protectResolver,
      };
    } else {
      // websocket
      const {
        connection: { context },
      } = ctx;
      return {
        loggedInUser: context.loggedInUser,
      };
    }
  },
  subscriptions: {
    onConnect: async ({ token }) => {
      if (!token) {
        throw new Error("You can't listen.");
      } // subscription 이 public 일 경우는 삭제: token 없이도 listen 가능
      const loggedInUser = await getUser(token);
      return {
        loggedInUser, // onConnect 의 return 값은 context 로 전달
      };
    },
  },
});

const app = express(); // express server 생성
app.use(logger("tiny")); // middleware 전에 작성해야됨
apollo.applyMiddleware({ app }); // express server와 같이 실행되도록 middleware 설정
app.use("/static", express.static("uploads")); // app.use("URL", express.static("폴더명") : 폴더명과 URL은 같지 않아도 됨

const httpServer = http.createServer(app); // create http server
apollo.installSubscriptionHandlers(httpServer); // websocket knowledge 를 server 에 주입

httpServer.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT} ✅`); // express 형식으로 변경
});
