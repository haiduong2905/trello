import { useState, useEffect } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { isEmpty } from 'lodash'

import './BoardContent.scss'
import Column from 'components/Column/Column'
import { initData } from 'actions/initData'
import { mapOrder } from 'utilities/sorts'
import { applyDrag } from 'utilities/dragDrop'


function BoardContent() {
    const [board, setBoard] = useState({})
    const [columns, setColumns] = useState([])
    useEffect(() => {
        const boardDB = initData.boards.find(board => board.id === 'board-1')
        if (boardDB) {
            setBoard(boardDB)
            setColumns(mapOrder(boardDB.columns, boardDB.columnOrder, 'id'))
        }
    }, [])
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
                            <Column column={column} onCardDrop={onCardDrop}/>
                        </Draggable>
                    ))
                }
                <div className="add-new-column">
                    <i className='fa fa-plus' />Add another card
                </div>
            </Container>
        </div>
    )
}

export default BoardContent