import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1681486830012 implements MigrationInterface {
    name = 'Init1681486830012'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`replay\` DROP FOREIGN KEY \`FK_23ce68b0d78d7fb8dbb263166c3\``);
        await queryRunner.query(`ALTER TABLE \`sentence\` DROP FOREIGN KEY \`FK_ccf89b919df5b3d53566235b9f1\``);
        await queryRunner.query(`ALTER TABLE \`replay\` CHANGE \`sentenceId\` \`sentenceId\` int NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_49f493a64c8e2315ff4e5c9a09\` ON \`sentence\``);
        await queryRunner.query(`ALTER TABLE \`sentence\` CHANGE \`chapterId\` \`chapterId\` int NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_49f493a64c8e2315ff4e5c9a09\` ON \`sentence\` (\`chapterId\`, \`ordinalNumber\`)`);
        await queryRunner.query(`ALTER TABLE \`replay\` ADD CONSTRAINT \`FK_23ce68b0d78d7fb8dbb263166c3\` FOREIGN KEY (\`sentenceId\`) REFERENCES \`sentence\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sentence\` ADD CONSTRAINT \`FK_ccf89b919df5b3d53566235b9f1\` FOREIGN KEY (\`chapterId\`) REFERENCES \`chapter\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sentence\` DROP FOREIGN KEY \`FK_ccf89b919df5b3d53566235b9f1\``);
        await queryRunner.query(`ALTER TABLE \`replay\` DROP FOREIGN KEY \`FK_23ce68b0d78d7fb8dbb263166c3\``);
        await queryRunner.query(`DROP INDEX \`IDX_49f493a64c8e2315ff4e5c9a09\` ON \`sentence\``);
        await queryRunner.query(`ALTER TABLE \`sentence\` CHANGE \`chapterId\` \`chapterId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_49f493a64c8e2315ff4e5c9a09\` ON \`sentence\` (\`chapterId\`, \`ordinalNumber\`)`);
        await queryRunner.query(`ALTER TABLE \`replay\` CHANGE \`sentenceId\` \`sentenceId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sentence\` ADD CONSTRAINT \`FK_ccf89b919df5b3d53566235b9f1\` FOREIGN KEY (\`chapterId\`) REFERENCES \`chapter\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`replay\` ADD CONSTRAINT \`FK_23ce68b0d78d7fb8dbb263166c3\` FOREIGN KEY (\`sentenceId\`) REFERENCES \`sentence\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
