import { useSelector } from "react-redux";
import ChatArea from "./components/chat";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import { io } from 'socket.io-client';
import { useEffect, useState } from "react";

 const socket = io('https://surenex-chat-app-server.onrender.com');

function Home(){
    const { selectedChat, user } = useSelector(state => state.userReducer);
    const [onlineUser, setOnlineUser] = useState([]); 
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);// for mobile responsiveness

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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


        // const handleNotification = (notification) => {
        //     console.log("Received notification:", notification);
        //     if (!selectedChat || selectedChat._id !== notification.chatId) {
        //         alert(`New message from ${notification.from}: ${notification.message}`);
        //         // OR: toast(notification.message)
        //     }
        // };

        socket.on('online-users', handleOnlineUsers);
        socket.on('online-users-updated', handleOnlineUsers);
        // socket.on('receive-notification', handleNotification);

        // Clean up on unmount to prevent duplicate listeners
        return () => {
            socket.off('online-users', handleOnlineUsers);
            socket.off('online-users-updated', handleOnlineUsers);
            // socket.off('receive-notification', handleNotification);
        };
    }, [user]);

     const mainContentClass = `main-content ${isMobile && selectedChat ? 'chat-selected' : ''}`;


    // return (
    //     <div className="home-page ">
    //          <Header socket={socket}></Header>
    //             {/* <Header ></Header> */}
    //          <div className="main-content">
    //             {/* <Sidebar ></Sidebar> */}
    //             <Sidebar socket={socket} onlineUser={onlineUser}></Sidebar>
    //             {selectedChat && <ChatArea socket={socket}></ChatArea>}
                
    //          </div>
    //     </div>
    // );

    return (
        <div className="home-page">
            <Header socket={socket} />
            <div className={mainContentClass}>
                <Sidebar socket={socket} onlineUser={onlineUser} />
                {selectedChat && <ChatArea socket={socket} />}
            </div>
        </div>
    );
}

export default Home;

