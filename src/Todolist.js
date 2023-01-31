import React, { useState } from 'react'

const Todolist = () => {
   
    const [list,setList]=useState([]);
    const [message,setMessage]=useState(
        {
            text:"",
            id:""
        }
    );
    const[editingItem,setEditingItem]=useState({
        id:'',
        isEditing:false,
    })
    const handleMessage=(e)=>{
        setMessage({
            ...message,
            text:e.target.value,

    })
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        let newTodo={
            text:message.text,
            id:new Date().getTime().toString()
        }

        // console.log(newTodo);
        setList([
            ...list,
            newTodo
        ])
        setMessage({
            text:'',
            id:''
        })

    }
    const handleDelete=(id)=>{
        console.log(id);
        let newTodos=list.filter((eachItem)=>{
           return eachItem.id!==id;
        });
        // console.log(newTodos)
        setList(newTodos);

    }
    const handleEditingState=(id)=>{
        console.log(id)
        setEditingItem({
            ...editingItem,
            id:id,
            isEditing:true
        });
        let editableItem=list.find((eachItem)=>
        eachItem.id===id);
        setMessage({
            ...message,
            text:editableItem.text,
            id:editableItem.id
        })
        console.log(editableItem)
    }
    const handleEdit=(e)=>{
        e.preventDefault();
        let newTodos=list.map((eachItem)=>{
            if(eachItem.id===editingItem.id){
                return{
                    text:message.text,
                    id:editingItem.id,
                }
            } else {
                    return eachItem;
                }
            
        });
     setList(newTodos);
     setMessage({
        text:'',
        id:''
     });
     setEditingItem({
        id:'',
        isEditing:false
     })
    
}
  return (
    <div>
        <form>
            <label>Message:</label>&nbsp;
           <input type="text"
            id='message'
             name='message'
              placeholder='Enter the message'
              value={message.text}
              onChange={handleMessage}
              />
              {editingItem.isEditing?(<button type="submit" onClick={handleEdit}>Edit</button>):
              (<button type="submit" onClick={handleSubmit}>Add</button>)}

        </form>
        <hr />
        
            {list.length===0 &&<h4>Sorry no items in the list</h4>}
        
        <ul>
            {list.map((eachItem)=>{
                // console.log(eachItem)
                const {text,id}=eachItem;
               return <li key={id}>
              <span>{text}</span>
              <button onClick={()=>handleEditingState(id)}>Edit</button>
              <button onClick={()=>handleDelete(id)}>Delete</button>
               </li>

            })}
        </ul>
    </div>
  )
}

export default Todolist
