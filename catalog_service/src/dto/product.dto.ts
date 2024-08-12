import { IsNotEmpty, IsNumber, IsOptional, IsString,Min } from "class-validator";

export class CreateProductRequest {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    @Min(1)
    price: number;

    @IsNumber()
    @Min(0)
    stock: number;

}

export class UpdateProductRequest {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsNumber()
    @Min(1)
    @IsOptional()
    price: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    stock: number;
}