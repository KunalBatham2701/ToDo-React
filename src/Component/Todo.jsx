import React, { useEffect, useState } from 'react'
import todo from "../image/logo.png";
import '../App.css';

const getLocalItems=()=>{
    let list=localStorage.getItem('lists');

    if(list){
        return JSON.parse(localStorage.getItem('lists'));
    }
    else{
        return [];
    }
}

    




const Todo = () => {
    const [inputData,setInputData]=useState('');
    const [items,setItems]=useState(getLocalItems());
    const [togglesubmit,setToggleSubmit]=useState(true);
    const [isEditItem,setIsEditItem]=useState(null);

    const addItem=()=>{
        if(!inputData){
            alert('please enter data');
        } else if (inputData && !togglesubmit){
            setItems(
                items.map((elem)=>{
                    if(elem.id===isEditItem){
                        return {...elem,name:inputData}
                    }
                    return elem;
                })
            )
            setToggleSubmit(true);
            setInputData('');
            setIsEditItem(null);
        } else{
            const allInputData={ id:new Date().getTime().toString(),name:inputData}
            setItems([...items,allInputData]);
            setInputData('');
        }
    }
    const deleteItem=(index)=>{
        const updateditems=items.filter((elem)=>{
            return index!==elem.id;
        });
        setItems(updateditems);
    }
    const editItem=(id)=>{
        let newEditItem=items.find((elem)=>{
            return elem.id===id;
        })
        setToggleSubmit(false);
        setInputData(newEditItem.name);
        setIsEditItem(id);
    }

    const removeAll=()=>{
        setItems([]);
    }
    useEffect(()=>{
        localStorage.setItem('lists',JSON.stringify(items))
    },[items]);

  return (
    <>
        <div className="main-div">
            <div className="child-div">
                <figure>
                    <img className="imglogo" src={todo} alt="todologo" srcset="" />
                    <figcaption>Enter your Tasks Here 😎</figcaption>
                </figure>
                <div className="addItems">
                    <input type="text" placeholder="✍️ Add Items..."
                        value={inputData}
                        onChange={(e)=> setInputData(e.target.value)}
                        onKeyDown={(e)=>{
                            if(e.key==='Enter'){addItem()}
                        }}
                    />
                    {
                        togglesubmit ? <i className="fa fa-solid fa-plus add-btn" title="Add Item" onClick={addItem}></i>:
                        <i className="fa fa-solid fa-check add-btn" title="update Item" onClick={addItem}></i>
                    }
                </div>
                <div className="showItems">
                    {
                        items.map((elem)=>{
                            return (
                                <div className="eachItem" key={elem.id}>
                                    <h3>{elem.name}</h3>
                                    <div className="todo-btn">
                                        <i className="far fa-edit add-btn" title="Edit Item" onClick={()=>editItem(elem.id)}></i>
                                        <i className="far fa-trash-alt add-btn" title="Delete Item" onClick={()=>deleteItem(elem.id)}></i>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="showItems">
                    <button className='btn effect04' data-sm-link-text="remove All" onClick={removeAll}><span>CHECK LIST</span></button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Todo
