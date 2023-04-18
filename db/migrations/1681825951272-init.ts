import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1681825951272 implements MigrationInterface {
    name = 'Init1681825951272'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`story\` (\`id\` int NOT NULL AUTO_INCREMENT, \`isActive\` tinyint NOT NULL DEFAULT 1, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL DEFAULT '', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`chapter\` (\`id\` int NOT NULL AUTO_INCREMENT, \`ordinalNumber\` int NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL DEFAULT '', \`storyId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sentence\` (\`id\` int NOT NULL AUTO_INCREMENT, \`ordinalNumber\` int NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`text\` varchar(255) NOT NULL, \`delayBeforeSending\` int NOT NULL, \`chapterId\` int NOT NULL, UNIQUE INDEX \`IDX_49f493a64c8e2315ff4e5c9a09\` (\`chapterId\`, \`ordinalNumber\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`replay\` (\`id\` int NOT NULL AUTO_INCREMENT, \`isActive\` tinyint NOT NULL DEFAULT 1, \`text\` varchar(255) NOT NULL, \`hint\` varchar(255) NOT NULL, \`sentenceId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`t_user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`telegramId\` int NOT NULL, \`username\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_6f15a3fb289ac5d5ed4ab39147\` (\`telegramId\`, \`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`answer\` (\`id\` int NOT NULL AUTO_INCREMENT, \`tUserId\` int NOT NULL, \`replayId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`passwordHash\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`chapter\` ADD CONSTRAINT \`FK_032f36b55436efe49e6775b4898\` FOREIGN KEY (\`storyId\`) REFERENCES \`story\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sentence\` ADD CONSTRAINT \`FK_ccf89b919df5b3d53566235b9f1\` FOREIGN KEY (\`chapterId\`) REFERENCES \`chapter\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`replay\` ADD CONSTRAINT \`FK_23ce68b0d78d7fb8dbb263166c3\` FOREIGN KEY (\`sentenceId\`) REFERENCES \`sentence\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`answer\` ADD CONSTRAINT \`FK_6557ccb8341b3c2710e32d4f5e2\` FOREIGN KEY (\`tUserId\`) REFERENCES \`t_user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`answer\` ADD CONSTRAINT \`FK_98bc473c63c83868ce8346b0213\` FOREIGN KEY (\`replayId\`) REFERENCES \`replay\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`answer\` DROP FOREIGN KEY \`FK_98bc473c63c83868ce8346b0213\``);
        await queryRunner.query(`ALTER TABLE \`answer\` DROP FOREIGN KEY \`FK_6557ccb8341b3c2710e32d4f5e2\``);
        await queryRunner.query(`ALTER TABLE \`replay\` DROP FOREIGN KEY \`FK_23ce68b0d78d7fb8dbb263166c3\``);
        await queryRunner.query(`ALTER TABLE \`sentence\` DROP FOREIGN KEY \`FK_ccf89b919df5b3d53566235b9f1\``);
        await queryRunner.query(`ALTER TABLE \`chapter\` DROP FOREIGN KEY \`FK_032f36b55436efe49e6775b4898\``);
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`answer\``);
        await queryRunner.query(`DROP INDEX \`IDX_6f15a3fb289ac5d5ed4ab39147\` ON \`t_user\``);
        await queryRunner.query(`DROP TABLE \`t_user\``);
        await queryRunner.query(`DROP TABLE \`replay\``);
        await queryRunner.query(`DROP INDEX \`IDX_49f493a64c8e2315ff4e5c9a09\` ON \`sentence\``);
        await queryRunner.query(`DROP TABLE \`sentence\``);
        await queryRunner.query(`DROP TABLE \`chapter\``);
        await queryRunner.query(`DROP TABLE \`story\``);
    }

}
