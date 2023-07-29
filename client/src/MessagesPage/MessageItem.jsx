import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

function MessageItem({message, incomingSender, user, messageReceived}) {
  dayjs.extend(relativeTime);
  // if message is incoming, display on left, if outgoing display right
  // let display;
  // const updateView = (message) => {
  //   // determine who message is from
  //   if (message.name === user) {

  //   }
  // }

  // if theres a new message, display this
  // const newDisplay = () => {
  //   // determine if new message
  //   if (messageReceived !== '') {
  //     return 'just now!';
  //   }
  // };

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
        </span>
      </p>
    </div>
  );
}

export default MessageItem;
