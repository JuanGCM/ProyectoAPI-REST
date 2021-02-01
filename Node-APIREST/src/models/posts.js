import { User, userRepository } from './users';


class Post {

    constructor(user_id, title, text, id=0) {
        this.user_id = user_id;
        this.title = title;
        this.text = text;
        this.id = id;
        this.createdAt = new Date();
    }

}

let posts = [
    new Post(1, 'Publicación de ejemplo 1', 'Esta es una publicación de ejemplo', 1),
    new Post(2, 'Publicación de ejemplo 2', 'Esta es otra publicación de ejemplo', 2)
];


const indexOfPorId = (id) => {
    let posicionEncontrado = -1;
    for (let i = 0; i < posts.length && posicionEncontrado == -1; i++) {
        if (posts[i].id == id)
            posicionEncontrado = i;
    }
    return posicionEncontrado;
}

const postRepository = {

    findAll : () => posts.map(post => {
        post.author = userRepository.findById(post.user_id).toDto()
        return post;
    }),
    findById : (id) => {
        const index = indexOfPorId(id);
        if (index != -1) {
            const post = posts[index];
            post.author = userRepository.findById(post.user_id).toDto();
        } else
            return undefined;
    },
    create : (newPost) => {
        const lastId = posts.length == 0 ? 0 : posts[posts.length-1].id;
        const newId = lastId + 1;
        const result = new Post(newPost.user_id, newPost.title, newPost.text, newId);
        posts.push(result);
        result.author = userRepository.findById(result.user_id).toDto();
        return result;
    }

}


export  {
    Post,
    postRepository,
}