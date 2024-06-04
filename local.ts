import { TinoClient } from "./src/index"

async function main() {
  const tino = new TinoClient("AIzaSyDlTnbL9-z5MgUQpTi-p1Ibsb0K-vvWGbU")

  const resp = await tino.getInvoices({
    externalId: "123"
  })

  console.log(resp)
}

main()