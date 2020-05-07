import React, { Component } from 'react';
import { deletePost } from '../graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';

class DeletePost extends Component {

    handelDeletePost = async postId => {
        const input = {
            id: postId
        }
        await API.graphql(graphqlOperation(deletePost, {input}))
    }

    render() {
        const post = this.props.data;
       return (
           <button onClick= { () => this.handelDeletePost(post.id)}>Delete</button>
       )
    }
}

export default DeletePost;