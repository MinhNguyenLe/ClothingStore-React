import { gotoLinkMsg, link, max } from '../common/enum';
import {
  createLinkToProducts,
  createListMsgsChatbot,
  random,
} from '../common/utils';

export default class CLifeCycleChatbot {
  constructor(createMessage) {
    this.createMessage = createMessage;
  }

  async askName() {
    await this.createMessage.createQuestion([
      ['text', "Hello, What's your name?"],
    ]);
    const name = await this.createMessage.createAnswer(['text']);

    return name.value;
  }

  async askProductWantToBuy(nameRedux) {
    await this.createMessage.createQuestion([
      ['text', `Hello, ${nameRedux}`],
      ['text', 'What do you want to buy in my store?'],
    ]);
    const productWantToBuy = await this.createMessage.createAnswer([
      'multi-select',
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
      ],
    ]);

    return productWantToBuy.options;
  }

  async confirmAnswer(productWantToBuyRedux) {
    await this.createMessage.createQuestion([
      ['text', `OK, you want to buy ${productWantToBuyRedux.toString()}`],
      ['text', 'Please confirm it!'],
    ]);
    const confirm = await this.createMessage.createAnswer([
      'select',
      [
        {
          value: '-',
          text: 'Yes',
        },
        {
          value: '',
          text: 'No',
        },
      ],
    ]);

    return !!confirm.option.value;
  }

  async sendLinkToProduct(productWantToBuyRedux) {
    await this.createMessage.createQuestion(
      createListMsgsChatbot(
        createLinkToProducts(
          productWantToBuyRedux.map((product) => product.value),
          max
        ),
        gotoLinkMsg,
        link
      )
    );
    // productWantToBuyRedux.forEach((msg) => {
    //   window.open(link + msg.value + random(max));
    // })

    return await this.createMessage.createAnswer([
      'multi-select',
      [
        {
          value: 'buy_another',
          text: `Buy another`,
        },
      ],
    ]);
  }
}
