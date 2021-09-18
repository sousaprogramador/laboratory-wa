import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

import User from '@modules/users/entities/User';
import AppError from '@shared/errors/AppError';

interface Request {
    email: string;
    password: string;
}

interface Response {
    token: string;
}

class AuthenticateUserService {
    public async execute({email, password}: Request): Promise<Response> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({ where: {email}});

        if (!user) {
            throw new AppError('Incorrect email/password combination');
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError('Incorrect email/password combination');
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: `${user.id}`,
            expiresIn
        });

        return {
            token
        };

    }
}

export default AuthenticateUserService;