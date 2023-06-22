import { MigrationInterface, QueryRunner } from 'typeorm';

export class Thing1686842383365 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE `things` (`id` INTEGER PRIMARY KEY, `type` INTEGER NOT NULL, `name` TEXT NOT NULL, `description` TEXT NOT NULL, `health` INTEGER DEFAULT 0, `power` INTEGER DEFAULT 0, `damageEfficiency` INTEGER DEFAULT 0, `weight` INTEGER DEFAULT 0)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `things`');
  }
}
