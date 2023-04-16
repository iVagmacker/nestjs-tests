import { Tweet, TweetSchema } from './tweet.entity';
import mongoose from 'mongoose';

describe('Tweet Tests', () => {
  it('should create a tweet', () => {
    const tweet = new Tweet({
      content: 'Hello World',
      screen_name: 'Raul Vagmacker',
    });

    expect(tweet.content).toBe('Hello World');
    expect(tweet.screen_name).toBe('Raul Vagmacker');
  });
});

describe('Using MongoDB', () => {
  let connection: mongoose.Mongoose;

  beforeEach(async () => {
    //ROTA PADRÃO DO BANCO DO MONGODB NO CONTAINER
    //mongodb://root:root@db:27017/tweets_test?authSource=admin

    //ROTA PADRÃO DO BANCO DO MONGODB NA MÁQUINA
    //mongodb://root:root@localhost:27017/tweets_test?authSource=admin
    connection = await mongoose.connect(
      'mongodb://root:root@localhost:27017/tweets_entity_test?authSource=admin',
    );
  });

  afterEach(async () => {
    await connection.disconnect();
  });
  it('create a tweet document', async () => {
    const TweetModel = connection.model('Tweet', TweetSchema);
    const tweet = new TweetModel({
      content: 'Hello World',
      screen_name: 'Raul Vagmacker',
    });
    await tweet.save();

    const tweetCreated = await TweetModel.findById(tweet._id);

    expect(tweetCreated.content).toBe('Hello World');
    expect(tweetCreated.screen_name).toBe('Raul Vagmacker');
  });
});
