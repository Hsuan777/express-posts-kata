const {handleSuccess, handleError} = require('../service/handles');
const Post = require('../model/post');
const checkBody = require('../service/checkBody');


const posts = {
  async getPosts(req, res) {
    // 預設回傳貼文時間：新到舊
    const posts = await Post.find().sort({createdAt: -1});
    handleSuccess(res, posts);
  },
  async postPost(req, res) {
    try {
      const data = req.body;
      const isPass = checkBody(res, data);
      if (isPass) {
        const newPost = await Post.create({
          name: data.name,
          tags: data.tags,
          type: data.type,
          image: data.image,
          content: data.content,
        })
        handleSuccess(res, newPost);
      }
    } catch(error) {
      handleError(res, 400, 40001)
    }
  },
  async deletePosts(req, res) {
    await Post.deleteMany({});
    handleSuccess(res, '刪除所有資料成功');
  },
  async deletePost(req, res) {
    try {
      const postId = req.params.id;
      const result = await Post.findByIdAndDelete(postId);
      if (result) handleSuccess(res, '刪除資料成功');
      else handleError(res, 400, 40003);
    } catch {
      handleError(res, 400, 40001);
    }
  },
  async patchPost(req, res) {
    try {
      const postId = req.params.id
      const data = req.body;
      const isPass  = checkBody(res, data)
      if (isPass) {
        try {
          await Post.findByIdAndUpdate(postId, data);
          handleSuccess(res, '修改資料成功');
        } catch {
          handleError(res, 400, 40003);
        }
      }
    } catch {
      handleError(res, 400, 40001);
    }
  }
}

module.exports = posts;