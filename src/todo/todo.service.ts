import { Injectable, BadRequestException } from '@nestjs/common';
import { getRepository } from "typeorm"
import { Todo } from 'src/entities/todo.entity';
import { ENUM_STATUS } from 'src/entities/enum';

const nameSpace = '[src/todo/todo.service.ts]';

@Injectable()
export class TodoService {
  
  async findAll(req) {
    try {
      const { search = '', take=25, skip=0, filter = ENUM_STATUS.INCOMPLETE } = req.query
      if(search || filter){
        const response = await getRepository(Todo).createQueryBuilder('todo')
        .where('todo.deletedAt IS NULL')
        .andWhere(`todo.title LIKE '%${search}%'`)
        .andWhere('todo.status = :filter', { filter })
        .take(take)
        .skip(skip)
        .orderBy('todo.createdAt', 'DESC')
        .getManyAndCount()
        return { message: 'success', data: response[0], count: response[1] }
      }

      const response = await getRepository(Todo).createQueryBuilder('todo')
      .where('todo.deletedAt IS NULL')
      .skip(skip)
      .take(take)
      .orderBy('todo.createdAt', 'DESC')
      .getManyAndCount()
      return { message: 'success',  data: response[0], count: response[1] }
    } catch(e) {
      console.error(`${nameSpace} findAll- ${e}`)
      throw new BadRequestException(e.message)
    }
  }

  async create(req) {
    try {
      const { title } = req.body
      if(!title){
        throw new BadRequestException(`The title field is required`);
      }
      const response = await getRepository(Todo).save({ title })
      return {
        message: 'success',
        data: response
      }
    } catch(e) {
      console.error(`${nameSpace} create- ${e}`)
      throw new BadRequestException(e.message)
    }
  }

  async update(id, req) {
    try {
      const { status } = req.body
      const findById = await getRepository(Todo).findOne({ id })
      if(!findById) {
        throw new BadRequestException(`Could not find data!`); 
      }
      await getRepository(Todo).update({ id },{
        status
      })
      const response = await getRepository(Todo).findOne({ id })
      return {
        message: 'success', 
        data: response
      }
    } catch(e) {
      console.error(`${nameSpace} update- ${e}`)
      throw new BadRequestException(e.message)
    }
  }
}
