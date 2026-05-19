import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function ChatWindow({ selectedChat }) {

    const CodeBlock = ({ code, language }) => {
        if (language) {
            return (
                <div className='code-block'>
                    <div className='code-language-label'>{language}</div>
                    <SyntaxHighlighter
                        style={oneDark}
                        language={language}
                        PreTag='div'
                        wrapLines={false}
                        showLineNumbers={false}
                    >
                        {code.replace(/\n$/, '')}
                    </SyntaxHighlighter>
                </div>
            );
        }
        return <pre className='plain-pre'><code>{code}</code></pre>;
    };

    const renderMessageWithCodeBlocks = (content) => {
        // Ensure content is a string
        if (typeof content !== 'string') {
            if (content && typeof content.content === 'string') {
                content = content.content;
            } else {
                content = '```json\n' + JSON.stringify(content, null, 2) + '\n```';
            }
        }

        // Extract code blocks: ```language\ncode\n```
        const codeBlockRegex = /```([\w-]*?)\n([\s\S]*?)\n```/g;
        const parts = [];
        let lastIndex = 0;
        let match;

        while ((match = codeBlockRegex.exec(content)) !== null) {
            // Add text before code block
            if (match.index > lastIndex) {
                parts.push({
                    type: 'text',
                    content: content.slice(lastIndex, match.index),
                });
            }
            // Add code block
            parts.push({
                type: 'code',
                language: match[1] || 'plaintext',
                code: match[2],
            });
            lastIndex = match.index + match[0].length;
        }

        // Add remaining text
        if (lastIndex < content.length) {
            parts.push({
                type: 'text',
                content: content.slice(lastIndex),
            });
        }

        // If no code blocks found, return entire content as markdown
        if (parts.length === 0) {
            return <ReactMarkdown>{content}</ReactMarkdown>;
        }

        // Render mixed content: text with markdown + code blocks
        return (
            <div className='message-content'>
                {parts.map((part, idx) =>
                    part.type === 'text' ? (
                        <div key={idx}>
                            <ReactMarkdown>{part.content}</ReactMarkdown>
                        </div>
                    ) : (
                        <CodeBlock key={idx} code={part.code} language={part.language} />
                    )
                )}
            </div>
        );
    };

    return (

        <div className='messages'>

            {selectedChat?.messages?.length === 0 && (

                <div className='empty-chat'>
                    <h2>Welcome to ChatGPT Clone</h2>
                    <p>Ask anything — the assistant is ready.</p>
                </div>

            )}

            {selectedChat?.messages?.map((msg, index) => {

                return (
                    <div
                        key={index}
                        className={`message-row ${msg.role === 'user' ? 'user' : 'assistant'}`}>

                        <div className='avatar'>
                            {msg.role === 'user' ? 'U' : 'AI'}
                        </div>

                        <div className='message-bubble'>
                            {msg.role === 'assistant' ? (
                                renderMessageWithCodeBlocks(msg.content)
                            ) : (
                                <div className='plain-text'>{msg.content}</div>
                            )}
                        </div>

                    </div>
                );

            })}

        </div>
    );
}

export default ChatWindow;