//eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const pipe = (...rules: Array<Function | undefined>) => (
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  values: Record<string, any>,
): string | undefined => {
  const errors = rules
    .filter(rule => rule)
    .reduce(
      //@ts-ignore
      (errors, rule: Function) => [...errors, rule(value, values) || undefined],
      [],
    )
    //@ts-ignore
    .filter(error => error)

  return errors.length ? errors[0] : undefined
}
