import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Chat from "./pages/Chat/Chat";
import Layout from "./pages/Main Layout/MainLayout";
import ProfileLayout from "./pages/Profile Layout/ProfileLayout";
import Error from "./pages/Error/Error";
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/Profile Edit/EditProfile";
import ChangePassword from "./pages/Change Password/ChangePassword";
import Authentication from "./pages/Authentication/Authentication";
import ImageUploader from "./pages/Chat/ImageUploader";
import { AuthProvider } from "./context/AuthContext";
import ChatLayout from "./pages/Chat Layout/ChatLayout";
import CreateUser from "./pages/CreateUser/CreateUser";
import CreateMaterial from "./pages/Materials/CreateMaterial";
import AdminLayout from "./pages/Admin Layout/AdminLayout";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import MaterialLayout from "./pages/Material Layout/MaterialLayout";
import Material from "./pages/Materials/Material";
import LostFoundLayout from "./pages/LostFound Layout/LostFoundLayout";
import LostAndFound from "./pages/LostAndFound/LostAndFound"
import CreateLostAndFount from "./pages/CreateLostAndFound/CreateLostAndFound"
import Notifications from "./pages/Notifications/Notifications";
import NotificationLayout from "./pages/NotificationLayout/NotificationLayout";
import CreateNotification from "./pages/CreateNotification/CreateNotification";
import MeetingLayout from "./pages/Meeting Layout/MeetingLayout";
import Meeting from "./pages/Meeting/Meeting"
import CreateMeeeting from "./pages/Create Meeting/CreateMeeting";
import InternetSafetyGame from "./components/Games/InternetSafetyGame";
import PhishingGame from "./components/Games/PhisingGame";
import EtiquettePuzzleGame from "./components/Games/EtiquettePuzzle";
import GameLayout from "./pages/GameLayout/GameLayout";
// Zamenite elemente ruta:
// { path: "internetSafetyGame", element: <InternetSafetyGame /> },
// { path: "phishingGame", element: <PhishingGame /> },
// { path: "etiquettePuzzle", element: <EtiquettePuzzleGame /> },

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <Error />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "profile",
          element: <ProfileLayout />,
          children: [
            { index: true, element: <Profile /> },
            { path: ":id/edit", element: <EditProfile /> },
            { path: "change-password", element: <ChangePassword /> },
          ],
        },
        {
          path: "chat",
          element: <ChatLayout />,
          children: [
            { index: true, element: <Chat /> },
            { path: "image", element: <ImageUploader /> },
          ],
        },
        {path: "lostandfound", element:<LostFoundLayout/>,children:[
          {index:true, element:<LostAndFound/>},
          {path: "createlostandfound", element:<CreateLostAndFount/>}
        ]},
        { path: "auth", element: <Authentication /> },
        {path: "materials", element:<MaterialLayout/>,children:[
          {index:true,element:<Material/>},
          {path: "creatematerial", element: <CreateMaterial/>},
        ]},
        {path: "notifications", element:<NotificationLayout/>,children:[
          {index:true,element:<Notifications/>},
          {path: "createnotification", element:<CreateNotification/>}
        ]},
          {path: "admin", element:<AdminLayout/>, children:[
            {index: true, element:<AdminPanel/>},
            {path: "createuser", element: <CreateUser/>}
          ]},
          {path: "meetings", element:<MeetingLayout/>,children:[
            {index: true, element:<Meeting/>},
            {path: "createmeeting", element:<CreateMeeeting/>}
          ]},
          {
            path: "games", element:<GameLayout/>,
            children: [
              { path: "internetSafetyGame", element: <InternetSafetyGame /> },
              { path: "phishingGame", element: <PhishingGame /> },
              { path: "etiquettePuzzle", element: <EtiquettePuzzleGame /> },
            ],
          },
      ],
    },
  ]);
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
