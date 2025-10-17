import type { UserType } from '../types/UserTypes';

export const fetchUserFromAPI = async (): Promise<UserType> => {
  const delay = 300; // 300 мс
  
  await new Promise(resolve => setTimeout(resolve, delay));
  
  const response = await fetch('/user.json');
  
  if (!response.ok) {
    throw new Error('Помилка завантаження даних користувача');
  }

  return await response.json();
};

