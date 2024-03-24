import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { House } from './house.entity';

@Entity('locationOfrece')
export class LocationOfrece {
  @PrimaryGeneratedColumn('identity', { generatedIdentity: 'ALWAYS' })
  id: number;
  @Column()
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
  @DeleteDateColumn({ name: 'delete_at' })
  public deleted_at: Date;

  @ManyToOne(() => House, (house) => house.locationOfrece)
  @JoinColumn({ name: 'house_id' })
  house: House;
}
