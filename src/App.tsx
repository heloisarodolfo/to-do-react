import { PlusCircle } from "phosphor-react";
import { Button } from "./components/button";
import { Header } from "./components/header";
import { Input } from "./components/input";

import styles from "./App.module.css";
import { ListHeader } from "./components/List/header";
import { useState } from "react";

import { Item } from "./components/List/item";
import { Empty } from "./components/List/empty";


export interface Itask {
  id: number;
  text: string;
  isChecked: boolean;
}

export function App() {
  const [tasks, setTasks] = useState<Itask[]>([]);
  const [inputValue, setInputValue] = useState("");

  const checkedTasksCounter = tasks.reduce((prevValue, currentTask) => {
    if (currentTask.isChecked) {
      return prevValue + 1;
    }

    return prevValue;
  }, 0);

  function AddTask() {
    if (!inputValue) {
      return;
    }
  
    const newTask: Itask = {
      id: new Date().getTime(),
      text: inputValue,
      isChecked: false,
    };
  
    setTasks((state) => [...state, newTask]);
    setInputValue("");
  }

  function removeTasks(id: number) {
    const filteredTasks = tasks.filter((task) => task.id !== id)

    if (!confirm('Deseja mesmo apagar essa tarefa?')) {
      return
    }
    setTasks(filteredTasks)
  }

  function toggleTask({ id, value }: { id: number, value: boolean}) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {...task, isChecked: value}
      }

      return {...task}
    })

    setTasks(updatedTasks)
  }

  return (
    <main>
      <Header />

      <section className={styles.content}>
        <div className={styles.taskInfoContainer}>
          <Input
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
          <Button onClick={AddTask}>
            Criar
            <PlusCircle size={16} color="#f2f2f2" weight="bold" />
          </Button>
        </div>

        <div className={styles.taskList}>
          <ListHeader
            tasksCounter={tasks.length}
            checkedTasksCounter={checkedTasksCounter}
          />

          {tasks.length > 0 ? (
            <div>
              {tasks.map((task) => (
                <Item
                  key={task.id}
                  data={task}
                  removeTask={removeTasks}
                  toggleTaskStatus={toggleTask}
                />
              ))}
            </div>
          ) : (
            <Empty />
          )}

        </div>
      </section>
    </main>
  );
}
