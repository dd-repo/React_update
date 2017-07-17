import React from 'react';
import {
  Panel,
  Table,
  Label,
  Button
} from 'components';

import { formatDate } from 'utils/dateHelper';
import classes from '../user.scss';

const Cards = ({ user: { cards }, showModal }) => {

  const _onClick = () => {
    showModal('CARD')
  }

  return (
    <Panel
      header={
        <span>
          <h4 className='panel-title'>
            Cards
          </h4>
        </span>
        }
      >
        <Button
          onClick={_onClick}
          className='pull-right'
          bsSize='small'
          bsStyle='success'
        >
          Add Card <i className='fa fa-plus'></i>
        </Button>
        <Table>
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
  )
}


const renderCards = card => (
  <tbody key={card.id}>
    <tr className='bg-gray-darker'>
      <td>
        { card.id }
      </td>
      <td>
        { card.third_party_id }
      </td>
      <td>
        { card.card_holder_name }
      </td>
      <td>
        { card.card_month }
      </td>
      <td>
        { card.card_year }
      </td>
      <td>
        { card.last_4 }
      </td>
      <td>
        { card.source }
      </td>
      <td>
        { formatDate(card.updated_at) }
      </td>
    </tr>
  </tbody>
)

const STYLE = {
  'completed': 'success',
  'refunded':  'warning',
  'declined':  'danger'
}
export default Cards;


