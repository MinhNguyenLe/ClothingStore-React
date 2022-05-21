export default class CLifeCycleChatbot {
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