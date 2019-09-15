import { treeActionTypes } from './treeActions'


function getTreeInitialState(){
    return []
}


function treeReducer(state=getTreeInitialState(), action){
    let newState = state;
    const {UPDATE_TREE, ADD_NODE} = treeActionTypes;
    switch (action.type){
        case UPDATE_TREE:
            const newTree = action.payload;
            newState = [...newTree]
            break;
        case ADD_NODE:
            const nodeInfo = action.payload;
            newState = [
                ...state,
                nodeInfo
            ]
            break;
        default:
            newState = state
            break;
    }
    return newState;
}

export {getTreeInitialState}
export default treeReducer