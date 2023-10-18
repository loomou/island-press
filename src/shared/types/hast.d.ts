import 'hast'

declare module 'hast' {
  interface Data {
    isVisited?: boolean | undefined
  }
}
