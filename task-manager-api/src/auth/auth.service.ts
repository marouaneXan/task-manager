import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { Token } from 'src/utils/token';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      console.log('User not found'); // Add this log
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid password'); // Add this log
      throw new UnauthorizedException('Invalid email or password');
    }

    // If successful, continue to generate tokens
    const tokens = Token.generateTokens(
      user,
      this.jwtService,
      this.configService,
    );
    await this.userService.updateRefreshToken(
      user.id,
      await bcrypt.hash(tokens.refreshToken, 10),
    );

    return {
      message: 'Login successful',
      ...tokens,
    };
  }

  async refreshAccessToken(refreshToken: string): Promise<any> {
    const user = await this.userService.findByRefreshToken(refreshToken);
    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Generate a new access token using the Token utility
    const { accessToken } = Token.generateTokens(
      user,
      this.jwtService,
      this.configService,
    );

    return {
      message: 'Access token refreshed successfully',
      accessToken,
    };
  }

  async register(userDto: UserDto): Promise<any> {
    const { name, email, password } = userDto;

    // Check if the user already exists
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email is already in use');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await this.userService.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate tokens
    const { accessToken, refreshToken } = Token.generateTokens(
      { id: newUser.id, email: newUser.email },
      this.jwtService,
      this.configService,
    );

    // Hash and store the refresh token
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userService.updateRefreshToken(newUser.id, hashedRefreshToken);

    return {
      message: 'User registered successfully',
      accessToken,
      refreshToken,
    };
  }
}
