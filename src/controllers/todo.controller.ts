import { repository, Filter } from '@loopback/repository';
import { TodoRepository } from '../repositories/todo.repository';
import { getModelSchemaRef, requestBody, post, get, param, put, patch,del } from '@loopback/rest';
import { Todo, TodoList } from '../models';

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

    // === == GET ID User ====
    @get('/todos/{id}', {
        responses:{
            '200': {
                description:'Todo model instance',
                content: {
                    'application/json': {
                        schema: getModelSchemaRef(Todo, {includeRelations: true})
                    }
                }
            }
        }
    }) 
    async findTodoByID(
        @param.path.number('id') id: number,
        @param.filter(Todo)
        filter?: Filter<Todo>,
        
    ): Promise<Todo>{
        return this.todoRepository.findById(id, filter);
    }

    // ===== API PUT ======
    @put('/todos/{id}',{
        responses: {
            '204': {
                description: 'Todo PUT success'
            }
        }
    })
    async replaceTodo(
        @param.path.number('id') id: number,
        @requestBody() todo: Todo
    ): Promise<void>{
        await this.todoRepository.replaceById(id, todo);
    }

    // ==== PATCH API ====
    @patch('/todos/{id}', {
        responses: {
            '204': {
                description: 'Todo Path success'
            }
        }
    })
    async updateTodo(
        @param.path.number('id') id: number,
        @requestBody({
            content:{
                'application/json': {
                    schema: getModelSchemaRef(Todo, {partial: true})
                }
            }
        })
        todo: Partial<Todo>,
    ): Promise<void>{
        await this.todoRepository.updateById(id, todo);
    }

    // === Get TODO List ID ====
    @get('/todos/{id}/todo-list',{
        responses: {
            '200':{
                description: 'Todolist model instance',
                content: {'application/json':{schema: getModelSchemaRef(TodoList)}}
            }
        }
    })
    async findOwnList (
        @param.path.number('id') id: number
    ): Promise<TodoList>{
        return this.todoRepository.todoList(id);
    }


    //  ==== API DELETE ====
    @del('/todos/{id}',{
        responses: {
            '204': {
                description: 'Delete success'
            }
        }
    })
    async deleteTodo(@param.path.number('id') id: number ):
    Promise<void>{
        await this.todoRepository.deleteById(id);
    }
    
    

}   