import {Entity, model, property} from '@loopback/repository';


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
    type: 'boolean'
  })

}
