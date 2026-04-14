import type { ScoreOption, ResultDetails, TestMode } from '../types';

export const calculateResult = (scores: ScoreOption, questionCount: number = 24): string => {
  const threshold = questionCount * 5;
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

export const romanceDictionary: Record<string, ResultDetails> = {
  // === P开头：清醒组（Rational） ===
  PUAX: {
    title: '赛博阎王',
    desc: '你脑子里装的是反诈APP，血管里流的是液氮。任何试图PUA你的人都会被你当场物理超度，顺便反向洗脑榨干剩余价值。建议直接开班教学，别浪费了这身祖传的资本家血液。',
    dangerLevel: '0% (骗子见你都得绕道走)',
    keywords: ['反向PUA', '物理超度', '没有心', '冷血资本家'],
    animal: '🦅 孤鹰',
    bestMatch: 'PSDX',
    worstMatch: 'DSDB'
  },
  PUDX: {
    title: '清醒的抖M',
    desc: '你什么套路都懂，就是管不住自己那颗渴望被虐的心。上一秒还在群里怒喷渣男渣女，下一秒又在深夜偷偷给对方点外卖。你这不是被骗，你这是花钱买了个爹/妈供着，主打一个花钱受气。',
    dangerLevel: '30% (只要给够情绪价值就能骗走)',
    keywords: ['嘴强王者', '清醒沉沦', '又骂又爱', '花钱买爹'],
    animal: '🦔 刺猬',
    bestMatch: 'PSAX',
    worstMatch: 'DUAB'
  },
  PSAX: {
    title: '顶级海王',
    desc: '你在感情局里就像个冷酷的荷官。表面上唯唯诺诺情绪拉满，实际上心里早把对方的底牌看穿了。你不是在谈恋爱，你是在向下兼容精准扶贫，哄人只是你享受上帝视角的基操。',
    dangerLevel: '10% (你才是高端局玩家)',
    keywords: ['降维打击', '职业陪演', '无情荷官', '上帝视角'],
    animal: '🦊 藏狐',
    bestMatch: 'PUDX',
    worstMatch: 'DSDX'
  },
  PSDX: {
    title: '纯爱战神',
    desc: '“我知道他/她渣，但我就是该死地爱着他/她！”你不仅一眼看穿对方是个垃圾，还能自己给自己洗脑把垃圾当成宝。别人是眼瞎，你是心盲，每天都在上演自我感动的年度苦情大戏。',
    dangerLevel: '60% (千金难买我乐意)',
    keywords: ['自我献祭', '含泪倒贴', '明知故犯', '感动中国'],
    animal: '🦋 飞蛾',
    bestMatch: 'PUAX',
    worstMatch: 'DSAB'
  },
  PUAB: {
    title: '赛博键盘侠',
    desc: '你在网上重拳出击指点江山，现实中遇到事儿却只会默默拉黑退群。防线建得比马奇诺防线还高，但只要别人稍微绕个道，你就会因为盲从而被一波带走。主打一个“我很强但你别碰我”。',
    dangerLevel: '10% (自我保护机制满级)',
    keywords: ['网络巨人', '现实侏儒', '一碰就碎', '阿Q正传'],
    animal: '🐢 乌龟',
    bestMatch: 'DUAX',
    worstMatch: 'DUDB'
  },
  PUDB: {
    title: '顶级戏精',
    desc: '你每天都在脑补别人要害你，防御拉满却毫无卵用。表面上凶得像头藏獒，实际上别人随便给点甜言蜜语就能把你牵回家。你的拧巴程度连麻花看了都得叫一声祖宗。',
    dangerLevel: '45% (容易自己PUA自己)',
    keywords: ['脑补大师', '外强中干', '虚假繁荣', '极度拧巴'],
    animal: '🐌 蜗牛',
    bestMatch: 'PSAB',
    worstMatch: 'DUDX'
  },
  PSAB: {
    title: '满级牛马',
    desc: '你心里什么都清楚，但为了保命选择全盘接受。被老板画大饼你边吃边夸香，被对象渣你选择原谅并顺手帮对方洗了个衣服。你不是脾气好，你只是把“苟活”这两个字刻在了DNA里。',
    dangerLevel: '20% (主动选择装傻)',
    keywords: ['职业背锅', '顶级忍者', '唾面自干', '清醒当狗'],
    animal: '🦙 羊驼',
    bestMatch: 'PUDB',
    worstMatch: 'DUAX'
  },
  PSDB: {
    title: '嘴强王者',
    desc: '帮朋友分析感情问题时你是诸葛亮，一到自己实战就变成了猪八戒。道理一套一套的，真遇上事了别人只要稍微哄两句，你立马就能把底线降到马里亚纳海沟。',
    dangerLevel: '75% (间歇性人间清醒)',
    keywords: ['理论巨人', '实战废物', '记吃不记打', '底线灵活'],
    animal: '🐱 护食猫',
    bestMatch: 'DSAX',
    worstMatch: 'DSDB'
  },

  // === D开头：恋爱脑组（Delusional） ===
  DUAX: {
    title: '脱缰疯批',
    desc: '你脑子里没多少清醒的成分，但骨子里全是暴力美学。爱的时候像个狂热的邪教徒，一旦发现被绿，你能当场化身电锯杀人狂。你的感情史不是偶像剧，是《法治进行时》。',
    dangerLevel: '50% (容易冲动消费)',
    keywords: ['暴力美学', '伤敌一千', '玉石俱焚', '同归于尽'],
    animal: '🐗 野猪',
    bestMatch: 'PUAB',
    worstMatch: 'PSAB'
  },
  DUDX: {
    title: '暴走吉娃娃',
    desc: '你脾气比谁都大，脑子比谁都空。经常用最狠的语气说着最怂的话，别人只要顺毛摸两下，你就能乖乖交出银行卡密码。典型的“又菜又爱玩，被骗还咬人”。',
    dangerLevel: '65% (容易被情绪价值拿捏)',
    keywords: ['纸老虎', '又菜又爱叫', '顺毛驴', '智商盆地'],
    animal: '🐺 哈士奇',
    bestMatch: 'DSAB',
    worstMatch: 'PUDB'
  },
  DSAX: {
    title: '人肉提款机',
    desc: '你搞钱一把好手，但在感情里简直就是个智障。你试图用钱和讨好来买真心，最后不仅被榨干了钱包，还被发了一张“你是个好人”的VIP年卡。建议直接把钱打给希望工程。',
    dangerLevel: '80% (ATM机预备役)',
    keywords: ['精准扶贫', '人傻钱多', '自动打款', '好人卡批发商'],
    animal: '🐼 熊猫',
    bestMatch: 'PSDB',
    worstMatch: 'PSAX'
  },
  DSDX: {
    title: '赛博舔狗',
    desc: '你不仅眼瞎，还特别喜欢倒贴。别人挖个坑，你不仅自己跳进去，还要顺手帮人家把土填上。你的付出感动了天感动了地，唯独感动不了那个正在吸你血的渣渣。',
    dangerLevel: '95% (待宰的羔羊)',
    keywords: ['骨灰级舔狗', '自带铲子', '感动自己', '万能充电宝'],
    animal: '🐑 绵羊',
    bestMatch: 'DSDB',
    worstMatch: 'PUAX'
  },
  DUAB: {
    title: '瞎眼杠精',
    desc: '你不仅瞎，还倔得像头驴。别人好心劝你，你反手就是一个“你懂什么”。你在垃圾堆里找对象，不仅护食，还要到处向人证明你捡到的是金子。',
    dangerLevel: '70% (容易被忽悠瘸了)',
    keywords: ['死鸭子嘴硬', '护食狂魔', '杠精本精', '无可救药'],
    animal: '🦆 鸭子',
    bestMatch: 'DUDB',
    worstMatch: 'PUDX'
  },
  DUDB: {
    title: '宇宙级巨婴',
    desc: '你极度依赖别人又毫无判断力，遇到问题只会原地撒泼打滚。你把无理取闹当成个性，把作死当成试探，最后成功把所有愿意靠近你的人都逼成了神经衰弱。',
    dangerLevel: '85% (重度作死爱好者)',
    keywords: ['究极巨婴', '情绪黑洞', '撒泼打滚', '天煞孤星'],
    animal: '🐈 娇气猫',
    bestMatch: 'DUAB',
    worstMatch: 'PUAB'
  },
  DSAB: {
    title: '天生耗材',
    desc: '你是那种被卖了还要帮人家写收据的极品冤种。明明自己有能力，却偏偏喜欢在各种奇葩关系里当牛做马。你不是脾气好，你是对受虐有一种执着的迷恋。',
    dangerLevel: '80% (职场/社交耗材)',
    keywords: ['绝世大血包', '天生耗材', '主动受虐', '人形垫脚石'],
    animal: '🐂 老黄牛',
    bestMatch: 'DUDX',
    worstMatch: 'PSDX'
  },
  DSDB: {
    title: '吸渣体质',
    desc: '只要是个人渣，在人群中多看你一眼就能准确闻到你身上散发出的“快来骗我”的味道。你没有底线，没有脑子，只有一颗时刻准备为渣男/女粉身碎骨的圣母心。',
    dangerLevel: '99.9% (重症监护室常客)',
    keywords: ['吸渣黑洞', '终极血包', '圣母白莲花', '待宰羔羊'],
    animal: '🐶 舔狗',
    bestMatch: 'DSDX',
    worstMatch: 'PUAX'
  }
};

export const fullDictionary: Record<string, ResultDetails> = {
  // === P开头：清醒组（Rational） ===
  PUAX: {
    title: '职场阎王',
    desc: '不管在职场、家庭还是社交圈，你都是神一般的存在。老板想给你画饼？你反手就把面粉呼他脸上。亲戚想对你道德绑架？你当场教他们怎么做人。没有任何套路能逃过你的火眼金睛，主打一个六亲不认、油盐不进。',
    dangerLevel: '0% (资本家看了都落泪)',
    keywords: ['反向画饼', '六亲不认', '情绪终结者', '赛博活佛'],
    animal: '🦅 孤鹰',
    bestMatch: 'PSDX',
    worstMatch: 'DSDB'
  },
  PUDX: {
    title: '内卷狂魔',
    desc: '你脑子比谁都清醒，态度比谁都强硬，但偏偏就是喜欢沉浸在“卷王”的人设里无法自拔。明知道大环境在压榨你，你不仅不反抗，还要顺便拉着全团队一起用命换钱。你的座右铭是：“只要我卷得够快，镰刀就割不到我”。',
    dangerLevel: '20% (主动选择被压榨)',
    keywords: ['卷王之王', '团队推土机', '用命换钱', '清醒打工魂'],
    animal: '🐺 狼',
    bestMatch: 'PSAX',
    worstMatch: 'DUAB'
  },
  PSAX: {
    title: '糊弄学宗师',
    desc: '你深谙社会生存法则，表面上是全公司/全家最听话的好好先生，实际上把“太极拳”打得登峰造极。老板安排任务你满口答应，亲戚催婚你连连点头，但转头就把事情抛到九霄云外。你用最饱满的情绪，做最少的事。',
    dangerLevel: '10% (情绪价值拉满)',
    keywords: ['太极宗师', '高情商糊弄', '看破不说破', '隐形王者'],
    animal: '🦊 狐狸',
    bestMatch: 'PUDX',
    worstMatch: 'DSDX'
  },
  PSDX: {
    title: '职场老黄牛',
    desc: '你明明什么套路都懂，知道老板在画饼，知道朋友在利用你，但你就是狠不下心撕破脸。为了维持表面的体面和和平，你默默咽下所有的委屈，硬生生把自己逼成了所有人眼里的“老好人”和“万能背锅侠”。',
    dangerLevel: '50% (清醒地做牛马)',
    keywords: ['清醒背锅侠', '和平主义者', '不敢掀桌', '万能砖块'],
    animal: '🐂 水牛',
    bestMatch: 'PUAX',
    worstMatch: 'DSAB'
  },
  PUAB: {
    title: '钢铁直球王',
    desc: '你做事雷厉风行极度独立，但在人情世故上简直是个瞎子。你经常因为看不懂空气而被孤立，或者被心机同事当枪使。你以为自己在整顿职场/家族群，其实只是别人眼里的笑话，主打一个“我很强但我很瞎”。',
    dangerLevel: '40% (容易被当枪使)',
    keywords: ['情商洼地', '莽夫本夫', '职场孤狼', '空气绝缘体'],
    animal: '🦏 犀牛',
    bestMatch: 'DUAX',
    worstMatch: 'DUDB'
  },
  PUDB: {
    title: '护主狂犬',
    desc: '你对认定的圈子或领导有一种迷之忠诚，只要是自己人你就无脑护短。别人稍微挑拨离间，你就像个炸药包一样被点燃。你的清醒全用在对付外人上，对自己人则是毫无底线，极容易被所谓“兄弟情”和“大局观”忽悠。',
    dangerLevel: '60% (容易被画大饼拿捏)',
    keywords: ['忠诚卫士', '无脑护短', '一点就着', '双标王者'],
    animal: '🐕 杜宾犬',
    bestMatch: 'PSAB',
    worstMatch: 'DUDX'
  },
  PSAB: {
    title: '赛博鸵鸟',
    desc: '你极其清醒地知道大环境有多糟糕，但你的应对策略就是把头埋进沙子里。只要麻烦不找上门，你绝不多管闲事。哪怕身边的同事或朋友正在被坑，你也只会默默观察，主打一个明哲保身、事不关己。',
    dangerLevel: '30% (自保能力满分)',
    keywords: ['明哲保身', '事不关己', '职场隐形人', '绝对中立'],
    animal: '🐢 乌龟',
    bestMatch: 'PUDB',
    worstMatch: 'DUAX'
  },
  PSDB: {
    title: '职场墙头草',
    desc: '你脑子还算清醒，但为了合群，你可以放弃一切原则。团队里谁声音大你就听谁的，老板指东你绝不往西，亲戚说什么你都觉得有道理。你没有任何主见，只求在这个复杂的世界里苟延残喘、不被枪打出头鸟。',
    dangerLevel: '70% (容易随波逐流被坑)',
    keywords: ['毫无主见', '随波逐流', '职场混子', '绝对服从'],
    animal: '🐏 绵羊',
    bestMatch: 'DSAX',
    worstMatch: 'DSDB'
  },

  // === D开头：恋爱脑组/糊涂组（Delusional） ===
  DUAX: {
    title: '职场疯批',
    desc: '你做事全凭感觉，但直觉又准得可怕。谁要是敢惹你，哪怕是老板或长辈你也敢直接掀桌子。你从来不按常理出牌，是所有HR和亲戚长辈眼里的头号危险分子，也是整治各种不服的终极人形兵器。',
    dangerLevel: '45% (伤敌一千自损八百)',
    keywords: ['掀桌狂魔', '不服就干', '定时炸弹', '职场刺客'],
    animal: '🦡 平头哥',
    bestMatch: 'PUAB',
    worstMatch: 'PSAB'
  },
  DUDX: {
    title: '嘴强牛马',
    desc: '你天天喊着要辞职、要跟奇葩亲戚断绝关系，一有不顺心就骂骂咧咧，但真让你行动你又怂了。你看得清所有的套路，但就是管不住自己的情绪，最后往往成了最容易被针对的那个倒霉蛋，天天挨打天天叫。',
    dangerLevel: '65% (口嗨王者)',
    keywords: ['雷声大雨点小', '容易被针对', '情绪化输出', '又怂又爱叫'],
    animal: '🦔 刺猬',
    bestMatch: 'DSAB',
    worstMatch: 'PUDB'
  },
  DSAX: {
    title: '大爱无疆',
    desc: '你有能力也有眼光，但同理心过剩。看到同事被骂你会去安慰，看到别人加班你会去帮忙，朋友借钱你二话不说就转账。你试图拯救所有人，最后却把自己累出了结节，还落不到一句好，纯纯的“烂好人”。',
    dangerLevel: '75% (感动中国职场版)',
    keywords: ['烂好人', '大包大揽', '过度共情', '自找苦吃'],
    animal: '🐘 大象',
    bestMatch: 'PSDB',
    worstMatch: 'PSAX'
  },
  DSDX: {
    title: '终极接盘侠',
    desc: '你不仅眼瞎，还特别喜欢倒贴。别人挖个坑，你不仅自己跳进去，还要顺手帮人家把土填上。同事的烂摊子你接，亲戚的破事你管，你的付出感动了天地，唯独感动不了那些正在拼命吸你血的渣渣。',
    dangerLevel: '95% (超级血包)',
    keywords: ['自带铲子', '有求必应', '万能充电宝', '人形血包'],
    animal: '🦌 梅花鹿',
    bestMatch: 'DSDB',
    worstMatch: 'PUAX'
  },
  DUAB: {
    title: '无脑炮灰',
    desc: '你有一腔热血和极强的行动力，但方向全错。老板随便画个大饼，你就能像打了鸡血一样冲锋陷阵；长辈随便夸你两句，你就恨不得把家底掏空。你经常把精力浪费在毫无意义的事情上，是所有人最爱的无脑排头兵。',
    dangerLevel: '80% (被人卖了还帮数钱)',
    keywords: ['无脑冲锋', '炮灰一号', '瞎忙活', '一秒上头'],
    animal: '🐗 野猪',
    bestMatch: 'DUDB',
    worstMatch: 'PUDX'
  },
  DUDB: {
    title: '宇宙级巨婴',
    desc: '你不仅能力不行，脾气还不小。遇到困难只会抱怨环境，出了问题只会推卸责任。你极度依赖团队和家人，却又总是以自我为中心。你把无理取闹当成个性，是所有人都不想合作的职场/社交毒瘤。',
    dangerLevel: '85% (团队破坏者)',
    keywords: ['情绪黑洞', '推锅大师', '撒泼打滚', '社交毒瘤'],
    animal: '🦥 树懒',
    bestMatch: 'DUAB',
    worstMatch: 'PUAB'
  },
  DSAB: {
    title: '天生耗材',
    desc: '你是那种被卖了还要帮人家写收据的极品冤种。明明自己有能力，却偏偏喜欢在各种奇葩关系里当牛做马。不管是职场画饼、亲情绑架还是社交PUA，你照单全收。你不是脾气好，你是对受虐有一种执着的迷恋。',
    dangerLevel: '90% (顶级耗材)',
    keywords: ['完美韭菜', '照单全收', '毫无底线', '人形垫脚石'],
    animal: '🐹 仓鼠',
    bestMatch: 'DUDX',
    worstMatch: 'PSDX'
  },
  DSDB: {
    title: '纯种韭菜',
    desc: '你的存在就是为了给骗子冲业绩的。你没有底线，没有脑子，只有一颗时刻准备为别人粉身碎骨的圣母心。只要别人稍微给你点甜头，你就能把自己的全部身家双手奉上，堪称行走的人形提款机和绝世大血包。',
    dangerLevel: '99.9% (骗子最爱)',
    keywords: ['纯种韭菜', '人形提款机', '无脑倒贴', '终极血包'],
    animal: '🐑 绵羊',
    bestMatch: 'DSDX',
    worstMatch: 'PUAX'
  }
};

export const getResultDetails = (code: string, mode: TestMode): ResultDetails => {
  // 兜底默认值（处理未完全覆盖的16种情况）
  const defaultResult: ResultDetails = {
    title: '薛定谔的冤种',
    desc: '你的脑子就像个接触不良的灯泡，忽明忽暗。有时候清醒得像个杀手，有时候又蠢得像头猪。你的防骗能力完全取决于今天的心情、天气以及对方的颜值。',
    dangerLevel: '50% (全看造化)',
    keywords: ['间歇性脑瘫', '颜值即正义', '状态不稳定', '纯看造化'],
    animal: '🦊 狐狸',
    bestMatch: 'PSAX',
    worstMatch: 'DSDB'
  };

  const dictionary = mode === 'romance' ? romanceDictionary : fullDictionary;
  return dictionary[code] || defaultResult;
};
