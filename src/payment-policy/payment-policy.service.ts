import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePaymentPDto } from './dto/CreatedPaymentPolicy.dto';
import { PaymentP } from './Schema/PaymentPolicyschema';


@Injectable()
export class PaymentPolicyService {
  constructor(@InjectModel(PaymentP.name) private paymentPolicyModel: Model<PaymentP>) {}

  
  async create(createPaymentPolicyDto: CreatePaymentPDto): Promise<PaymentP> {
    
    const createdPaymentPolicy = new this.paymentPolicyModel(createPaymentPolicyDto);
    const savedPaymentPolicy = await createdPaymentPolicy.save();
  
    return savedPaymentPolicy; // Assurez-vous de retourner la valeur sauvegardée
  }
  
  async findAll(): Promise<PaymentP[]> {
    return this.paymentPolicyModel.find().exec();
  }
  
 

    // Créer un nouvel objet Payment avec les propriétés mises à jour
    async updatePay(policyId: string, updatePolicyDto: CreatePaymentPDto): Promise<PaymentP> {
      // Recherche du poste existant
      const existingPolicy = await this.paymentPolicyModel.findOneAndUpdate(
          { _id: policyId },
          updatePolicyDto,
          { new: true }
      ).exec();
  
      // Si le poste n'est pas trouvé, lancer une exception
      if (!existingPolicy) {
          throw new NotFoundException(`Poste with id ${policyId} not found`);
      }
  
      return existingPolicy;
  }
  
  async findById(id: string): Promise<PaymentP | null> {
    return this.paymentPolicyModel.findById(id).exec();
  }
  
  }  
