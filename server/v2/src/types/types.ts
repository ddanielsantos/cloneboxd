type HardCoded = number[] | string[] | Date[]

// if array of something -> array of string
// if number -> number, otherwise string
export type BetaMongoose2GQLInput<T> = {
  [P in keyof T]: T[P] extends HardCoded
  ? string[]
  : T[P] extends number
  ? T[P]
  : string
}
