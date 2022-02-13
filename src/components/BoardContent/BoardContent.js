import React, { useState, useEffect } from 'react'
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
        if(boardDB) {
            setBoard(boardDB);
            setColumns(mapOrder(boardDB.columns,boardDB.columnOrder, 'id' ))
        }
    }, [])
    if(isEmpty(board)) {
        return <div>Ko co du lieu</div>
    }
    return (
        <div className="board-content">
            {columns.map((column, index) => {
                    return <Column key={index} column={column} />
                }
            )}
        </div>
    )
}

export default BoardContent