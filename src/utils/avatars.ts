import type { Question, Gender } from '../types';

export const getAvatarUrl = (type: 'user' | 'sender', question?: Question, gender?: Gender): string => {
  const baseUrl = `${import.meta.env.BASE_URL}avatars/`;

  if (type === 'user') {
    if (gender === 'male') {
      return `${baseUrl}doge.jpg`;
    } else if (gender === 'female') {
      return `${baseUrl}cat.jpg`;
    } else {
      return `${baseUrl}clown.jpg`;
    }
  } else if (type === 'sender' && question) {
    if (question.category === 'work') {
      return `${baseUrl}boss.jpg`;
    } else if (question.category === 'family') {
      return `${baseUrl}parents.jpg`;
    } else if (question.category === 'social') {
      return `${baseUrl}social.jpg`;
    } else if (question.category === 'romance') {
      if (question.targetGender === 'female') {
        return `${baseUrl}fuckboy.jpg`;
      } else if (question.targetGender === 'male') {
        return `${baseUrl}greentea.jpg`;
      }
    }
  }

  return `${baseUrl}default.jpg`;
};