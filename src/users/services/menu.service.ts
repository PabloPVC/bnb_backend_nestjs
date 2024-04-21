import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuDtos, UpdateMenuDto } from '../dto/menu.dtos';
import { IsNull, Repository } from 'typeorm';
import { Menu } from '../entities/menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu) private readonly menuRepository: Repository<Menu>,
  ) {}

  async findAll(): Promise<Menu[]> {
    return await this.menuRepository.find();
  }

  async findOne(id: number) {
    const menu = await this.menuRepository.findOne({
      where: { id: id },
    });
    if (!menu) {
      throw new NotFoundException(`Menu con id: ${id} no existe`);
    }
    return menu;
  }

  async findPagePadre() {
    const menus = await this.menuRepository.find({
      select: ['id', 'label'],
      where: { id_padre: IsNull() },
      order: {
        id: 'ASC', // "DESC"
      },
    });
    return menus;
  }

  async create(payload: CreateMenuDtos) {
    const newmenu = this.menuRepository.create({ ...payload });
    return await this.menuRepository.save(newmenu);
  }

  async update(id: number, payload: UpdateMenuDto) {
    const menu = await this.menuRepository.findOneBy({ id });
    if (!menu) {
      throw new NotFoundException(`Menu con id: ${id} no existe`);
    }
    this.menuRepository.merge(menu, payload);
    return this.menuRepository.save(menu);
  }

  async remove(id: number) {
    const menu = await this.menuRepository.findOneBy({ id });
    if (!menu) {
      throw new NotFoundException(`Menu con id: ${id} no existe`);
    }
    return await this.menuRepository.softRemove(menu);
  }
}
