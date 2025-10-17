/**
 * Створює затримку для симуляції API запиту
 * @param min - мінімальна затримка в мс
 * @param max - максимальна затримка в мс (опціонально)
 */
export const apiDelay = async (min: number, max?: number): Promise<void> => {
  const delay = max ? Math.floor(Math.random() * (max - min + 1)) + min : min
  await new Promise(resolve => setTimeout(resolve, delay))
}

/**
 * Обгортка для обробки помилок RTK Query
 */
export const createApiErrorHandler = <T>(
  apiCall: () => Promise<T>,
  errorMessage: string = 'Помилка запиту'
) => {
  return async () => {
    try {
      const data = await apiCall()
      return { data }
    } catch (error) {
      return {
        error: {
          status: 'CUSTOM_ERROR',
          error: error instanceof Error ? error.message : errorMessage
        }
      }
    }
  }
}

/**
 * Обробник помилок для стандартних fetch запитів
 */
export const handleFetchError = (response: Response, defaultMessage: string): void => {
  if (!response.ok) {
    throw new Error(defaultMessage)
  }
}

/**
 * Загальна функція для fetch з обробкою помилок
 */
export const fetchWithErrorHandling = async <T>(
  url: string,
  errorMessage: string = 'Помилка завантаження даних'
): Promise<T> => {
  const response = await fetch(url)
  handleFetchError(response, errorMessage)
  return await response.json()
}

