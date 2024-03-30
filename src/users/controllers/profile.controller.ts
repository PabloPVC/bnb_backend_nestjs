import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Put,
  Body,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from '../services/profile.service';
import { CreateProfileDto, UpdateProfileDto } from '../dto/profile.dtos';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Profiles')
@Controller('profiles')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get()
  getUsers(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return this.profileService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.profileService.findOne(id);
  }
  @Post()
  create(@Body() payload: CreateProfileDto) {
    return this.profileService.create(payload);
  }
  @Put(':id')
  updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProfileDto,
  ): any {
    return this.profileService.update(id, body);
  }
  @Delete(':id')
  deleteProfile(@Param('id', ParseIntPipe) id: number): any {
    return this.profileService.remove(id);
  }
}
