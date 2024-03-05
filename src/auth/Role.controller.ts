import { Body, Controller, Param, Post } from "@nestjs/common";
import { Roleservice } from "./Role.service";
import { CreateRoleDto } from "./dto/Roles.dto";

@Controller('roles')
export class Rolecontroller{
   
    constructor(private readonly roleService: Roleservice) {}
      
     @Post()
     async createRole(@Body() createRoleDto: CreateRoleDto) {
        return this.roleService.createRole(createRoleDto);
     }
     @Post(':userId/assign/:roleId')
  async assignRoleToUser(
    @Param('userId') userId: string,
    @Param('roleId') roleId: string,
  ): Promise<any> {
    return this.roleService.assignRoleToUser(userId, roleId);
  }
}
