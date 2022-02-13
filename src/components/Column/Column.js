import React from 'react'
import { mapOrder } from 'utilities/sorts'
import './Column.scss'
import Card from 'components/Card/Card'

function Column(props) {
    const { column } = props
    const cards  = mapOrder(column.cards, column.cardOrder, 'id')
    return (
        <div className="column">
            <header>{column.title}</header>
            <ul className="card-list">
                {cards.map((card, index) => {
                        return <Card key={index} card={card} />
                    }
                )}
            </ul>
            <footer>Footer</footer>
        </div>
    )
}

export default Column