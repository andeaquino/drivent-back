import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDatabase1643201299469 implements MigrationInterface {
    name = "CreateDatabase1643201299469"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"days\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, CONSTRAINT \"PK_c2c66eb46534bea34ba48cc4d7f\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"stages\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, CONSTRAINT \"PK_16efa0f8f5386328944769b9e6d\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"activities\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"start_time\" character varying NOT NULL, \"end_time\" character varying NOT NULL, \"vacancies\" integer NOT NULL, \"day_id\" integer, \"stage_id\" integer, CONSTRAINT \"PK_7f4004429f731ffb9c88eb486a8\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"activities_tickets_tickets\" (\"activitiesId\" integer NOT NULL, \"ticketsId\" integer NOT NULL, CONSTRAINT \"PK_f56606596a320edd31b175bbf4e\" PRIMARY KEY (\"activitiesId\", \"ticketsId\"))");
      await queryRunner.query("CREATE INDEX \"IDX_39f124b9a48bc5e3ebf77b886b\" ON \"activities_tickets_tickets\" (\"activitiesId\") ");
      await queryRunner.query("CREATE INDEX \"IDX_af12d8e220a37932dde7756905\" ON \"activities_tickets_tickets\" (\"ticketsId\") ");
      await queryRunner.query("ALTER TABLE \"activities\" ADD CONSTRAINT \"FK_8d8856b313b849f6dac972ef282\" FOREIGN KEY (\"day_id\") REFERENCES \"days\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"activities\" ADD CONSTRAINT \"FK_d02cca6bf73ba7b22bfbfa127b9\" FOREIGN KEY (\"stage_id\") REFERENCES \"stages\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"activities_tickets_tickets\" ADD CONSTRAINT \"FK_39f124b9a48bc5e3ebf77b886b0\" FOREIGN KEY (\"activitiesId\") REFERENCES \"activities\"(\"id\") ON DELETE CASCADE ON UPDATE CASCADE");
      await queryRunner.query("ALTER TABLE \"activities_tickets_tickets\" ADD CONSTRAINT \"FK_af12d8e220a37932dde7756905e\" FOREIGN KEY (\"ticketsId\") REFERENCES \"tickets\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"activities_tickets_tickets\" DROP CONSTRAINT \"FK_af12d8e220a37932dde7756905e\"");
      await queryRunner.query("ALTER TABLE \"activities_tickets_tickets\" DROP CONSTRAINT \"FK_39f124b9a48bc5e3ebf77b886b0\"");
      await queryRunner.query("ALTER TABLE \"activities\" DROP CONSTRAINT \"FK_d02cca6bf73ba7b22bfbfa127b9\"");
      await queryRunner.query("ALTER TABLE \"activities\" DROP CONSTRAINT \"FK_8d8856b313b849f6dac972ef282\"");
      await queryRunner.query("DROP INDEX \"IDX_af12d8e220a37932dde7756905\"");
      await queryRunner.query("DROP INDEX \"IDX_39f124b9a48bc5e3ebf77b886b\"");
      await queryRunner.query("DROP TABLE \"activities_tickets_tickets\"");
      await queryRunner.query("DROP TABLE \"activities\"");
      await queryRunner.query("DROP TABLE \"stages\"");
      await queryRunner.query("DROP TABLE \"days\"");
    }
}
