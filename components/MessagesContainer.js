import React, { useState } from 'react';
import { View } from 'react-native';
import MessageBubble from './MessageBubble';
import tw from 'twrnc';

const MessagesContainer = () => {
  const [selectedMessageId, setSelectedMessageId] = useState(null);

  // Dummy data for messages
  const messages = [
    { id: 'msg1', text: 'Touch grass bro.' },
    { id: 'msg2', text: 'Initiate lawn inspection.' },
    { id: 'msg3', text: "You're in last place..." },
    { id: 'msg4', text: 'Perhaps you might benefit from a tactile reunion with natures carpet.' },
    { id: 'msg5', text: 'Engage in an organic surface encounter.' },
    { id: 'msg6', text: "Undertake an audit of the earth's exterior layer." },
    { id: 'msg7', text: 'Activate your primal ground sensors.' },
    { id: 'msg8', text: 'Eyes up, screens down.' },
    { id: 'msg9', text: "If you ain't first, you're last." },
    { id: 'msg10', text: "Ooga booga" },
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