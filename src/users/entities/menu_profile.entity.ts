import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Menu } from './menu.entity';
import { Profile } from './profile.entity';

@Entity('menu_profile')
export class MenuProfile {
  @PrimaryGeneratedColumn('identity', { generatedIdentity: 'ALWAYS' })
  id: number;
  @ManyToOne(() => Menu, (menu) => menu.menuProfile, {
    eager: true,
  })
  @JoinColumn({ name: 'menu_id' })
  menu: Menu;
  @ManyToOne(() => Profile, (profile) => profile.menuProfile)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;
  @Column()
  estado: boolean;
}
