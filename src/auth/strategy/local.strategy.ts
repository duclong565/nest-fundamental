import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { User } from 'src/users/entity/user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // Use 'email' instead of 'username' for authentication
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<User> {
    // Validate the user's credentials
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      // Throw an exception if validation fails
      throw new UnauthorizedException('Invalid credentials');
    }
    // Return the authenticated user
    return user;
  }
}
