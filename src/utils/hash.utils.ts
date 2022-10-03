import bcrypt from 'bcrypt';
import config from '../config/config';

export default async function hash(str: string) {
  const salt = await bcrypt.genSalt(config.saltWorkFactor);
  const hashedPassword = await bcrypt.hash(str, salt);

  return hashedPassword;
}
