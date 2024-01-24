import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1706125305249 implements MigrationInterface {
    name = 'Migrations1706125305249'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "exericse" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "exercise_name" character varying NOT NULL, "targeted_groupe" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_9820354f550f3b7a94cba68fbf0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "program" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "program_name" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_3bade5945afbafefdd26a3a29fb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "set" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "repetitions" double precision NOT NULL, "weight" double precision NOT NULL, "exerciseId" uuid, "workoutId" uuid, CONSTRAINT "PK_3a80144a9f862484a2cae876eed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workout" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "is_arhived" boolean NOT NULL DEFAULT 'false', "programId" uuid, "userId" uuid, CONSTRAINT "PK_ea37ec052825688082b19f0d939" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "program_program_exercises_exericse" ("programId" uuid NOT NULL, "exericseId" uuid NOT NULL, CONSTRAINT "PK_bd66b8b48d93ddcd72e9d1cc016" PRIMARY KEY ("programId", "exericseId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_60d10abd3b7550ec4a4bdf58bc" ON "program_program_exercises_exericse" ("programId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d89ca847ab1a7203e4a80c64ff" ON "program_program_exercises_exericse" ("exericseId") `);
        await queryRunner.query(`ALTER TABLE "exericse" ADD CONSTRAINT "FK_0a0c84f34d213bb80ef4793d089" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "program" ADD CONSTRAINT "FK_d593ec621c4a47fd51ab7f9a23d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "set" ADD CONSTRAINT "FK_4b4bcca171257ea6008d51c2fd1" FOREIGN KEY ("exerciseId") REFERENCES "exericse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "set" ADD CONSTRAINT "FK_018f6279568f980998d219b0c0b" FOREIGN KEY ("workoutId") REFERENCES "workout"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workout" ADD CONSTRAINT "FK_596933338ecb22f24c5827e9b2e" FOREIGN KEY ("programId") REFERENCES "program"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workout" ADD CONSTRAINT "FK_5c6e4714ac75eab49d2009f956c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "program_program_exercises_exericse" ADD CONSTRAINT "FK_60d10abd3b7550ec4a4bdf58bc7" FOREIGN KEY ("programId") REFERENCES "program"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "program_program_exercises_exericse" ADD CONSTRAINT "FK_d89ca847ab1a7203e4a80c64ff2" FOREIGN KEY ("exericseId") REFERENCES "exericse"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "program_program_exercises_exericse" DROP CONSTRAINT "FK_d89ca847ab1a7203e4a80c64ff2"`);
        await queryRunner.query(`ALTER TABLE "program_program_exercises_exericse" DROP CONSTRAINT "FK_60d10abd3b7550ec4a4bdf58bc7"`);
        await queryRunner.query(`ALTER TABLE "workout" DROP CONSTRAINT "FK_5c6e4714ac75eab49d2009f956c"`);
        await queryRunner.query(`ALTER TABLE "workout" DROP CONSTRAINT "FK_596933338ecb22f24c5827e9b2e"`);
        await queryRunner.query(`ALTER TABLE "set" DROP CONSTRAINT "FK_018f6279568f980998d219b0c0b"`);
        await queryRunner.query(`ALTER TABLE "set" DROP CONSTRAINT "FK_4b4bcca171257ea6008d51c2fd1"`);
        await queryRunner.query(`ALTER TABLE "program" DROP CONSTRAINT "FK_d593ec621c4a47fd51ab7f9a23d"`);
        await queryRunner.query(`ALTER TABLE "exericse" DROP CONSTRAINT "FK_0a0c84f34d213bb80ef4793d089"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d89ca847ab1a7203e4a80c64ff"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_60d10abd3b7550ec4a4bdf58bc"`);
        await queryRunner.query(`DROP TABLE "program_program_exercises_exericse"`);
        await queryRunner.query(`DROP TABLE "workout"`);
        await queryRunner.query(`DROP TABLE "set"`);
        await queryRunner.query(`DROP TABLE "program"`);
        await queryRunner.query(`DROP TABLE "exericse"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
