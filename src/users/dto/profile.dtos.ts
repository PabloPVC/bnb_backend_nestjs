import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateProfileDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'El nombre del Perfil' })
  readonly nombre: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'El estado del Perfil activo/inactivo' })
  readonly estado: boolean;
}

export class UpdateProfileDto extends PartialType(
  OmitType(CreateProfileDto, []),
) {}
