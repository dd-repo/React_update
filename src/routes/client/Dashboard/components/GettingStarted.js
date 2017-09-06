import React from 'react'
import { compose } from 'recompose';

import SpinnerWhileLoading from 'HOC/SpinnerWhileLoading';
import hideIfNoData from 'HOC/hideIfNoData';

import {
  Row,
  Col,
  Panel,
  PageHeader,
  Label,
  Button,
  Media,
  Timeline,
  AvatarImage,
  Accordion,
  AvatarText
} from 'components';
import logo from 'static/logos/logo-big-light.png'
import getFullName from 'utils/fullName';
import capitalize from 'utils/capitalize';
import classes from './dashboard.scss';
import { Colors } from 'consts';


const enhancer1 = SpinnerWhileLoading(
  props => props.isFetching
)

const enhancer2 = hideIfNoData(
  props => props.hasData
)

const enhance = compose(enhancer1, enhancer2)

const GettingStarted = enhance((props) => {

  const fullName = getFullName(props.user)

  const renderInstructions = (
    <div className='text-center'>
      <Media className={classes.box}>
        <Media.Left>
          <span>
            <h5 className={ classes.steps }>Step</h5>
            <AvatarText
              backgroundColor={ Colors.brandSuccess }
            >
              1
            </AvatarText>
          </span>
        </Media.Left>
        <Media.Body>
          <Accordion>
            <Panel
              className={classes.accordionPanel}
              header={(
                'Upload Your Photo ID'
              )}
              eventKey={2}
            >
              <p>
                Some of the sites that share your personal information require that we have an ID on file for you. This is to make sure that it's really you who's requesting the removals. You can easily upload your ID through the portal.
              </p>
              <p>
                We need to be able to see your name, date of birth, address, and photo, but anything else can be covered over. Check out this video for an example of what the ID should look like, and for upload instructions:
              </p>
              <a href='https://youtu.be/TR8lGbeMULw' target='_blank'>
                <Button bsStyle='danger'>View Video</Button>
              </a>
            </Panel>
          </Accordion>
        </Media.Body>
      </Media>

      <Media className={classes.box}>
        <Media.Left>
          <span>
            <h5 className={ classes.steps }>Step</h5>
            <AvatarText
              backgroundColor={ Colors.brandInfo }
            >
              2
            </AvatarText>
          </span>
        </Media.Left>
        <Media.Body>
          <Accordion>
            <Panel
              className={ classes.accordionPanel }
              header={(
                'Request Removals'
              )}
              eventKey={3}
            >
              <p>
                We'll begin scanning and removing information for you right away. However, if you see specific sites you want removed first, you can mark them for removal. We'll process three removals at a time, and additional removals will be put into a queue. This video will show you how to mark a site for removal.
              </p>
              <a href='https://youtu.be/kF7zti00GvI' target='_blank'>
                <Button bsStyle='danger'>View Video</Button>
              </a>
            </Panel>
          </Accordion>
        </Media.Body>
      </Media>

      <Media className={classes.box}>
        <Media.Left>
          <span>
            <h5 className={ classes.steps }>Step</h5>
            <AvatarText
              backgroundColor={ Colors.brandPrimary }
            >
              3
            </AvatarText>
          </span>
        </Media.Left>
        <Media.Body>
          <Accordion>
            <Panel
              className={ classes.accordionPanel }
              header={(
                'Change Your Account Information'
              )}
              eventKey={4}
            >
              <p>
                To change your Clickadilly password, cancel a membership, or seek additional help from within the portal check out this video example:
              </p>
              <a href='https://youtu.be/Q0KKhFUiwnE' target='_blank'>
                <Button bsStyle='danger'>View Video</Button>
              </a>
            </Panel>
          </Accordion>
        </Media.Body>
      </Media>
    </div>
  )

  return (
    <div className={classes.mainWrap}>
      <Row className={`${classes.welcomeHeader} ${classes.sectionRow}`}>
        <div className={`${classes.box} text-center`}>
          <PageHeader className="m-t-0 text-center">
            <span className='text-gray-lighter'>Welcome to</span>
            <img src={ logo } height={ 40 } alt="Clickadilly Dashboard" />
            <p>
              <span className='text-gray-lighter'>{fullName}</span>
            </p>
          </PageHeader>
          <Col md={ 12 }>
            <div className={classes.info}>
              <p className='m-t-2 m-b-2'>
                Now that you're signed up for Clickadilly, you're ready to start being proactive about your online presence. The tool works in three ways:
              </p>
            </div>
          </Col>
          <Row>
            <div className={`${classes.info} text-center`}>
              <Col md={ 4 }>
                <Panel
                  className={classes.summaryPanel}
                  header={(
                    <div>
                      First
                      <span className="fa-stack fa-lg">
                        <i className="fa fa-search fa-stack-1x text-success"></i>
                      </span>
                    </div>
                    )}
                  >
                    <p>
                      We'll continually scan the internet for any new information being posted about you. If anything new is put online, we'll alert you right away.
                    </p>
                  </Panel>
                </Col>
                <Col md={ 4 }>
                  <Panel
                    className={classes.summaryPanel}
                    header={(
                      <div>
                        Second
                        <span className="fa-stack fa-lg">
                          <i className="fa fa-shield fa-stack-1x text-success"></i>
                        </span>
                      </div>
                      )}
                    >
                      <p>
                        We'll remove your information from many data aggregate sites that share your personal details, things like your name, phone numbers, and addresses.
                      </p>
                    </Panel>
                  </Col>
                  <Col md={ 4 }>
                    <Panel
                      className={classes.summaryPanel}
                      header={(
                        <div>
                          Third
                          <span className="fa-stack fa-lg">
                            <i className="fa fa-cogs fa-stack-1x text-success"></i>
                          </span>
                        </div>
                        )}
                      >
                        <p className='text-white'>
                          We'll give you the tools and knowledge to take charge of your online reputation, and make sure that when someone searches for you, they'll see what you want them to see.
                        </p>
                      </Panel>
                    </Col>
                  </div>
                </Row>
              </div>
              <Row>
                <Col md={ 3 }>
                </Col>
                <Col md={ 6 }>
                  <Panel
                    className={`${classes.summaryPanel} text-center m-t-3`}
                    header='Get Started Now'
                  >
                    { renderInstructions }
                  </Panel>
                </Col>
              </Row>
            </Row>
          </div>
  )
})

export default GettingStarted;
