import { IsNotEmpty, IsInt, Min, IsDateString, IsNumber } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  venue: string;

  @IsDateString()
  date: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsInt()
  @Min(0)
  totalSeats: number;

  @IsInt()
  @Min(0)
  availableSeats: number;
}
