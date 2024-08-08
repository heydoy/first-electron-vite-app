export type dataType = {
  index: number,
  title: string,
  description: string,
  link: string,
}

const db: dataType[] = Array.from({ length: 200 }, (_, index) => ({
  index,
  title: `제목입니다. 순번 ${index}`,
  description: `설명입니다. ${(Math.random() * 100000).toFixed(0)}`,
  link: `list/${index}`
}))

export default db
