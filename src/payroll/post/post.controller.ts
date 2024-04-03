import { Body, Controller, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { CreatePostDto, CreateUserPostDto } from './dto/CreatePost.dto';
import { PostService } from './post.service';
import { User } from 'src/auth/Shemas/User.shema';
import { Poste } from '../Schema/Poste.schema';
@Controller('post')
export class PostController {
    constructor(private readonly PostService: PostService){};

    @Post('')
  createPost(@Body() CreatePostDto: CreatePostDto): Promise<Poste> {
    return this.PostService.createPoste(CreatePostDto);
  }
  @Post('/UserPost')
  creaUserP(@Body() CreateUserPostDto: CreateUserPostDto): Promise<User> {
    return this.PostService.createUser(CreateUserPostDto);
  }
  @Get()
  getPost():Promise<Poste[]>{
   return this.PostService.getAllPosts();
  }

  @Post('/postAssign')
  async assignUserToPost(@Body() data: { userId: string, postId: string }): Promise<void> {
    const { userId, postId } = data;
    await this.PostService.assignUserToPost(userId, postId);
  }
  @Put('update/:id')
  async updatePoste(@Param('id') posteId: string, @Body() updatePosteDto: CreatePostDto): Promise<Poste> {
    try {
      const updatedPoste = await this.PostService.updatePoste(posteId, updatePosteDto);
      return updatedPoste;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
