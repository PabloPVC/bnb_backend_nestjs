import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Profile } from './profile.entity';
import { Exclude } from 'class-transformer';
import { House } from 'src/bnb_air/models/house.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('identity', { generatedIdentity: 'ALWAYS' })
  id: number;
  @Column({ type: 'varchar', width: 200, unique: true })
  user: string;

  @Column({ type: 'varchar', length: 255 })
  password: string; // encript
  @Column()
  @Exclude()
  image: string;
  @Column()
  estado: boolean;
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'delete_at' })
  public deleted_at: Date;

  @ManyToOne(() => Profile, (profile) => profile.user)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;

  @OneToMany(() => House, (house) => house.usuario)
  houses: House[];
}
