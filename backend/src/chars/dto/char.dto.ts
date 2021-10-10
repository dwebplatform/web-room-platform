

export class charDto {
  id: number;
  type: string;
  ARRAY_VALUE: string[];
  STRING_VALUE: string;
  BOOL_VALUE: number;
  keyName: string;
}

export function charToDto(c:any):charDto{
  let copy = {...c};
  copy.ARRAY_VALUE = JSON.parse(copy.ARRAY_VALUE);
  return copy;
}