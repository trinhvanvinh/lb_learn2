import { model, Entity, property, hasMany, hasOne } from "@loopback/repository";
import { Todo, TodoWithRelations } from './todo.model';
// import { TodoListImage } from './todo-list-image.model';
// import { type } from 'os';


@model()
export class TodoList extends Entity{
    @property({
        type: 'number',
        id: true,
        generated: false
    })
    id: number;

    @property({
        type: 'string',
        required: true
    })
    title: string;

    @property({
        type: 'string'
    })
    color: string;

    @hasMany(()=>Todo)
    todos: Todo[];

    //@hasOne(()=> TodoListImage)
    //image: TodoListImage;

    constructor(data?: Partial<TodoList>){
        super(data);
    }
}

export interface TodoListRelations {
    todo?: TodoWithRelations[];
    //image?: TodoListImageWithRelations;
}

export type TodoListWithRelations = TodoList & TodoListRelations;