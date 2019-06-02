import React, { Component } from 'react';
import { 
    TextArea, 
    Container, 
    Form,
    Grid,
    Button,
    Icon
} from 'semantic-ui-react';
import '../styles/App.css';

import {observer, inject} from 'mobx-react';

class ChatBox extends Component {
    constructor()
    {
        super();
        this.state = {
            comment: ''
        };
        this.sendComment    = this.sendComment.bind(this);
        this.handleComment  = this.handleComment.bind(this);
    }

    render()
    {
        const { txtButton } = this.props;
        const textButton  = (txtButton)? txtButton : 'Enviar';
        return (
            <Container>
               <Form className='p-3'>
                   <Grid columns='equal'>

                        <Grid.Column width={11}>
                            <TextArea  
                                placeholder='Escribe un comentario...'
                                value = {this.state.comment}
                                onChange = { this.handleComment }
                            />
                        </Grid.Column>

                        <Grid.Column>

                            <Button color='blue' type='submit' onClick={this.sendComment}>
                                {textButton}
                                <Icon name='chevron right'/>
                            </Button>

                        </Grid.Column>
                   </Grid>
               </Form>
            </Container>
        )
    }

    handleComment(event) 
    {
        this.setState({ comment: event.target.value });
    }

    sendComment()
    {
        if (this.state.comment === '') return ;
        const { idComment, CommentStore } = this.props;
        
        if ( !idComment )CommentStore.addComment( this.state.comment );
        
        else CommentStore.replyComment(this.state.comment, idComment);
        this.setState({ comment: ''})
    }
}


ChatBox = inject('CommentStore')(observer(ChatBox));

export default ChatBox;