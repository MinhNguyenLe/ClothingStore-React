import CLifeCycleChatbot from '../Object/CLifeCycleChatbot';

import useContextChatbot from './useContextChatbot';
import { defaultParamsEnv, locationCallback } from '../common/enum';

async function useRunLifeCycleChatbot(createMessage) {
  const state = {
    ...defaultParamsEnv,
  };
  const lifeCycleChatbot = new CLifeCycleChatbot(createMessage);
  const { dispatchChatbot, SET_NAME, SET_PRODUCT_WANT_TO_BUY } =
    useContextChatbot(state);

  const runLifeCycle = async (_locationCallback = locationCallback) => {
    if (1 > _locationCallback) {
      const nameRedux = await lifeCycleChatbot.askName();
      dispatchChatbot(SET_NAME(nameRedux));
    }

    if (2 > _locationCallback) {
      const _productWantToBuyRedux = await lifeCycleChatbot.askProductWantToBuy(
        state.name
      );
      dispatchChatbot(SET_PRODUCT_WANT_TO_BUY(_productWantToBuyRedux));
    }

    if (3 > _locationCallback) {
      const confirm = await lifeCycleChatbot.confirmAnswer(
        state.productWantToBuy.map((product) => product.text)
      );
      if (!confirm) {
        await runLifeCycle(1);
      }
    }

    if (4 > _locationCallback) {
      const isBuyAnother = await lifeCycleChatbot.sendLinkToProduct(
        state.productWantToBuy
      );
      if (isBuyAnother) {
        await runLifeCycle(1);
      };
    }
  }

  await runLifeCycle();
}

export default useRunLifeCycleChatbot;
