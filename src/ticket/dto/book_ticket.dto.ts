import { IsInt, Min } from 'class-validator';

export class BookTicketDto {
  @IsInt()
  customerId: number;

  @IsInt()
  eventId: number;

  @IsInt()
  @Min(1)
  quantity: number;
}
