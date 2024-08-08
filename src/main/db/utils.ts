const delay = (time = 500): Promise<void> =>
  new Promise<void>((r) => {
    setTimeout(() => r(), time)
  })

export { delay }
