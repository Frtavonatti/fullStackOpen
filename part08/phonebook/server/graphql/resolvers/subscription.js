import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

const subscription = {
  personAdded: {
    subscribe: () => pubsub.asyncIterator(['PERSON_ADDED'])
  }
};

export default subscription;
