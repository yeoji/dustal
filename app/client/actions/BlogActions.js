import alt from '../alt';

class BlogActions{
    updatePosts(posts){
        this.dispatch(posts);
    }
}

export default alt.createActions(BlogActions);