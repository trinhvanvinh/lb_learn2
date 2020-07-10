import { model, Entity, property, hasMany, hasOne } from "@loopback/repository";
import { Todo } from './todo.model';


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

    @hasOne(()=> Todo)
}