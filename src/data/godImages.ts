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

const godImages = {
  caishen: {
    label: '財神',
    default: godCaishen,
    highlighted: godCaishenG,
  },
  guangong: {
    label: '關公',
    default: godGuangong,
    highlighted: godGuangongG,
  },
  wenchang: {
    label: '文昌',
    default: godWenchang,
    highlighted: godWenchangG,
  },
  yuelao: {
    label: '月老',
    default: godYuelao,
    highlighted: godYuelaoG,
  },
  zhongkui: {
    label: '鐘馗',
    default: godZhongkui,
    highlighted: godZhongkuiG,
  },
};

export default godImages;
