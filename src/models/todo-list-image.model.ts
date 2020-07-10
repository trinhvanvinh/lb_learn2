import { model, Entity, property, belongsTo } from "@loopback/repository";
import { TodoList } from './todo-list.model';


@model()
export class TodoListImage extends Entity{
    @property({
        type: 'number',
        id: true,
        generated: false
    })
    id: number;

    @belongsTo(()=> TodoList)
    todoListId: number;

    
}