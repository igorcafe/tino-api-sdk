import axios, { AxiosInstance } from "axios"

export class TinoClient {
    private http: AxiosInstance

    constructor(apiKey: string) {
        this.http = axios.create({
            baseURL: "https://stg.supplier-api.truepay.com.br",
            headers: {
                "X-Api-Key": apiKey
            }
        })
    }

    async getInvoices(request: GetInvoicesRequest): Promise<GetInvoicesResponse> {
        const { data } = await this.http.get<GetInvoicesResponse>(
            `/v2/invoices?externalId=${request.externalInvoiceId}`,
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

    async cancelReservation(request: CancelReservationRequest): Promise<void> {
        await this.http.delete(`/v1/payment-reservations/${request.reservationId}`)
    }

    async partialBillReservation(request: PartialBillReservationRequest): Promise<PartialBillReservationResponse> {
        const { data } = await this.http.post<PartialBillReservationResponse>(`/v2/limit-reservations/${request.reservationId}/partial-bill`, {
            nfes: request.nfes,
            lastBatch: request.lastBatch
        })
        return data
    }

    async billReservation(request: BillReservationRequest): Promise<BillReservationResponse> {
        const { data } = await this.http.post<BillReservationResponse>(`/v1/payment-reservations/${request.reservationId}/bill`, {
            nfes: request.nfes
        })
        return data
    }

    async getReservation(request: GetReservationRequest): Promise<GetReservationResponse> {
        const { data } = await this.http.get<GetReservationResponse>(
            `/v1/payment-reservations/${request.externalId}`,
        )
        return data
    }
}

export type GetInvoicesRequest = {
    externalInvoiceId: string
}

export type GetInvoicesResponse = {
    invoices: Invoice[]
}

export type EditInvoiceRequest = {
    externalInvoiceId: string
    amountCents: number
}

export type CancelInvoiceRequest = {
    externalInvoiceId: string
}

export type CancelReservationRequest = {
    reservationId: string
}

export type PartialBillReservationRequest = {
    reservationId: string
    lastBatch: boolean
    nfes: Nfe[]
}


export type PartialBillReservationResponse = {
    invoices: Invoice[]
}

export type BillReservationRequest = {
    reservationId: string
    nfes: Nfe[]
}

export type BillReservationResponse = {
    invoices: Invoice[]
}

export type GetReservationRequest = {
    externalId: string
}

export type GetReservationResponse = {
    reservation: Reservation
}

export type Reservation = {
    id: string
    amountCents: number
    externalId: string
    merchantDocumentNumber: string
}

export type Nfe = {
    data: string
    amountCents: number
    externalId: string
    notes: string
}

export type Invoice = {
    externalId: string;
    amountCents: number;
    originalAmountCents: number;
    status: string;
    description: string;
    installments: Installment[]
}

export type Installment = {
    amountCents: number;
    settlementDate: string;
}

