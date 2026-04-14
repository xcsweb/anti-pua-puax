import type { ScoreOption, ResultDetails } from '../types';

export const calculateResult = (scores: ScoreOption): string => {
  // 假设总分的中位数作为分界线
  // 按照题目数量（约24-25题），每题每项满分10分，中位数约在120左右
  // 这里暂时使用 120 作为清醒与否的阈值（可以根据实际测试情况调整）
  const threshold = 120;
  const p = scores.p >= threshold ? 'P' : 'D'; // Rational (清醒) vs Delusional (恋爱脑)
  const u = scores.u >= threshold ? 'U' : 'S'; // Unyielding (强硬) vs Submissive (讨好)
  const a = scores.a >= threshold ? 'A' : 'D'; // Autonomous (独立) vs Dependent (依赖)
  const x = scores.x >= threshold ? 'X' : 'B'; // Sharp (鉴婊) vs Blind (盲从)

  return `${p}${u}${a}${x}`;
};

export const calculateCategoryDefense = (scores: ScoreOption, questionCount: number = 10): number => {
  const total = scores.p + scores.u + scores.a + scores.x;
  const maxPossible = questionCount * 40; // 4个维度，每个维度最高10分
  if (maxPossible === 0) return 0;
  return Math.min(100, Math.max(0, Math.round((total / maxPossible) * 100)));
};

export const getDoubleStandardComment = (work: number, family: number, romance: number): string => {
  const max = Math.max(work, family, romance);
  const min = Math.min(work, family, romance);
  const diff = max - min;

  if (diff < 20) {
    if (max > 80) return "毫无破绽的六边形战士，PUA见了你都得连夜买站票逃跑！";
    if (max < 40) return "纯纯的待宰羔羊，不管在职场、情场还是家里，都在疯狂被吸血...";
    return "情绪稳定得出奇，虽然偶尔会被忽悠，但大体上还能稳住阵脚。";
  }

  if (work === max && romance === min) {
    return "职场重拳出击，情场唯唯诺诺！上班是无情的赚钱机器，下班是纯纯的恋爱脑冤种。";
  }
  if (romance === max && work === min) {
    return "谈起恋爱来精明得像福尔摩斯，一上班就被老板画的大饼撑得两眼发直。";
  }
  if (family === max && romance === min) {
    return "在亲戚面前六亲不认，结果一谈恋爱就被渣男/渣女拿捏得死死的。";
  }
  if (work === max && family === min) {
    return "职场上叱咤风云谁也别想PUA你，回到家却被七大姑八大姨一通血脉压制。";
  }
  if (romance === max && family === min) {
    return "情场防PUA大师，结果一过年回家就被长辈们的催婚组合拳打得找不到北。";
  }
  if (family === max && work === min) {
    return "对付长辈的道德绑架游刃有余，一上班却成了老板最爱的老实巴交大冤种。";
  }

  return "你的防御力忽高忽低，主打一个薛定谔的清醒。";
};

