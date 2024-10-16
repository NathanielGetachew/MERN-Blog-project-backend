import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Homepage from "./Component/HomePage/Homepage";
import Login from "./Component/Users/Login";

import PublicNavBar from "./Component/Navbar/PublicNavBar";
import PrivateNavbar from "./Component/Navbar/PrivateNavbar";
import ProtectedRoute from "./AuthRoute/protectedRoute";
import PublicPosts from "./Component/Posts/PublicPosts";
import AddPost from "./Component/Posts/AddPost";
import PostDetails from "./Component/Posts/PostDetails";
import PostsLists from "./Component/Posts/PostsLists";
import UpdatePost from "./Component/Posts/UpdatePosts";
import PublicUserProfile from "./Component/Users/publicUserProfile";
import PrivateUserProfile from "./Component/Users/PrivateUserProfile";
import UploadCoverImage from "./Component/Users/UploadCoverImage";
import UploadProfileImage from "./Component/Users/UploadProfileImage";


export default function App() {
  //! get the login user from the state
  const { userAuth } = useSelector((state) => state?.users);
  const isLoggedin = userAuth?.userInfo?.token;
  return (
    <BrowserRouter>
      {/* Navbar here */}
      {isLoggedin ? <PrivateNavbar /> : <PublicNavBar />}
      <Routes>
        <Route path="" element={<Homepage />}></Route>
        <Route path="/login" element={<Login />}></Route>

        {/*private profile */}
        <Route
          path="/user-profile"
          element={
            <ProtectedRoute>
              <PrivateUserProfile />
            </ProtectedRoute>
          }
        ></Route>

        
        {/* public profile */}
        <Route
          path="/user-public-profile/:userId"
          element={
            <ProtectedRoute>
              <PublicUserProfile />
            </ProtectedRoute>
          }
        ></Route>

        {/* Add Post */}
        <Route
          path="/Add-Post"
          element={
            <ProtectedRoute>
              <AddPost />
            </ProtectedRoute>
          }
        ></Route>

        {/*  Post details */}
        <Route
          path="/posts/:postId"
          element={
            <ProtectedRoute>
              <PostDetails />
            </ProtectedRoute>
          }
        ></Route>

        {/*  Private posts */}
        <Route
          path="/posts"
          element={
            <ProtectedRoute>
              <PostsLists />
            </ProtectedRoute>
          }
        ></Route>

         {/* update post
        <Route
          path="/posts/:postId/update"
          element={
            <ProtectedRoute>
              <UpdatePost />
            </ProtectedRoute>
          }
        ></Route> */}

        {/*  upload coverImage */}
        <Route
          path="/upload-cover-image"
          element={
            <ProtectedRoute>
              <UploadCoverImage />
            </ProtectedRoute>
          }
        ></Route>

        {/*  upload profileImage */}
        <Route
          path="/upload-profile-image"
          element={
            <ProtectedRoute>
              <UploadProfileImage />
            </ProtectedRoute>
          }
        ></Route>


      </Routes>
    </BrowserRouter>
  );
}
