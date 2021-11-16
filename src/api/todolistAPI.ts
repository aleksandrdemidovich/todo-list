import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': 'cf750a83-7c21-4e27-915c-0dade0a73893'
    }
})



export const todolistAPI = {
    getTodos() {
        return instance.get<Array<TodoType>>('/todo-lists')
    },
    createTodo(title: string) {
        return instance.post<CommonResponseType<{ item: TodoType }>>('/todo-lists', {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<CommonResponseType>(`/todo-lists/${todolistId}`)
    },
    updateTodoTitle(todolistId: string, title: string) {
        return instance.put<CommonResponseType>(`/todo-lists/${todolistId}`, {title})
    }
}

type CommonResponseType<T = {}> = {
    fieldsError: Array<string>,
    resultCode: number
    messages: Array<string>,
    data: T
}

type TodoType =  {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