export const resultDictionary: Record<string, ResultDetails> = {
  // === P开头：清醒组（Rational） ===
  PUAX: {
    title: '铁石心肠鉴渣机',
    desc: '你的心比大润发杀了十年鱼的刀还冷。任何PUA话术在你面前就像小丑跳舞。你不仅不会被骗，甚至还想反向给对方上一课。',
    dangerLevel: '0% (骗子见你都得绕道走)',
    keywords: ['人间清醒', '精神独立', '反弹伤害', '没有心'],
    animal: '🦅 孤鹰',
    bestMatch: 'PSDX',
    worstMatch: 'DSDB'
  },
  PUDX: {
    title: '带刺的黏人精',
    desc: '你什么都懂，敢爱敢恨脾气还大，但偏偏是个重度陪伴依赖症患者。一边骂骂咧咧看透一切，一边又忍不住想往别人怀里钻。',
    dangerLevel: '30% (只要给够情绪价值就能骗走)',
    keywords: ['清醒沉沦', '又凶又黏', '需要陪伴', '嘴硬心软'],
    animal: '🦔 刺猬',
    bestMatch: 'PSAX',
    worstMatch: 'DUAB'
  },
  PSAX: {
    title: '高情商端水大师',
    desc: '你活得像个精明的NPC。心里明镜似的，啥套路都懂，但不介意陪对方演戏。独立自主又敢于下场，哄人只是你掌控全局的基操。',
    dangerLevel: '10% (你才是高端局玩家)',
    keywords: ['陪你演戏', '向下兼容', '情绪稳定', '掌控全局'],
    animal: '🦊 藏狐',
    bestMatch: 'PUDX',
    worstMatch: 'DSDX'
  },
  PSDX: {
    title: '清醒的恋爱脑',
    desc: '“我知道他渣，但我就是喜欢他啊！”你明知是个坑，还要勇敢地往下跳。平时看着挺机灵，一旦爱上就开始疯狂输出情绪价值。',
    dangerLevel: '60% (千金难买我乐意)',
    keywords: ['自我献祭', '明知故犯', '飞蛾扑火', '纯爱战神'],
    animal: '🦋 飞蛾',
    bestMatch: 'PUAX',
    worstMatch: 'DSAB'
  },
  PUAB: {
    title: '懂王但社恐',
    desc: '你清醒、防备心重且独立，但就是有点怂。面对PUA你虽然不会上当，但通常只会选择默默拉黑，不敢当面硬刚。主打一个惹不起躲得起。',
    dangerLevel: '10% (自我保护机制满级)',
    keywords: ['默默拉黑', '不爱惹事', '冷暴力大师', '防线极高'],
    animal: '🐢 乌龟',
    bestMatch: 'DUAX',
    worstMatch: 'DUDB'
  },
  PUDB: {
    title: '拧巴的守门员',
    desc: '你极度渴望被爱又极度害怕受伤，遇到一点风吹草动就想缩回壳里。内心疯狂分析对方的每个字，表面上还要装作高冷强硬，活得比谁都累。',
    dangerLevel: '45% (容易自己PUA自己)',
    keywords: ['患得患失', '高敏感', '防御过度', '内心戏极多'],
    animal: '🐌 蜗牛',
    bestMatch: 'PSAB',
    worstMatch: 'DUDX'
  },
  PSAB: {
    title: '佛系打工人',
    desc: '你明明看透了对方的套路，但为了维持表面的和平，或者因为害怕冲突，你还是会选择顺从。其实你心里什么都懂，就是懒得计较。',
    dangerLevel: '20% (主动选择装傻)',
    keywords: ['和平主义', '看破不说破', '内心MMP', '讨好型人格'],
    animal: '🦙 羊驼',
    bestMatch: 'PUDB',
    worstMatch: 'DUAX'
  },
  PSDB: {
    title: '嘴强王者实战菜狗',
    desc: '大道理你比谁都懂，帮闺蜜/兄弟鉴别渣男渣女时一套一套的。但一到自己身上，别人稍微给点甜头你就又心软了，秒变挂件。',
    dangerLevel: '75% (间歇性人间清醒)',
    keywords: ['理论大师', '心太软', '容易被哄好', '擅长原谅'],
    animal: '🐱 护食猫',
    bestMatch: 'DSAX',
    worstMatch: 'DSDB'
  },

  // === D开头：恋爱脑组（Delusional） ===
  DUAX: {
    title: '头铁的莽夫',
    desc: '虽然你很容易被洗脑，但你骨子里是个暴脾气，而且独立自主。一旦发现自己被骗，哪怕伤敌一千自损八百也要把对方撕碎。',
    dangerLevel: '50% (容易冲动消费)',
    keywords: ['一点就着', '敢爱敢恨', '事后后悔', '行动派'],
    animal: '🐗 野猪',
    bestMatch: 'PUAB',
    worstMatch: 'PSAB'
  },
  DUDX: {
    title: '暴躁的哈士奇',
    desc: '你很容易轻信他人，勇敢且脾气大，但内心却极度渴望被爱。这种矛盾让你常常用最凶的语气说最怂的话，是个典型的傲娇傻白甜。',
    dangerLevel: '65% (容易被情绪价值拿捏)',
    keywords: ['傲娇', '口是心非', '纸老虎', '又傻又勇'],
    animal: '🐺 哈士奇',
    bestMatch: 'DSAB',
    worstMatch: 'PUDB'
  },
  DSAX: {
    title: '人傻钱多的金主',
    desc: '你经济独立，生活独立，但唯独在感情里容易迷失。你敢于付出，经常为了让别人开心而一掷千金，常常因为心软被有心机的人吸血。',
    dangerLevel: '80% (ATM机预备役)',
    keywords: ['付出型人格', '散财童子', '感情白痴', '老好人'],
    animal: '🐼 熊猫',
    bestMatch: 'PSDB',
    worstMatch: 'PSAX'
  },
  DSDX: {
    title: '无脑倒贴怪',
    desc: '你不仅容易被骗，还特别敢于付出，甚至为了讨好对方连底线都不要了。别人一招手你就摇着尾巴扑过去，完全没有自我保护意识。',
    dangerLevel: '95% (待宰的羔羊)',
    keywords: ['倒贴大师', '无脑冲', '自我感动', '付出不求回报'],
    animal: '🐑 绵羊',
    bestMatch: 'DSDB',
    worstMatch: 'PUAX'
  },
  DUAB: {
    title: '又菜又爱杠',
    desc: '你识人不清，还胆小怕事，但偏偏自尊心极强，死鸭子嘴硬。别人一眼看穿的骗局你深信不疑，别人劝你你还要跟人杠到底。',
    dangerLevel: '70% (容易被忽悠瘸了)',
    keywords: ['死鸭子嘴硬', '杠精', '又菜又爱玩', '死要面子'],
    animal: '🦆 鸭子',
    bestMatch: 'DUDB',
    worstMatch: 'PUDX'
  },
  DUDB: {
    title: '作精小公主/小王子',
    desc: '你极度依赖他人又容易被骗，一遇到事就躲起来，但脾气还不小。喜欢用“作”来试探别人的底线，最后往往把真爱你的人作跑了。',
    dangerLevel: '85% (重度作死爱好者)',
    keywords: ['作精', '情绪黑洞', '玻璃心', '推卸责任'],
    animal: '🐈 娇气猫',
    bestMatch: 'DUAB',
    worstMatch: 'PUAB'
  },
  DSAB: {
    title: '老实巴交大冤种',
    desc: '你是个老好人，谁也不敢得罪。虽然有独立生活的能力，但经常被职场PUA或朋友利用。你被卖了还帮人数钱，主打一个吃亏是福。',
    dangerLevel: '80% (职场/社交耗材)',
    keywords: ['老好人', '背锅侠', '不敢拒绝', '吃哑巴亏'],
    animal: '🐂 老黄牛',
    bestMatch: 'DUDX',
    worstMatch: 'PSDX'
  },
  DSDB: {
    title: '绝世纯爱大冤种',
    desc: '你就是传说中的“吸渣体质”。只要别人一卖惨或者画大饼，你就会自动带入拯救者角色，最后把自己赔得底朝天。',
    dangerLevel: '99.9% (重症监护室常客)',
    keywords: ['恋爱脑晚期', '自我PUA大师', '深夜网抑云', '别人说什么信什么'],
    animal: '🐶 舔狗',
    bestMatch: 'DSDX',
    worstMatch: 'PUAX'
  }
};

export const getResultDetails = (code: string): ResultDetails => {
  // 兜底默认值（处理未完全覆盖的16种情况）
  const defaultResult: ResultDetails = {
    title: '薛定谔的冤种',
    desc: '你在感情和人际交往中忽明忽暗。有时候极其清醒，有时候又莫名其妙地掉坑里。你的防骗能力完全取决于今天的心情和对方的颜值。',
    dangerLevel: '50% (全看造化)',
    keywords: ['薛定谔的智商', '颜值即正义', '状态不稳定', '看心情'],
    animal: '🦊 狐狸',
    bestMatch: 'PSAX',
    worstMatch: 'DSDB'
  };

  return resultDictionary[code] || defaultResult;
};
