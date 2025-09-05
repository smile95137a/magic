import godCaishen from '@/assets/image/god_caishen.png';
import godGuangong from '@/assets/image/god_guangong.png';
import godWenchang from '@/assets/image/god_wenchang.png';
import godYuelao from '@/assets/image/god_yuelao.png';
import godZhongkui from '@/assets/image/god_zhongkui.png';

import godCaishenG from '@/assets/image/god_caishen_g.png';
import godGuangongG from '@/assets/image/god_guangong_g.png';
import godWenchangG from '@/assets/image/god_wenchang_g.png';
import godYuelaoG from '@/assets/image/god_yuelao_g.png';
import godZhongkuiG from '@/assets/image/god_zhongkui_g.png';

import godCaishenG2 from '@/assets/image/god_caishen_g2.gif';
import godGuangongG2 from '@/assets/image/god_guangong_g2.gif';
import godWenchangG2 from '@/assets/image/god_wenchang_g2.gif';
import godYuelaoG2 from '@/assets/image/god_yuelao_g2.gif';
import godZhongkuiG2 from '@/assets/image/god_zhongkui_g2.gif';

const godImages = {
  'g-cs': {
    label: '財神',
    default: godCaishen,
    highlighted: godCaishenG,
    highlightedAnimate: godCaishenG2,
    description: `<p><b>🪙財神｜玄壇真君 趙公明</b></p>

<p><b>職司：</b>財富之神、五路財神之首</p>

<p>在下是<b>「金龍如意正一龍虎玄壇真君」趙公明</b>，統領
<b>「招寶天尊蕭升」</b>、<b>「納珍天尊曹寶」</b>、
<b>「招財使者陳九公」</b>、<b>「利市仙官姚少司」</b>，
四位神將各司財富領域，合稱<b>「五路財神」</b>，為人間帶來東南西北與中央五方財源。</p>

<p>在《封神演義》中記載，在下雖未直接被封為<b>「財神」</b>，
但因主管財運而廣受信仰。</p>

<p>🔸 台灣農曆正月的著名活動<b>「炸寒單」</b>，
即是模擬在下驅寒祈福的儀式，因此在下也被稱為<b>「寒單爺」</b>，
可保人們平安興旺、財運旺盛。</p>

<p>📿 <b>祈願方向：</b><br>
正財、偏財、事業運、買賣生意、金錢流動</p>
`,
  },
  'g-gg': {
    label: '關公',
    default: godGuangong,
    highlighted: godGuangongG,
    highlightedAnimate: godGuangongG2,
    description: `<p><b>⚔️ 關公｜關聖帝君 關羽</b></p>

<p><b>職司：</b>義氣、守信、財運、商業之神</p>

<p>我名<b>關羽</b>，字雲長，生於東漢末年。為人<b>忠義無雙</b>，即使身在曹營，仍誓死追隨劉備，贏得<b>「雲長真義士」</b>的美譽。因忠義名聲流傳千古，被後人尊稱為<b>「關聖帝君」</b>。</p>

<p>除了義氣形象外，因我<b>精於計算與會計</b>，亦被奉為<b>「商業守護神」</b>、<b>「財神之一」</b>。</p>

<p>📿 <b>祈願方向：</b><br>
經商、守信、招財、人脈、義氣、重振旗鼓</p>
`,
  },
  'g-wc': {
    label: '文昌',
    default: godWenchang,
    highlighted: godWenchangG,
    highlightedAnimate: godWenchangG2,
    description: `<p><b>📝 文昌帝君｜張亞子</b></p>

<p><b>職司：</b>考試、升遷、功名、智慧之神</p>

<p>在下原名<b>張亞子</b>，後因孝順與忠勇之行跡，被封為地方神<b>「梓潼神」</b>，隨後與<b>「文昌星君」</b>合而為一，被玉皇大帝任命掌管人間功名與文運，歷朝受封為<b>「文昌司祿宏仁帝君」</b>。</p>

<p>考生、學生、求職者、想要晉升者皆會祭拜我，祈求靈感與智慧。</p>

<p>📿 <b>祈願方向：</b><br>
考試順利、金榜題名、升職加薪、文思泉湧</p>`,
  },
  'g-yl': {
    label: '月老',
    default: godYuelao,
    highlighted: godYuelaoG,
    highlightedAnimate: godYuelaoG2,
    description: `<p><b>💞 月老｜月下老人</b></p>

<p><b>職司：</b>姻緣配對、婚姻和合、戀愛成功</p>

<p>我乃<b>「月下老人」</b>，俗稱<b>「月老」</b>，掌管人間姻緣與紅線配對。手持姻緣簿與紅線，專責將有緣人牽引至彼此命中。</p>

<p>唐代《續幽怪錄》記載我替韋固配對之事廣為流傳，自此成為華人世界最受歡迎的感情守護神。</p>

<p>📿 <b>祈願方向：</b><br>
求正緣、婚姻幸福、斬爛桃花、情感修復</p>`,
  },
  'g-zk': {
    label: '鍾馗',
    default: godZhongkui,
    highlighted: godZhongkuiG,
    highlightedAnimate: godZhongkuiG2,
    description: `<p><b>👹 鍾馗｜鎮宅賜福真君</b></p>

<p><b>職司：</b>除煞、鎮宅、驅鬼、辟邪</p>

<p>我就是<b>鍾馗</b>，剛正不阿，文武雙全，專門斬妖除魔、守護家宅。民間常將我形象貼於門上作為門神，認為可驅邪保宅、化煞保平安。</p>

<p>亦有信眾稱我為<b>「萬應之神」</b>，有求必應，百無禁忌。</p>

<p>📿 <b>祈願方向：</b><br>
居家平安、去除陰氣、夜驚惡夢、除病氣</p>`,
  },
};

export default godImages;
