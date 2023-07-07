
import { io } from "socket.io-client";
//import Cookies from 'js-cookie';
import {useEffect, useState} from 'react'
import axios from "axios";
//import { Socket } from "socket.io";
import ChatType from "./chatType";
import Navbar from "./navbar";
import {BACKEND_HOST} from '../constant'
import React, { Component }  from 'react';

function Chat(){
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [alluser,setAllUser]=useState([]);
    const [sendto,setSendto]=useState([]);
    const [sendtoId,setSendtoId]=useState('');
    const [typingPage,setTypingPage]=useState(false);
    const [userData,setUserData]=useState({})
    const socket = io(BACKEND_HOST,{
      transports: ['websocket'],
      extraHeaders: {
          "token": document.cookie.token
        }
    });
    useEffect( ()=>{
      let ignore = false;
    
       fun()
       return () => {
        ignore = true;
      };
      // socket.on('connect', () => {
      //   console.log("connet");
      
      //   console.log('Connected to server');
        
       

      //   socket.on('disconnect',()=>{console.log("not connet");})
      //   socket.on("connect_error", (err) => {
      //     console.log(`connect_error due to ${err}`);
      //   });
        //socket.emit('messageto',"clienmsg");
      //});


    },[])
   
  //   socket.on('message',(data)=>{console.log("msgrecive",data);
  //   //addMessage(username, message);
  //   setMessages(messages => [...messages, { username: data.name, message: data.message }]);
  let fun=async()=>{
    //         let all= await axios.get('http://localhost:8000/all')
    //         console.log("all;",all);
    // let newarr=all.data.filter((i)=>i.email!==localStorage.getItem('email'))
           let chatList=await axios.post(BACKEND_HOST+ '/api/chat_list',{id:localStorage.getItem('id')})
           console.log(chatList);
         setAllUser(chatList.data)
    
           }
  
  
  // })
   
    function handleMessageSubmit(event) {
      //console.log("token",Cookies.get('token'));
        event.preventDefault();
        let msg=document.getElementById("message").value
        if (msg) {
          const data = {
            username:sendtoId,
            message: msg
          };
          socket.emit('messageto',JSON.stringify(data));
          setMessages(messages => [...messages, { username: 'You', message: msg }]);
          setMessageInput('');
        }
      }
    function sendMsg( msg ) {
        let data = {
           // room: room,
            msg: msg,
            sender: document.cookie.token
        };

        //emit chat message
        socket.emit( 'chat', data );

        //add localchat
        //h.addChat( data, 'local' );
        //document.getElementById('chat-input-btn').addEventListener('click',(e) => {
            //console.log("here: ",document.getElementById('chat-input').value)
            //if (  document.getElementById('chat-input').value.trim()  ) {
                //sendMsg( document.getElementById('chat-input').value );
    
                
                   // document.getElementById('chat-input').value = '';
             
          //  }
       // });
        
    }

   const selectUser=(data)=>{
    socket.emit('userConnect',data)
    setUserData(data)
    setSendto(data.name)
    setSendtoId(data._id)
    //let roomId=localStorage.getItem('id')+data._id
    let roomId=data._id+localStorage.getItem('id')
   // console.log({roomId});
    socket.emit('joinRoom',roomId)
   }

    //Chat textarea
   


    return(<>
    <Navbar/>
      {  !typingPage &&
                <div className="chat-window">
      <div className="chat-header">
        <h2>Chat Application</h2>
      </div>
      <div>
      { alluser.map((i)=>{
        return (<div onClick={()=>{
          selectUser(i)
          
          setTypingPage(true);
     
         } }>
        {i.email}
        </div>)
      })


      }
     
      
      </div></div>
      }
      { typingPage && <ChatType user={userData}/>}
      <div onClick={()=>{setTypingPage(false)}}>listed page</div>
      {/* <div className="chat-body">
        {messages.map((message, index) => (
          <div key={index}>
            <p><strong>{message.username}:</strong> {message.message}</p>
          </div>
        ))}
      </div>
      {sendto? <div className="chat-footer">
      {sendto}
        <form onSubmit={handleMessageSubmit}>
          <input type="text" id='message' //value={messageInput} onChange={event => setMessageInput(event.target.value)} 
          placeholder="Type your message" />
          <button type="submit">Send</button>
        </form>
      </div> : "choose user" 
        }  */}

    
        
        
        </>)
}
export default Chat