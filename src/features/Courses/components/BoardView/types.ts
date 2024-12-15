export type ClientContent = {
  clientName: string
  clientCountry: string
  clientBillingProgress: number
  clientBillingAmount: number
  clientBillingCurrency: string
  clientAvatar: string
}

export type Client = {
  id: string
  content: ClientContent
}

export type Column = {
  id: string
  title: string
  clientIds: string[]
}

export type Data = {
  clients: { [key: string]: Client }
  columns: { [key: string]: Column }
  columnOrder: string[]
}

// Example usage with initialData
