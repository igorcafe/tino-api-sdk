import axios, { Axios } from "axios"

export class TinoClient {
    apiKey: string
    http: Axios

    constructor(apiKey: string) {
        this.apiKey = apiKey
        this.http = axios.create({
            baseURL: "https://stg.supplier-api.truepay.com.br",
            headers: {
                "X-Api-Key": apiKey
            }
        })
    }

    async billLimitReservation(request: BillLimitReservationRequest): Promise<BillLimitReservationResponse> {
        const resp = await this.http.post<BillLimitReservationResponse>("/v2/limit-reservations/{limit_reservation_id}/bill")
        return resp.data
    }

    // TODO tratar erro
    async createPaymentLink(request: CreatePaymentLinkRequest): Promise<CreatePaymentLinkResponse> {
        const resp = await this.http.post<CreatePaymentLinkResponse>("/v1/payment-links", request)
        return resp.data
    }
}
type BillLimitReservationRequest = {
}

type BillLimitReservationResponse = {
    invoices: []
}

type CreatePaymentLinkRequest = {
    merchant_document_number: string
    email: string
    external_id: string
    amount_cents: number
    contact: {
        phone: string
        channel: string
    },
    cart: {
        address: string
        zip_code: string
        items: any[]
    }
}

type CreatePaymentLinkResponse = {
    purchaseIntentionLink: string
}

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