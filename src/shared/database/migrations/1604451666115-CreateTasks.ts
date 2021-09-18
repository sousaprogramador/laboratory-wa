import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export default class CreateTasks1604451666115 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'tasks',
                columns: [
                    {name: 'id', type: 'integer', isPrimary: true, isGenerated: true, generationStrategy: 'increment'},
                    {name: 'name', type: 'varchar', isNullable: false},
                    {name: 'description', type: 'varchar', isNullable: false},
                    {name: 'finish', type: 'integer', default: 0, isNullable: false},
                    {name: 'user_id', type: 'integer', isNullable: true},
                    {name: 'created_at', type: 'timestamp', default: 'now()'},
                    {name: 'updated_at', type: 'timestamp', default: 'now()'}
                ]
            })
        )

        await queryRunner.createForeignKey('tasks', new TableForeignKey({
            name: 'UserTask',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('tasks', 'UserTask');
        await queryRunner.dropTable('tasks')
    }

}
