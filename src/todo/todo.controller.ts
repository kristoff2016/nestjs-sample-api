import { Controller, Get, Post, Put, Param, Request, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service'
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
@UseGuards(JwtAuthGuard)
@Controller('api/todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Request() req) {
    return this.todoService.create(req)
  }
  @Get()
  async findAll(@Request() req) {
    return this.todoService.findAll(req)
  }
  @Put(':id')
  async update(@Param('id') id: string, @Request() req) {
    return this.todoService.update(id, req)
  }
}
