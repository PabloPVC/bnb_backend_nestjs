import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Valoracion_House } from './valoracion_house.entity';
import { Image } from './images.entity';
import { LocationOfrece } from './location-ofrece.entity';
import { User } from '../../users/entities/user.entity';

@Entity('house')
export class House {
  @PrimaryGeneratedColumn('identity', { generatedIdentity: 'ALWAYS' })
  id: number;
  @Column()
  name: string;
  @Column()
  ciudad: string;
  @Column()
  longitud: string;
  @Column()
  latitud: string;
  @Column()
  estado: number;
  @Column()
  foto: string;

  @OneToMany(
    () => Valoracion_House,
    (valoracion_house) => valoracion_house.house,
  )
  valoraciones: Valoracion_House[];

  @OneToMany(() => Image, (image) => image.house)
  images: Image[];

  @OneToMany(() => LocationOfrece, (location) => location.house)
  locationOfrece: LocationOfrece[];

  @ManyToOne(() => User, (user) => user.houses)
  @JoinColumn({ name: 'user_id' })
  usuario: User;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'delete_at' })
  public deleted_at: Date;
}
