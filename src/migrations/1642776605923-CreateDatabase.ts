import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDatabase1642776605923 implements MigrationInterface {
    name = "CreateDatabase1642776605923"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"enrollments\" ADD \"ticketId\" integer");
      await queryRunner.query("ALTER TABLE \"enrollments\" ADD CONSTRAINT \"UQ_abeeb6542f6f22c58b6e3d78d83\" UNIQUE (\"ticketId\")");
      await queryRunner.query("ALTER TABLE \"enrollments\" ADD CONSTRAINT \"FK_abeeb6542f6f22c58b6e3d78d83\" FOREIGN KEY (\"ticketId\") REFERENCES \"tickets\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"enrollments\" DROP CONSTRAINT \"FK_abeeb6542f6f22c58b6e3d78d83\"");
      await queryRunner.query("ALTER TABLE \"enrollments\" DROP CONSTRAINT \"UQ_abeeb6542f6f22c58b6e3d78d83\"");
      await queryRunner.query("ALTER TABLE \"enrollments\" DROP COLUMN \"ticketId\"");
    }
}
