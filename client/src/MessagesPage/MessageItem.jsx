import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import axios from 'axios';

function MessageItem({message, incomingSender, user, messageReceived, deleteMessage}) {
  dayjs.extend(relativeTime);

  return (
    <div>
      <p>
        <span className="text-amber-500 font-bold">
          {message.senderName}
        </span>
      </p>
      <span>
        {message.message}
      </span>
      <p>
        <span className="text-xs">
          {dayjs(`${message.createdAt}`).fromNow()}
          ...
        </span>
        <button className="text-xs" type="button" onClick={() => deleteMessage(message._id)}>
          delete
        </button>
      </p>
    </div>
  );
}

export default MessageItem;
