import { gql } from "apollo-server";

export default gql`
  type SearchPhotosResult {
    ok: Boolean!
    error: String
    photos: [Photo]
  }
  type Query {
    searchPhotos(keyword: String!): SearchPhotosResult!
  }
`;
