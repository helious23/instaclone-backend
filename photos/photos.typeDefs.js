import { gql } from "apollo-server";

export default gql`
  type Photo {
    id: Int!
    user: User! # computed field
    file: String!
    caption: String
    likes: Int!
    hashtags: [Hashtag] # computed field
    createdAt: String!
    updatedAt: String!
  }
  type Hashtag {
    id: Int!
    hashtag: String!
    photos(page: Int!): [Photo] # computed field
    totalPhotos: Int! # computed field
    createdAt: String!
    updatedAt: String!
  }
  type Like {
    id: Int!
    photo: Photo!
    createdAt: String!
    updatedAt: String!
  }
`;
