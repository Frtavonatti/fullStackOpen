import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

const subscription = {
  personAdded: {
    // subscribe: () => pubsub.asyncIterator(['PERSON_ADDED'])
    subscribe: () => pubsub.asyncIterableIterator('PERSON_ADDED'), // Using method for older versions
  }
};

export default subscription;
