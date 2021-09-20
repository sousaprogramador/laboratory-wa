import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum StatusTypes {
    ATIVO = "ativo",
    INATIVO = "inativo"
}

@Entity('laboratories')
class Laboratory {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;
    
    @Column()
    address: string;
    
    @Column({type: "enum", enum: StatusTypes, default: StatusTypes.ATIVO})
    status: StatusTypes;

    @CreateDateColumn()
    created_At: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Laboratory;