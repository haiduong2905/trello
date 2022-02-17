import { useState, useEffect, useRef } from 'react'
import { mapOrder } from 'utilities/sorts'
import { Container, Draggable } from 'react-smooth-dnd'
import { Dropdown, Form, Button } from 'react-bootstrap'
import htmlParse from 'html-react-parser'
import { cloneDeep } from 'lodash'
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
    const handleTitleColumn = (e) => setColumnTitle(e.target.value)
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
    const [showForm, setShowForm] = useState(false)
    const toggleForm = () => {
        setShowForm(!showForm)
    }
    const refInput = useRef(null)
    useEffect(() => {
        if (refInput && refInput.current) {
            refInput.current.focus()
            refInput.current.select()
        }
    }, [showForm])
    const [valueInput, setValueInput] = useState('')
    const handleValueInput = (value) => {
        setValueInput(value)
    }
    const addNewCard = () => {
        if (!valueInput) {
            refInput.current.focus()
            return
        }
        const objNewCard = {
            id: Math.random().toString(36).substr(2, 5),
            boardId: column.boardId,
            columnId: column.id,
            title: valueInput.trim(),
            cover: null
        }
        let newColum = cloneDeep(column)
        newColum.cards.push(objNewCard)
        newColum.cardOrder.push(objNewCard.id)
        onUpdateColumn(newColum)
        setValueInput('')
        toggleForm()
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
                            <Dropdown.Item onClick={toggleForm}>Add card</Dropdown.Item>
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
                {
                    showForm &&
                    <div className="add-card">
                        <Form.Control
                            size='sm'
                            as="textarea"
                            rows="3"
                            placeholder="Enter text"
                            ref={refInput}
                            value={valueInput}
                            onChange={e => handleValueInput(e.target.value)}
                            onKeyDown={e => { e.key === 'Enter' && addNewCard() }}
                        />
                        <div className="add-card-btn">
                            <Button variant="success" size='sm' onClick={addNewCard}>Add Card</Button>
                            <span className="cancel" onClick={toggleForm}><i className="fa fa-times"></i></span>
                        </div>
                    </div>
                }
            </div>
            {
                !showForm &&
                <footer onClick={toggleForm}><i className='fa fa-plus' />Add another card</footer>
            }
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