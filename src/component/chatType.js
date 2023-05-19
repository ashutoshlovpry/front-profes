import {useEffect, useState} from 'react'
import { io } from "socket.io-client";
import {BACKEND_HOST} from '../constant'


function ChatType(props) {
    const [messages, setMessages] = useState([]);
    const [roomId,setRoomId]=useState(null)
//console.log(props);
const socket = io(BACKEND_HOST,{
    transports: ['websocket'],
    // extraHeaders: {
    //     "token": document.cookie.token
    //   }
  });
useEffect( ()=>{
   console.log("pp",props);
   socket.on('connect', () => {
     console.log("connet",socket);
   
     console.log('Connected to server');

     socket.on('disconnect',()=>{console.log("not connet");})
     socket.on("connect_error", (err) => {
       console.log(`connect_error due to ${err}`);
     });
     //socket.emit('messageto',"clienmsg");
   });


 },[])
//  socket.on('roomId',(data)=>{
//  console.log("rromID",data);
//  setRoomId(data)
//  })
socket.on('message',(data)=>{console.log("msgrecivett",data);
//addMessage(username, message);
setMessages(messages => [...messages, { username: data.name, message: data.message }]);



})

function handleMessageSubmit(event) {
    //console.log("token",Cookies.get('token'));
    console.log("pp",props);
      event.preventDefault();
      let msg=document.getElementById("message").value
      console.log("rrr",roomId);
      if (msg) {
        const data = {
          username:props.user._id,
          message: msg,
          roomId:roomId,
          name:props.user.name
        };
        socket.emit('messageto',JSON.stringify(data));
        setMessages(messages => [...messages, { username: 'You', message: msg ,name:props.user.name}]);
      }
    }
return (<>
 <div className="chat-body">
        {messages.map((message, index) => (
          <div key={index}>
            <p><strong>{message.username}:</strong> {message.message}</p>
          </div>
        ))}
      </div>
      <div className="chat-footer">
      send to-{props.user.email}
      you-{localStorage.getItem('email')}
        <form onSubmit={handleMessageSubmit}>
          <input type="text" id='message' //value={messageInput} onChange={event => setMessageInput(event.target.value)} 
          placeholder="Type your message" />
          <button type="submit">Send</button>
        </form>
      </div> 




</>)


}
export default ChatType