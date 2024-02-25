// import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookSchema } from './schemas/book.schema';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { Module } from '@nestjs/common';
import { User, UserSchema } from 'src/auth/Shemas/User.shema';
import { JwtModule } from '@nestjs/jwt';
import { MailerService } from 'src/auth/Mail.service';

@Module({
  imports: [
    AuthModule,JwtModule,
    MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), 
  ],
  controllers: [BookController],
  providers: [BookService, AuthService,MailerService], 
})
export class BookModule {}
