import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Popover } from 'antd';
import "../../node_modules/antd/lib/popover/style/index.css"
import "../../node_modules/antd/lib/button/style/index.css"

import { udpateTree, addNode } from './treeActions'

import "./Tree.css"



function NodeSettings({name, addChildCallback, udpateCurrentNameCallback}){
    const [state, updateState] = useState({currentName:name, editing:false, childNodeName: ""})
    const [errors, setError] = useState({currentNodeError:"", childError:""})
    const {currentName, childNodeName} = state;
    const {currentNodeError, childError} = errors;

    const handleCurrentNodeNameChange = (event)=>{
        const name = event.target.value
        if (currentNodeError.length > 0){
            setError({...errors, currentNodeError: ""})
        }
        if (name.length <= 4){
            updateState({...state, editing: false, currentName: name})
        }
    }

    const handleChildNameChange = (event) =>{
        const name = event.target.value;
        const {childError} = errors;
        if (childError.length > 0){
            setError({...errors, childError: ""})
        }
        if (name.length <= 4){
            updateState({...state, childNodeName: name})
        }
    }

    const addChildNode = (name)=>{
        // /console.log(name)
        if(name.length === 0){
            setError({...errors, childError: "Name should not be empty"})
        }
        else{
            addChildCallback(name);
            updateState({...state, childNodeName: ""})
        }
    }

    const udpateCurrentName = (name)=>{
        if(name.length === 0){
            setError({...errors, currentNodeError: "Name should not be empty"})
        }else{
            udpateCurrentNameCallback(name);
        }
    }

    return (
        <div className="node-settings">
            <div className="edit-name">
                <input value={currentName} onChange={handleCurrentNodeNameChange}/>
                <Button type="primary" onClick={(event)=>{
                    udpateCurrentName(currentName)
                }}>Save</Button>
                {currentNodeError?<p className="error">*{currentNodeError}</p>:null}
            </div>
            <div className="add-child">
                <input placeholder="Enter a child name" value={childNodeName} onChange={handleChildNameChange}/>
                <Button onClick={(event)=>{
                    addChildNode(childNodeName)
                }}>Add</Button>
                {childError?<p className="error">*{childError}</p>:null}
            </div>
        </div>
    )
}


function Node(props) {
    const {isOpen, children, level, tree, path, name, index} = props;
    const dispatch = useDispatch()
    let ref = tree;
    for (let i=0; i<path.length; i++){
        if (i===0){
            ref = ref[path[i]]
        }else{
            ref = ref.children[path[i]]
        }
    }
    const handleUpdateIsOpen = ()=>{
        ref.isOpen = !isOpen;
        dispatch(udpateTree(tree));
    }
    const addChild = (childName)=>{
        ref.children.push({name: childName, isOpen: false, children:[]})
        ref.isOpen = true;
        dispatch(udpateTree(tree))
    }
    const udpateName = (name)=>{
        ref.name = name
        dispatch(udpateTree(tree))
    }
    return (
        <ul>
            <li key={`${level}-${index}`}>
                <div className="node-name">
                    <i className={isOpen?"fas fa-caret-right":"fas fa-caret-down"} onClick={(event)=>{
                        handleUpdateIsOpen()
                    }}></i>
                    <Popover trigger="click" title={`Node settings`} placement="right"
                            content={<NodeSettings name={name} addChildCallback={addChild} udpateCurrentNameCallback={udpateName}/>}>
                        <h4>{name}</h4>
                    </Popover>
                </div>
                {children && isOpen?
                    children.map((child, index)=>{
                        return (
                        <Node  key={`${[...path, index].join('-')}`} path={[...path, index]} tree={tree} {...child}/>
                        )
                    }):null
                }
            </li>
        </ul>
    )
}



function Tree() {
    const tree = useSelector((state)=>state)
    const [newNodeName, changeNewNodeName] = useState("")
    const [error, setError] = useState("")
    const dispatch = useDispatch()

    const handleChangeNewNodeName = (name)=>{
        if (error.length > 0){
            setError("")
        }
        if (name.length <= 4){
            changeNewNodeName(name)
        }
    }

    const handleAddNode = ()=>{
        if (newNodeName.length === 0) {
            setError("Name should not be empty")
        }
        else {
            dispatch(addNode({name: newNodeName, isOpen: false, children:[]}))
            changeNewNodeName("")
        }
    }

    return (
        <div className="tree-container">
            <div className="input-container">
                <input placeholder="Enter node name"value={newNodeName}
                onChange={(event)=>{
                    handleChangeNewNodeName(event.target.value)
                }} />
                <Button  type="primary" onClick={handleAddNode}>Add</Button>
                {error?<p className="error">*{error}</p>:null}
            </div>
            <div className="tree">
                {
                    tree.map((node, index)=>{
                        return <Node {...node} tree={tree} key={index} path={[index]}/>
                    })
                }
            </div>
        </div>
    )
}

export default Tree;