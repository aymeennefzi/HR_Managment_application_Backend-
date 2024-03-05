import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserSchema } from 'src/schemas/user.schemas';
UserSchema


@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}
    async createUser(userData: any): Promise<User> {
        const createdUser = new this.userModel(userData);
        return createdUser.save();
      }
      async getAllUsers(): Promise<User[]> {
        return this.userModel.find().exec();
      }
      async updateUser(userId: string, userData: any): Promise<User> {
        return this.userModel.findByIdAndUpdate(userId, userData, { new: true }).exec();
      }
      async deleteUser(userId: string): Promise<User> {
        return this.userModel.findByIdAndDelete(userId).exec();
      }
}
