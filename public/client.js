const socket = io()

let textarea = document.querySelector('#textarea')
let messageInp = document.querySelector('#messageInp')
let messageArea = document.querySelector('.msg_area')


let name;
do{
   name = prompt("Please enter your name:")
} while(!name)           //!name--> loop runs upto that time of user is not giving any name

textarea.addEventListener('keyup',(e)=>{    // listen event
  if(e.key === 'Enter'){                    //any press key==enter key
    sendMessage(e.target.value)
  }

})

function sendMessage(message) {               //to send msg
    let msg ={
        user : name,               //name is passed which is put in prompt
        message: message.trim()               // argument msg is passed to message
    }

    //Append 

    appendMessage(msg,'outgoing_msg')         // when we write msg in textarea & it is sent i.e (added) append as send msg
    textarea.value = ''
    scrollToBottom();
    
    //send to server

    socket.emit('message', msg)
  
}

function appendMessage(msg, type){ 
  let mainDiv = document.createElement('div')   //div element is created for that sent msg
  let className = type                         // type means it is ongoing msg
  mainDiv.classList.add(className, 'msg')

  let markup = `
  <h4>${msg.user}</h4>
  <p>${msg.message}</p>
  `
  mainDiv.innerHTML = markup                   //insert that html markup to maindiv
  messageArea.appendChild(mainDiv)                //add all maindiv to messagearea
}

//Receive messages

socket.on('message', (msg) =>{
  appendMessage(msg,'incoming_msg') 
  scrollToBottom();
})

//scroll to bottom

function scrollToBottom(){
  messageArea.scrollTop = messageArea.scrollHeight
}