import { useState, useEffect } from 'react'
import { ChatController } from 'chat-ui-react';

import CCreateMessage from "../Object/CCreateMessage"
import CLifeCycleChatbot from "../Object/CLifeCycleChatbot"

import useContextChatbot from "./useContextChatbot"
import { defaultParamsEnv } from "../common/enum"
const useChatbot = () => {
  const [chatCtrl] = useState(new ChatController())

  useEffect(async () => {
    const createMessage = new CCreateMessage(chatCtrl)

    await runLifeCycleChatbot(createMessage);
  }, [])

  async function callbackProtocolLevel1(func, lifeCycleChatbot) {
    const switchCallback = await func(); // _productWantToBuyRedux

    const confirm = await lifeCycleChatbot.protocol2(switchCallback.map(product => product.text));
    if (confirm) {
      return switchCallback;
    } else {
      await callbackProtocolLevel1(func, lifeCycleChatbot)
    }
  }

  async function runLifeCycleChatbot(createMessage) {
    const state = {
      ...defaultParamsEnv
    }
    console.log("..............", state)
    const lifeCycleChatbot = new CLifeCycleChatbot(createMessage, state)

    const { dispatchChatbot, SET_NAME, SET_PRODUCT_WANT_TO_BUY } = useContextChatbot(state)

    const nameRedux = await lifeCycleChatbot.protocol0();
    dispatchChatbot(SET_NAME(nameRedux));

    // const productWantToBuyRedux = await callbackProtocolLevel1(async () => {
    //   const _productWantToBuyRedux = await lifeCycleChatbot.protocol1(state.name);
    //   dispatchChatbot(SET_PRODUCT_WANT_TO_BUY(_productWantToBuyRedux))

    //   return _productWantToBuyRedux
    // }, lifeCycleChatbot)

    // const isBuyAnother = await lifeCycleChatbot.protocol3(productWantToBuyRedux);

    // if (isBuyAnother) {
    //   location.reload()
    // };
    console.log("..............", state)
  }

  return { chatCtrl }
}

export default useChatbot