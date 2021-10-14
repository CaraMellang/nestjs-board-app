import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/auth.credential.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(AuthCredentialDto: AuthCredentialDto): Promise<void> {
    const { username, password } = AuthCredentialDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      username,
      password: hashedPassword,
    });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(`${username} is already existing`);
      } else {
        throw new InternalServerErrorException();
      }
      // console.log('error', error);
    }
  }

  async signInUser(authCredentialDto: AuthCredentialDto): Promise<string> {
    const { username, password } = authCredentialDto;

    const user = await this.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      return `login success! welcome ${user.username}`;
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}
