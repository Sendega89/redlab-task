import type { UserType } from '@/types/UserTypes'
import { apiDelay, fetchWithErrorHandling } from '@/common/apiHelpers'

export const fetchUserFromAPI = async (): Promise<UserType> => {
  await apiDelay(300)
  
  return await fetchWithErrorHandling<UserType>(
    '/user.json',
    'Помилка завантаження даних користувача'
  )
}

