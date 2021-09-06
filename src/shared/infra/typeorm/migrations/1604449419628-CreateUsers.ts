import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateUsers1604449419628 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {name: 'id', type: 'integer', isPrimary: true, isGenerated: true, generationStrategy: 'increment'},
                    {name: 'name', type: 'varchar', isNullable: false},
                    {name: 'email', type: 'varchar', isUnique: true, isNullable: false},
                    {name: 'password', type: 'varchar', isNullable: false},
                    {name: 'created_at', type: 'timestamp', default: 'now()'},
                    {name: 'updated_at', type: 'timestamp', default: 'now()'}
                ]
            })
        )

        await queryRunner.query("INSERT INTO users (email, name, password) VALUES ('admin@admin.com', 'admin', '$2a$08$cEAgfRVsbsawv/bC1t8Eb.r2ArFq3iNe2.mymFtQuGdb23cEOOeuG')")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
    }

}
