import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateExam1630144137902 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'exam',
                columns: [
                    {name: 'id', type: 'integer', isPrimary: true, isGenerated: true, generationStrategy: 'increment'},
                    {name: 'name', type: 'varchar', isNullable: false},
                    {name: 'type', type: 'enum', enum: ['analise clinica', 'imagem'], isNullable: false},
                    {name: 'status', type: 'enum', enum: ['ativo', 'inativo'], isNullable: false},
                    {name: 'laboratory_id', type: 'integer', isNullable: true},
                    {name: 'created_at', type: 'timestamp', default: 'now()'},
                    {name: 'updated_at', type: 'timestamp', default: 'now()'}
                ]
            })
        )

        await queryRunner.createForeignKey('exam', new TableForeignKey({
            name: 'ExamLab',
            columnNames: ['laboratory_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'laboratories',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('laboratory', 'ExamLab');
        await queryRunner.dropTable('exam')
    }

}
