import TaskCard from "../components/TaskCard";
import TodoModal from "../components/Modal";
import { type TaskCardProps } from "../libs/Todolist";
import { useEffect, useState } from "react";

const STORAGE_KEY = "lap13.tasks";
const defaultTasks: TaskCardProps[] = []; 

function loadTasks(): TaskCardProps[] {
  try {
    
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : defaultTasks;
  } catch {
    return defaultTasks; // เผื่อข้อมูลใน localStorage เสีย
  }
}

export default function TodolistPage() {
  // ส่ง "ฟังก์ชัน" เข้า useState -> React เรียก loadTasks() แค่ครั้งเดียวตอน mount
  const [tasks, setTasks] = useState<TaskCardProps[]>(loadTasks);

  // เซฟลง localStorage ทุกครั้งที่ tasks เปลี่ยน
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const handleAdd = (newTask: TaskCardProps) => {
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    //console.log("TODO handleAdd", newTask);
  };

  const deleteTask = (taskId: string) => {
    const dlTask = tasks.filter((todo:TaskCardProps) => 
    todo.id !== taskId);
    setTasks(dlTask);
    //console.log("TODO deleteTask", taskId);
  };

  const toggleDoneTask = (taskId: string) => {
    const newTask = tasks.map((todo:TaskCardProps) => 
      todo.id == taskId? {...todo, isDone: !todo.isDone} : todo);
    setTasks(newTask);
    //console.log("TODO toggleDoneTask", taskId);
  };

  return (
    <div className="col-12 m-2 p-0">
      <div className="container text-center">
        <h2>Todo List</h2>
        <span className="m-2 shadow p-1 mb-3 bg-body-tertiary rounded text-uppercase">☠️ All task : {tasks.length} Done : {tasks.filter((todo) => todo.isDone).length}☠️</span>

        <div>
          <button
            type="button"
            className="btn btn-primary my-3"
            data-bs-toggle="modal"
            data-bs-target="#todoModal"
          >
            Add
          </button>
        </div>

        <TodoModal onAdd={handleAdd} />
        <>
          {tasks.map((task) => (
            <TaskCard
              id={task.id}
              title={task.title}
              description={task.description}
              deleteTaskFunc={deleteTask}
              toggleDoneTaskFunc={toggleDoneTask}
              isDone={task.isDone}
              key={task.id}
            />
          ))}
        </>
      </div>
    </div>
  );
}

