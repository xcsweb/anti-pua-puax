const fs = require('fs');
const crypto = require('crypto');

function genId() {
  return crypto.randomBytes(4).toString('hex');
}

const data = [
  // --- Work (10) ---
  {
    category: 'work', senderName: '王总', targetGender: null,
    scenario: '小李啊，年轻人多吃点苦是福气，周末加个班怎么了？我当年可是通宵熬过来的。',
    options: [
      { text: '王总说得对，我马上回公司加班，一定不辜负您的期望！', scores: {p: 0, u: 0, a: 0, x: 0} },
      { text: '王总，周末我有些私事，如果有紧急情况可以电话联系，但平时还是希望能保证休息。', scores: {p: 8, u: 7, a: 8, x: 8} },
      { text: '老板，时代变了，劳动法规定周末加班要给双倍工资的，您看是走流程还是怎么说？', scores: {p: 10, u: 10, a: 10, x: 10} },
      { text: '那我尽量抽时间看看吧，如果有空就弄一下。', scores: {p: 4, u: 3, a: 4, x: 5} }
    ]
  },
  {
    category: 'work', senderName: '张主管', targetGender: null,
    scenario: '这项目搞砸了全怪你！你要是稍微用点心，能出这么大纰漏吗？',
    options: [
      { text: '对不起张主管，都是我的错，我愿意承担所有责任并引咎辞职。', scores: {p: 0, u: 0, a: 0, x: 0} },
      { text: '主管，项目进度是大家一起推进的，我们可以复盘一下具体环节，而不是直接把锅扣我头上。', scores: {p: 10, u: 10, a: 10, x: 10} },
      { text: '可能是我的问题吧，我下次一定注意。', scores: {p: 3, u: 2, a: 3, x: 3} },
      { text: '其实这事儿也不全赖我，小王他也有责任啊……', scores: {p: 6, u: 5, a: 6, x: 6} }
    ]
  },
  {
    category: 'work', senderName: '同事老李', targetGender: null,
    scenario: '哎呀，这事儿我不太懂，你是名牌大学毕业的，能者多劳，帮我弄一下呗？',
    options: [
      { text: '老李，这属于你的工作范畴，我有我自己的KPI要完成，实在爱莫能助。', scores: {p: 10, u: 10, a: 10, x: 10} },
      { text: '行吧老李，那你下次请我喝奶茶啊。', scores: {p: 4, u: 3, a: 4, x: 4} },
      { text: '没问题，交给我吧，能帮到你我也很高兴！', scores: {p: 0, u: 0, a: 0, x: 0} },
      { text: '我可以教你一次怎么弄，但之后还是得你自己来操作。', scores: {p: 8, u: 8, a: 9, x: 8} }
    ]
  },
  {
    category: 'work', senderName: 'HR李姐', targetGender: null,
    scenario: '公司现在处于困难时期，大家的年终奖都取消了，你应该体谅公司，而不是只看钱。',
    options: [
      { text: '我出来打工不看钱难道看缘分吗？既然不发年终奖，那我也没必要像以前那么拼了。', scores: {p: 10, u: 10, a: 10, x: 10} },
      { text: '我理解公司难处，我会陪公司共渡难关，年终奖不要就不要了！', scores: {p: 0, u: 0, a: 0, x: 0} },
      { text: '那这取消年终奖的决定有书面通知吗？合同里可是写了十三薪的。', scores: {p: 9, u: 8, a: 9, x: 9} },
      { text: '唉，虽然心里有点不舒服，但大家都不发我也没办法。', scores: {p: 4, u: 3, a: 4, x: 4} }
    ]
  },
  {
    category: 'work', senderName: '赵总监', targetGender: null,
    scenario: '我这么骂你是因为看重你，换做别人我理都不理，懂不懂我的良苦用心？',
    options: [
      { text: '谢谢总监的栽培，我知道您都是为了我好，我会更努力的！', scores: {p: 0, u: 0, a: 0, x: 0} },
      { text: '总监，我理解您对工作的高标准，但希望您能用建设性的反馈代替情绪化的指责。', scores: {p: 10, u: 10, a: 10, x: 10} },
      { text: '可能是我抗压能力太差了吧，我会慢慢适应您的节奏。', scores: {p: 2, u: 1, a: 2, x: 2} },
      { text: '我知道您看重我，但这骂得也太难听了，我心里挺难受的。', scores: {p: 6, u: 5, a: 6, x: 6} }
    ]
  },
  {
    category: 'work', senderName: '刘经理', targetGender: null,
    scenario: '你看看人家小张，每天最后一个走，你到点就下班，工作态度很有问题啊。',
    options: [
      { text: '我的工作都在工作时间内高效完成了，到点下班正是效率高的体现，没必要磨洋工。', scores: {p: 10, u: 10, a: 10, x: 10} },
      { text: '对不起经理，那我以后也留下来多加会儿班。', scores: {p: 0, u: 0, a: 0, x: 0} },
      { text: '小张他单身没啥事，我家里还有事儿呢，不能天天这么耗着啊。', scores: {p: 7, u: 6, a: 7, x: 7} },
      { text: '那我以后晚走个半小时做做样子行了吧？', scores: {p: 4, u: 3, a: 4, x: 4} }
    ]
  },
  {
    category: 'work', senderName: '同事王姐', targetGender: null,
    scenario: '妹妹/弟弟，你新来的，这几个快递你去拿一下顺便把外卖扔了，这是咱们部门的规矩。',
    options: [
      { text: '王姐，拿快递倒垃圾不是我的工作职责，规矩如果是欺负新人的话，那我可不认。', scores: {p: 10, u: 10, a: 10, x: 10} },
      { text: '好的王姐，以后这种跑腿的活儿您尽管吩咐我。', scores: {p: 0, u: 0, a: 0, x: 0} },
      { text: '今天我顺手帮您带一下，但以后还是大家各自处理各自的比较好。', scores: {p: 8, u: 7, a: 8, x: 8} },
      { text: '哦，那我马上去。', scores: {p: 2, u: 1, a: 2, x: 2} }
    ]
  },
  {
    category: 'work', senderName: '孙主管', targetGender: null,
    scenario: '给你安排这么多活是给你锻炼的机会，别身在福中不知福！',
    options: [
      { text: '那这种锻炼的机会还是留给别人吧，我只想做好分内的事。', scores: {p: 9, u: 9, a: 9, x: 9} },
      { text: '感谢主管的信任！我一定好好锻炼，不辜负您的期望。', scores: {p: 0, u: 0, a: 0, x: 0} },
      { text: '主管，锻炼可以，但活儿太多导致加班，这加班费怎么算呢？', scores: {p: 10, u: 10, a: 10, x: 10} },
      { text: '活确实有点多，但我尽力去完成吧。', scores: {p: 3, u: 2, a: 3, x: 3} }
    ]
  },
  {
    category: 'work', senderName: '财务老马', targetGender: null,
    scenario: '这个报销你自己先垫着吧，公司流程慢，你不会连这点钱都拿不出来吧？',
    options: [
      { text: '拿不拿得出来是我的私事，公款公办，我不接受私人垫付公司开销。', scores: {p: 10, u: 10, a: 10, x: 10} },
      { text: '老马你别激将法，流程再慢也得走，这钱我就是不垫。', scores: {p: 9, u: 9, a: 9, x: 9} },
      { text: '行吧，那我先垫着，你们流程尽量快点啊。', scores: {p: 2, u: 1, a: 2, x: 2} },
      { text: '真不好意思，我刚付了房租，实在垫不出来了。', scores: {p: 6, u: 5, a: 6, x: 6} }
    ]
  },
  {
    category: 'work', senderName: '大老板', targetGender: null,
    scenario: '我们公司不养闲人，如果不能把公司当家，随时可以走人。',
    options: [
      { text: '老板说得对，公司就是我的家，我生是公司的人，死是公司的鬼！', scores: {p: 0, u: 0, a: 0, x: 0} },
      { text: '我拿工资办事，契约精神我有。但让我把公司当家，麻烦先把股份分我点。', scores: {p: 10, u: 10, a: 10, x: 10} },
      { text: '好的老板，我会端正态度的。', scores: {p: 3, u: 2, a: 3, x: 3} },
      { text: '我会努力证明自己的价值，争取不被淘汰。', scores: {p: 5, u: 4, a: 5, x: 5} }
    ]
  },

  // --- Family (10) ---
  {
    category: 'family', senderName: '母上大人', targetGender: null,
    scenario: '我辛辛苦苦把你养这么大，你现在翅膀硬了，连我的话都不听了是不是？',
    options: [
      { text: '妈，我感激您的养育之恩，但我也是个独立的成年人，有自己的人生选择权。', scores: {p: 10, u: 10, a: 10, x: 10} },
      { text: '妈我错了，我以后什么都听您的，绝不违逆您。', scores: {p: 0, u: 0, a: 0, x: 0} },
      { text: '您别生气了，这次是我不好，但有些事您也得听听我的想法啊。', scores: {p: 6, u: 5, a: 6, x: 6} },
      { text: '唉，您每次都这么说，我听您的还不行吗？', scores: {p: 2, u: 1, a: 2, x: 2} }
    ]
  },
  {
    category: 'family', senderName: '二大爷', targetGender: null,
    scenario: '你这工作一个月才赚这么点，你看隔壁小王，都当上经理了，你这辈子算毁了。',
    options: [
      { text: '二大爷，人各有志，每个人幸福的标准不一样，我觉得我现在挺好的。', scores: {p: 10, u: 10, a: 10, x: 10} },
      { text: '是啊二大爷，我太失败了，简直给老李家丢脸。', scores: {p: 0, u: 0, a: 0, x: 0} },
      { text: '二大爷，小王那么厉害，咋没见他给您带点啥好东西呢？', scores: {p: 9, u: 9, a: 9, x: 9} },
      { text: '我会努力向小王看齐的，争取早日混出个人样来。', scores: {p: 3, u: 2, a: 3, x: 3} }
    ]
  },
  {
    category: 'family', senderName: '父上大人', targetGender: 'female',
    scenario: '女孩子读那么多书有什么用？还不是要嫁人生孩子，趁早找个人嫁了吧。',
    options: [
      { text: '爸，读书是为了明智和独立，我的价值不是只能通过婚姻和生育来体现的。', scores: {p: 10, u: 10, a: 10, x: 10} },
      { text: '您说得对，女孩子拼事业没用，我这就去相亲。', scores: {p: 0, u: 0, a: 0, x: 0} },
      { text: '爸，时代不同了，现在女孩子也能靠自己闯出一片天。', scores: {p: 8, u: 8, a: 9, x: 8} },
      { text: '结不结婚看缘分嘛，您别催得这么紧行不行。', scores: {p: 5, u: 4, a: 5, x: 5} }
    ]
  },
  {
    category: 'family', senderName: '七大姑', targetGender: null,
    scenario: '哎呀，你还不结婚啊？你这年纪再不结就没人要了，阿姨给你介绍个二婚的，条件不错。',
    options: [
      { text: '姑，我的婚姻我自己会操心，宁缺毋滥，您就别操这份心了。', scores: {p: 10, u: 10, a: 10, x: 10} },
      { text: '真的吗？条件不错的话二婚我也认了，谢谢姑！', scores: {p: 0, u: 0, a: 0, x: 0} },
      { text: '姑，我还想再等等，实在不行再说吧。', scores: {p: 3, u: 2, a: 3, x: 3} },
      { text: '姑您这么闲，不如多去跳跳广场舞，我的事真不用您费心。', scores: {p: 9, u: 9, a: 9, x: 9} }
    ]
  },
  {
    category: 'family', senderName: '母上大人', targetGender: null,
    scenario: '我做这一切都是为了你好，你现在不明白，以后会感谢我的！',
    options: [
      { text: '妈，打着“为你好”的旗号剥夺我的选择权，这不是爱，是控制。', scores: {p: 10, u: 10, a: 10, x: 10} },
      { text: '妈，我知道您是为我好，我全听您的安排。', scores: {p: 0, u: 0, a: 0, x: 0} },
      { text: '可能您是对的吧，但我还是想按自己的想法试一试。', scores: {p: 7, u: 6, a: 8, x: 7} },
      { text: '那万一以后证明您错了呢？这个责任谁来负？', scores: {p: 8, u: 8, a: 8, x: 8} }
    ]
  },
  {
    category: 'family', senderName: '舅舅', targetGender: null,
    scenario: '你表弟要买房，你作为哥哥/姐姐，怎么也得赞助个十万八万的吧，都是一家人。',
    options: [
      { text: '舅舅，亲兄弟明算账，借钱可以，打好欠条按银行利息算。赞助的话，我没有这个义务。', scores: {p: 10, u: 10, a: 10, x: 10} },
      { text: '十万八万太多了，我给表弟拿两万块钱意思一下吧，不用还了。', scores: {p: 2, u: 1, a: 2, x: 2} },
      { text: '一家人不说两家话，表弟买房是大事，我马上去凑十万块钱给他！', scores: {p: 0, u: 0, a: 0, x: 0} },
      { text: '我自己都还在租房呢，哪有钱赞助他啊，您别为难我了。', scores: {p: 6, u: 5, a: 6, x: 6} }
    ]
  },
  {
    category: 'family', senderName: '父上大人', targetGender: null,
    scenario: '你看看你现在的样子，哪有一点我年轻时候的风范？真是让我失望透顶！',
    options: [
      { text: '爸，我不是您的复制品，我是独立的个体，不需要活成您的样子来证明自己。', scores: {p: 10, u: 10, a: 10, x: 10} },
      { text: '对不起爸，我太没用了，没能成为您的骄傲。', scores: {p: 0, u: 0, a: 0, x: 0} },
      { text: '时代不一样了，您那套老经验现在不一定管用啊。', scores: {p: 8, u: 8, a: 8, x: 8} },
      { text: '我会努力改变自己，争取让您刮目相看的。', scores: {p: 3, u: 2, a: 3, x: 3} }
    ]
  },
  {
    category: 'family', senderName: '奶奶', targetGender: null,
    scenario: '你要是再不生个孙子/曾孙，我死不瞑目啊！',
    options: [
      { text: '奶奶，生育是我个人的选择，请不要用这种道德绑架来施压。', scores: {p: 10, u: 10, a: 10, x: 10} },
      { text: '奶奶您别这么说，我马上就备孕，一定给您生个大胖小子！', scores: {p: 0, u: 0, a: 0, x: 0} },
      { text: '奶奶您身体好着呢，顺其自然吧，这事儿急不来。', scores: {p: 6, u: 5, a: 6, x: 6} },
      { text: '生孩子成本太高了，我们现在条件还不允许啊。', scores: {p: 5, u: 4, a: 5, x: 5} }
    ]
  },
  {
    category: 'family', senderName: '八大姨', targetGender: null,
    scenario: '你在大城市混得也不怎么样嘛，还不如回老家考个公务员，别在外面丢人现眼了。',
    options: [
      { text: '阿姨，我的生活我自己觉得充实就好，不需要向您汇报，更谈不上丢人现眼。', scores: {p: 10, u: 10, a: 10, x: 10} },
      { text: '您说得对，我在外面确实混不下去了，我明天就收拾行李回老家考公。', scores: {p: 0, u: 0, a: 0, x: 0} },
      { text: '大城市机会多嘛，我还想再闯几年看看。', scores: {p: 7, u: 6, a: 7, x: 7} },
      { text: '考公哪有那么容易啊，我在外面虽然辛苦但也还过得去。', scores: {p: 5, u: 4, a: 5, x: 5} }
    ]
  },
  {
    category: 'family', senderName: '母上大人', targetGender: null,
    scenario: '你只要顺着我，我就不生气，你要是气出我个好歹来，你就是不孝！',
    options: [
      { text: '妈，百善孝为先不代表愚孝，如果您总是用健康来要挟我，这种亲情太让人窒息了。', scores: {p: 10, u: 10, a: 10, x: 10} },
      { text: '妈您别生气，我什么都顺着您，您千万保重身体！', scores: {p: 0, u: 0, a: 0, x: 0} },
      { text: '妈，有些事不是我不顺着您，而是原则问题不能让步。', scores: {p: 8, u: 7, a: 8, x: 8} },
      { text: '好吧好吧，您说什么就是什么，我尽量不惹您生气。', scores: {p: 2, u: 1, a: 2, x: 2} }
    ]
  },

  // --- Romance Female Target (5) ---
  {
    category: 'romance', senderName: '男友', targetGender: 'female',
    scenario: '你要是真爱我，就会为了我放弃这个去外地发展的机会，难道工作比我重要？',
    options: [
      { text: '工作和爱情不是非此即彼。如果你真爱我，应该支持我的事业，而不是用爱来绑架我。', scores: {p: 10, u: 10, a: 10, x: 10} },
      { text: '你说得对，没有你我去了外地也不开心，我马上推掉那个机会。', scores: {p: 0, u: 0, a: 0, x: 0} },
      { text: '可是那个机会真的很难得，我们异地恋一段时间不行吗？', scores: {p: 6, u: 5, a: 6, x: 6} },
      { text: '那我再考虑考虑吧，尽量留在你身边。', scores: {p: 3, u: 2, a: 3, x: 3} }
    ]
  },
  {
    category: 'romance', senderName: '未婚夫', targetGender: 'female',
    scenario: '你穿这件裙子太暴露了，以后不许穿，我这都是因为太在乎你、怕你吃亏。',
    options: [
      { text: '我穿什么是我的自由，真正的在乎是尊重，而不是控制我的穿着打扮。', scores: {p: 10, u: 10, a: 10, x: 10} },
      { text: '亲爱的，我知道你是为我好，我以后再也不穿了。', scores: {p: 0, u: 0, a: 0, x: 0} },
      { text: '有那么暴露吗？那我下次出门多穿件外套行了吧。', scores: {p: 4, u: 3, a: 4, x: 4} },
      { text: '可这裙子挺贵的，不穿太可惜了，我只跟你在一起的时候穿好不好？', scores: {p: 2, u: 1, a: 2, x: 2} }
    ]
  },
  {
    category: 'romance', senderName: '老公', targetGender: 'female',
    scenario: '你看别人的老婆每天把家里收拾得干干净净，还做好饭等老公，你怎么这么懒？',
    options: [
      { text: '家是两个人的，家务应该共同分担。如果你想要免费保姆，出门左转家政公司。', scores: {p: 10, u: 10, a: 10, x: 10} },
      { text: '对不起老公，是我太懒了，我以后一定做一个贤妻良母。', scores: {p: 0, u: 0, a: 0, x: 0} },
      { text: '我每天上班也很累啊，你就不能体谅体谅我吗？', scores: {p: 6, u: 5, a: 6, x: 6} },
      { text: '那我以后尽量多干点活，你也稍微帮我一点好不好？', scores: {p: 4, u: 3, a: 4, x: 4} }
    ]
  },
  {
    category: 'romance', senderName: '男友', targetGender: 'female',
    scenario: '我昨天打你是因为我太爱你了，控制不住情绪，原谅我这一次好不好？',
    options: [
      { text: '家暴只有零次和无数次。爱不是暴力的借口，我们分手，而且我会报警。', scores: {p: 10, u: 10, a: 10, x: 10} },
      { text: '我相信你是一时冲动，只要你发誓以后不再动手，我就原谅你。', scores: {p: 0, u: 0, a: 0, x: 0} },
      { text: '你吓死我了，以后再生气也不能动手啊，不然我真的会离开你的。', scores: {p: 3, u: 2, a: 3, x: 3} },
      { text: '我原谅你可以，但我们要去看看心理医生，解决你情绪失控的问题。', scores: {p: 7, u: 7, a: 8, x: 7} }
    ]
  },
  {
    category: 'romance', senderName: '男友', targetGender: 'female',
    scenario: '你除了我，谁还能忍受你这脾气？你应该感到庆幸才对。',
    options: [
      { text: '不要用这种打压的方式来建立你的优越感，我有很多闪光点，不劳你操心。', scores: {p: 10, u: 10, a: 10, x: 10} },
      { text: '谢谢你这么包容我，我这辈子都不会离开你的。', scores: {p: 0, u: 0, a: 0, x: 0} },
      { text: '我的脾气确实有点差，我会努力改的。', scores: {p: 2, u: 1, a: 2, x: 2} },
      { text: '其实我也没那么差劲吧，你别总这么贬低我。', scores: {p: 6, u: 5, a: 6, x: 6} }
    ]
  },

  // --- Romance Male Target (5) ---
  {
    category: 'romance', senderName: '女友', targetGender: 'male',
    scenario: '你看闺蜜男朋友情人节送了十万的包，你只送个破项链，你根本就不爱我！',
    options: [
      { text: '爱情的价值不是用金钱衡量的。如果你更看重物质攀比，我们可能价值观不合。', scores: {p: 10, u: 10, a: 10, x: 10} },
      { text: '宝贝别生气，我马上去借钱给你买那个十万的包，证明我有多爱你！', scores: {p: 0, u: 0, a: 0, x: 0} },
      { text: '我现在的经济实力只能买得起这个，等我以后有钱了一定给你买更好的。', scores: {p: 5, u: 4, a: 5, x: 5} },
      { text: '那条项链也是我精心挑选的，你这么说真的很伤我的心。', scores: {p: 7, u: 6, a: 7, x: 7} }
    ]
  },
  {
    category: 'romance', senderName: '未婚妻', targetGender: 'male',
    scenario: '房产证上必须加上我爸妈的名字，这是你爱我、尊重我家人的诚意体现。',
    options: [
      { text: '房子是我父母一辈子的心血，加你的名字可以商量，加你父母的名字绝不可能。', scores: {p: 10, u: 10, a: 10, x: 10} },
      { text: '没问题亲爱的，只要你开心，加你七大姑八大姨的名字都行！', scores: {p: 0, u: 0, a: 0, x: 0} },
      { text: '这要求有点过分了吧，我得跟我爸妈商量一下。', scores: {p: 5, u: 4, a: 5, x: 5} },
      { text: '可以加，但首付你们家是不是也得按比例出一部分？', scores: {p: 8, u: 8, a: 8, x: 8} }
    ]
  },
  {
    category: 'romance', senderName: '老婆', targetGender: 'male',
    scenario: '我是女孩子，你是个男人，你让着我、全听我的不是理所应当的吗？',
    options: [
      { text: '婚姻里男女平等，我可以包容你，但原则问题上没有谁理所应当必须听谁的。', scores: {p: 10, u: 10, a: 10, x: 10} },
      { text: '老婆大人说得对，千错万错都是我的错，以后家里你说了算！', scores: {p: 0, u: 0, a: 0, x: 0} },
      { text: '平时小事可以听你的，但大事还得我们一起商量。', scores: {p: 7, u: 6, a: 7, x: 7} },
      { text: '老让着你也会累的，你就不能讲讲理吗？', scores: {p: 5, u: 4, a: 5, x: 5} }
    ]
  },
  {
    category: 'romance', senderName: '女友', targetGender: 'male',
    scenario: '我跟男闺蜜去旅游怎么了？我们是清白的，你这么小心眼是不是有心理疾病？',
    options: [
      { text: '异性之间交往要有边界感。这叫底线，不叫心理疾病。既然你觉得正常，那我们分手。', scores: {p: 10, u: 10, a: 10, x: 10} },
      { text: '对不起宝贝，是我太狭隘了，你们好好玩，注意安全。', scores: {p: 0, u: 0, a: 0, x: 0} },
      { text: '孤男寡女去旅游，换做是我跟女闺蜜去，你能接受吗？', scores: {p: 8, u: 8, a: 8, x: 8} },
      { text: '去可以，但你们必须订两个房间，每天晚上要跟我开视频。', scores: {p: 4, u: 3, a: 4, x: 4} }
    ]
  },
  {
    category: 'romance', senderName: '女友', targetGender: 'male',
    scenario: '只要你现在给我转账五万块钱证明你的真心，我就原谅你刚才惹我生气。',
    options: [
      { text: '感情不能明码标价，用钱来衡量真心和换取原谅，这种勒索式的恋爱我不谈了。', scores: {p: 10, u: 10, a: 10, x: 10} },
      { text: '好的宝贝，五万已经转过去了，千万别生我的气了！', scores: {p: 0, u: 0, a: 0, x: 0} },
      { text: '五万太多了，我转你五千买个包消消气好不好？', scores: {p: 2, u: 1, a: 2, x: 2} },
      { text: '我确实惹你生气了，但我现在手头没那么多钱啊。', scores: {p: 5, u: 4, a: 5, x: 5} }
    ]
  }
];

const formattedData = data.map(q => {
  return {
    id: genId(),
    targetGender: q.targetGender,
    type: 'chat',
    scenario: q.scenario,
    senderName: q.senderName,
    category: q.category,
    options: q.options.map(opt => ({
      id: genId(),
      text: opt.text,
      scores: opt.scores
    }))
  };
});

const tsCode = `import type { Question } from '../types';

export const questions: Question[] = ${JSON.stringify(formattedData, null, 2).replace(/"([^"]+)":/g, '$1:')};
`;

fs.writeFileSync('src/data/questions.ts', tsCode);
console.log('Successfully generated and wrote 30 questions to src/data/questions.ts');
