import React, { Component } from 'react';
import {    
    Comment
} from 'semantic-ui-react';
import ChatBox from './ChatBox';
import {observer, inject} from 'mobx-react';


class CommentList extends Component {
    
    constructor()
    {
        super();
        this.renderMessages = this.renderMessages.bind(this);
    }

    render() 
    {
        
        return (
            <span>
                { this.renderMessages()}
            </span>
        )
    }

    renderMessages() 
    {
        const { comments, reply } = this.props;

        return comments.map( 
            ( element, i ) => {
                return (
                    <Comment key={ element.id }>
                        <Comment.Avatar as='a' src={ element.user.avatar }/>

                        <Comment.Content>

                            <Comment.Author as='a'>{ element.user.userName }</Comment.Author>

                            <Comment.Metadata>
                                <span> { element.comment.date } </span>
                            </Comment.Metadata>

                            <Comment.Text>{ element.comment.value }</Comment.Text>

                            <Comment.Actions>
                                <a style={{ display: (!reply ? 'block' : 'none') }}
                                    onClick={()=> this.setReplyBox(element,i)}
                                >Responder</a> 
                            </Comment.Actions>
                            
                            <Comment.Group>
                                <CommentList reply={ true } comments={ (element.replies)? element.replies: []}/>
                                {
                                    element.replyBox?
                                    <ChatBox 
                                        txtButton='Responder' 
                                        idComment={element.id} 
                                    />
                                    : null
                                }
                            </Comment.Group>
                        </Comment.Content>
                    </Comment>
                )
            }


        );
    }

    setReplyBox(element, i)
    {
        const { CommentStore } = this.props;
        CommentStore.setReplyBox(element,i);
    }
}

CommentList = inject('CommentStore')(observer(CommentList));

export default CommentList;