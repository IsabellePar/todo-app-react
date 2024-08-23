import { useState } from "react";
import "./App.css";

interface Task {
    taskName: string;
    isDone: boolean;
}

export default function App() {
    const [task, setTask] = useState<string>("");
    const [taskList, setTaskList] = useState<Task[]>([]);
    const remainingTasks = taskList.filter((task) => !task.isDone);
    const emojiList = [
        "https://emojiisland.com/cdn/shop/products/Sleeping_Emoji_2_compact.png?v=1571606093",
        "https://emojiisland.com/cdn/shop/products/Sweat_Emoji_Icon_2_compact.png?v=1571606114",
        "https://emojiisland.com/cdn/shop/products/Anguished_Emoji_Icon_7b234731-b1e1-40e6-9c4c-364a89b62b08_compact.png?v=1571606089",
        "https://emojiisland.com/cdn/shop/products/12_compact.png?v=1571606116",
        "https://emojiisland.com/cdn/shop/products/Relieved_Emoji_2_compact.png?v=1571606092",
        "https://emojiisland.com/cdn/shop/products/Emoji_Icon_-_Sunglasses_cool_emoji_compact.png?v=1571606093",
    ];
    
    // Sätter aktuell emoji baserat på remaining tasks
    const emoji = () => {
        if (taskList.length === 0) return emojiList[0];
        else if (remainingTasks.length > 5) return emojiList[1];
        else if (remainingTasks.length > 3) return emojiList[2];
        else if (remainingTasks.length > 1) return emojiList[3];
        else if (remainingTasks.length > 0) return emojiList[4];
        else return emojiList[5];
    };

    // Lägger till ny task
    const addNewTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!task.trim())
            return;

        let newTask: Task = {
            taskName: task,
            isDone: false,
        };

        setTaskList((taskList) => [...taskList, newTask]);
        setTask("");
    };

    // Tar bort task
    const deleteTask = (index: number) => {
        setTaskList((taskList) =>
            taskList.filter((t) => taskList.indexOf(t) !== index)
        );
    };

    // Växlar läge på checkboxen (isDone)
    const toggleTaskDone = (index: number) => {
        let newList = [...taskList];
        newList[index].isDone = !newList[index].isDone;
        setTaskList(newList);
    };

    // Rensar alla tasks som är checkade
    const clearCompletedTasks = () => {
        let remainingTasks = taskList.filter((task) => !task.isDone);
        setTaskList(remainingTasks);
    };

    return (
        <article className="todo-container">
            <section className="header">
                <h1>ToDo</h1>
                <section className="todo-info">
                    <aside className="counter">
                        {taskList.length === 0 ? (
                            <p>Nothing to do...</p>
                        ) : remainingTasks.length > 0 ? (
                            <p>
                                <span>
                                    {remainingTasks.length}/{taskList.length}
                                </span>
                                tasks left to do
                            </p>
                        ) : (
                            <p>You're all done!</p>
                        )}
                    </aside>
                    <aside className="emoji">
                        <img src={emoji()} alt="Emoji" />
                    </aside>
                </section>
            </section>

            <form className="form" onSubmit={(e) => addNewTask(e)}>
                <input
                    id="task-input"
                    type="text"
                    placeholder="Enter new task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                ></input>
                <button className="add-btn">+</button>
            </form>

            <section className="task-container">
                {taskList.map((task, i) => (
                    <article key={i} className="list-item">
                        <span
                            className="done-btn"
                            onClick={() => toggleTaskDone(i)}
                        >
                            {task.isDone ? "☑️" : "⬜"}
                        </span>
                        <p
                            style={{
                                textDecoration: task.isDone
                                    ? "line-through"
                                    : "none",
                            }}
                        >
                            {task.taskName}
                        </p>
                        <span
                            className="delete-btn"
                            onClick={() => deleteTask(i)}
                        >
                            ❌
                        </span>
                    </article>
                ))}
            </section>
            
            <button className="clear-btn" onClick={clearCompletedTasks}>
                <span className="btn-text">Clear completed tasks</span>
                <span className="btn-icon">🗑️</span>
            </button>
        </article>
    );
}
