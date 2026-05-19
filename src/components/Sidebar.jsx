function Sidebar({ chats, createChat, selectChat, selectedChat, deleteChat, logout, sidebarOpen, setSidebarOpen }) {

    const handleSelectChat = (chat) => {
        selectChat(chat);
        setSidebarOpen(false); // Close sidebar on mobile after selection
    };

    return (

        <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>

            <div className='sidebar-top'>
                <h1 className='brand'>ChatGPT Clone</h1>
                <button className='new-chat' onClick={createChat}>
                    + New chat
                </button>
            </div>

            <div className='chat-list'>
                {chats.length === 0 && (
                    <div className='no-chats'>No conversations yet</div>
                )}

                {chats.map((chat) => (
                    <div
                        key={chat._id}
                        className={`chat-item ${selectedChat?._id === chat._id ? 'selected' : ''}`}
                        onClick={() => handleSelectChat(chat)}
                    >
                        <div className='chat-main'>
                            <div className='chat-title'>{chat.title}</div>
                            <div className='chat-meta'>
                                {chat.messages?.length > 0
                                    ? chat.messages[chat.messages.length - 1].content?.slice(0, 60)
                                    : 'New chat'}
                            </div>
                        </div>

                        <button
                            className='delete-chat-btn'
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteChat(chat._id);
                            }}
                            title='Delete chat'
                        >
                            🗑
                        </button>
                    </div>
                ))}
            </div>

            <div className='sidebar-bottom'>
                <button className='logout-btn' onClick={logout}>Logout</button>
            </div>

        </aside>
    );
}

export default Sidebar;