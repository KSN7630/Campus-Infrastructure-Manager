import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { buidingReducer, roomReducer, roomViewerReducer } from "./reducers/buildingReducer";
import { userReducer, userViewerReducer } from "./reducers/userReducer";
import { formSubmitReducer } from "./reducers/formReducer";
import { summaryHomeReducer } from "./reducers/summaryReducer";
import { authenticationReducer } from "./reducers/authReducer";
import { ClientAuthenticationReducer, clientActivityReducer, clientDataFetchReducer, updatePasswordReducer } from "./reducers/clientAuthReducer";


const reducer = combineReducers({
    buildings:buidingReducer,
    rooms:roomReducer,
    users:userReducer,
    roomContent:roomViewerReducer,
    userContent:userViewerReducer,
    formsubmit:formSubmitReducer,
    summaryContent:summaryHomeReducer,
    userData:authenticationReducer,
    clientData:ClientAuthenticationReducer,
    clientUpPassword:updatePasswordReducer,
    clientRoomData:clientDataFetchReducer,
    clientActv:clientActivityReducer
    
});


let initialState = {

};  


const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  
export default store;