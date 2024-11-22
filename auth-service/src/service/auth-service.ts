import { ApiError } from '../exceptions/api-error';
import prisma from '../prisma/prisma-service';
import bcrypt from 'bcrypt';
import tokenService from './token-service';

class AuthService {
	async findUserByCredentials({
		email,
		username,
	}: {
		email?: string;
		username?: string;
	}) {
		if (email) return await prisma.user.findFirst({ where: { email } });
		if (username) return await prisma.user.findFirst({ where: { username } });
		return null;
	}

	async refreshWithDb(oldRefreshToken: string) {
		const userData = await tokenService.validateRefreshWithDb(oldRefreshToken);
		if (!userData) throw ApiError.UnauthorizedError();
		const { id } = userData;

		const { accessToken, refreshToken } = tokenService.generate({ id });

		await tokenService.saveRefresh(id, refreshToken);
		return {
			accessToken,
			refreshToken,
			user: { id },
		};
	}

	async refresh(oldRefreshToken: string) {
		const userData = await tokenService.validateRefresh(oldRefreshToken);
		if (!userData) throw ApiError.UnauthorizedError();
		const { id } = userData;

		const { accessToken, refreshToken } = tokenService.generate({ id });

		await tokenService.saveRefresh(id, refreshToken);
		return {
			accessToken,
			refreshToken,
			user: { id },
		};
	}

	async login({
		email,
		username,
		password,
	}: {
		email?: string;
		username?: string;
		password: string;
	}) {
		const user = await this.findUserByCredentials({ email, username });
		if (!user) throw ApiError.BadRequest('User not found');

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) throw ApiError.BadRequest('Invalid password');

		const { accessToken, refreshToken } = tokenService.generate({
			id: user.id,
		});
		await tokenService.saveRefresh(user.id, refreshToken);

		return {
			user: { id: user.id },
			accessToken,
			refreshToken,
		};
	}

	async registration({
		email,
		username,
		password,
	}: {
		email: string;
		username: string;
		password: string;
	}) {
		let user;
		if (email) { user = await prisma.user.findFirst({ where: { email } }); }
		if (user) throw ApiError.BadRequest('Email already in use');
		if (username) { user = await prisma.user.findFirst({ where: { username } }); }
		if (user) throw ApiError.BadRequest('Username already  exist');

		const hashedPassword = await bcrypt.hash(password, 6);
		const newUser = await prisma.user.create({
			data: {
				email,
				username,
				password: hashedPassword,
			},
		});
		console.log(newUser);
		
		const { accessToken, refreshToken } = tokenService.generate({
			id: newUser.id,
		});
		await tokenService.saveRefresh(newUser.id, refreshToken);

		return {
			user: {
				id: newUser.id,
			},
			accessToken,
			refreshToken,
		};
	}
}
export default new AuthService();
