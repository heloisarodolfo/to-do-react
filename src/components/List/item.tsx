import styles from './item.module.css'

import { Check, Trash } from 'phosphor-react';

import { Itask } from '../../App';

interface Props {
    data: Itask
    removeTask: (id: number) => void
    toggleTaskStatus: ({ id, value }: { id: number; value: boolean }) => void
}

export function Item({ data, removeTask, toggleTaskStatus }: Props) {
    function taskToggle() {
        toggleTaskStatus({ id: data.id, value: !data.isChecked})  //Alternância de tarefas
    }

    function remove() {
        removeTask(data.id) // Remove task
    }

    const checkboxChekcedClassname = data.isChecked   //Classes dinâmicas, Define a classe CSS a ser aplicada ao checkbox baseado no estado da tarefa.
        ? styles['checkbox-checked']
        : styles['checkbox-unchecked']
    const paragraphCheckedClassname = data.isChecked 
        ? styles['paragraph-checked']
        : ''


    return (
        <div className={styles.container}>
            <div>
                <label htmlFor="checkbox" onClick={taskToggle}>
                    <input readOnly type="checkbox" checked={data.isChecked} />
                    <span className={`${styles.checkbox} ${checkboxChekcedClassname}`}>
                        {data.isChecked && <Check size={12} />}
                    </span>

                    <p className={`${styles.paragraph} ${paragraphCheckedClassname}`}>
                        {data.text}
                    </p>
                </label>
            </div>

            <button onClick={remove}>
                <Trash size={16} color="#808080" />
            </button>
        </div>
    )
}