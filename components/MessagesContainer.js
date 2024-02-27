import React, { useState } from 'react';
import { View } from 'react-native';
import MessageBubble from './MessageBubble';

const MessagesContainer = () => {
  const [selectedMessageId, setSelectedMessageId] = useState(null);

  // Dummy data for messages
  const messages = [
    { id: 'msg1', text: 'Touch grass bro.' },
    { id: 'msg2', text: 'Initiate a tactile lawn inspection.' },
    { id: 'msg3', text: "You're in last place, put the phone down." },
    { id: 'msg4', text: 'Perhaps you might benefit from a tactile reunion with natures carpet.' },
    { id: 'msg5', text: 'Engage in an organic surface encounter.' },
    { id: 'msg6', text: "Undertake a tactile audit of the earth's exterior layer." },
    { id: 'msg7', text: 'Activate your primal ground sensors.' },
    { id: 'msg8', text: 'Eyes up, screens down.' },
    { id: 'msg9', text: "If you ain't first, you're last. (You're last)" },
  ];

  return (
    <View>
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message.text}
          isSelected={message.id === selectedMessageId}
          onPress={() => setSelectedMessageId(message.id)}
        />
      ))}
    </View>
  );
};

export default MessagesContainer;