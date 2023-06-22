import { MigrationInterface, QueryRunner } from 'typeorm';

export class Location1686583476300 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE `locations` (`id` INTEGER PRIMARY KEY, `description` TEXT NOT NULL)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `locations`');
  }

}
