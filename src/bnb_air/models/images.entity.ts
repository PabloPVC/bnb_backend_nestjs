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

@Entity('image')
export class Image {
  @PrimaryGeneratedColumn('identity', { generatedIdentity: 'ALWAYS' })
  id: number;
  @Column()
  title: string;
  @Column()
  itemImageSrc: string;
  @Column()
  thumbmailImageSrc: string;
  @Column()
  altSrc: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
  @DeleteDateColumn({ name: 'delete_at' })
  public deleted_at: Date;

  @ManyToOne(() => House, (house) => house.images)
  @JoinColumn({ name: 'house_id' })
  house: House;
}
