import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';

function ChatPage() {

    const [chats, setChats] = useState([]);

    const [selectedChat, setSelectedChat] = useState(null);

    const [message, setMessage] = useState('');

    const [loading, setLoading] = useState(false);

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    // Fetch all chats
    const fetchChats = useCallback(async () => {

        try {

            const response = await axios.get(
                `${apiUrl}/api/chat`,
                {
                    headers: {
                        authorization: token,
                    },
                }
            );

            const sorted = [...response.data].sort((a, b) => {
                const aTime = new Date(a.updatedAt || a.createdAt || 0).getTime();
                const bTime = new Date(b.updatedAt || b.createdAt || 0).getTime();
                return bTime - aTime;
            });

            setChats(sorted);

            // Automatically select first chat
            if (sorted.length > 0 && !selectedChat) {
                setSelectedChat(sorted[0]);
            }

        } catch (error) {

            console.log(error);
        }
    }, [token, selectedChat, apiUrl]);

    useEffect(() => {

        fetchChats();

    }, [fetchChats]);

    const handleSelectChat = (chat) => {
        setSelectedChat(chat);
        setChats((prevChats) => [chat, ...prevChats.filter((item) => item._id !== chat._id)]);
    };

    // Create New Chat
    const createChat = async () => {

        try {

            const response = await axios.post(
                `${apiUrl}/api/chat/new`,
                {},
                {
                    headers: {
                        authorization: token,
                    },
                }
            );

            setSelectedChat(response.data);

            fetchChats();

        } catch (error) {

            console.log(error);
        }
    };

    // Send Message
    const sendMessage = async () => {

        if (!message.trim()) return;

        if (!selectedChat) {
            alert('Create a new chat first');
            return;
        }

        setLoading(true);

        try {

            const response = await axios.post(
                `${apiUrl}/api/chat/${selectedChat._id}/message`,
                {
                    message,
                },
                {
                    headers: {
                        authorization: token,
                    },
                }
            );

            setSelectedChat(response.data);

            fetchChats();

            setMessage('');

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    };

    // Delete chat conversation
    const deleteChat = async (chatId) => {
        const confirmed = window.confirm('Delete this chat conversation?');
        if (!confirmed) return;

        try {
            await axios.delete(
                `${apiUrl}/api/chat/${chatId}`,
                {
                    headers: {
                        authorization: token,
                    },
                }
            );

            setChats((prevChats) => prevChats.filter((chat) => chat._id !== chatId));

            if (selectedChat?._id === chatId) {
                setSelectedChat(null);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Logout
    const logout = () => {

        localStorage.removeItem('token');

        localStorage.removeItem('user');

        window.location.href = '/';
    };

    return (

        <div className='main-layout'>

            {/* Sidebar */}

            <Sidebar
                chats={chats}
                createChat={createChat}
                selectChat={handleSelectChat}
                selectedChat={selectedChat}
                deleteChat={deleteChat}
                logout={logout}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            {/* Chat Area */}

            <div className='chat-area'>

                {/* Top Navbar */}

                <div className='chat-navbar'>

                    <button
                        className='hamburger-btn'
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        title='Toggle sidebar'
                    >
                        ☰
                    </button>

                    <h2>
                        {
                            selectedChat
                                ? selectedChat.title
                                : 'AI Chatbot'
                        }
                    </h2>

                    <button
                        className='logout-btn'
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>

                {/* Chat Messages */}

                <ChatWindow
                    selectedChat={selectedChat}
                />

                {/* Input Box */}

                {
                    selectedChat && (

                        <div className='input-box'>

                            <input
                                type='text'
                                placeholder='Type your message...'
                                value={message}
                                onChange={(e) =>
                                    setMessage(e.target.value)
                                }
                                onKeyDown={(e) =>
                                    e.key === 'Enter' &&
                                    sendMessage()
                                }
                            />

                            <button
                                onClick={sendMessage}
                                disabled={loading}
                            >

                                {
                                    loading
                                        ? 'Thinking...'
                                        : 'Send'
                                }

                            </button>

                        </div>
                    )
                }

            </div>

        </div>
    );
}

export default ChatPage;
