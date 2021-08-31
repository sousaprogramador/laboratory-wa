import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from 'typeorm';

import Laboratory from './Laboratory';

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

    @OneToMany(() => Laboratory, laboratory => laboratory.id)
    @JoinColumn({name: 'laboratory_id'})
    laboratory: Laboratory;

    @Column({type: 'integer'})
    laboratory_id: number;
    
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Exam;