import { IsUUID } from "class-validator"

export class CreateChatDto {
    @IsUUID()
    fromId: string

    @IsUUID()
    toId: string
    
}
