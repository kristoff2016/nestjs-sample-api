import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ENUM_STATUS } from './enum';

@Entity('todo', { schema: 'public' })
export class Todo {
  
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id?: string;
  
  @Expose()
  @ApiProperty()
  @Column({ nullable: true })
  title: string;

  @Expose()
  @ApiProperty()
  @Column({ nullable: false, enum: ENUM_STATUS, default: ENUM_STATUS.INCOMPLETE })
  status?: ENUM_STATUS

  @Expose()
  @ApiProperty()
  @Column({ nullable: true, default: () => "CURRENT_TIMESTAMP" })
  createdAt?: string;

  @Expose()
  @ApiProperty()
  @Column({ nullable: true, default: null })
  deletedAt?: string;

  @Expose()
  @ApiProperty()
  @Column({ nullable: true, default: () => "CURRENT_TIMESTAMP" })
  updatedAt?: string;
  
}