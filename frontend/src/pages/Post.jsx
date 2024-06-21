import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Typography } from '@mui/material';
import 'quill/dist/quill.snow.css'
import './style.css'
import { useNavigate } from 'react-router-dom';
import BackdropLoading from '../components/BackdropLoading';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
const Post = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const user_info = JSON.parse(localStorage.getItem("user"));

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:4000/post/content');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }finally {
      setLoading(false)
    }
  };

  const editPost = (id) => {
    navigate(`/edit/${id}`);
  }

  const deletePost = async(id) => {
    setLoading(true);
    try {
      const response = await axios.delete(`http://localhost:4000/post/content/${id}`);
      setPosts(response.data);
    } catch (error) {
      console.log(error)
    } finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const bookmarkPost = async(postId) => {
    setLoading(true)
    try {
      const data = {
        token: user_info.token,
        postId: postId
      }
      const response = await axios.post("http://localhost:4000/bookmark", data)
      console.log(response,"::response")
      setPosts(response.data.data);

    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  const bookmarkRemove = async(postId) => {
    setLoading(true)
    try {
      const data = {
        token: user_info.token,
      }
      const response = await axios.delete(`http://localhost:4000/bookmark/${postId}`,{data})
      console.log(response,"::response")
      setPosts(response.data.data);

    } catch (error) {
      console.log(error)
    } finally{
      setLoading(false)
    }
  }

  return (
    <Box mt={5}>
      <BackdropLoading loading={loading} setLoading={setLoading}/>
      <Typography variant="h4" component="h2" align="center">
        Posts
      </Typography>
      <Box mt={3}>
        {posts?.map((post, index) => (
          <Box key={post._id} className="max-w-5xl mx-auto" mb={5} p={3} border={1} borderColor="grey.300" borderRadius={5}>
            <Box className="flex items-center justify-end gap-4">
              <Button variant='contained' onClick={() => editPost(post._id)}>Edit</Button>
              <Button variant='contained' color='error' onClick={() => deletePost(post._id)}>DELETE</Button>
              {
                post.isSaved ? <BookmarkOutlinedIcon sx={{fontSize:"40px", cursor:"pointer"}} onClick={() => bookmarkRemove(post._id)}/>
                : <BookmarkBorderOutlinedIcon sx={{fontSize:"40px", cursor:"pointer"}} onClick={() => bookmarkPost(post._id)}/>
              }
            </Box>
            <div className='reset-tw' dangerouslySetInnerHTML={{ __html: post.htmlContent }} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Post;
