import React from 'react'
import './Column.scss'
import Task from 'components/Task/Task'

function Column() {
    return (
        <div className="column">
            <header>Header</header>
            <ul className="task-list">
                <Task />
                <li className="task-item">1</li>
                <li className="task-item">2</li>
                <li className="task-item">3</li>
                <li className="task-item">4</li>
                <li className="task-item">5</li>
            </ul>
            <footer>Footer</footer>
        </div>
    )
}

export default Column