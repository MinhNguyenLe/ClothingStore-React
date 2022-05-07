import React from 'react';
import { MuiChat } from 'chat-ui-react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import useChatbot from "../../hooks"

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
  const classes = useStyles();
  const { chatCtrl } = useChatbot()

  return (
    <Container className={classes.container}>
      <MuiChat style={{ display: 'flex', justifyContent: 'space-between' }} chatController={chatCtrl} />
    </Container>
  );
}

export default Chatbot
