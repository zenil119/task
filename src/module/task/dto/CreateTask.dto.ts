import { IsNotEmpty, IsNumber, IsPositive, Length } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'The task should have a title' })
  @Length(3, 255)
  title: string;
  @Length(3)
  @IsNotEmpty({ message: 'The task should have a description' })
  description: string;
}
