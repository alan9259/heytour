import React from 'react'
import { Card, Icon, Image, Button } from 'semantic-ui-react'
import moment from 'moment'

export default function JobListContent(props) {

  return (
    <Card.Group itemsPerRow={2}>
      <Card>
        <Image src={props.job.picture} wrapped ui={false} />

        <Card.Content>
          <Card.Header>{props.job.company}</Card.Header>
          <Card.Meta>{props.job.location}</Card.Meta>
          <Card.Description>{'Listed On: ' + moment(props.job.postedOn).format('DD MMM YYYY') }</Card.Description>
        </Card.Content>

        <Card.Content extra>
          <a>
            <Icon name='star' />
            10 Applied
          </a>
        </Card.Content>
      </Card>

      <Card>

        <Card.Content>
          <Card.Header>{props.job.title}</Card.Header>
          <Card.Meta>{props.job.industry}</Card.Meta>
          <Card.Description>{props.job.jobDesc}</Card.Description>
        </Card.Content>

        <Card.Content extra>
          <div className='ui two buttons'>
          <Button color='google plus' onClick={() => props.onEdit(props.job)}>
            <Icon name='edit' /> Edit
          </Button>
          <Button color='instagram' onClick={() => props.onDelete(props.job.id)}>
            <Icon name='minus' /> Delete
          </Button>
          </div>
        </Card.Content>
      </Card>
    </Card.Group>
  )

}