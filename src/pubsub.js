import { PubSub } from "apollo-server-express";

const pubsub = new PubSub();

export default pubsub;

/*
production : redis-subscriptions 사용하는 것을 추천. host 생성 시 유료
https://github.com/davidyaha/graphql-redis-subscriptions
*/
