import React, { Component } from 'react';

class CommentPost extends Component {

    render () {
        const { content, commentOwnerUsername, CreatedAt } = this.props.commentData;
        return (
            <div className="comment">
                <span style={{fontStyle:'italic', color: '#0ca5e297'}}>
                    {"Comment By:"} {commentOwnerUsername}
                    {" on "}
                    <time style={{fonstStyle:'italic'}}>
                        {' '}
                        { new Date(CreatedAt).toDateString() }
                    </time>
                </span>
                <p>{content}</p>
            </div>
        )
    }
}
export default CommentPost;