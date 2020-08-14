import React from 'react';
import styled from '@stream-io/styled-components';
// import loadingGif from '../../images/loading.gif';
import iconDeliveredUnseen from '../../images/icons/icon_delivered.png';
import iconDeliveredSeen from '../../images/icons/icon_seen.png';

// import { Avatar } from '../Avatar';
import PropTypes from 'prop-types';
import moment from 'moment';

const Spacer = styled.View`
  height: 10;
`;

const StatusContainer = styled.View`
  width: 20;
  flex-direction: row;
  justify-content: center;
`;

const DeliveredContainer = styled.View`
  flex-direction: row;
  display: flex;
  align-items: center;
  height: 20;
  ${({ theme }) => theme.message.status.deliveredContainer.css};
`;

// const DeliveredCircle = styled.View`
//   width: 16;
//   height: 16;
//   border-radius: 16;
//   background-color: ${({ theme }) => theme.colors.primary};
//   align-items: center;
//   justify-content: center;
//   padding: 6px;
//   ${({ theme }) => theme.message.status.deliveredCircle.css};
// `;

const CheckMark = styled.Image`
  width: 10;
  height: 8;
  ${({ theme }) => theme.message.status.checkMark.css};
`;

const CheckMarkSecond = styled.Image`
  width: 10;
  height: 8;
  margin-left: -3;
  ${({ theme }) => theme.message.status.checkMark.css};
`;

const SendingContainer = styled.View`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.message.status.sendingContainer.css};
`;

// const SendingImage = styled.View`
//   height: 10;
//   width: 10;
//   ${({ theme }) => theme.message.status.sendingImage.css};
// `;

// const ReadByContainer = styled.View`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   ${({ theme }) => theme.message.status.readByContainer.css};
// `;

export const MessageStatus = ({
  client,
  readBy,
  message,
  threadList,
  channel,
}) => {
  const read = Object.keys(channel.state.read)
    .filter((k) => k !== client.user.id)
    .map((k) => channel.state.read[k])
    .filter((u) =>
      moment(u.last_read).isSameOrAfter(moment(message.updated_at)),
    )
    .map((u) => u.user);

  const renderStatus = () => {
    const justReadByMe = readBy.length === 1 && readBy[0].id === client.user.id;

    const isPhoneContact =
      channel.data?.isSingleChat && channel?.data?.phoneContacts?.length === 1;
    if (message.status === 'sending') {
      return (
        <SendingContainer>
          <CheckMark source={iconDeliveredUnseen} />
          {/* <SendingImage source={loadingGif} /> */}
        </SendingContainer>
      );
    } else if (
      read.length === channel.data.member_count - 1 &&
      !threadList &&
      !justReadByMe &&
      channel.data.isSingleChat === true &&
      !isPhoneContact
    ) {
      // const lastReadUser = readBy.filter(
      //   (item) => item.id !== client.user.id,
      // )[0];
      return (
        <DeliveredContainer>
          <CheckMark source={iconDeliveredSeen} />
          <CheckMarkSecond source={iconDeliveredSeen} />
        </DeliveredContainer>
        // <ReadByContainer>
        //   <Avatar
        //     name={lastReadUser.name || lastReadUser.id}
        //     image={lastReadUser.image}
        //     size={16}
        //   />
        // </ReadByContainer>
      );
    } else if (
      message.status === 'received' &&
      message.type !== 'ephemeral' &&
      !threadList
    ) {
      return (
        <DeliveredContainer>
          <CheckMark source={iconDeliveredUnseen} />
          <CheckMarkSecond source={iconDeliveredUnseen} />
        </DeliveredContainer>
      );
    } else {
      return <Spacer />;
    }
  };

  return <StatusContainer>{renderStatus()}</StatusContainer>;
};

MessageStatus.propTypes = {
  /** @see See [Channel Context](https://getstream.github.io/stream-chat-react-native/#channelcontext) */
  client: PropTypes.object,
  /** A list of users who have read the message */
  readBy: PropTypes.array,
  /** Current [message object](https://getstream.io/chat/docs/#message_format) */
  message: PropTypes.object,
  /** Latest message id on current channel */
  lastReceivedId: PropTypes.string,
  /** Boolean if current message is part of thread */
  isThreadList: PropTypes.bool,
};
