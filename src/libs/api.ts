import { User } from './user'
import { Post } from './post'
import { delay } from './time'

// XXX: you should not change this file

const sampleUserList: User[] = [{
  _id: '119',
  type: 'natural',
  name: '大中天',
  description: '隔山打牛，隔山打不到'
}, {
  _id: '120',
  type: 'natural',
  name: 'John Doe',
  description: '我是約翰'
}, {
  _id: '121',
  type: 'natural',
  name: 'Jane Doe',
  description: '我是珍妮'
}, {
  _id: '122',
  type: 'legal',
  name: 'Gemini Data',
  description: '捷敏數據有限公司'
}]

export const getUserList = (): Promise<User[]> => {
  return Promise
    .resolve(sampleUserList)
    .then(delay(3000))
}

const samplePostMap: Partial<Record<string, Post[]>> = {
  '119': [{
    _id: '1',
    postBy: '119',
    content: '尼們好，窩來惹。'
  }, {
    _id: '2',
    postBy: '119',
    content: '太...太大意惹！'
  }],
  '120': [],
  '121': [{
    _id: '3',
    postBy: '121',
    content: '原本備貨100組，不到5分鐘賣掉90組。根本不夠賣，請原廠再加100組！'
  }],
  '122': []
}

export const getPostListById = (userId: User['_id']): Promise<Post[]> => {
  return Promise
    .resolve(samplePostMap[userId] ?? [])
    .then(delay(2000))
}
