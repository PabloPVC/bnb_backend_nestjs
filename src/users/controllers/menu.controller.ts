import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Body,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { MenuService } from '../services/menu.service';

import { CreateMenuDtos, UpdateMenuDto } from '../dto/menu.dtos';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Menus')
@Controller('menus')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Get()
  getMenus() {
    return this.menuService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.findOne(id);
  }

  @Post('findPagePadre')
  findPagePadre() {
    return this.menuService.findPagePadre();
  }

  @Post()
  create(@Body() payload: CreateMenuDtos) {
    return this.menuService.create(payload);
  }

  @Put(':id')
  updateMenu(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateMenuDto,
  ): any {
    return this.menuService.update(id, body);
  }

  @Delete(':id')
  deleteUsers(@Param('id', ParseIntPipe) id: number): any {
    return this.menuService.remove(id);
  }
}
