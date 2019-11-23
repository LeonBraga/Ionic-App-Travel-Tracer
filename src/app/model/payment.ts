export interface Payment {
    id?: number,
    totalValue: number,
    status: "NAO_PAGO",
    userPayer: {
        id?: number,
        name: string,
        email: string
    },
    userReceiver?: {
        id?: number,
        name: string,
        email: string
    }
}