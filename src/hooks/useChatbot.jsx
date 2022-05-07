import React, { useState, useMemo } from 'react'
import { ChatController } from 'chat-ui-react';

/**
 * arrQuestions [
 * ["type1","content1"],["type2",[options2]],,..
 * ]
 */
export async function createQuestions(chatCtrl, arrQuestions) {
  await arrQuestions.forEach(async (msg) => {
    await chatCtrl.addMessage({
      type: msg[0],
      content: msg[1],
    });
  })
}

export class CCreateAnswer {
  constructor(chatCtrl) {
    this.chatCtrl = chatCtrl
  }

  async create(indexAnswer) {
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

const mockArrQuestions = [
  [
    "text", "Hello, What's your name.2222222222222222,"
  ],
  [
    "text", "Hello, What's your name.3333333333,"
  ],
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
    const createAnswer = new CCreateAnswer(chatCtrl)

    await chatCtrl.addMessage({
      type: 'text',
      content: `Hello, What's your name.`,
    });

    const name = await createAnswer.create(0)

    await createQuestions(chatCtrl, mockArrQuestions)

    const test = await createAnswer.create(1)

    console.log(name, test)
  }, [chatCtrl])

  return { chatCtrl }
}

export default useChatbot