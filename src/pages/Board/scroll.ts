export function scroll() {
  const column = document.querySelector('.current-column') as HTMLElement;
  const column1 = column ? column.offsetTop : 0;
  const column2 = column ? column.offsetLeft - column.clientWidth / 2 : 0;
  for (let i = 0; i < column2; i += 10) {
    setTimeout(() => document.querySelector('.board__list')?.scrollTo(i, column1), 100);
  }
  const task = document.querySelector('.current-task') as HTMLElement;
  const task1 = task ? task.offsetTop : 0;
  const task2 = task ? task.offsetLeft : 0;
  for (let i = 0; i < task1; i++) {
    setTimeout(() => document.querySelector('.column-scroll')?.scrollTo(task2, i), 100);
  }
}
