import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1682157864028 implements MigrationInterface {
    name = 'Init1682157864028'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`story\` (\`id\` int NOT NULL AUTO_INCREMENT, \`isActive\` tinyint NOT NULL DEFAULT 1, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL DEFAULT '', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`chapter\` (\`id\` int NOT NULL AUTO_INCREMENT, \`ordinalNumber\` int NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL DEFAULT '', \`storyId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sentence\` (\`id\` int NOT NULL AUTO_INCREMENT, \`ordinalNumber\` int NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`text\` varchar(255) NOT NULL, \`delayBeforeSending\` int NOT NULL, \`chapterId\` int NOT NULL, UNIQUE INDEX \`IDX_49f493a64c8e2315ff4e5c9a09\` (\`chapterId\`, \`ordinalNumber\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`reply\` (\`id\` int NOT NULL AUTO_INCREMENT, \`isActive\` tinyint NOT NULL DEFAULT 1, \`text\` varchar(255) NOT NULL, \`hint\` varchar(255) NOT NULL, \`type\` enum ('open', 'closed') NOT NULL DEFAULT 'closed', \`isCorrect\` tinyint NOT NULL DEFAULT 0, \`sentenceId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`t_user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`telegramId\` int NOT NULL, \`username\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_6f15a3fb289ac5d5ed4ab39147\` (\`telegramId\`, \`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`answer\` (\`id\` int NOT NULL AUTO_INCREMENT, \`tUserId\` int NOT NULL, \`replyId\` int NOT NULL, UNIQUE INDEX \`IDX_49f0e19d5cb91857da7faa75c3\` (\`tUserId\`, \`replyId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`passwordHash\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`chapter\` ADD CONSTRAINT \`FK_032f36b55436efe49e6775b4898\` FOREIGN KEY (\`storyId\`) REFERENCES \`story\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sentence\` ADD CONSTRAINT \`FK_ccf89b919df5b3d53566235b9f1\` FOREIGN KEY (\`chapterId\`) REFERENCES \`chapter\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reply\` ADD CONSTRAINT \`FK_b5134e3a87b47a079948b4c3d67\` FOREIGN KEY (\`sentenceId\`) REFERENCES \`sentence\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`answer\` ADD CONSTRAINT \`FK_6557ccb8341b3c2710e32d4f5e2\` FOREIGN KEY (\`tUserId\`) REFERENCES \`t_user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`answer\` ADD CONSTRAINT \`FK_4f1c8ec97fbeece7fd1cfa43188\` FOREIGN KEY (\`replyId\`) REFERENCES \`reply\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`answer\` DROP FOREIGN KEY \`FK_4f1c8ec97fbeece7fd1cfa43188\``);
        await queryRunner.query(`ALTER TABLE \`answer\` DROP FOREIGN KEY \`FK_6557ccb8341b3c2710e32d4f5e2\``);
        await queryRunner.query(`ALTER TABLE \`reply\` DROP FOREIGN KEY \`FK_b5134e3a87b47a079948b4c3d67\``);
        await queryRunner.query(`ALTER TABLE \`sentence\` DROP FOREIGN KEY \`FK_ccf89b919df5b3d53566235b9f1\``);
        await queryRunner.query(`ALTER TABLE \`chapter\` DROP FOREIGN KEY \`FK_032f36b55436efe49e6775b4898\``);
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_49f0e19d5cb91857da7faa75c3\` ON \`answer\``);
        await queryRunner.query(`DROP TABLE \`answer\``);
        await queryRunner.query(`DROP INDEX \`IDX_6f15a3fb289ac5d5ed4ab39147\` ON \`t_user\``);
        await queryRunner.query(`DROP TABLE \`t_user\``);
        await queryRunner.query(`DROP TABLE \`reply\``);
        await queryRunner.query(`DROP INDEX \`IDX_49f493a64c8e2315ff4e5c9a09\` ON \`sentence\``);
        await queryRunner.query(`DROP TABLE \`sentence\``);
        await queryRunner.query(`DROP TABLE \`chapter\``);
        await queryRunner.query(`DROP TABLE \`story\``);
    }

}
