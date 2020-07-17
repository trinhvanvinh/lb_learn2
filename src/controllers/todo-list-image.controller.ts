import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, param, post, requestBody} from '@loopback/rest';
import {TodoListImage} from '../models/todo-list-image.model';
import {TodoListRepository} from '../repositories/todo-list.repository';



export class TodoListImageController {
  constructor(
    @repository(TodoListRepository) protected todoListRepo: TodoListRepository
  ) {}

  @post('/todo-lists/{id}/image', {
    responses: {
      '200': {
        description: 'create todoListImage model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(TodoListImage)}
        }
      }
    }
  })
  async create(
    @param.path.number('id') id: number,
    @requestBody() image: TodoListImage
  ): Promise<TodoListImage> {
    return this.todoListRepo.image(id).create(image);
  }

  @get('/todo-lists/{id}/image', {
    responses: {
      '200': {
        description: 'The image belonging to the TodoList',
        content: {
          'application/json': {schema: getModelSchemaRef(TodoListImage, {includeRelations: true})}
        }
      }
    }
  })
  async find(@param.path.number('id') id: number): Promise<TodoListImage> {
    return this.todoListRepo.image(id).get();
  }


}
