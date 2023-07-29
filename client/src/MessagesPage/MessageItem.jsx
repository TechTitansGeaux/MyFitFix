import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

function MessageItem({message}) {
dayjs.extend(relativeTime);

  return (
    <div>
      <p>
        <span>
          {message.senderName}
          :
        </span>
        <span>
        {message.message}
        </span>
       {dayjs(`${message.createdAt}`).fromNow()}
      </p>
    </div>
  );
}

export default MessageItem;
