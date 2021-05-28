import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!

    # Edit Profile
    bio: String
    avatar: String

    # Photo
    photos: [Photo]

    # Pagination needed
    following: [User]
    followers: [User]

    # Computed Field : DB에 저장된 data가 아닌, request 할 때 변하는 data
    totalFollowing: Int!
    totalFollowers: Int!
    isMe: Boolean!
    isFollowing: Boolean!
  }
`;
