import { useState, useEffect, useRef } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { isEmpty } from 'lodash'

import './BoardContent.scss'
import Column from 'components/Column/Column'
import { initData } from 'actions/initData'
import { mapOrder } from 'utilities/sorts'
import { applyDrag } from 'utilities/dragDrop'


function BoardContent() {
    const [board, setBoard] = useState({})
    const [columns, setColumns] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [valueInput, setValueInput] = useState('')
    const refInput = useRef(null)
    useEffect(() => {
        const boardDB = initData.boards.find(board => board.id === 'board-1')
        if (boardDB) {
            setBoard(boardDB)
            setColumns(mapOrder(boardDB.columns, boardDB.columnOrder, 'id'))
        }
    }, [])
    useEffect(() => {
        if (refInput && refInput.current) {
            refInput.current.focus()
            refInput.current.select()
        }
    }, [showForm])
    if (isEmpty(board)) {
        return <div>Ko co du lieu</div>
    }
    const onColumnDrop = (dropResult) => {
        let newColumns = [...columns]
        newColumns = applyDrag(newColumns, dropResult)
        let newBoard = { ...board }
        newBoard.columnOrder = newColumns.map(c => c.id)
        newBoard.columns = newColumns
        setColumns(newColumns)
        setBoard(newBoard)
    }

    const onCardDrop = (columnId, dropResult) => {
        if (dropResult.addedIndex !== null || dropResult.removedIndex !== null) {
            let newColumns = [...columns]
            let curColumn = newColumns.find(c => c.id === columnId)
            curColumn.cards = applyDrag(curColumn.cards, dropResult)
            curColumn.cardOrder = curColumn.cards.map(c => c.id)
            setColumns(newColumns)
        }
    }

    const toggleForm = () => {
        setShowForm(!showForm)
    }
    const handleValueInput = (value) => {
        setValueInput(value)
    }
    const addNewColumn = () => {
        if (!valueInput) {
            refInput.current.focus()
            return
        }
        const objNewColumn = {
            id: Math.random().toString(36).substr(2, 5),
            boardId: board.id,
            title: valueInput.trim(),
            cardOrder: [],
            cards: []
        }
        let newColumns = [...columns, objNewColumn]
        let newBoard = { ...board }
        newBoard.columnOrder = newColumns.map(c => c.id)
        newBoard.columns = newColumns
        setColumns(newColumns)
        setBoard(newBoard)
        setValueInput('')
        toggleForm()
    }
    return (
        <div className="board-content">
            <Container
                orientation="horizontal"
                onDrop={onColumnDrop}
                getChildPayload={index => columns[index]}
                dragHandleSelector=".column-drag-handle"
                dropPlaceholder={{
                    animationDuration: 150,
                    showOnTop: true,
                    className: 'column-drop-preview'
                }}
            >
                {
                    columns.map((column, index) => (
                        <Draggable key={index}>
                            <Column column={column} onCardDrop={onCardDrop} />
                        </Draggable>
                    ))
                }
                {
                    !showForm &&
                    <Row>
                        <Col className="add-new-column" onClick={toggleForm}>
                            <i className='fa fa-plus' />Add another card
                        </Col>
                    </Row>
                }
                {
                    showForm &&
                    <Row>
                        <Col className="add-new-column">
                            <Form.Control
                                size='sm'
                                type="text"
                                placeholder="Enter text"
                                ref={refInput}
                                value={valueInput}
                                onChange={e => handleValueInput(e.target.value)}
                                onKeyDown={e => {e.key === 'Enter' && addNewColumn()}}
                            />
                            <Button variant="success" size='sm' onClick={addNewColumn}>Add Column</Button>
                            <span className="cancel" onClick={toggleForm}><i className="fa fa-times"></i></span>
                        </Col>
                    </Row>
                }
            </Container>
        </div>
    )
}

export default BoardContent