import React, { Component } from 'react';
import {
    Container,
    Header,
    Comment
} from 'semantic-ui-react';

import '../styles/App.css';
import CommentList from './CommentList';
import {observer, inject} from 'mobx-react';




class Comments extends Component {
    render()
    {
        const { CommentStore } = this.props;

        let { comments } = CommentStore;

        return (
            <Container className='p-3'>

                <Comment.Group size='large'>

                    <Header as='h4' dividing>
                        Comentarios ( {comments.length} )
                    </Header>

                    <CommentList comments={ comments }/>
                </Comment.Group>
            </Container>
        )
    }
}


Comments = inject('CommentStore')(observer(Comments));

export default Comments;