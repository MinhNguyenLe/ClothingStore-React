import React, { useState, useEffect } from 'react'
import { ChatController } from 'chat-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { SET_NAME, SET_PRODUCT_WANT_TO_BUY } from '../redux/chatbot/Action';

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

    return productWantToBuy.options.map(product => product.value)
  }

  async protocol2(productWantToBuyRedux) {
    await this.createMessage.createQuestion(2, {
      ...this.paramsChatbot,
      productWantToBuy: productWantToBuyRedux
    })
    const confirm = await this.createMessage.createAnswer(2)

    return !!confirm.option.value
  }
}

export function mockQuestions(paramsFromEnv) {
  return [
    [
      [
        "text", "Hello, What's your name? (Please just input your name)"
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
    ]
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

  async function callbackProtocol(func, lifeCycleChatbot) {
    const switchCallback = await func();

    const confirm = await lifeCycleChatbot.protocol2(switchCallback);
    if (confirm) {
      return;
    } else {
      await callbackProtocol(func, lifeCycleChatbot)
    }
  }

  async function runLifeCycleChatbot(lifeCycleChatbot) {
    const nameRedux = await lifeCycleChatbot.protocol0();
    dispatch(SET_NAME(nameRedux));

    await callbackProtocol(async () => {
      const productWantToBuyRedux = await lifeCycleChatbot.protocol1(nameRedux);
      dispatch(SET_PRODUCT_WANT_TO_BUY(productWantToBuyRedux))

      return productWantToBuyRedux
    }, lifeCycleChatbot)
  }

  return { chatCtrl, runLifeCycleChatbot, callbackProtocol }
}

export default useChatbot