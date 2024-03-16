import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    const user: User = new User();

    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.age = createUserDto.age;
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.gender = createUserDto.gender;
    console.log(user);
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    return await this.userRepository.findOneBy({ id });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user: User = new User();
    user.name = updateUserDto.name;
    user.email = updateUserDto.email;
    user.age = updateUserDto.age;
    user.username = updateUserDto.username;
    user.password = updateUserDto.password;
    user.gender = updateUserDto.gender;
    user.id = id;
    return await this.userRepository.save(user);
  }

  async remove(id: string) {
    return await this.userRepository.delete(id);
  }
}
