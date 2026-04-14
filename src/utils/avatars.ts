import type { Question, Gender } from '../types';

export const getAvatarUrl = (type: 'user' | 'sender', question?: Question, gender?: Gender): string => {
  let prompt = '';

  if (type === 'user') {
    // 用户的头像（被PUA的“冤种”方）
    if (gender === 'male') {
      prompt = 'A funny crying shiba inu dog meme, cartoon style, wechat avatar, high quality'; // 舔狗/悲伤柴犬
    } else if (gender === 'female') {
      prompt = 'A funny crying cute cat meme, cartoon style, wechat avatar, high quality'; // 悲伤小猫
    } else {
      prompt = 'A funny clown face meme, cartoon style, wechat avatar, high quality'; // 纯纯的小丑
    }
  } else if (question) {
    // 发送者的头像（施加PUA的一方）
    if (question.category === 'work') {
      prompt = 'A peaceful mountain and tea landscape, chinese calligraphy style, wechat avatar'; // 老板风：山水茶道天道酬勤
    } else if (question.category === 'family') {
      prompt = 'A beautiful blooming pink lotus flower with green leaves, morning greeting style, wechat avatar'; // 父母风：出水芙蓉家和万事兴
    } else if (question.category === 'social') {
      prompt = 'A minimalist geometric landscape, aesthetic wechat avatar'; // 社交装X风：极简冷淡几何
    } else if (question.category === 'romance') {
      // 恋爱场景
      if (question.targetGender === 'female') {
        // 目标是女性，发送者是男性（典型渣男头像）
        prompt = 'black and white aesthetic photo of a man looking at the sea, luxury vibe, wechat avatar'; // 渣男风：黑白背影/方向盘/深沉看海
      } else if (question.targetGender === 'male') {
        // 目标是男性，发送者是女性（典型绿茶头像）
        prompt = 'cute aesthetic anime girl holding a coffee cup, soft pastel colors, wechat avatar'; // 绿茶风：软萌动漫少女/拿星巴克/低像素
      } else {
        prompt = 'mysterious shadow figure, aesthetic wechat avatar';
      }
    } else {
      prompt = 'abstract colorful gradient, wechat avatar';
    }
  }

  // 使用指定的 text_to_image API 生成图像
  return `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(prompt)}&image_size=square`;
};