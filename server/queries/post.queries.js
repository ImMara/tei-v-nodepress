const Post = require('../database/models/post.model')

exports.createPost = async (data) => {
    const newPost = new Post(data);
    return newPost.save();
}

exports.getPosts = async () => {
    return Post.find().populate("category").sort({"date":-1});
}

exports.getPost = async (id) => {
    return Post.findById(id);
}

exports.getPostsWithAuthorAndCategory = () =>{
    return Post.find( {status:true}).populate("category").populate("author").sort({"date":-1});
}

exports.deletePost = async (id) => {
    return Post.findByIdAndDelete(id).exec();
}

exports.patchPost = async (id,data) => {
    return Post.findByIdAndUpdate(id,{$set:data},{runValidators:true});
}

exports.getFeatured = () =>{
    return Post.find({featured:true,status:true}).sort({"date":-1});
}

exports.getLastPosts = (limit)=>{
    return Post.find( {status:true}).sort({"date":-1}).limit(limit).populate('author').populate('category').exec();
}

exports.getPostsByCategory = (id) =>{
    return Post.find({"category":id}).populate("author").sort({"date":-1})
}