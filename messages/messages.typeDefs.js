import { gql } from "apollo-server-core";

export default gql`
  type Message {
    id: Int!
    payload: String!
    user: User!
    room: Room!
    createdAt: String!
    updatedAt: String!
  }
  type Room {
    id: Int!
    user: [User]
    messages(lastId: Int!): [Message]
    createdAt: String!
    updatedAt: String!
  }
`;
