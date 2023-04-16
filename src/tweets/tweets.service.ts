import { Injectable } from '@nestjs/common';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Tweet, TweetDocument } from './entities/tweet.entity';

@Injectable()
export class TweetsService {
  constructor(
    @InjectModel(Tweet.name) private connectionModel: Model<TweetDocument>,
  ) {}
  async create(createTweetDto: CreateTweetDto) {
    const tweetDoc = new this.connectionModel(createTweetDto);
    await tweetDoc.save();
    return tweetDoc;
  }

  findAll() {
    return `This action returns all tweets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tweet`;
  }

  update(id: number, updateTweetDto: UpdateTweetDto) {
    return `This action updates a #${id} tweet`;
  }

  remove(id: number) {
    return `This action removes a #${id} tweet`;
  }
}
