import axios, { Axios } from "axios"

class TinoClient {
    apiKey: string
    http: Axios

    // TODO: env stg/prd
    constructor(apiKey: string) {
        this.apiKey = apiKey
        this.http = axios.create({
            baseURL: "https://stg.supplier-api.truepay.com.br",
            headers: {
                "Authorization": `Bearer ${apiKey}`
            }
        })
    }

    async billLimitReservation(request: BillLimitReservationRequest): Promise<BillLimitReservationResponse> {
        const resp = await this.http.post<BillLimitReservationResponse>("/v2/limit-reservations/{limit_reservation_id}/bill")
        return resp.data
    }
}
type BillLimitReservationRequest = {
}

type BillLimitReservationResponse = {
    invoices: []
}

async function main() {
    const tino = new TinoClient("AIzaSyDlTnbL9-z5MgUQpTi-p1Ibsb0K-vvWGbU")
    const { invoices } = await tino.billLimitReservation({})
}

main()