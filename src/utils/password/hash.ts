import * as bcrypt from 'bcrypt';
import { SALT } from 'src/constants/enum/password/password.enum';

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT.ROUNDS);
}
