import React, { useEffect, useState } from 'react';
import { ChatController, MuiChat } from 'chat-ui-react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: '25px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  container: {
    textAlign: 'center',
    marginTop: '25px',
    marginBottom: '50px',
    height: "600px"
  },
  accordionStyle: {
    '&:hover': {
      background: '#6c7ae0',
      color: '#fff',
    },
  },
}));

const Chatbot = () => {
  const [chatCtrl, setChatCtrl] = useState(new ChatController())
  const classes = useStyles();

  useEffect(async () => {
    await chatCtrl.addMessage({
      type: 'text',
      content: `Hello, What's your name.`,
      self: false,
    });
    await chatCtrl.setActionRequest({ type: 'text' });
  }, [])

  return (
    <Container className={classes.container}>
      <MuiChat style={{ display: 'flex', justifyContent: 'space-between' }} chatController={chatCtrl} />
    </Container>
  );
}

export default Chatbot
