require("dotenv").config(); // import dotenv from "dotdev", dotenv.config(); 와 동일한 코드
import { ApolloServer } from "apollo-server";
import schema from "./schema";

const PORT = process.env.PORT;
const server = new ApolloServer({
  schema,
  context: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjIxODM5MjY1fQ.lnci35VnSWeFsmzlagNo78V_hPadNzZ7q5SRnKsgxBo",
  },
});
server
  .listen(PORT)
  .then(() =>
    console.log(`🚀 Server is running on http://localhost:${PORT} ✅`)
  );
