import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { House } from './house.entity';
import { Valoracion } from './valoracion.entity';

@Entity('valoracion_house')
export class Valoracion_House {
  @PrimaryGeneratedColumn('identity', { generatedIdentity: 'ALWAYS' })
  id: number;

  @ManyToOne(() => Valoracion, (valoracion) => valoracion.id)
  @JoinColumn({ name: 'valoracion_id' })
  valoracion: Valoracion;

  @ManyToOne(() => House, (house) => house.id)
  @JoinColumn({ name: 'house_id' })
  house: House;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'delete_at' })
  public deleted_at: Date;
}
