import { MigrationInterface, QueryRunner } from "typeorm"

export class Path1686583487832 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `paths` (`id` INTEGER PRIMARY KEY, `direction` TEXT NOT NULL, `locationId` INTEGER NOT NULL, `destinationId` INTEGER NOT NULL)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `paths`");
    }

}
