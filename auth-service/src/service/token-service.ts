import jwt from 'jsonwebtoken';
import prisma from '../prisma/prisma-service';
import { JwtPayload, Payload } from '../types/jwtPayload';
import redisClient from '../redis/redis-client';

class TokenService {
	private async deleteRefreshFromDb(userId: number) {
		await prisma.refreshToken.deleteMany({
			where: { userId },
		});
	}

	private async saveRefreshToDB(userId: number, token: string) {
		await this.deleteRefreshFromDb(userId);
		await prisma.refreshToken.create({
			data: {
				token,
				user: {
					connect: { id: userId },
				},
			},
		});
	}

	generate(payload: any) {
		const accessToken = jwt.sign(
			{ payload },
			process.env.JWT_ACCESS_SECRET!,
			{ expiresIn: process.env.JWT_ACCESS_EXPIRES! }
		);
		const refreshToken = jwt.sign(
			{ payload },
			process.env.JWT_REFRESH_SECRET!,
			{ expiresIn: process.env.JWT_REFRESH_EXPIRES! }
		);
		return {
			accessToken,
			refreshToken,
		};
	}

	async saveRefresh(userId: number, token: string) {
		await this.deleteRefreshFromDb(userId);

		await redisClient.set(`refreshToken:${userId}`, token, {
			EX: 24 * 60 * 60 * 1000,
		});
		this.saveRefreshToDB(userId, token);
	}

	async deleteRefresh(userId: number) {
		this.deleteRefreshFromDb(userId);
		await redisClient.del(`refreshToken:${userId}`);
	}

	async validateRefresh(token: string): Promise<Payload | null> {
		try {
			const userData = jwt.verify(
				token,
				process.env.JWT_REFRESH_SECRET!,
				{ ignoreExpiration: false }
			) as JwtPayload;
			const userId = userData.payload.id;

			let cachedToken = await redisClient.get(`refreshToken:${userId}`);
			if (!cachedToken) {
				const dbToken = await prisma.refreshToken.findFirst({
					where: { userId },
				});
				if (dbToken) {
					cachedToken = dbToken.token;
					await redisClient.set(
						`refreshToken:${userId}`,
						cachedToken,
						{
							EX: 24 * 60 * 60 ,
						}
					);
				}
			}

            if (cachedToken !== token) return null
            return userData.payload
		} catch (e) {
			return null;
		}
	}

    async validateRefreshWithDb(token: string): Promise<Payload | null> {
        try {
            const userData = jwt.verify(
                token,
                process.env.JWT_REFRESH_SECRET!,
                { ignoreExpiration: false }
            ) as JwtPayload;
            const userId = userData.payload.id;

            const dbToken = await prisma.refreshToken.findFirst({
                where: { userId, token },
            });
            if (!dbToken) return null;

            return userData.payload;
        } catch (e) {
            return null;
        }
    }
}

export default new TokenService();
