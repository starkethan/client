import { Routes, Route, HashRouter } from "react-router-dom";
import "./App.css";
import {
  Home,
  About,
  Services,
  Contact,
  NoPage,
  SignUp,
  Login,
  ResetPassword,
  ForgotPassword,
  Settings,
  Search,
  Profile,
  EditProfile,
  CreatePost,
  Chats,
  Chat,
  P,
  Notification,
  Status,
  StatusShow,
  Friends
  
  
  

} from "./pages";




function App() {

  return (
    <div className="App" >
      <HashRouter>
        <Routes>
          <Route index element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword/:token" element={<ResetPassword />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Status" element={<Status />} />
          <Route path="/Status/:username" element={<StatusShow />} />
          <Route path="/Profile/:username" element={<Profile />} />
          <Route path="/EditProfile/:id" element={<EditProfile />} />
          <Route path="/CreatePost" element={<CreatePost />} />
          <Route path="/Notification" element={<Notification />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/chat/:id" element={<Chat />} />
          <Route path="/p/:id" element={<P />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/About" element={<About />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </HashRouter>

    </div>
  );
}

export default App;
