export type Nullable<T> = T | null | undefined

export type NullableProps<T> = {
  [prop in keyof T]: Nullable<T[prop]>
}
