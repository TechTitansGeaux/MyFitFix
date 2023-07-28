import React from 'react';

function MessageItem({message}) {
  return (
    <ul>
      {message.message}
    </ul>
  );
}

export default MessageItem;
