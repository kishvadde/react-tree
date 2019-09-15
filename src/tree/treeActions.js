const treeActionTypes = {
    UPDATE_TREE: 'UPDATE_TREE',
    ADD_NODE: 'ADD_NODE'
}


function addNode(nodeDetails){
    const {ADD_NODE} = treeActionTypes;
    return {
        type: ADD_NODE,
        payload: nodeDetails
    }
}

function udpateTree(udpatedTree) {
    const {UPDATE_TREE} = treeActionTypes;
    return {type:UPDATE_TREE, payload:udpatedTree}
}

export {udpateTree, addNode, treeActionTypes}