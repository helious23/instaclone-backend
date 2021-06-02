import { gql } from "apollo-server";

export default gql`
  type SearchPhotosResult {
    ok: Boolean!
    error: String
    photos: [Photo]
    totalPhotos: Int
  }
  type Query {
    searchPhotos(keyword: String!, page: Int!): SearchPhotosResult!
  }
`;
