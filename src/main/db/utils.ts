const delay = (time = 500) => new Promise<void>((r) => {
  setTimeout(() => r(), time)
})

export { delay }
