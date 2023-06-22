import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Location from './location.model';

export type Direction =
  'північ'
  | 'північний схід'
  | 'схід'
  | 'південний схід'
  | 'південь'
  | 'південний захід'
  | 'захід'
  | 'північний захід';


@Entity('paths')
export default class PathModel {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  direction: string;

  @Column()
  locationId: number;

  @ManyToOne(() => Location, (location) => location.paths)
  location: Location;

  @Column()
  destinationId: number;

  @ManyToOne(() => Location, (location) => location.paths)
  destination: Location;
}
