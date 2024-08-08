export type DataType = {
  index: number
  title: string
  description: string
  link: string
}

// Array.from()으로 200개의 요소를 가진 배열 생성
// Array.from(arrayLike[, mapFn[, thisArg]])
// arrayLike: 배열로 변환하고자 하는 유사 배열 객체나 반복 가능한 객체
// mapFn (선택적): 배열의 모든 요소에 대해 호출할 맵핑 함수
// thisArg (선택적): mapFn 실행 시 this로 사용될 값
// const arr = Array.from({length: 5}, (_, i) => i); // [0, 1, 2, 3, 4]
const db: DataType[] = Array.from({ length: 200 }, (_, index) => ({
  index,
  title: `제목입니다. 순번 ${index}`,
  description: `설명입니다. ${(Math.random() * 100000).toFixed(0)}`,
  link: `list/${index}`
}))

export default db
