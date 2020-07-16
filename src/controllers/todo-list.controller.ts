import { TodoListRepository } from '../repositories/todo-list.repository';
import { repository, CountSchema, Where, Count, Filter } from '@loopback/repository';
import { post, getModelSchemaRef, requestBody, param, get, patch } from '@loopback/rest';
import { TodoList } from '../models';



export class TodoListController{
    constructor(
        @repository(TodoListRepository)
        public todoListRepository: TodoListRepository
    ){}

    @post('/todo-list',{
        responses: {
            '200': {
                description: 'TodoList model instance',
                content: {'application/json':{schema: getModelSchemaRef(TodoList) }}
            }
        }
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(TodoList, {
                        title: 'NewTodoList',
                        exclude: ['id']
                    })
                }
            }
        })
        todoList: Omit<TodoList, 'id'>
    ): Promise<TodoList>{
        return this.todoListRepository.create(todoList);
    }

    @get('/todo-list/count', {
        responses: {
            '200': {
                description: 'TodoList model count',
                content: {'application/json': {schema: CountSchema}}
            }
        }
    })
    async count (
        @param.where(TodoList)
        where?: Where<TodoList>
    ): Promise<Count>{
        return this.todoListRepository.count(where);
    }

    // === api get all
    @get('/todo-lists', {
        responses: {
            '200': {
                description: 'Array of todoList model instance',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: getModelSchemaRef(TodoList, {includeRelations: true})
                        }
                    }
                }
            }
        }
    })
    async find(
        @param.filter(TodoList)
        filter ?: Filter<TodoList>
    ): Promise<TodoList[]>{
        return this.todoListRepository.find(filter);
    }

    // === patch api ====
    @patch('/todo-lists', {
       responses: {
           '200': {
               description: 'TodoList PATCH success count',
               content: {'application/json': {schema: CountSchema}}
           }
       }
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json':{
                    schema: getModelSchemaRef(TodoList, {partial: true})
                }
            }
        })
        todoList: Partial<TodoList>,
        @param.where(TodoList)
        where?: Where<TodoList>
    ): Promise<Count>{
        return this.todoListRepository.updateAll(todoList)
    }
   

}