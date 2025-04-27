import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MinLength(3)
    name :string;
    @IsString()
    @MinLength(3)
    userName: string;
    @IsString()
    @MinLength(9)
    @MaxLength(14)
    phone: string;
    @IsString()
    photo?: string
}
