import { useState, useEffect } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { isEmpty } from 'lodash'

import './BoardContent.scss'
import Column from 'components/Column/Column'
import { initData } from 'actions/initData'
import { mapOrder } from 'utilities/sorts'


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
        console.log(dropResult)
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
                            <Column column={column} />
                        </Draggable>
                    ))
                }
            </Container>
        </div>
    )
}

export default BoardContent