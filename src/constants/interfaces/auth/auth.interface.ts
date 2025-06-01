import { User } from '@prisma/client';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export interface AuthRequest {
  user: User;
}

export interface GoogleUser extends CreateUserDto {
  is_email_confirm: boolean;
}

export interface GoogleProfile {
  id: string;
  displayName: string;
  emails: { value: string; verified?: boolean }[];
  photos?: { value: string }[];
  [key: string]: any;
}
