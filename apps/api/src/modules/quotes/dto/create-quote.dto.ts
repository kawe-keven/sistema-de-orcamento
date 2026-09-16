import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsNumber, IsPositive, IsString, MaxLength, Min, ValidateNested } from 'class-validator';
export class QuoteItemDto { @IsString() description!: string; @Type(() => Number) @IsNumber() @IsPositive() quantity!: number; @Type(() => Number) @IsNumber() @Min(0) unitPrice!: number; }
export class CreateQuoteDto { @IsString() @MaxLength(120) clientName!: string; @IsEmail() clientEmail!: string; @IsString() @MaxLength(160) project!: string; @IsString() @MaxLength(5000) description!: string; @IsArray() @ValidateNested({ each: true }) @Type(() => QuoteItemDto) items!: QuoteItemDto[]; @Type(() => Number) @IsNumber() @Min(0) discount = 0; @Type(() => Number) @IsNumber() @Min(0) tax = 0; }
