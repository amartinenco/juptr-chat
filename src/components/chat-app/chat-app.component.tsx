import React from 'react';
// import { useAuthState } from '../../contexts/auth.context';

import chatAppStyles from './chat-app.styles';

const ChatApp: React.FC = () => {

	// const { user } = useAuthState();

    return (
        <div>
            {/* {JSON.stringify(user)} */}
            <p>Chat App</p>
        </div>
    );
}

export default ChatApp;