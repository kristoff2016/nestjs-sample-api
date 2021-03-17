import { BadRequestException, Injectable } from '@nestjs/common'
import { getRepository } from "typeorm";
import * as bcrypt from 'bcrypt';

import { User } from 'src/entities/user.entity';
import { generateJwt, passwordHash }  from 'src/utils/helper'

const nameSpace = '[auth/auth.service.ts]';

@Injectable()
export class AuthService {

async login (req) { 
  try {
    const { email, password } = req.body
    if(!email){
      throw new BadRequestException(`The email field is required`);
    }
    if(!password){
      throw new BadRequestException(`The password field is required`);
    }
    const findUser = await getRepository(User).findOne({
      email
    })
    if(!findUser){
       throw new BadRequestException(`Could not find user!`);
    }
    const isMatch = await bcrypt.compare(password, findUser.password);
    if(!isMatch){
      throw new BadRequestException(`Invalid credentials`);
    }
    const accessToken = await generateJwt(findUser)
    return {
      data: findUser,
      accessToken,
      message: "success"
    }
  } catch(e) {
    console.error(`${nameSpace} login- ${e}`)
    throw new BadRequestException(e.message)
  }
}

async register (req) {
  try {
    const { displayName, email, password } = req.body
     if(!email){
        throw new BadRequestException(`The email field is required`);
     }
     if(!password){
      throw new BadRequestException(`The password field is required`);
     }
      const passwordHas = await passwordHash(password)
      const findEmail = await getRepository(User).findOne({ email })
      if(findEmail){
        throw new BadRequestException(`This email already in used.`);
      }
      const response = await getRepository(User).save({
        displayName, 
        password: passwordHas, 
        email
      })
      const accessToken = await generateJwt(response)
      return {
        message: 'success',
        accessToken: accessToken,
        data: response
      }
  } catch(e){
    console.error(`${nameSpace} register- ${e}`)
    throw new BadRequestException(e.message)
  }
}

}