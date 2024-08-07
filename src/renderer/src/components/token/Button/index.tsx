import styled from 'styled-components'

// ``백틱으로 넣으면 함수안에 스트링 형태로 파싱되서 들어간다고.
// `` 백틱 넣으면 똑같이 ${} 로 동적으로 스타일 바꿔줄 수 있다.
//  all: unset; 은 각 브라우저마다 기본으로 적용되어 있는 스타일을 초기화시킨다.
// 참고: https://inpa.tistory.com/entry/CSS-📚-all-속성-기본-디자인-리셋#
// 보통은 초기화할 때 global css 에 all:unset을 세팅해주는데 이 프로젝트 구조자체에서 스타일을 적용할만한 데가 안 보여서.

const Button = styled.button`
  all: unset;
  cursor: pointer;
`

export default Button
