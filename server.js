require("dotenv").config(); // import dotenv from "dotdev", dotenv.config(); 와 동일한 코드
import { ApolloServer } from "apollo-server";
import schema from "./schema";

const server = new ApolloServer({
  schema,
});

const PORT = process.env.PORT;

server
  .listen(PORT)
  .then(() =>
    console.log(`🚀 Server is running on http://localhost:${PORT}/ ✅`)
  );
