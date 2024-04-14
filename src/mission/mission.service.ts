
// mission.service.ts

import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { EntreprisesService } from 'src/entreprises/entreprises.service';
import { CreateMissionDto } from './Dto/CreateMission.Dto';
import { Mission } from './Shemas/Mission.Shema';
import { TaskService } from 'src/project/task/task.service';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/auth/Shemas/User.shema';
import { UpdateMissionDto } from './Dto/UpdateMission.Dto';
import { CronJob } from 'cron';
import { MissionStatus } from './Shemas/Mission.Shema'; 

@Injectable()
export class MissionService {
  constructor(
    @InjectModel(Mission.name) private missionModel: Model<Mission>, @InjectModel(User.name)private UserModel: Model<User>,
    private enterpriseService: EntreprisesService,private TaskService:TaskService,private UserService:AuthService
  ) {
    this.startCronJob();
  }

  async createMission(createMissionDto: CreateMissionDto): Promise<Mission> {
    const createdMission = new this.missionModel(createMissionDto);
    // const enterpriseId = await this.enterpriseSedrvice.createEntreprise(createMissionDto.enterprise);
    // createdMission.lieu = enterpriseId;
    return createdMission.save();
  }

  // async findAll(): Promise<Mission[]> {
  //   return this.missionModel.find().exec();
  // }
  async assignUserToMission(missionId: string, userEmail: string): Promise<Mission> {
    const user = await this.UserModel.findOne({ email: userEmail }).exec(); 
    console.log(user);
       const mission = await this.missionModel.findById(missionId);
    console.log(mission);
    let id = user._id.toString();
    console.log(id);
    const   datemission =  mission.startDate;
    console.log(datemission);
    // const isdisponible =await this.TaskService.isUserDisponible(id,datemission);
    // const isdisponiblemission=await this.isUserAvailableForMission(id,datemission) ;
    // console.log(isdisponible);
        // if(isdisponible && isdisponiblemission){
    mission.assignedTo.push(user._id); 
    return mission.save();
  // }else{throw new HttpException('Cet employé est indisponible dans cette date',400)}
}
  
async updateMission(missionId: string, updateMissionDto: UpdateMissionDto): Promise<Mission> {
  const existingMission = await this.missionModel.findById(missionId);

  if (!existingMission) {
    throw new HttpException('Mission non trouvée', 404);
  }
  if (updateMissionDto.title) {
    existingMission.title = updateMissionDto.title;
  }
  if (updateMissionDto.description) {
    existingMission.description = updateMissionDto.description;
  }
  if (updateMissionDto.startDate) {
    existingMission.startDate = updateMissionDto.startDate;
  }
  if (updateMissionDto.endDate) {
    existingMission.endDate = updateMissionDto.endDate;
  }

  return existingMission.save();
}
async findById(missionId: string): Promise<Mission> {
  const mission = await this.missionModel.findById(missionId);
  if (!mission) {
    throw new HttpException('Mission non trouvée', 404);
  }
  return mission;
}
async deleteMission(missionId: string): Promise<void> {
  const existingMission = await this.findById(missionId);
  if (existingMission) {
    await this.missionModel.findByIdAndDelete(missionId);
  } else {
    throw new HttpException('Mission non trouvée', 404);
  }
}
async deleteMultipleMissions(ids: string[]):Promise<void> {
    try {
    console.log(ids);
      // Supprimer les missions en utilisant l'opérateur $in pour spécifier plusieurs IDs
      const result = await this.missionModel.deleteMany({ _id: { $in: ids } }).exec();
    
    } catch (error) {
      console.log(error);
    }
  }
// async deleteMultipleMissions(missionIds: string[]): Promise<void> {
//   try {
//     console.log(missionIds);
//     for(let missionId of missionIds) {
//       // await this.missionModel.deleteMany({ _id: { $in: missionIds } });
//       await this.missionModel.findByIdAndDelete({ _id: missionId });


//     }
//   } catch (error) {
//     throw new HttpException('error', 500);
//   }
// }
async findAll(pageNumber: number, pageSize: number): Promise<Mission[]> {
  const skip = (pageNumber - 1) * pageSize;
  return this.missionModel.find().skip(skip).limit(pageSize).exec();
}
async assignClientToMission(missionId: string, clientId: string): Promise<Mission> {
  const mission = await this.missionModel.findById(missionId);
  const client = await this.UserModel.findById(clientId);

  if (!mission || !client) {
    throw new HttpException('Mission ou client non trouvé', 404);
  }

  mission.client = client; 

  return mission.save();
}
startCronJob() {
  const job = new CronJob('* * * * *', async () => {
    await this.checkAndUpdateMissions();
  });

  job.start();
}
async checkAndUpdateMissions() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const missions = await this.missionModel.find().exec();

  for (const mission of missions) {
    if (mission.status === 'ongoing' && new Date(mission.endDate) <= today) {
      mission.status= MissionStatus.Completed;
      await mission.save();
    } else if (mission.status === 'pending' && mission.assignedTo.length === 0 && new Date(mission.startDate) <= today) {
      mission.status = MissionStatus.Canceled;
      await mission.save();
    } else if (mission.status === 'pending' && new Date(mission.startDate) <= today && mission.assignedTo.length !== 0 && new Date(mission.startDate)) {
      mission.status = MissionStatus.Ongoing;
      await mission.save();
    }
  }
}

async createAndAssignMission(createMissionDto: CreateMissionDto, clientId: string): Promise<Mission> {
  const client = await this.UserModel.findById(clientId);

  if (!client) {
    throw new HttpException('Client non trouvé', 404);
  }

  const createdMission = new this.missionModel(createMissionDto);
  createdMission.client = client;

  return createdMission.save();
}
async getMissionByEmployeeId(employeeId: string): Promise<Mission> {
  const mission = await this.missionModel
    .findOne({ assignedTo: employeeId })
    .populate('assignedTo')
    .exec();

  if (!mission) {
    throw new NotFoundException('Mission non trouvée pour cet employé');
  }

  return mission;
}
async getUsersAvailable(date: string): Promise<User[]> {
  const users = await this.UserService.getAllUsers(); // Supposons que vous avez une fonction pour récupérer tous les utilisateurs
  const availableUsers: User[] = [];

  for (const user of users) {
      const isAvailable = await this.TaskService.isUserDisponible(user.id, date); // Utilisez votre fonction isUserDisponible pour vérifier la disponibilité de chaque utilisateur
      if (isAvailable) {
          availableUsers.push(user);
      }
  }

  return availableUsers;
}

async isUserAvailableForMission(employeeId: string, date: string): Promise<boolean> {
  try {
    const missions = await this.missionModel.find({ assignedTo: employeeId }).exec();
    let missionCount = 0;

    for (const mission of missions) {
      const startDate = new Date(mission.startDate);
      const endDate = new Date(mission.endDate);
      const checkDate = new Date(date);

      if (startDate.getTime() <= checkDate.getTime() && endDate.getTime() >= checkDate.getTime()) {
        missionCount++;
      }
    }

    return missionCount === 0;
  } catch (error) {
    // Handle any errors that occur during the execution of the method
    throw new HttpException('Failed to check user availability for mission.', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

}
