import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export class Token {
  static generateTokens(
    user: { id: string; email: string },
    jwtService: JwtService,
    configService: ConfigService, // Use ConfigService
  ): { accessToken: string; refreshToken: string } {
    const payload = { sub: user.id, email: user.email };

    const accessToken = jwtService.sign(payload, {
      secret: configService.get<string>('JWT_SECRET'), // Securely fetch secret
      expiresIn: configService.get<string>('JWT_ACCESS_TOKEN_EXPIRATION'), // e.g., 15m
    });

    const refreshToken = jwtService.sign(payload, {
      secret: configService.get<string>('JWT_SECRET'),
      expiresIn: configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION'), // e.g., 7d
    });

    return { accessToken, refreshToken };
  }
}
