import { User } from './user'

export interface Group {
    id?: number,
    name:string,
    totalGroupSpend: number,
    totalUserSpend?: number,
}