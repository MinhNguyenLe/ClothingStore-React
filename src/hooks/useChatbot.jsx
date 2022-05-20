import React, { useState, useEffect } from 'react'
import { ChatController } from 'chat-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { SET_NAME, SET_PRODUCT_WANT_TO_BUY } from '../redux/chatbot/Action';
import { createLinkToProducts, createListMsgsChatbot, random } from '../utils/chatbot';

const gotoLinkMsg = "Buy in link ";
const link = "http://localhost:3000/product/"
const max = 10

export class CCreateMessage {
  constructor(chatCtrl, defaultParamsFromEnv) {
    this.chatCtrl = chatCtrl,
      this.defaultParamsFromEnv = defaultParamsFromEnv
  }

  async createQuestion(index, paramsFromEnv = this.defaultParamsFromEnv) {
    await mockQuestions(paramsFromEnv)[index].forEach(async (msg) => {
      await this.chatCtrl.addMessage({
        type: msg[0],
        content: msg[1],
      });
    })
  }

  async createAnswer(indexAnswer, paramsFromEnv = this.defaultParamsFromEnv) {
    const answer = mockAnswers(paramsFromEnv)[indexAnswer]

    if (answer.length === 1)
      return await this.chatCtrl.setActionRequest({
        type: answer[0],
      });
    else return await this.chatCtrl.setActionRequest({
      type: answer[0],
      options: answer[1],
    });
  }
}

export class CLifeCycleChatbot {
  constructor(createMessage, paramsChatbot) {
    this.createMessage = createMessage,
      this.paramsChatbot = paramsChatbot
  }

  async protocol0() {
    await this.createMessage.createQuestion(0)
    const name = await this.createMessage.createAnswer(0)

    return name.value
  }

  async protocol1(nameRedux) {
    await this.createMessage.createQuestion(1, {
      ...this.paramsChatbot,
      name: nameRedux
    })
    const productWantToBuy = await this.createMessage.createAnswer(1)

    return productWantToBuy.options
  }

  async protocol2(productWantToBuyRedux) {
    await this.createMessage.createQuestion(2, {
      ...this.paramsChatbot,
      productWantToBuy: productWantToBuyRedux
    })
    const confirm = await this.createMessage.createAnswer(2)

    return !!confirm.option.value
  }

  async protocol3(productWantToBuyRedux) {
    await this.createMessage.createQuestion(3, {
      ...this.paramsChatbot,
      productWantToBuy: productWantToBuyRedux
    })
    productWantToBuyRedux.forEach((msg) => {
      window.open(link + msg.value + random(max));
    })

    return await this.createMessage.createAnswer(3)
  }
}

export function mockQuestions(paramsFromEnv) {
  return [
    [
      [
        "text", "Hello, What's your name?"
      ]
    ],
    [
      [
        "text", `Hello, ${paramsFromEnv.name}`
      ],
      [
        "text", "What do you want to buy in my store?"
      ],
    ],
    [
      [
        "text", `OK, you want to buy ${paramsFromEnv.productWantToBuy.toString()}`
      ],
      [
        "text", "Please confirm it!"
      ]
    ],
    createListMsgsChatbot(createLinkToProducts(paramsFromEnv.productWantToBuy.map(product => product.value), max), gotoLinkMsg, link)
  ]
}

export function mockAnswers(paramsFromEnv) {
  return [
    [
      "text"
    ],
    [
      "multi-select",
      [
        {
          value: 'woman_product_',
          text: `Woman's outfit`,
        },
        {
          value: 'man_product_',
          text: `Man's outfit`,
        },
        {
          value: 'bag_product_',
          text: 'Bag',
        },
        {
          value: 'shoes_product_',
          text: 'Shoes',
        },
        {
          value: 'watches_product_',
          text: 'Watches',
        },
      ]
    ],
    [
      "select",
      [
        {
          value: '-',
          text: 'Yes'
        },
        {
          value: '',
          text: 'No'
        },
      ]
    ],
    [
      "multi-select",
      [
        {
          value: 'buy_another',
          text: `Buy another`,
        }
      ]
    ],
  ]
}

const useChatbot = () => {
  const paramsChatbot = useSelector(state => state.chatbotReducer)
  const dispatch = useDispatch()

  const [chatCtrl] = useState(new ChatController())

  useEffect(async () => {
    const createMessage = new CCreateMessage(chatCtrl, paramsChatbot)

    const lifeCycleChatbot = new CLifeCycleChatbot(createMessage, paramsChatbot)

    await runLifeCycleChatbot(lifeCycleChatbot);
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

  async function runLifeCycleChatbot(lifeCycleChatbot) {
    const nameRedux = await lifeCycleChatbot.protocol0();
    dispatch(SET_NAME(nameRedux));

    const productWantToBuyRedux = await callbackProtocolLevel1(async () => {
      const _productWantToBuyRedux = await lifeCycleChatbot.protocol1(nameRedux);
      dispatch(SET_PRODUCT_WANT_TO_BUY(_productWantToBuyRedux))

      return _productWantToBuyRedux
    }, lifeCycleChatbot)

    const isBuyAnother = await lifeCycleChatbot.protocol3(productWantToBuyRedux);

    if (isBuyAnother) {
      location.reload()
    };
  }

  return { chatCtrl }
}

export default useChatbot