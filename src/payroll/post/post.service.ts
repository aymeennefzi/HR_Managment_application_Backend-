import { Get, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/Shemas/User.shema';
import { CreatePostDto, CreateUserPostDto } from './dto/CreatePost.dto';
import { Poste } from '../Schema/Poste.schema';

@Injectable()
export class PostService {
    constructor(@InjectModel(Poste.name) private PosteModel:Model<Poste>,@InjectModel(User.name) private userModel:Model<User>){}
    async createUser({PostId,...userDTO}:CreateUserPostDto){
        const findPoste=await this.PosteModel.findById(PostId)
        if (!findPoste) throw new HttpException("Poste not found",400)
        const newUser=new this.userModel(userDTO)
    const savedUser=await newUser.save()
    await this.PosteModel.updateOne({_id:PostId},{$push:{Users:savedUser._id}})
    return savedUser
    }
    async createPoste(CreatePosteDto: CreatePostDto): Promise<Poste> {
        const createdPoste = new this.PosteModel(CreatePosteDto);
        return createdPoste.save();
      }
    
    //   async getAllPosts(): Promise<Poste[]> {
    //     return this.PosteModel.find().populate('Users','name').exec();
    //   }
    async getAllPosts(): Promise<Poste[]> {
        return this.PosteModel.find().populate({
          path: 'Users',
          select: 'name email isActive leaves ', // Sélectionnez les champs que vous souhaitez afficher dans les détails de l'utilisateur
        }).exec();
      }



      async assignUserToPost(userId: string, postId: string): Promise<void> {
        const user = await this.userModel.findById(userId);
        const post = await this.PosteModel.findById(postId);
        if (!user) {
          throw new Error('Utilisateur introuvable');
        }
        if (!post) {
          throw new Error('Poste introuvable');
        }
        user.poste = post;
        await user.save();
        post.Users.push(user);
        await post.save();
      }
      async updatePoste(posteId: string, updatePosteDto: CreatePostDto): Promise<Poste> {
        const updatedPoste = await this.PosteModel.findByIdAndUpdate(posteId, updatePosteDto, { new: true });
        if (!updatedPoste) {
          // Gérer le cas où le poste n'est pas trouvé
          throw new NotFoundException(`Poste with id ${posteId} not found`);
        }
        return updatedPoste;
      }
    }

