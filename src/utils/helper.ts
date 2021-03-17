import { BadRequestException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as _includes from 'lodash';
import * as moment from 'moment';
import * as bcrypt from 'bcrypt';

const nameSpace = 'utils/helper.ts'

export const momentDefault = moment().format('YYYY-MM-DD HH:mm:ss.msZZ')

export const passwordHash = async(password) => {
  return await bcrypt.hash(password, 12)
}
export const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export const generateJwt = async data => {
  try {
    let token = await jwt.sign(data, process.env.JWT_SECRET_KEY, {
      expiresIn: '30d',
    });
    return `Bearer ${token}`
  } catch (e) {
    console.error(`${nameSpace} generateJwt - ${e}`)
    throw new BadRequestException(e);
  }
};
export const decryptToken = async token => {
  try {
    const removeBearer = token.replace('Bearer ', '')
    const tokenData = await jwt.verify(removeBearer, process.env.JWT_SECRET_KEY);
    return tokenData;
  } catch (e) {
    console.error(`${nameSpace} decryptToken - ${e}`)
    throw new BadRequestException("invalid token");
  }
};
