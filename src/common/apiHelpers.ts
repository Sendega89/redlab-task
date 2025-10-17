
export const apiDelay = async (min: number, max?: number): Promise<void> => {
  const delay = max ? Math.floor(Math.random() * (max - min + 1)) + min : min
  await new Promise(resolve => setTimeout(resolve, delay))
}


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

export const handleFetchError = (response: Response, defaultMessage: string): void => {
  if (!response.ok) {
    throw new Error(defaultMessage)
  }
}

export const fetchWithErrorHandling = async <T>(
  url: string,
  errorMessage: string = 'Помилка завантаження даних'
): Promise<T> => {
  const response = await fetch(url)
  handleFetchError(response, errorMessage)
  return await response.json()
}

