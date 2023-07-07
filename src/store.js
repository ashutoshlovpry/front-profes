// ...
import { createStore, applyMiddleware ,combineReducers} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {userDetail} from './redux/reducers/userDetails'
// ...
//import { helloSaga } from './sagas'
  

const reducers=combineReducers({
    userDetail:userDetail
})
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
)
//sagaMiddleware.run(helloSaga)

const action = type => store.dispatch({type})
export default store
// rest unchanged