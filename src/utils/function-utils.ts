let timerId: ReturnType<typeof setTimeout> | null = null;
type FuncType = (...args: any[]) => void;

export function debounce(func: FuncType, delay: number): FuncType {
  return function (this: any, ...args: any[]) {
    // console.log(timerId)
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      func.apply(this, args);
      timerId = null;
    }, delay);
  };
}
