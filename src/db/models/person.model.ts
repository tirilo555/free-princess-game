import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ThingType } from '../../things/base-thing';

@Entity('persons')
export default class PersonModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: ThingType;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  health?: number;

  @Column()
  power?: number;

  @Column()
  damageEfficiency?: number;
}