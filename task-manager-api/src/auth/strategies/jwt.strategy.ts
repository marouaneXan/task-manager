import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract token from Authorization header
      ignoreExpiration: false, // Automatically reject expired tokens
      secretOrKey: configService.get<string>('JWT_SECRET'), // JWT secret
    });
  }

  async validate(payload: any) {
    // The payload contains decoded JWT info (e.g., sub and email)
    return { userId: payload.sub, email: payload.email };
  }
}
