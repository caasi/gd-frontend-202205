import { User } from './user'

export interface Post {
  _id: string
  postBy: User['_id']
  content: string
}
