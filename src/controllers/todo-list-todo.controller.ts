import {Count, CountSchema, Filter, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, requestBody} from '@loopback/rest';
import {Todo} from '../models';
import {TodoListRepository} from '../repositories/todo-list.repository';


export class TodoListTodoController {
    constructor(
        @repository(TodoListRepository) protected todoListRepo: TodoListRepository
    ) {}

    @post('/todo-lists/{id}/todos', {
        responses: {
            '200': {
                description: 'TodoList.Todo model instance',
                content: {
                    'application/json': {schema: getModelSchemaRef(Todo)}
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
    ): Promise<Todo> {
        return this.todoListRepo.todos(id).create(todo);
    }

    // get id todolist
    @get('/todo-lists/{id}/todos', {
        responses: {
            '200': {
                description: 'Array of todo belonging to todoList',
                content: {
                    'application/json': {
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
    ): Promise<Todo[]> {
        return this.todoListRepo.todos(id).find(filter);
    }

    // ==== PATH ID ===
    @patch('/todo-lists/{id}/todos', {
        responses: {
            '200': {
                description: 'TodoList.Todo PATCH success count',
                content: {'application/json': {schema: CountSchema}}
            }
        }
    })
    async patch(
        @param.path.number('id') id: number,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Todo, {partial: true})
                }
            }
        })
        todo: Partial<Todo>,
        @param.where(Todo) where?: Where<Todo>
    ): Promise<Count> {
        return this.todoListRepo.todos(id).patch(todo, where);
    }

    // === delete api ===
    @del('/todo-lists/{id}/todos', {
        responses: {
            '200': {
                description: 'TodoList.Todo Delete success count',
                content: {'application/json': {schema: CountSchema}}
            }
        }
    })
    async delete(
        @param.path.number('id') id: number,
        @param.where(Todo) where?: Where<Todo>
    ): Promise<Count> {
        return this.todoListRepo.todos(id).delete(where);
    }

}
