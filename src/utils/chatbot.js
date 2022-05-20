export function random(max) {
  return Math.floor(Math.random() * max)
}

export function createLinkToProducts(products, max) {
  let links = []

  products.forEach((product) => {
    links.push(product + random(max))
  })

  return links
}

export function createListMsgsChatbot(msgs, subMsg, link) {
  return msgs.map((msg) => ["text", subMsg + link + msg])
}