export default interface FilterInterface {
  ids: string[],
  key: string,
  title: string,
  values: {
    value: string,
    ids: string[]
  }[]
}
