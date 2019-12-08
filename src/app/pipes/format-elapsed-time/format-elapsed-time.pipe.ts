import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatElapsedTime'
})
export class FormatElapsedTimePipe implements PipeTransform {
  transform(value: string | number): string {
    return display(value);
  }
}

function pad(num: number | string, size: number) {
  let s = String(num);
  while (s.length < (size || 2)) {
    s = '0' + s;
  }
  return s;
}

function display(seconds: string | number) {
  const d = Number(seconds);
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);

  if (h > 0) {
    return `${pad(h, 2)}:${pad(m, 2)}:${pad(s, 2)}`;
  } else {
    return `${pad(m, 2)}:${pad(s, 2)}`;
  }
}
