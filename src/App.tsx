import React, {useState} from 'react';
import './App.css';
import {Todolist} from './TodoList';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
export type todolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<todolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'active'},
    ])

    let [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "Fish", isDone: true},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Apple", isDone: false},
            {id: v1(), title: "Book", isDone: false},
        ]
    })


    function removeTask(id: string, todolistId: string) {
        let currentTodolistTasks = tasks[todolistId]
        tasks[todolistId] = currentTodolistTasks.filter(t => t.id !== id)
        setTasks({...tasks})
    }
    function addTask(title: string, todolistId: string) {
        let currentTodolistTasks = tasks[todolistId]
        let newTask = {id: v1(), title: title, isDone: false}
        tasks[todolistId] = [newTask, ...currentTodolistTasks]
        setTasks({...tasks})
    }
    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let currentTodolistTasks = tasks[todolistId]
        let task = currentTodolistTasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }
        setTasks({...tasks});
    }
    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
        }
        setTodolists([...todolists])
    }
    function removeTodolist(todolistId: string){
        let filteredTodolists = todolists.filter(tl => tl.id !== todolistId)
        setTodolists([...filteredTodolists])
        delete tasks[todolistId]
        setTasks({...tasks})

    }

    return (
        <div className="App">
            {
                todolists.map((tl) => {
                    let tasksForTodolist = tasks[tl.id];
                    if (tl.filter === "active") {
                        tasksForTodolist = tasks[tl.id].filter(t => !t.isDone);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = tasks[tl.id].filter(t => t.isDone);
                    }
                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                    />
                })
            }
        </div>
    );
}

export default App;
