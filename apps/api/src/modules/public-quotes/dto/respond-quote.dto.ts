import { IsIn, IsString, MinLength } from 'class-validator';
export class RespondQuoteDto { @IsIn(['APPROVED', 'DECLINED']) status!: 'APPROVED' | 'DECLINED'; @IsString() @MinLength(2) signerName!: string; @IsString() @MinLength(5) document!: string; }
