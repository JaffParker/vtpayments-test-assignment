export interface Action<TypeEnum> {
  type: TypeEnum
}

export interface ActionWithPayload<TypeEnum, Payload> {
  type: TypeEnum
  payload: Payload
}
