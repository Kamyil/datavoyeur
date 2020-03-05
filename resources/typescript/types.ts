export interface WindowObjectWithDataLayer extends Window {
    dataLayer: DatalayerEvent[]
}

declare let window: WindowObjectWithDataLayer;

export type DatalayerEvent = {
    id: number,
    /** The event name */
    event: string,
    ecommerce?: Object
}