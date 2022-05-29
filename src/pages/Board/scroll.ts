export function scroll() {
  const column = document.querySelector('.current-column') as HTMLElement;
  const column1 = column ? column?.offsetTop : 0;
  const column2 = column ? column?.offsetLeft - column.clientWidth / 2 : 0;
  const columnList = document.querySelector('.board__list');
  for (let i = 0; i < column2; i += 1) {
    setTimeout(() => columnList?.scrollTo(i, column1), 100);
  }
  const task = document.querySelector('.current-task') as HTMLElement;
  const taskScrolElement = document.querySelector('.column-scroll');
  const task1 = task ? task.offsetTop : 0;
  const task2 = task ? task.offsetLeft : 0;
  for (let i = 0; i < task1; i++) {
    setTimeout(() => taskScrolElement?.scrollTo(task2, i), 100);
  }
}
