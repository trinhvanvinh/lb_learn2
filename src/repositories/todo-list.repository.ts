import { DefaultCrudRepository, HasManyRepositoryFactory, juggler, repository } from '@loopback/repository';
import { TodoList, TodoListRelations } from '../models/todo-list.model';
import { Todo } from '../models';
import { inject, Getter } from '@loopback/core';
import { TodoRepository } from './todo.repository';

export class TodoListRepository extends DefaultCrudRepository<
TodoList,
typeof TodoList.prototype.id,
TodoListRelations
>{

    public readonly todos: HasManyRepositoryFactory<
        Todo,
        typeof TodoList.prototype.id
    >;

    constructor(
        @inject('datasources.db') dataSource: juggler.DataSource,
        @repository.getter('TodoRepository')
        protected todoRepositoryGetter: Getter<TodoRepository>,
        //@repository.getter('TodoListImageRepository')
        //protected todoListImageRepositoryGetter: Getter<TodoListI>
    ){

        super(TodoList, dataSource);
        this.todos = this.createHasManyRepositoryFactoryFor(
            'todos',
            todoRepositoryGetter
        );

        this.registerInclusionResolver('todos', this.todos.inclusionResolver);
        // this.image = this.createHasOneRepositoryFactoryFor(
        //     'image',
        //     todoListImage
        // )

        //this.registerInclusionResolver('image', this.image.inclusionResolver);

    }

    public findByTitle(title: string){
        return this.findOne({where: {title}});
    }

}