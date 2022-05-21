import { gotoLinkMsg, link, max, defaultParamsEnv } from "../common/enum"
import { createLinkToProducts, createListMsgsChatbot, random } from '../common/utils';

export default class CCreateMessage {
  constructor(chatCtrl) {
    this.chatCtrl = chatCtrl
  }

  async createQuestion(index, paramsFromEnv) {
    await mockQuestions(paramsFromEnv)[index].forEach(async (msg) => {
      await this.chatCtrl.addMessage({
        type: msg[0],
        content: msg[1],
      });
    })
  }

  async createAnswer(indexAnswer, paramsFromEnv) {
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

export function mockQuestions(paramsFromEnv = defaultParamsEnv) {
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

export function mockAnswers(paramsFromEnv = defaultParamsEnv) {
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