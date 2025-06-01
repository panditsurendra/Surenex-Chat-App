import { useSelector } from "react-redux";
import ChatArea from "./components/chat";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import { io } from 'socket.io-client';
import { useEffect, useState } from "react";

 const socket = io('http://localhost:4000');

function Home(){
    const { selectedChat, user } = useSelector(state => state.userReducer);
    const [onlineUser, setOnlineUser] = useState([]); 


    // useEffect(() => { // this logic has a bug
    //     if(user){
    //         socket.emit('join-room', user._id);
    //         socket.emit('user-login', user._id);
            
    //         socket.on('online-users', onlineusers => {
    //             setOnlineUser(onlineusers);
    //         });
    //         socket.on('online-users-updated', onlineusers => {
    //             setOnlineUser(onlineusers);
    //         });          
    //     }
        
    // }, [user]);

    useEffect(() => {
        if (user) {
            socket.emit('join-room', user._id);
            socket.emit('user-login', user._id);
        }

        const handleOnlineUsers = (onlineUsers) => {
            setOnlineUser(onlineUsers);
        };

        socket.on('online-users', handleOnlineUsers);
        socket.on('online-users-updated', handleOnlineUsers);

        // Clean up on unmount to prevent duplicate listeners
        return () => {
            socket.off('online-users', handleOnlineUsers);
            socket.off('online-users-updated', handleOnlineUsers);
        };
    }, [user]);


    return (
        <div className="home-page">
             <Header socket={socket}></Header>
                {/* <Header ></Header> */}
             <div className="main-content">
                {/* <Sidebar ></Sidebar> */}
                <Sidebar socket={socket} onlineUser={onlineUser}></Sidebar>
                {selectedChat && <ChatArea socket={socket}></ChatArea>}
                {/* { selectedChat && <ChatArea ></ChatArea> } */}
             </div>
        </div>
    );
}

export default Home;

