import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './models/message.model';
import { Room, RoomSchema } from './models/room.model';
import { User, UserSchema } from 'src/auth/Shemas/User.shema';
import { AppController } from 'src/app.controller';
import { RoomsController } from './controllers/rooms/rooms.controller';
import { MessagesController } from './controllers/messages/messages.controller';
import { AppService } from 'src/app.service';
import { MessagesGateway } from './gateways/messages/messages.gateway';

@Module({
    imports: [
        MongooseModule.forFeature([
          {name: Message.name, schema: MessageSchema},
          {name: Room.name, schema: RoomSchema},
          {name: User.name, schema: UserSchema}
    
        ]), 
      ],
      controllers: [
        AppController,
        RoomsController,
        MessagesController,
      ],
      providers: [AppService, MessagesGateway],
})
export class ChatsModule {}
