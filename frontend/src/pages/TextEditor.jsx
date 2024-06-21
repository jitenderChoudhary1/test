import React, { useEffect, useState } from "react";
import 'quill/dist/quill.snow.css'
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill'
import { Box, Button } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "quill/dist/quill.core.css";
import BackdropLoading from '../components/BackdropLoading';

const TextEditor = () => {
    const [content, setContent] = useState()
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        if(id) {
            fetchPostData(id);
        }
    }, [id]);

    const fetchPostData = async (postId) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:4000/post/content/${postId}`);
            setContent(response.data.htmlContent);
        } catch (error) {
            console.error('Error fetching post data:', error);
        }finally{
            setLoading(false);
        }
    }; 


    const modules = {
        toolbar:  [
            [{ 'font': [] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],        
            [{ 'color': [] }, { 'background': [] }],
            [{ 'script': 'sub'}, { 'script': 'super' }],     
            [{ 'header': 1 }, { 'header': 2 }],               
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],         
            [{ 'direction': 'rtl' }],                       
            [{ 'align': [] }],
            ['link', 'image', 'video', 'formula'],
            // ['clean']         
          ]
    };

    const formats = [
        "header", "height", "bold", "italic",
        "underline", "strike", "blockquote",
        "list", "color", "bullet", "indent",
        "link", "image", "align", "size", "code-block",
        "background", "font", "direction"
    ];
    const submit = async(content) => {
        const res = await postData(content)
        setContent("");
    }
    const postData = async(content) => {
        setLoading(true)
        if(id){
            return axios.put(`http://localhost:4000/post/content/${id}`, { htmlContent: content })
            .then(response => {
                console.log('Content saved:', response.data);
            }).then(() => {
                setLoading(false);
                navigate("/post");
            }).catch(error => {
                console.error('Error saving content:', error);
            });    
        }else{
            return axios.post('http://localhost:4000/post/save', { htmlContent: content })
            .then(response => {
                console.log('Content saved:', response.data);
            }).then(() => {
                setLoading(false);
                navigate("/post");
            })
            .catch(error => {
                console.error('Error saving content:', error);
            });
        }
    }

    const handleProcedureContentChange = (contentData) => {
        setContent(contentData)
    };

    return (
        <Box height={"100vh"}>
            <BackdropLoading loading={loading} setLoading={setLoading}/>
            <Box mt={5}>
                <h1 style={{ textAlign: "center" }}>Write Your Post Here</h1>
                <div style={{ display: "grid", justifyContent: "center" }}>
                    <ReactQuill
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        value={content || ''}
                        placeholder="write your content ...."
                        onChange={handleProcedureContentChange}
                        style={{ height: "500px", width: "60vw" }}
                    >
                    </ReactQuill>
                    <Box textAlign={"center"}>
                        <Button variant="contained" onClick={() => submit(content)}>{id? "SAVE":"POST"}</Button>
                    </Box>
                </div>
            </Box>
        </Box>
    );

}

export default TextEditor;