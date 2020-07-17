import {Filter, repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {Note} from '../models';
import {NoteRepository} from '../repositories/note.repository';


export class NoteController {
  constructor(
    @repository(NoteRepository)
    public noteRepository: NoteRepository
  ) {}

  // === get ALL ====
  @get('/notes', {
    responses: {
      '200': {
        description: 'Array of Note model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Note)}
          }
        }
      }
    }
  })
  async find(
    @param.filter(Note)
    filter: Filter<Note>
  ): Promise<Note[]> {
    return this.noteRepository.find(filter);
  }


}
