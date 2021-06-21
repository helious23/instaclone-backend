import { gql } from "apollo-server-core";

export default gql`
  type MutationResponse {
    id: Int
    ok: Boolean!
    error: String
  }
`;
