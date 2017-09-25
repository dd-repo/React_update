import React from 'react';

import { formatDate, capitalize, getNumberOfDays } from 'utils';
import classes from './inprogress.scss';
import {
    Media,
    ListGroup,
    ListGroupItem,
    CollapsablePanel,
    Grid,
    Row,
    Col,
    AvatarImage,
    SlimProgressBar,
    Label
} from 'components';

import { Colors } from 'consts';

const InProgress = ({ requests }) => {
  return (
    <ListGroup className={ classes.filledListGroup }>
      {
        requests.map( request => {
          const url = `http://www.${request.site}`
          const numberOfDays = getNumberOfDays(request.current_requested_at)
          const percentageComplete = Math.floor((numberOfDays / 30) * 100)

          return (
          <ListGroupItem className={ `${classes.filledListGroupItem} p-y-2` } key={ request.id }>
            <div className='flex-space-between'>
              <a href={url} target='_blank'>
                { url }
              </a>
              <Label
                outline
                bsStyle='custom'
                customColor={Colors.brandSuccess}
              >
                Active
              </Label>
            </div>
            <SlimProgressBar now={ numberOfDays } max={30} className='m-y-1' />
            <div className='flex-space-between'>
              <div className='text-center'>
                <p className='text-white h4 m-y-0'>
                  { percentageComplete }%
                </p>
                <p className=' m-y-0'>
                  Complete
                </p>
              </div>
              <div className='text-center'>
                <p className='text-white h4 m-y-0'>
                  { formatDate(request.current_requested_at) }
                </p>
                <p className=' m-y-0'>
                  Requested
                </p>
              </div>
            </div>
          </ListGroupItem>
          )
        })
      }
    </ListGroup>
  )
}

export default InProgress
    //<Table>
      //<thead>
        //<tr>
          //<th>
            //name of site
          //</th>
          //<th>
            //Date requested
          //</th>
          //<th>
            //Progress
          //</th>
        //</tr>
      //</thead>
      //<tbody>
        //{
          //requests.map(
            //request =>
            //<tr className='m-b-1 bg-gray-darker' key={request.id}>
              //<td>
                //<a href={`http://www.${request.site}`} target='_blank'>
                  //{ capitalize(request.site.slice(0, -4)) }
                //</a>
              //</td>
              //<td>
                //{ formatDate(request.current_requested_at) || formatDate(request.updated_at) }
              //</td>
              //<td>
                //<span className=''>
                  //Time running
                //</span>
              //</td>
            //</tr>

            //)
        //}
      //</tbody>
    //</Table>
