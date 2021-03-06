import {belongsTo,Entity, model, property} from '@loopback/repository';
import {TodoList, TodoListWithRelations} from './todo-list.model';

@model()
export class Todo extends Entity {
  @property({
    type: 'number',
    id: true,
    generate: false
  })
  id: number;

  @property({
    type: 'string',
    required: true
  })
  title: string;

  @property({
    type: 'string',
  })
  desc?: string;

  @property({
    type: 'boolean'
  })
  isComplete: boolean;

  @belongsTo(() => TodoList)
  todoListId: number;

  getId() {
    return this.id;
  }

  constructor(data?: Partial<Todo>) {
    super(data);
  }

}

export interface TodoRelations {
  todoList?: TodoListWithRelations;
}

export type TodoWithRelations = Todo & TodoRelations;
