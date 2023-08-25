import { observer } from 'mobx-react-lite';
import {Segment, Grid, Icon} from 'semantic-ui-react'
import { Product } from '../../../app/layout/models/product';

interface Props {
    product: Product
}

export default observer(function ProductDetailedInfo({product}: Props) {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='info'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{product.description}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='calendar' size='large' color='teal'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
            <span>
              {product.date}
            </span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='newspaper' size='large' color='teal'/>
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <span>test, test1</span>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})