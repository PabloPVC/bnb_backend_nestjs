import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { MenuProfile } from './menu_profile.entity';

@Entity('menu')
export class Menu {
  @PrimaryGeneratedColumn('identity', { generatedIdentity: 'ALWAYS' })
  id: number;

  @Column({ type: 'numeric', nullable: true })
  id_padre: number;

  @Column({ type: 'varchar', width: 200, unique: true })
  nombre: string;

  @Column({ type: 'varchar', width: 500 })
  descripcion: string;

  @Column({ type: 'varchar', width: 200 })
  label: string;

  @Column({ type: 'varchar', width: 300 })
  ruta: string;

  @Column({ type: 'bool', default: true })
  estado: boolean;

  @OneToMany(() => MenuProfile, (menu_profile) => menu_profile.menu)
  menuProfile: MenuProfile[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'delete_at' })
  public deleted_at: Date;
}
