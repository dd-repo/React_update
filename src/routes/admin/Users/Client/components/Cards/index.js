import React from 'react'
import PropTypes from 'prop-types'
import {
  Panel,
  Table,
  Button
} from 'components'

import { formatDate } from 'utils'

const Cards = ({ cards, showModal }) => {
  const _onClick = () => {
    showModal('CARD')
  }

  return (
    <div>
      <Button
        onClick={_onClick}
        bsSize='small'
        bsStyle='success'
        className='pull-right m-t-1 m-r-1'
      >
        Add Card <i className='fa fa-plus'></i>
      </Button>
      <Panel
        header={
          <div>
            <h4 className='panel-title'>
              Cards
            </h4>
          </div>
        }
      >
        <Table responsive>
          <thead>
            <tr>
              <th>
                id
              </th>
              <th>
                third party id
              </th>
              <th>
                Card holder name
              </th>
              <th>
                card month
              </th>
              <th>
                card year
              </th>
              <th>
                last 4
              </th>
              <th>
                source
              </th>
              <th>
                updated
              </th>
            </tr>
          </thead>
          {
            cards.map(cards => {
              return renderCards(cards)
            })
          }
        </Table>
      </Panel>
    </div>
  )
}

const renderCards = card => (
  <tbody key={card.id}>
    <tr className='bg-gray-darker'>
      <td>
        {card.id}
      </td>
      <td>
        {card.third_party_id}
      </td>
      <td>
        {card.card_holder_name}
      </td>
      <td>
        {card.card_month}
      </td>
      <td>
        {card.card_year}
      </td>
      <td>
        {card.last_4}
      </td>
      <td>
        {card.source}
      </td>
      <td>
        {formatDate(card.updated_at)}
      </td>
    </tr>
  </tbody>
)

Cards.propTypes = {
  cards: PropTypes.array,
  showModal: PropTypes.func
}

export default Cards
