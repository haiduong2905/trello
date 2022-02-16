import { useState, useEffect, useCallback } from 'react'
import { mapOrder } from 'utilities/sorts'
import { Container, Draggable } from 'react-smooth-dnd'
import { Dropdown, Form } from 'react-bootstrap'
import htmlParse from 'html-react-parser'
import './Column.scss'
import Card from 'components/Card/Card'
import ConfirmModal from 'components/Common/ConfirmModal'

import { MODAL_ACTION_COMFIRM } from 'utilities/constants'

function Column(props) {
    const { column, onCardDrop, onUpdateColumn } = props
    const cards = mapOrder(column.cards, column.cardOrder, 'id')
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const toggleShowModalConfirm = () => setShowConfirmModal(!showConfirmModal)
    const onConfirmModalAction = (type) => {
        if (type === MODAL_ACTION_COMFIRM) {
            const newColumn = {
                ...column,
                _destroy: true
            }
            onUpdateColumn(newColumn)
        }
        setShowConfirmModal(!showConfirmModal)
    }
    const selectAllString = (e) => {
        e.target.select()
    }
    const [columnTitle, setColumnTitle] = useState('')
    useEffect(() => {
        setColumnTitle(column.title)
    }, [column.title])
    const handleTitleColumn = useCallback((e) => setColumnTitle(e.target.value), [])
    const handleTitleColumnBlur = () => {
        const newColumn = {
            ...column,
            title: columnTitle
        }
        onUpdateColumn(newColumn)
    }
    const saveTitleColumn = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            //e.target.blur()
        }
    }
    return (
        <div className="column">
            <header className="column-drag-handle">
                <div className="column-title">
                    <Form.Control
                        size='sm'
                        type="text"
                        placeholder="Enter text"
                        value={columnTitle}
                        onClick={selectAllString}
                        onChange={handleTitleColumn}
                        onBlur={handleTitleColumnBlur}
                        onMouseDown={e => e.preventDefault()}
                        onKeyDown={saveTitleColumn}
                    />
                </div>
                <div className="column-dropdown">
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic" className="dropdown-btn" size="sm" />
                        <Dropdown.Menu>
                            <Dropdown.Item>Add card</Dropdown.Item>
                            <Dropdown.Item onClick={toggleShowModalConfirm}>Remove column</Dropdown.Item>
                            <Dropdown.Item>Something else</Dropdown.Item>
                            <Dropdown.Item>Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </header>
            <div className="card-list">
                <Container
                    groupName="col"
                    onDrop={dropResult => onCardDrop(column.id, dropResult)}
                    getChildPayload={index => cards[index]}
                    dragClass="card-ghost"
                    dropClass="card-ghost-drop"
                    dropPlaceholder={{
                        animationDuration: 150,
                        showOnTop: true,
                        className: 'card-drop-preview'
                    }}
                    dropPlaceholderAnimationDuration={200}
                >
                    {
                        cards.map((card, index) => (
                            <Draggable key={index}>
                                <Card key={index} card={card} />
                            </Draggable>
                        ))
                    }
                </Container>
            </div>
            <footer><i className='fa fa-plus' />Add another card</footer>
            <ConfirmModal
                show={showConfirmModal}
                onAction={onConfirmModalAction}
                title="Remove Column"
                content={htmlParse(`Are you sure remove <strong>${column.title}</strong>`)}
            />
        </div>
    )
}

export default Column