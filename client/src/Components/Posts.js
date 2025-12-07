import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts,likePost } from "../Features/PostSlice";
import moment from 'moment'
import { FaThumbsUp } from "react-icons/fa6";
import {useNavigate} from "react-router-dom"

const Posts = () => {
 const {posts}  = useSelector(state => state.posts)
 const {user,isLogin} = useSelector(state => state.users)
 const dispatch = useDispatch()
 const navigate = useNavigate()

 function handlePost(id){
  const postData = {postId:id, userId:user._id}
  dispatch(likePost(postData))
  navigate("/")
 }

 
  useEffect(()=>{
    const fetchPost = ()=>{
      if(isLogin)
      dispatch(getPosts())
 }
    fetchPost()
  },[posts])

  return (
    <div className="postsContainer">
      <h1>Display Posts</h1>
      <table className='table table-info'>
        <thead></thead>
        <tbody>
          {
            posts.map((p,idx)=>(
              <tr>
                <td>{p.postMsg}</td>
                <td>{p.email}</td>
                <td>{moment(p.createdAt).fromNow()}</td>
                <p>
                  <a href="#" on onClick={()=>handlePost(p._id)}><FaThumbsUp />
                  </a>
                  {p.likes.count}
                </p>
                
              </tr>
            ))
          }
        </tbody>
        
      </table>
    </div> /* End of posts */
  );
};

export default Posts;
