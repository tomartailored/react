import React, { Component } from 'react';
import { updatePost } from '../graphql/mutations';
import { API, graphqlOperation, Auth } from 'aws-amplify';

class EditPost extends Component {

    state = {
        show: false,
        id: "",
        postOwnerId:"",
        postOwnerUsername:"",
        postTitle: "",
        postBody: "",
        postData: {
            postTitle: this.props.postTitle,
            postBody: this.props.postBody,
        }
    }

    handelModal = () => {
        this.setState({ show: !this.state.show });
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    handelUpdatePost = async (event) => {
        event.preventDefault();

        const input = {
            id: this.props.id,
            postOwnerId: this.state.postOwnerId,
            postOwnerUsername: this.state.postOwnerUsername,
            postTitle: this.state.postData.postTitle,
            postBody: this.state.postData.postBody
        }

        await API.graphql(graphqlOperation(updatePost, {input}))

        this.setState({ show: !this.state.show})
    }

    handelTitle = event => {
        this.setState({
            postData: {...this.state.postData, postTitle:event.target.value}
        })
    }

    handelBody = event => {
        this.setState({
            postData: {...this.state.postData, postBody:event.target.value}
        })
    }

    componentWillMount = async () => {
        await Auth.currentUserInfo()
            .then(user => {
                this.setState({
                    postOwnerId: user.attributes.sub,
                    postOwnerUsername: user.username
                })
            })
    }

    render() {
       return (
           <>
           {
               this.state.show && (
                   <div className="modal">
                       <button className="close" onClick={this.handelModal}>X</button>
                       <form className="add-post"
                       onSubmit={(event) => this.handelUpdatePost(event)}>
                           <input style={{fontSize:"19px"}}
                            type="text" placeholder="Title" name="postTitle"
                            value={this.state.postData.postTitle}
                            onChange={this.handelTitle} />
                           <input style={{ height:"150px", fontSize:"19px"}}
                            type="text" placeholder="Body" name="postBody"
                            value={this.state.postData.postBody}
                            onChange={this.handelBody} />
                           <button>Update Post</button>
                       </form>
                   </div>
               )
           }
                <button onClick={this.handelModal}>Edit</button>
           </>
       )
    }
}

export default EditPost;