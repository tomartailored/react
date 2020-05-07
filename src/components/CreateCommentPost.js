import React, { Component } from 'react';
import { Auth, API , graphqlOperation } from 'aws-amplify';
import { createComment } from '../graphql/mutations';

class CreateCommentPost extends Component {

    state = {
        commentOwnerId: "",
        commentOwnerUsername: "",
        content: ""
    }

    componentWillMount = async () => {
        await Auth.currentUserInfo()
            .then(user => {
                this.setState({
                    commentOwnerId: user.attributes.sub,
                    commentOwnerUsername: user.username
                })
            })
    }

    handelChangeContent = event => this.setState({
        content: event.target.value
    });

    handelAddComment = async event => {
        event.preventDefault();

        const input = {
            commentPostId: this.props.postId,
            commentOwnerId: this.state.commentOwnerId,
            commentOwnerUsername: this.state.commentOwnerUsername,
            content: this.state.content,
            createdAt: new Date().toISOString()
        }
        await API.graphql(graphqlOperation(createComment, {input}))
        this.setState({content: ""}) //clearing field
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handelAddComment} className="add-comment">
                    <textarea type="text" name="content" rows="3" cols="30" required placeholder="Comment"
                    value={this.state.content}
                    onChange={this.handelChangeContent}
                    ></textarea>

                    <input type="submit" className="btn" style={{fontSize:"19px"}} value="Add Comment"/>
                </form>
            </div>
        );
    }
}

export default CreateCommentPost;