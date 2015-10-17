import alt from "../alt";
import RESTService from "../services/RESTService";

const BlogApi = new RESTService('/blogs');

class BlogActions {

    createBlog(data) {
        BlogApi.createResource(data)
            .then((response) => {
                this.dispatch(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

}

export default alt.createActions(BlogActions);