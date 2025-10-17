/**
 * Прокручивает страницу вверх
 * @param behavior - тип скролла ('auto' | 'smooth')
 */
export const scrollToTop = (behavior: ScrollBehavior = 'auto'): void => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior
  });
};

/**
 * Прокручивает к определенной позиции
 * @param top - позиция по вертикали
 * @param behavior - тип скролла ('auto' | 'smooth')
 */
export const scrollToPosition = (top: number, behavior: ScrollBehavior = 'smooth'): void => {
  window.scrollTo({
    top,
    left: 0,
    behavior
  });
};

/**
 * Прокручивает к элементу
 * @param element - DOM элемент или селектор
 * @param behavior - тип скролла ('auto' | 'smooth')
 */
export const scrollToElement = (element: HTMLElement | string, behavior: ScrollBehavior = 'smooth'): void => {
  const targetElement = typeof element === 'string' 
    ? document.querySelector(element) 
    : element;

  if (targetElement) {
    targetElement.scrollIntoView({ behavior, block: 'start' });
  }
};

