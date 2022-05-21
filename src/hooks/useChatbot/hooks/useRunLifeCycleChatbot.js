import CLifeCycleChatbot from '../Object/CLifeCycleChatbot';

import useContextChatbot from './useContextChatbot';
import { defaultParamsEnv } from '../common/enum';

async function callbackProtocolLevel1(func, lifeCycleChatbot) {
  const switchCallback = await func(); // _productWantToBuyRedux

  const confirm = await lifeCycleChatbot.confirmAnswer(
    switchCallback.map((product) => product.text)
  );
  if (confirm) {
    return switchCallback;
  } else {
    await callbackProtocolLevel1(func, lifeCycleChatbot);
  }
}

async function useRunLifeCycleChatbot(createMessage) {
  const state = {
    ...defaultParamsEnv,
  };
  console.log('..............', state);
  const lifeCycleChatbot = new CLifeCycleChatbot(createMessage);

  const { dispatchChatbot, SET_NAME, SET_PRODUCT_WANT_TO_BUY } =
    useContextChatbot(state);

  const nameRedux = await lifeCycleChatbot.askName();
  dispatchChatbot(SET_NAME(nameRedux));

  const productWantToBuyRedux = await callbackProtocolLevel1(async () => {
    const _productWantToBuyRedux = await lifeCycleChatbot.askProductWantToBuy(
      state.name
    );
    dispatchChatbot(SET_PRODUCT_WANT_TO_BUY(_productWantToBuyRedux));

    return _productWantToBuyRedux;
  }, lifeCycleChatbot);

  const isBuyAnother = await lifeCycleChatbot.sendLinkToProduct(
    productWantToBuyRedux
  );

  // if (isBuyAnother) {
  //   location.reload()
  // };

  console.log('..............', state);
}

export default useRunLifeCycleChatbot;
