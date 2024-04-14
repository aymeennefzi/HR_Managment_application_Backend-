import {OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Message } from '../../models/message.model';
import { Room } from '../../models/room.model';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Server} from "socket.io";
import { User } from 'src/auth/Shemas/User.shema';

@WebSocketGateway({ cors: true }) // Activer le CORS dans le gateway WebSocket
export class MessagesGateway implements OnGatewayDisconnect {

  constructor(@InjectModel(Message.name) private readonly messagesModel: Model<Message>,
              @InjectModel(Room.name) private readonly roomsModel: Model<Room>,
              @InjectModel(User.name) private readonly usersModel: Model<User>) { // <1>
  }

  @WebSocketServer()
  server: Server;

  async handleDisconnect(client: Socket) {
    const user = await this.usersModel.findOne({clientId: client.id});
    if (user) {
      this.server.emit('users-changed', {user: user.firstName, event: 'left'});
      user.clientId = null;
      await this.usersModel.findByIdAndUpdate(user._id, user);
    }
  }

  @SubscribeMessage('enter-chat-room') 
  async enterChatRoom(client: Socket, data: { firstName: string, roomId: string }) {
    let user = await this.usersModel.findOne({firstName: data.firstName});
    if (!user) {
      user = await this.usersModel.create({firstName: data.firstName, clientId: client.id});
    } else {
      user.clientId = client.id;
      user = await this.usersModel.findByIdAndUpdate(user._id, user, {new: true});
    }
    client.join(data.roomId);
    client.broadcast.to(data.roomId)
      .emit('users-changed', {user: user.firstName, event: 'joined'});
  }

  @SubscribeMessage('leave-chat-room')
  async leaveChatRoom(client: Socket, data: { firstName: string, roomId: string }) {
    const user = await this.usersModel.findOne({firstName: data.firstName});
    client.broadcast.to(data.roomId).emit('users-changed', {user: user.firstName, event: 'left'});
    client.leave(data.roomId);
  }
  
  @SubscribeMessage('typing')
  async handleTyping(client: Socket, data: { firstName: string, roomId: string, isTyping: boolean }) {
    client.broadcast.to(data.roomId).emit('typing', { firstName: data.firstName, isTyping: data.isTyping });
  }

  @SubscribeMessage('add-message')
  async addMessage(client: Socket, message: Message) {
    message.owner = await this.usersModel.findOne({clientId: client.id});
    message.created = new Date();
    message = await this.messagesModel.create(message);
    this.server.in(message.room as string).emit('message', message);
  }
}
