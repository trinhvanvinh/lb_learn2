import { repository, Filter } from '@loopback/repository';
import { TodoRepository } from '../repositories/todo.repository';
import { getModelSchemaRef, requestBody, post, get, param } from '@loopback/rest';
import { Todo } from '../models';

export class TodoController {
    constructor(
        @repository(TodoRepository) protected todoRepository: TodoRepository,
    ){}

    //===== API POST =====

    @post('/todos', {
        responses: {
            '200':{
                description: 'Todo model instance',
                content: {'application/json': {schema: getModelSchemaRef(Todo)}}
            }
        }
    })

    async createTodo(
        @requestBody({
            content: {
                'application/json':{
                    schema: getModelSchemaRef(Todo, {title:'NewTodo', exclude: ['id']})
                }
            }
        })
        todo: Omit<Todo, 'id'>,
    ): Promise<Todo>{
        return this.todoRepository.create(todo);
    }

    // ===== API GET =====
    @get('/todos',{
        responses: {
            '200': {
                description: 'Array of Todo model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: getModelSchemaRef(Todo, {includeRelations: true})
                        }
                    }
                }
            }
        }
    })
    async findTodos(
        @param.filter(Todo)
        filter?: Filter<Todo>
    ): Promise<Todo[]>{
        return this.todoRepository.find(filter);
    }


}