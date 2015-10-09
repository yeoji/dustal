import SocketIO from "socket.io";
import tokenHelper from "./routes/tokenHelper";

/**
 * Changes the cookies string
 * to an object
 * @param cookie
 * @returns {{}}
 */
const transformCookies = (cookie) => {
    const cookies = cookie.split('; ');
    const data = {};
    cookies.forEach((curr) => {
        const kv = curr.split('=');
        data[kv[0]] = kv[1];
    });

    return data;
};

export default function (server, db) {
    const io = new SocketIO(server);

    /* Socket connection for blog posts */
    const blog = io.of('/blog');
    blog.on('connection', function (socket) {

        const cookies = transformCookies(socket.request.headers.cookie);

        /**
         * When a user enters a blog page,
         * the client will emit a joinBlog event on connect
         * that contains the blog's name.
         * This blog name will be the room to separate out
         * different blogs' sockets
         */
        socket.on('joinBlog', (blog) => {
            // check that the user is authenticated if private blog
            db.repositories.BlogRepository.findByName(blog.name, db.connection)
                .then((found) => {
                    if (!found || (found.private && (!cookies.blogs || !tokenHelper.verifyBlogToken(found, null, cookies)))) {
                        socket.disconnect();
                    }

                    // set this here so we have a reference later
                    socket.room = blog.name;
                    socket.join(socket.room);
                })
                .catch((err) => {
                    console.log(err);
                });

        });

        /**
         * After the blog owner creates a post through the API,
         * and the post data is received on client from the API,
         * the client should emit a newPost event containing
         * that data so it can be broadcasted to other users
         * in the same blog room.
         */
        socket.on('newPost', (post) => {
            socket.broadcast.to(socket.room).emit('newPost', post);
        });

        // same as newPost above, after API call returns comment
        // client should emit a newComment event to update connected clients
        socket.on('newComment', (comment) => {
            socket.broadcast.to(socket.room).emit('newComment', comment);
        });
    });

}