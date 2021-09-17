import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm';

import Laboratory from '../../../../laboratories/infra/typeorm/entities/Laboratory';

export enum ExamTypes {
    ANALISE_CLINICA = "analise clinica",
    IMAGEM = "imagem"
}

export enum StatusTypes {
    ATIVO = "ativo",
    INATIVO = "inativo"
}

@Entity('exam')
class Exam {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;
    
    @Column({type: "enum", enum: ExamTypes})
    type: ExamTypes;

    @Column({type: "enum", enum: StatusTypes, default: StatusTypes.ATIVO})
    status: StatusTypes;

    @ManyToOne(() => Laboratory, (laboratory: Laboratory) => laboratory.id)
    @JoinColumn({name: 'laboratory_id'})
    laboratory: Promise<Laboratory[]>;

    @Column({type: 'integer'})
    laboratory_id: number;
    
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Exam;