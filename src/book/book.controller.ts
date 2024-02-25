import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './schemas/book.schema';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/Shemas/User.shema';
import { RolesGuard } from 'src/auth/Guards/Role.guard';
import { Roles } from 'src/auth/Decorators/Roledecatror';
@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  async getAllBooks(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Post()
  @Roles("admin")
  @UseGuards(AuthGuard(),RolesGuard)
  async createBook(
    @Body()
    book: CreateBookDto,
    @Req() req,
  ): Promise<Book> {
    return this.bookService.create(book, req.user);
  }
  @Get(':id')
  @Roles("admin")
  @UseGuards(RolesGuard)
  async getBook(
    @Param('id')
    id: string,
  ): Promise<Book> {
    return this.bookService.findById(id);
  }

  @Put(':id')
  async updateBook(
    @Param('id')
    id: string,
    @Body()
    book: UpdateBookDto,
  ): Promise<Book> {
    return this.bookService.updateById(id, book);
  }

  @Delete(':id')
  async deleteBook(
    @Param('id')
    id: string,
  ): Promise<Book> {
    return this.bookService.deleteById(id);
  }
  @Get('bookuser/:id')
  async getBookUser(@Param('id' ) id: string):Promise<User>{
    return this.bookService.getbookuser(id);
  }
}
