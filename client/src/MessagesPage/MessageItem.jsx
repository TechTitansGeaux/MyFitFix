import React from 'react';

function MessageItem({message}) {

  return (
    <ul>
      {message.senderName}: {message.message}
    </ul>
  );
}

export default MessageItem;
