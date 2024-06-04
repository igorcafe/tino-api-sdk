import { TinoClient } from './src/index'

async function main() {
  const tino = new TinoClient("API_KEY")

  const data = await tino.createPaymentLink({
    merchant_document_number: "DOCUMENT_NUMBER",
    email: "EMAIL",
    external_id: "external_id",
    amount_cents: 1000,
    contact: {
      phone: "5511999999999",
      channel: "whatsapp"
    },
    cart: {
      address: "Endereço",
      zip_code: "11111111",
      items: [{}]
    },
  })

  console.log(data.purchaseIntentionLink)
}

main()