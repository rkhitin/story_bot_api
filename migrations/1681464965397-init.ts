import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1681464965397 implements MigrationInterface {
    name = 'Init1681464965397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`replay\` (\`id\` int NOT NULL AUTO_INCREMENT, \`isActive\` tinyint NOT NULL DEFAULT 1, \`text\` varchar(255) NOT NULL, \`hint\` varchar(255) NOT NULL, \`sentenceId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sentence\` (\`id\` int NOT NULL AUTO_INCREMENT, \`ordinalNumber\` int NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`text\` varchar(255) NOT NULL, \`delayBeforeSending\` int NOT NULL, \`chapterId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`story\` (\`id\` int NOT NULL AUTO_INCREMENT, \`isActive\` tinyint NOT NULL DEFAULT 1, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`chapter\` (\`id\` int NOT NULL AUTO_INCREMENT, \`ordinalNumber\` int NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`storyId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`replay\` ADD CONSTRAINT \`FK_23ce68b0d78d7fb8dbb263166c3\` FOREIGN KEY (\`sentenceId\`) REFERENCES \`sentence\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sentence\` ADD CONSTRAINT \`FK_ccf89b919df5b3d53566235b9f1\` FOREIGN KEY (\`chapterId\`) REFERENCES \`chapter\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`chapter\` ADD CONSTRAINT \`FK_032f36b55436efe49e6775b4898\` FOREIGN KEY (\`storyId\`) REFERENCES \`story\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`chapter\` DROP FOREIGN KEY \`FK_032f36b55436efe49e6775b4898\``);
        await queryRunner.query(`ALTER TABLE \`sentence\` DROP FOREIGN KEY \`FK_ccf89b919df5b3d53566235b9f1\``);
        await queryRunner.query(`ALTER TABLE \`replay\` DROP FOREIGN KEY \`FK_23ce68b0d78d7fb8dbb263166c3\``);
        await queryRunner.query(`DROP TABLE \`chapter\``);
        await queryRunner.query(`DROP TABLE \`story\``);
        await queryRunner.query(`DROP TABLE \`sentence\``);
        await queryRunner.query(`DROP TABLE \`replay\``);
    }

}
