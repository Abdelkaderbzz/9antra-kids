import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { initialData } from '../BoardView/data'
import { Data } from '../BoardView/types'
import BillingCardList from './components/BillingCardList/BillingCardList'
import Accordion from '@src/components/Accordion/Accordion'

const ListView: React.FC = () => {
  const [data, setData] = useState<Data>(initialData)

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    const start = data.columns[source.droppableId]
    const finish = data.columns[destination.droppableId]

    if (start === finish) {
      const newClientIds = Array.from(start.clientIds)
      newClientIds.splice(source.index, 1)
      newClientIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...start,
        clientIds: newClientIds,
      }

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      }

      setData(newState)
      return
    }

    const startClientIds = Array.from(start.clientIds)
    startClientIds.splice(source.index, 1)
    const newStart = {
      ...start,
      clientIds: startClientIds,
    }

    const finishClientIds = Array.from(finish.clientIds)
    finishClientIds.splice(destination.index, 0, draggableId)
    const newFinish = {
      ...finish,
      clientIds: finishClientIds,
    }

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    }

    setData(newState)
  }
  return (
    <div className="list_view_section_conatainer">
      <DragDropContext onDragEnd={onDragEnd}>
        {data.columnOrder.map((columnId, index) => {
          const column = data.columns[columnId]
          const clients = column.clientIds.map((clientId) => data.clients[clientId])

          return (
            <Accordion
              key={index}
              content={
                <Droppable droppableId={column.id} key={column.id}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`list_view_list list_view_list_${index + 1} `}
                    >
                      {clients.map((client, subIndex) => (
                        <Draggable key={client.id} draggableId={client.id} index={subIndex}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={'board_column_item'}
                            >
                              <BillingCardList
                                className={`billing_card_list_${index + 1}`}
                                clientData={client.content}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              }
              title={
                <div className={`list_view_section_title_${index + 1} list_view_section_title`}>
                  <nav>
                    <p>{column.title}</p>
                    <span>{clients.length}</span>
                  </nav>
                </div>
              }
            />
          )
        })}
      </DragDropContext>
    </div>
  )
}

export default ListView
