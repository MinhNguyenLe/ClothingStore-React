import React, { useState, useMemo } from 'react'
import { ChatController } from 'chat-ui-react';

export class CCreateMessage {
  constructor(chatCtrl) {
    this.chatCtrl = chatCtrl
  }

  async createQuestion(index) {
    await mockQuestions[index].forEach(async (msg) => {
      await this.chatCtrl.addMessage({
        type: msg[0],
        content: msg[1],
      });
    })
  }

  async createAnswer(indexAnswer) {
    const answer = mockAnswers[indexAnswer]

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

const mockQuestions = [
  [
    [
      "text", "Hello, What's your name. 111111111,"
    ]
  ],
  [
    [
      "text", "Hello, What's your name.2222222222222222,"
    ],
    [
      "text", "Hello, What's your name.3333333333,"
    ],
  ]
]

const mockAnswers = [
  [
    "text"
  ],
  [
    "multi-select",
    [
      {
        value: 'a',
        text: 'A',
      },
      {
        value: 'b',
        text: 'B',
      },
    ]
  ]
]

const useChatbot = () => {
  const [chatCtrl] = useState(new ChatController())

  useMemo(async () => {
    const createMessage = new CCreateMessage(chatCtrl)

    await createMessage.createQuestion(0)

    const name = await createMessage.createAnswer(0)

    await createMessage.createQuestion(1)

    const test = await createMessage.createAnswer(1)

    console.log(name, test)
  }, [chatCtrl])

  return { chatCtrl }
}

export default useChatbot