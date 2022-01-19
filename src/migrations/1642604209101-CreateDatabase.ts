import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDatabase1642604209101 implements MigrationInterface {
    name = "CreateDatabase1642604209101"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"hotel_plans\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"price\" integer NOT NULL, CONSTRAINT \"PK_a26cf1af6a92a10585f7f50609e\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"presence_types\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"price\" integer NOT NULL, CONSTRAINT \"PK_7467dd0649ab1b0c767b945f434\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"tickets\" (\"id\" SERIAL NOT NULL, \"hotel_plan_id\" integer, \"presence_type_id\" integer, \"enrollment_id\" integer, CONSTRAINT \"REL_1323d8d191f4ca0cb037310f79\" UNIQUE (\"enrollment_id\"), CONSTRAINT \"PK_343bc942ae261cf7a1377f48fd0\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"enrollments\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"cpf\" character varying NOT NULL, \"birthday\" character varying NOT NULL, \"phone\" character varying NOT NULL, \"userId\" integer NOT NULL, \"ticketId\" integer, CONSTRAINT \"UQ_409b735ec0a7fcc6c1a0dab2da2\" UNIQUE (\"cpf\"), CONSTRAINT \"REL_abeeb6542f6f22c58b6e3d78d8\" UNIQUE (\"ticketId\"), CONSTRAINT \"PK_7c0f752f9fb68bf6ed7367ab00f\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"addresses\" (\"id\" SERIAL NOT NULL, \"cep\" character varying NOT NULL, \"street\" character varying NOT NULL, \"city\" character varying NOT NULL, \"number\" character varying NOT NULL, \"state\" character varying NOT NULL, \"neighborhood\" character varying NOT NULL, \"addressDetail\" character varying, \"enrollmentId\" integer NOT NULL, CONSTRAINT \"REL_1ce5592b8fd5529a35fb9fe146\" UNIQUE (\"enrollmentId\"), CONSTRAINT \"PK_745d8f43d3af10ab8247465e450\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"hotels\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"img\" character varying NOT NULL, CONSTRAINT \"PK_2bb06797684115a1ba7c705fc7b\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"room_types\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"vacancies\" integer NOT NULL, CONSTRAINT \"PK_b6e1d0a9b67d4b9fbff9c35ab69\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"rooms\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"hotel_id\" integer, \"type_id\" integer, CONSTRAINT \"PK_0368a2d7c215f2d0458a54933f2\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"bookings\" (\"id\" SERIAL NOT NULL, \"ticket_id\" integer, \"room_id\" integer, CONSTRAINT \"REL_028343a1767697bd6ae7d4d2a6\" UNIQUE (\"ticket_id\"), CONSTRAINT \"PK_bee6805982cc1e248e94ce94957\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"sessions\" (\"id\" SERIAL NOT NULL, \"userId\" integer NOT NULL, \"token\" character varying NOT NULL, CONSTRAINT \"PK_3238ef96f18b355b671619111bc\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"settings\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"value\" character varying NOT NULL, CONSTRAINT \"UQ_ca7857276d2a30f4dcfa0e42cd4\" UNIQUE (\"name\"), CONSTRAINT \"PK_0669fe20e252eb692bf4d344975\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"users\" (\"id\" SERIAL NOT NULL, \"email\" character varying NOT NULL, \"password\" character varying NOT NULL, \"createdAt\" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT \"PK_a3ffb1c0c8416b9fc6f907b7433\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("ALTER TABLE \"tickets\" ADD CONSTRAINT \"FK_c86fb5510fdf3e2615f9084e357\" FOREIGN KEY (\"hotel_plan_id\") REFERENCES \"hotel_plans\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"tickets\" ADD CONSTRAINT \"FK_826c66b2ff531e47ce3ce60549c\" FOREIGN KEY (\"presence_type_id\") REFERENCES \"presence_types\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"tickets\" ADD CONSTRAINT \"FK_1323d8d191f4ca0cb037310f79f\" FOREIGN KEY (\"enrollment_id\") REFERENCES \"enrollments\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"enrollments\" ADD CONSTRAINT \"FK_abeeb6542f6f22c58b6e3d78d83\" FOREIGN KEY (\"ticketId\") REFERENCES \"tickets\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"addresses\" ADD CONSTRAINT \"FK_1ce5592b8fd5529a35fb9fe1460\" FOREIGN KEY (\"enrollmentId\") REFERENCES \"enrollments\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"rooms\" ADD CONSTRAINT \"FK_7a61484af364d0d804b21b25c7f\" FOREIGN KEY (\"hotel_id\") REFERENCES \"hotels\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"rooms\" ADD CONSTRAINT \"FK_fe78af61c0fab5d8c38b7ce397a\" FOREIGN KEY (\"type_id\") REFERENCES \"room_types\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"bookings\" ADD CONSTRAINT \"FK_028343a1767697bd6ae7d4d2a61\" FOREIGN KEY (\"ticket_id\") REFERENCES \"tickets\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"bookings\" ADD CONSTRAINT \"FK_0b0fc32fe6bd0119e281628df7a\" FOREIGN KEY (\"room_id\") REFERENCES \"rooms\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"bookings\" DROP CONSTRAINT \"FK_0b0fc32fe6bd0119e281628df7a\"");
      await queryRunner.query("ALTER TABLE \"bookings\" DROP CONSTRAINT \"FK_028343a1767697bd6ae7d4d2a61\"");
      await queryRunner.query("ALTER TABLE \"rooms\" DROP CONSTRAINT \"FK_fe78af61c0fab5d8c38b7ce397a\"");
      await queryRunner.query("ALTER TABLE \"rooms\" DROP CONSTRAINT \"FK_7a61484af364d0d804b21b25c7f\"");
      await queryRunner.query("ALTER TABLE \"addresses\" DROP CONSTRAINT \"FK_1ce5592b8fd5529a35fb9fe1460\"");
      await queryRunner.query("ALTER TABLE \"enrollments\" DROP CONSTRAINT \"FK_abeeb6542f6f22c58b6e3d78d83\"");
      await queryRunner.query("ALTER TABLE \"tickets\" DROP CONSTRAINT \"FK_1323d8d191f4ca0cb037310f79f\"");
      await queryRunner.query("ALTER TABLE \"tickets\" DROP CONSTRAINT \"FK_826c66b2ff531e47ce3ce60549c\"");
      await queryRunner.query("ALTER TABLE \"tickets\" DROP CONSTRAINT \"FK_c86fb5510fdf3e2615f9084e357\"");
      await queryRunner.query("DROP TABLE \"users\"");
      await queryRunner.query("DROP TABLE \"settings\"");
      await queryRunner.query("DROP TABLE \"sessions\"");
      await queryRunner.query("DROP TABLE \"bookings\"");
      await queryRunner.query("DROP TABLE \"rooms\"");
      await queryRunner.query("DROP TABLE \"room_types\"");
      await queryRunner.query("DROP TABLE \"hotels\"");
      await queryRunner.query("DROP TABLE \"addresses\"");
      await queryRunner.query("DROP TABLE \"enrollments\"");
      await queryRunner.query("DROP TABLE \"tickets\"");
      await queryRunner.query("DROP TABLE \"presence_types\"");
      await queryRunner.query("DROP TABLE \"hotel_plans\"");
    }
}
