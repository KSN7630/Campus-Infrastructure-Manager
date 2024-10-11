import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Hostel from "./pages/hostel/Hostel";
import Department from "./pages/department/Department";
import Academic from "./pages/academic/Academic";

import New from "./pages/new/New";
import Forgot from "./pages/forgot/Forgot"
import Berms from "./pages/berms/Berms";
import HostelParticular from "./pages/hostelparticular/Hostelparticular";
import DeptParticular from "./pages/deptparticular/Deptparticular";
import AcademicParticular from "./pages/academicparticular/Academicparticular";
import BermParticular from "./pages/bermparticular/Bermparticular";
import AdminBlockparticular from "./pages/adminBlockparticular/adminBlockParticular";
import UserList from "./pages/userlist/Userlist";
import Userview from "./pages/userview/Userview";
import Roomview from "./pages/roomview/Roomview";
import { userInputs} from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";

import Update from "./pages/update/Update";
import Plan from "./pages/plan/Plan";
import ResetPassword from "./pages/resetPassword/resetPass";
import AdminBlock from "./pages/adminBlock/adminBlock";
import ResidentialQuarters from "./pages/residentialquarters/residentialquarter";
import ResidentialQuarterparticular from "./pages/residentialquarterparticular/residentialquarterparticular";
import Amenities from "./pages/amenities/amenities";
import Amenityparticular from "./pages/amenityperticular/amenityparticular";
import Searchbar from "./pages/SearchPage/searchbar";
import FileUploadComponent from "./pages/connectFile/connectFile";
import { useSelector } from "react-redux";
import { loadUser } from "./actions/authAction";
import store from "./store";
import NotFound from "./components/NotFound/Notfound";
import Launchpage from "./components/LaunchPage/launchpage";
import Homelogin from "./components/HomeLogin/homelogin";
import Dashboard from "./pages/home/dashboard";
import ClientView from "./pages/clientview/clientView";
import { clientDataFetchAction ,loadClient } from "./actions/clientAuthAction";
import ClientUpdatePass from "./components/ClientUpdatePass/clientUpdatePass";
import PasswordResetPage from "./pages/newpassword/Newpassword";





const App = () => {
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadClient());
    store.dispatch(clientDataFetchAction({allotedRooms:client.allotedRooms,prevAllotedRooms:client.prevAllotedRooms}))
  }, []);
  const { loadingClient, errorClient, client ,isAuthenticatedClient } = useSelector((state) => state.clientData); 
  const { loading, isAuthenticated, user } = useSelector((state) => state.userData);

  const ProtectedRoute = ({ children }) => {
    
    
    if(loading === false ){
      if(isAuthenticated === false){
        return <Navigate to="/home" />;
      }
      if(isAuthenticated === true && user.isAdmin === true){
        return children;
      }
    }
    
    return <Navigate to="/home" />;
  };

  const ProtectedUserRoute = ({ children }) => {
    
    if(loadingClient === false ){
      
      if (isAuthenticatedClient === true ){
        return children;
      }
      else if(isAuthenticatedClient === false){
        return <Navigate to="/home" />;
      }
    }
    return <Navigate to="/home" />;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Router>
        <Routes>
            
            <Route path="/">
            <Route index element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />            

            <Route path="login" element={<Homelogin />} />
            <Route path="home" element={<Launchpage/>} />
            <Route path="/password/reset/:token" element={<PasswordResetPage />} />
            <Route path="hostels">
              <Route index element={
                <ProtectedRoute>
                  <Hostel />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="hostels/:userId">
              <Route index element={
                <ProtectedRoute>
                  <HostelParticular />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="hostels/:userId/:userId">
              <Route index element={
                <ProtectedRoute>
                  <Roomview />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="departments">
              <Route index element={
                <ProtectedRoute>
                  <Department />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="departments/:userId">
              <Route index element={
                <ProtectedRoute>
                  <DeptParticular />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="departments/:userId/:userId">
              <Route index element={
                <ProtectedRoute>
                  <Roomview />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="academics">
              <Route index element={
                <ProtectedRoute>
                  <Academic />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="academics/:userId">
              <Route index element={
                <ProtectedRoute>
                  <AcademicParticular />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="academics/:userId/:userId">
              <Route index element={
                <ProtectedRoute>
                  <Roomview />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="berms">
              <Route index element={
                <ProtectedRoute>
                  <Berms />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="berms/:userId">
              <Route index element={
                <ProtectedRoute>
                  <BermParticular />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="berms/:userId/:userId">
              <Route index element={
                <ProtectedRoute>
                  <Roomview />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="adminblocks">
              <Route index element={
                <ProtectedRoute>
                  <AdminBlock />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="adminblocks/:userId">
              <Route index element={
                <ProtectedRoute>
                  <AdminBlockparticular />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="adminblocks/:userId/:userId">
              <Route index element={
                <ProtectedRoute>
                  <Roomview />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="residentialquarters">
              <Route index element={
                <ProtectedRoute>
                  <ResidentialQuarters />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="residentialquarters/:userId">
              <Route index element={
                <ProtectedRoute>
                  <ResidentialQuarterparticular />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="residentialquarters/:userId/:userId">
              <Route index element={
                <ProtectedRoute>
                  <Roomview />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="amenities">
              <Route index element={
                <ProtectedRoute>
                  <Amenities />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="amenities/:userId">
              <Route index element={
                <ProtectedRoute>
                  <Amenityparticular />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="amenities/:userId/:userId">
              <Route index element={
                <ProtectedRoute>
                  <Roomview />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="userlist">
              <Route index element={
                <ProtectedRoute>
                  <UserList />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="update">
              <Route index element={
                <ProtectedRoute>
                  <Update />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="plan">
              <Route index element={
                <ProtectedRoute>
                  <Plan />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="allsearch">
              <Route index element={
                <ProtectedRoute>
                  <Searchbar />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="connect">
              <Route index element={
                <ProtectedRoute>
                  <FileUploadComponent />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="userlist/:userId">
              <Route index element={
                <ProtectedRoute>
                  <Userview />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="adduser">
              <Route index element={
                <ProtectedRoute>
                  <New inputs={userInputs} title="Add New User" link="/auth/register" />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="userview">
              <Route index element={
                <ProtectedRoute>
                  <Userview />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="roomview">
              <Route index element={
                <ProtectedRoute>
                  <Roomview />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="resetpassword">
              <Route index element={<ResetPassword />} />
            </Route>
            

            <Route path="client">
              <Route index element={
                <ProtectedUserRoute>
                  <ClientView />
                </ProtectedUserRoute>
              } />
            </Route>

            <Route path="/updateclipass">
              <Route index element={
                <ProtectedUserRoute>
                  <ClientUpdatePass />
                </ProtectedUserRoute>
              } />
            </Route>
            

            <Route path="notfound" element={<NotFound/>} />

          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
