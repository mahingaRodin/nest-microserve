import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from 'class-validator';

export class CreateOrderRequest {
  @IsString()
  @IsNotEmpty()
  names: string;

  @IsNumber()
  price: number;
  
  @IsPhoneNumber()
  phoneNumber: string;
}
