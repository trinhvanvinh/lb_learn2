import {belongsTo, Entity, model, property} from "@loopback/repository";
import {TodoList, TodoListWithRelations} from './todo-list.model';


@model()
export class TodoListImage extends Entity {
    @property({
        type: 'number',
        id: true,
        generated: false
    })
    id: number;

    @belongsTo(() => TodoList)
    todoListId: number;

    @property({
        required: true
    })
    value: String;

    constructor(data?: Partial<TodoListImage>) {
        super(data);
    }
}

export interface TodoListImageRelations {
    todoList?: TodoListWithRelations;
}

export type TodoListImageWithRelations = TodoListImage & TodoListImageRelations;

