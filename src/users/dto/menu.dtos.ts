import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateMenuDtos {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'El nombre del menú' })
  readonly nombre: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'El descripción del menú' })
  readonly descripcion: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'El rotulo del menú' })
  label: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'El ruta del menú' })
  ruta: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'El estado del menú' })
  estado: boolean;
}

export class UpdateMenuDto extends PartialType(CreateMenuDtos) {}
