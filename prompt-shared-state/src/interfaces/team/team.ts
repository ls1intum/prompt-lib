import { Person } from '../person/person'

export interface Team {
  id: string
  name: string
  members: Person[]
  tutors: Person[]
}
