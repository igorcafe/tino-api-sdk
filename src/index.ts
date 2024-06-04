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

    async getInvoices(request: GetInvoicesRequest): Promise<GetInvoicesResponse> {
        const { data } = await this.http.get<GetInvoicesResponse>(
            `/v2/invoices?external_id=${request.externalInvoiceId}`,
        )
        return data
    }

    async editInvoice(request: EditInvoiceRequest): Promise<void> {
        await this.http.patch(`/v1/invoices/${request.externalInvoiceId}`, {
            amountCents: request.amountCents
        })
    }

    async cancelInvoice(request: CancelInvoiceRequest): Promise<void> {
        await this.http.delete(`/v1/invoices/${request.externalInvoiceId}`)
    }
}

type GetInvoicesRequest = {
    externalInvoiceId: string
}

type GetInvoicesResponse = {
    invoices: Invoice[]
}

type EditInvoiceRequest = {
    externalInvoiceId: string
    amountCents: number
}

type CancelInvoiceRequest = {
    externalInvoiceId: string
}

type Invoice = {
    externalId: string;
    amountCents: number;
    originalAmountCents: number;
    status: string;
}

