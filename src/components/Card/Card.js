import './Card.scss'

function Card(props) {
    const { card } = props
    return (
        <div className="task-item">
            {card.cover && <img className="card-cover" src={card.cover} alt='123' />}
            {card.title}
        </div>
    )
}

export default Card