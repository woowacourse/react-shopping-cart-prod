const deepEqual = (obj1: any, obj2: any) => {
  // 둘다 null 이 아니고 같은 타입입과 값을 가졌을 경우 true 반환
  if (obj1 === obj2) return true;

  // 비교대상 두개의 obj 가 null 이거나 object 가 아닐 경우 false 반환
  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) return false;

  // 두개의 obj 의 property 갯수가 다를 경우 false 반환
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  // 각 property 의 key 와 value 가 같은지 확인
  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) return false;
  }

  return true;
};

export default deepEqual;
