import React from 'react';
import styled from '@stream-io/styled-components';
import iconAddAttachment from '../images/icons/attach-icon.png';
import { themed } from '../styles/theme';
import PropTypes from 'prop-types';

const Container = styled.TouchableOpacity`
  margin-right: 5;
  ${({ theme }) => theme.messageInput.attachButton.css}
`;

const AttachButtonIcon = styled.Image`
  width: 17;
  height: 17;
  ${({ theme }) => theme.messageInput.attachButtonIcon.css}
`;

/**
 * UI Component for attach button in MessageInput component.
 *
 * @extends PureComponent
 * @example ./docs/AttachButton.md
 */
export const AttachButton = themed(
  class AttachButton extends React.PureComponent {
    static themePath = 'messageInput';
    static propTypes = {
      handleOnPress: PropTypes.func,
      disabled: PropTypes.bool,
    };
    static defaultProps = {
      disabled: false,
    };

    render() {
      const { handleOnPress, disabled } = this.props;
      return (
        <Container onPress={handleOnPress} disabled={disabled}>
          <AttachButtonIcon source={iconAddAttachment} />
        </Container>
      );
    }
  },
);
