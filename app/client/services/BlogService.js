import RESTService from './RESTService';
import axios from 'axios';

class BlogService extends RESTService{
    constructor(){
        super('/blogs');
    }
}

export default BlogService;