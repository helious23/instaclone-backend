import { gql } from "apollo-server";

export default gql`
  type SearchUsersResult {
    ok: Boolean!
    error: String
    users: [User]
    totalPages: Int
  }
  type Query {
    searchUsers(keyword: String!, page: Int!): SearchUsersResult!
  }
`;
