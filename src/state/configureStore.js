import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import treeReducer, {getTreeInitialState} from '../tree/treeReducer';

function configureStore(){
    const enhancers = compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      )

    return createStore(
       treeReducer,
       getTreeInitialState(),
       enhancers
      );
}

export default configureStore;