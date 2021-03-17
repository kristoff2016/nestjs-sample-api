import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users', { schema: 'public' })
export class User {
  
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id?: string;
  
  @Expose()
  @ApiProperty()
  @Column({ nullable: true })
  email: string;

  @Expose()
  @ApiProperty()
  @Column({ nullable: true })
  displayName: string;

  @Expose()
  @ApiProperty()
  @Column( { nullable: true })
  password: string;

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