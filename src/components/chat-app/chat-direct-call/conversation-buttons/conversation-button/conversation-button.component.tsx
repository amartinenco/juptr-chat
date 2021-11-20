import React from 'react';
import conversationButtonStyles from './conversation-button.styles';

interface Props {
  onClickHandler: () => void;
}

const ConversationButton: React.FC<Props> = (props) => {
  const onClickHandler = props.onClickHandler;
  const classes = conversationButtonStyles();

  return (
    <button className={classes.button} onClick={onClickHandler}>
      {props.children}
    </button>
  );
}

export default ConversationButton;