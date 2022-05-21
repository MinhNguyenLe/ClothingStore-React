import { useState, useEffect } from 'react'
import { ChatController } from 'chat-ui-react';

import CCreateMessage from "../Object/CCreateMessage"

import useRunLifeCycleChatbot from './useRunLifeCycleChatbot';

const useChatbot = () => {
  const [chatCtrl] = useState(new ChatController())

  useEffect(async () => {
    const createMessage = new CCreateMessage(chatCtrl)

    await useRunLifeCycleChatbot(createMessage);
  }, [])

  return { chatCtrl }
}

export default useChatbot