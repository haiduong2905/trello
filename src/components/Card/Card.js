import React from 'react'
import './Card.scss'

function Card(props) {
    const { card } = props
    return (
        <li className="task-item">            
            { card.cover && <img className="card-cover" src={card.cover} alt='123' /> }
            { card.title }
        </li>
    )
}

export default Card