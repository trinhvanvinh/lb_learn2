import {inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, Getter, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {TodoList} from '../models';
import {TodoListImage, TodoListImageRelations} from '../models/todo-list-image.model';
import {TodoListRepository} from './todo-list.repository';


export class TodoListImageRepository extends DefaultCrudRepository<
  TodoListImage,
  typeof TodoListImage.prototype.id,
  TodoListImageRelations
  > {

  public readonly todoList: BelongsToAccessor<
    TodoList,
    typeof TodoListImage.prototype.id
  >;

  constructor(
    @inject('datasources.db') datasource: DbDataSource,
    @repository.getter('TodoListRepository')
    protected todoListRepositoryGetter: Getter<TodoListRepository>
  ) {
    super(TodoListImage, datasource);

    this.todoList = this.createBelongsToAccessorFor(
      'todoList',
      todoListRepositoryGetter
    );

    this.registerInclusionResolver('todoList', this.todoList.inclusionResolver);

  }
}
