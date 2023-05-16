import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePutUserDto } from './dto/update-put-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDto) {
    const user = await this.findOneByEmail(data.email);
    if (user) throw new BadRequestException('User alread exists!');
    data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());
    const newUser = this.usersRepository.create(data);
    return await this.usersRepository.save(newUser);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new BadRequestException('User not found!');
    return user;
  }

  async findOneByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }

  async update(id: string, data: UpdatePutUserDto) {
    const { name, email, password, role } = data;
    await this.exists(id);
    data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());
    this.usersRepository.update(id, {
      name,
      email,
      password,
      role,
    });
  }

  async updatePartial(id: string, data: UpdatePatchUserDto) {
    const user = await this.findOne(id);
    if (data.password) {
      data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());
    }
    this.usersRepository.merge(user, data);
    await this.usersRepository.save(user);
  }

  async remove(id: string) {
    await this.exists(id);
    await this.usersRepository.softDelete({ id });
  }

  async exists(id: string): Promise<boolean> {
    return await this.usersRepository.exist({ where: { id } });
  }
}
