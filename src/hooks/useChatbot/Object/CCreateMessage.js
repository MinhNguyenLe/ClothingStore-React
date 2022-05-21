export default class CCreateMessage {
  constructor(chatCtrl) {
    this.chatCtrl = chatCtrl
  }

  async createQuestion(questions) {
    await questions.forEach(async (msg) => {
      await this.chatCtrl.addMessage({
        type: msg[0],
        content: msg[1],
      });
    })
  }

  async createAnswer(answer) {
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
