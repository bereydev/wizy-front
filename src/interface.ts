export interface BaseData {
    id?: string
}

export interface User extends BaseData {
    email: string
    first_name: string
    last_name: string
    tva: number
    confirmed: boolean
    role: number
}

export interface Event extends BaseData {
    nbr?: string
    place?: string
    start: Date
    end: Date
    ht?: number
    discount?: number
    payed?: boolean
    summary: string
    event_model?: EventModel
    client_id?: string
    color?: string
    cycle_id?: string
    client_full_name?: string
    event_model_id?: string
}

export interface EventModel extends BaseData {
    name: string
    description : string
    color: string
    section: Section
    teacher_id?: string
}

export interface Section extends BaseData {
   name:string
   confidentiality:string
   
}

export interface Client extends BaseData {
    mail: string
    last_name: string
    first_name: string
    phones: Array<Phone>
    company: string
    address: string
    address2: string
    city: string
    postcode: string
    state: string
    discount: number
    price: number
    note: string
    prospect?: boolean
    inactive?: boolean
    finished?: boolean
}

interface Phone {
    label: string,
    number: string, 
}

export interface Tool extends BaseData {
    name: string,
    fav: boolean,
    tags: object,
}

export interface Field {
    name: string
    label: string
    value?: any
    type?: string
    placeholder?: string
    id?: string
    autocomplete?: string
}
