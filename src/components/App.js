import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post';

const baseUrl = 'https://practiceapi.devmountain.com/api';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.searchPosts = this.searchPosts.bind( this );
  }
  
  componentDidMount() {
    axios.get(baseUrl + '/posts').then(res => {
      this.setState({
        posts: res.data
      });
    }).catch(err => console.log(err));
  }

  updatePost(id, text) {
    axios.put(baseUrl + '/posts?id=' + id, {text}).then(res => {
      this.setState({
        posts: res.data
      });
    }).catch(err => console.log(err));
  }

  deletePost(id) {
    axios.delete(baseUrl + '/posts?id=' + id).then(res => {
      this.setState({
        posts: res.data
      });
    }).catch(err => console.log(err));
  }

  createPost(text) {
    axios.post(baseUrl + '/posts', { text }).then(results => {
      this.setState({
        posts: results.data
      });
    });
  }

  searchPosts() {
    let searchWords = this.searchWords.value;
    axios.get(baseUrl + '/posts?' + searchWords).then(results => {
      this.setState({
        posts: results.data
      });
    }).catch(err => console.log(err));
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header searchPostsFn={this.searchPosts} searchWords={this.searchWords}/>

        <section className="App__content">

          <Compose createPostFn={ this.createPost }/>
          {posts.map(post => <Post key={post.id}
                                   text={post.text}
                                   date={post.date}
                                   updatePostFn={this.updatePost}
                                   deletePostFn={this.deletePost}
                                   id={post.id} />)}
        </section>
      </div>
    );
  }
}

export default App;
