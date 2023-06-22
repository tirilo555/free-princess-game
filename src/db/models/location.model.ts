import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import Path from './path.model';

@Entity('locations')
export default class LocationModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @OneToMany(() => Path, (path) => path.location)
  paths: Path[];
}