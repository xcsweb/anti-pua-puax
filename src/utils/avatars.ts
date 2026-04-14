import type { Question, Gender } from '../types';

export const getAvatarUrl = (type: 'user' | 'sender', question?: Question, gender?: Gender): string => {
  // Use absolute path with BASE_URL for GitHub Pages deployment
  const baseUrl = `${import.meta.env.BASE_URL}avatars/`;

  if (type === 'user') {
    // If gender is explicitly null/undefined (e.g. full test mode), return clown
    if (!gender) {
      return `${baseUrl}clown.jpg`;
    }
    
    // 用户的头像（被PUA的“冤种”方）
    if (gender === 'male') {
      return `${baseUrl}doge.jpg`;
    } else if (gender === 'female') {
      return `${baseUrl}cat.jpg`;
    } else {
      return `${baseUrl}clown.jpg`;
    }
  } else if (question) {
    // 发送者的头像（施加PUA的一方）
    if (question.category === 'work') {
      return `${baseUrl}boss.jpg`;
    } else if (question.category === 'family') {
      return `${baseUrl}parents.jpg`;
    } else if (question.category === 'social') {
      return `${baseUrl}social.jpg`;
    } else if (question.category === 'romance') {
      // 恋爱场景
      if (question.targetGender === 'female') {
        // 目标是女性，发送者是男性（典型渣男头像）
        return `${baseUrl}fuckboy.jpg`;
      } else if (question.targetGender === 'male') {
        // 目标是男性，发送者是女性（典型绿茶头像）
        return `${baseUrl}greentea.jpg`;
      } else {
        return `${baseUrl}default.jpg`;
      }
    } else {
      return `${baseUrl}default.jpg`;
    }
  }

  return `${baseUrl}default.jpg`;
};