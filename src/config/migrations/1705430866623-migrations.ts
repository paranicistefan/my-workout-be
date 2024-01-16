import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1705430866623 implements MigrationInterface {
    name = 'Migrations1705430866623'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workout" RENAME COLUMN "workout_name" TO "is_arhived"`);
        await queryRunner.query(`ALTER TABLE "workout" DROP COLUMN "is_arhived"`);
        await queryRunner.query(`ALTER TABLE "workout" ADD "is_arhived" boolean NOT NULL DEFAULT 'false'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workout" DROP COLUMN "is_arhived"`);
        await queryRunner.query(`ALTER TABLE "workout" ADD "is_arhived" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workout" RENAME COLUMN "is_arhived" TO "workout_name"`);
    }

}
