import React from 'react';
import styled from '@stream-io/styled-components';
import { withTranslationContext } from '../context';

const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 10;
  ${({ theme }) => theme.messageList.messageSystem.container.css}
`;

const TextContainer = styled.View`
  margin-top: 10;
  flex: 3;
  ${({ theme }) => theme.messageList.messageSystem.textContainer.css}
`;

const Text = styled.Text`
  text-align: center;
  font-weight: 700;
  font-size: 14;
  opacity: 1;
  color: rgba(99, 99, 99, 1);
  ${({ theme }) => theme.messageList.messageSystem.text.css}
`;

/**
 * A component to display system message. e.g, when someone updates the channel,
 * they can attach a message with that update. That message will be available
 * in message list as (type) system message.
 */
const MessageSystem = ({ message }) => (
  <Container>
    {/* <Line /> */}
    <TextContainer>
      <Text>{message.text}</Text>
      {/* <DateText>{tDateTimeParser(message.created_at).calendar()}</DateText> */}
    </TextContainer>
    {/* <Line /> */}
  </Container>
);

const MessageSystemWithContext = withTranslationContext(MessageSystem);
export { MessageSystemWithContext as MessageSystem };
