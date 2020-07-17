import { repository, Filter } from '@loopback/repository';
import { TodoListRepository } from '../repositories/todo-list.repository';
import { post, getModelSchemaRef, param, requestBody, get } from '@loopback/rest';
import { Todo } from '../models';


export class TodoListTodoController{
    constructor(
        @repository(TodoListRepository) protected todoListRepo: TodoListRepository
    ){}

    @post('/todo-lists/{id}/todos', {
        responses: {
            '200': {
                description: 'TodoList.Todo model instance',
                content: {
                    'application/json':{schema: getModelSchemaRef(Todo)}
                }
            }
        }
    })
    async create(
        @param.path.number('id') id: number,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Todo, {
                        title: 'NewTodoInTodoList',
                        exclude: ['id'],
                        optional: ['todoListId']
                    })
                }
            }
        })
        todo: Omit<Todo, 'id'>
    ): Promise<Todo>{
        return this.todoListRepo.todos(id).create(todo);
    }

    // get id todolist
    @get('/todo-lists/{id}/todos', {
        responses: {
           '200': {
               description: 'Array of todo belonging to todoList',
               content: {
                   'application/json':{
                       schema: {
                           type: 'array', items: getModelSchemaRef(Todo)
                       }
                   }
               }
           } 
        }
    })
    async find(
        @param.path.number('id') id: number,
        @param.query.object('filter') filter?: Filter<Todo>
    ): Promise<Todo[]>{
        return this.todoListRepo.todos(id).find(filter);
    }

}