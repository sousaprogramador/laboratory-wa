import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({name, email, password}: Request): Promise<User> {
        try {
            const userRepository = getRepository(User);

            const checkUserExists = await userRepository.findOne({
                where: {email}
            });
    
            if (checkUserExists) {
                throw new Error('Email address already used');
            }
    
            const hashedPassword = await hash(password, 8);

            const user = userRepository.create({
                name,
                email,
                password: hashedPassword
            });

            await userRepository.save(user);

            return user;
        } catch (error) {
            throw new AppError("Erro ao criar usuario");
        }
    }
}

export default CreateUserService;