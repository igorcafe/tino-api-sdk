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
