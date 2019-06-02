import { observable, decorate, action } from "mobx";
import dateFormat from 'dateformat';

class CommentStore {
     comments = [
     ];
     user = {
        avatar : 'img/avatar.jpg',
        userName: 'Davp00'
    };


    addComment(comment){
        this.comments.push( this.getCommentObject(comment) );
    }

    replyComment(commnetText, idComment){
        let {comment, i} = this.FindComment( idComment );
        comment.replies.push( this.getCommentObject( commnetText ) );
        this.comments.replace( this.comments );
    }

    setReplyBox(element, i)
    {
        element.replyBox = !element.replyBox;
        this.comments[i] = element;
        this.comments.replace(this.comments);
    }

    FindComment(idComment)
    {
        for(let a = 0 ; a < this.comments.length ; a++)
            if ( this.comments[a].id === idComment)
                return { comment: this.comments[a], i: a};
    }

    getCommentObject(comment, reply=false)
    {
        return {
            id: this.user.userName + this.comments.length,
            comment: {
                value: comment,
                date: dateFormat(new Date, 'm/d/yy HH:MM')
            },
            replies: (!reply)?[]:undefined,
            user: this.user,
            replyBox: false
        }
    }
}

decorate(CommentStore,
{
    comments: observable,
    user: observable,
    addComment: action,
    replyComment: action,
    setReplyBox: action,
});

const commentStore = new CommentStore();

export default commentStore;