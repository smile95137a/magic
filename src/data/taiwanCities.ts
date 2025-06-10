export interface Area {
  zipCode: string;
  areaName: string;
  areaEngName: string;
}

export interface City {
  cityName: string;
  cityEngName: string;
  areaList: Area[];
}

const taiwanCities: City[] = [
  {
    cityName: '臺北市',
    cityEngName: 'Taipei City',
    areaList: [
      {
        zipCode: '100',
        areaName: '中正區',
        areaEngName: 'Zhongzheng Dist.',
      },
      { zipCode: '103', areaName: '大同區', areaEngName: 'Datong Dist.' },
      {
        zipCode: '104',
        areaName: '中山區',
        areaEngName: 'Zhongshan Dist.',
      },
      {
        zipCode: '105',
        areaName: '松山區',
        areaEngName: 'Songshan Dist.',
      },
      { zipCode: '106', areaName: '大安區', areaEngName: 'Da’an Dist.' },
      { zipCode: '108', areaName: '萬華區', areaEngName: 'Wanhua Dist.' },
      { zipCode: '110', areaName: '信義區', areaEngName: 'Xinyi Dist.' },
      { zipCode: '111', areaName: '士林區', areaEngName: 'Shilin Dist.' },
      { zipCode: '112', areaName: '北投區', areaEngName: 'Beitou Dist.' },
      { zipCode: '114', areaName: '內湖區', areaEngName: 'Neihu Dist.' },
      {
        zipCode: '115',
        areaName: '南港區',
        areaEngName: 'Nangang Dist.',
      },
      { zipCode: '116', areaName: '文山區', areaEngName: 'Wenshan Dist.' },
    ],
  },
  {
    cityName: '基隆市',
    cityEngName: 'Keelung City',
    areaList: [
      { zipCode: '200', areaName: '仁愛區', areaEngName: 'Ren’ai Dist.' },
      { zipCode: '201', areaName: '信義區', areaEngName: 'Xinyi Dist.' },
      {
        zipCode: '202',
        areaName: '中正區',
        areaEngName: 'Zhongzheng Dist.',
      },
      {
        zipCode: '203',
        areaName: '中山區',
        areaEngName: 'Zhongshan Dist.',
      },
      { zipCode: '204', areaName: '安樂區', areaEngName: 'Anle Dist.' },
      {
        zipCode: '205',
        areaName: '暖暖區',
        areaEngName: 'Nuannuan Dist.',
      },
      { zipCode: '206', areaName: '七堵區', areaEngName: 'Qidu Dist.' },
    ],
  },
  {
    cityName: '新北市',
    cityEngName: 'New Taipei City',
    areaList: [
      { zipCode: '207', areaName: '萬里區', areaEngName: 'Wanli Dist.' },
      {
        zipCode: '208',
        areaName: '金山區',
        areaEngName: 'Jinshan Dist.',
      },
      {
        zipCode: '220',
        areaName: '板橋區',
        areaEngName: 'Banqiao Dist.',
      },
      { zipCode: '221', areaName: '汐止區', areaEngName: 'Xizhi Dist.' },
      {
        zipCode: '222',
        areaName: '深坑區',
        areaEngName: 'Shenkeng Dist.',
      },
      {
        zipCode: '223',
        areaName: '石碇區',
        areaEngName: 'Shiding Dist.',
      },
      {
        zipCode: '224',
        areaName: '瑞芳區',
        areaEngName: 'Ruifang Dist.',
      },
      { zipCode: '226', areaName: '平溪區', areaEngName: 'Pingxi Dist.' },
      {
        zipCode: '227',
        areaName: '雙溪區',
        areaEngName: 'Shuangxi Dist.',
      },
      {
        zipCode: '228',
        areaName: '貢寮區',
        areaEngName: 'Gongliao Dist.',
      },
      {
        zipCode: '231',
        areaName: '新店區',
        areaEngName: 'Xindian Dist.',
      },
      {
        zipCode: '232',
        areaName: '坪林區',
        areaEngName: 'Pinglin Dist.',
      },
      { zipCode: '233', areaName: '烏來區', areaEngName: 'Wulai Dist.' },
      { zipCode: '234', areaName: '永和區', areaEngName: 'Yonghe Dist.' },
      {
        zipCode: '235',
        areaName: '中和區',
        areaEngName: 'Zhonghe Dist.',
      },
      {
        zipCode: '236',
        areaName: '土城區',
        areaEngName: 'Tucheng Dist.',
      },
      { zipCode: '237', areaName: '三峽區', areaEngName: 'Sanxia Dist.' },
      { zipCode: '238', areaName: '樹林區', areaEngName: 'Shulin Dist.' },
      { zipCode: '239', areaName: '鶯歌區', areaEngName: 'Yingge Dist.' },
      {
        zipCode: '241',
        areaName: '三重區',
        areaEngName: 'Sanchong Dist.',
      },
      {
        zipCode: '242',
        areaName: '新莊區',
        areaEngName: 'Xinzhuang Dist.',
      },
      {
        zipCode: '243',
        areaName: '泰山區',
        areaEngName: 'Taishan Dist.',
      },
      { zipCode: '244', areaName: '林口區', areaEngName: 'Linkou Dist.' },
      { zipCode: '247', areaName: '蘆洲區', areaEngName: 'Luzhou Dist.' },
      { zipCode: '248', areaName: '五股區', areaEngName: 'Wugu Dist.' },
      { zipCode: '249', areaName: '八里區', areaEngName: 'Bali Dist.' },
      { zipCode: '251', areaName: '淡水區', areaEngName: 'Tamsui Dist.' },
      { zipCode: '252', areaName: '三芝區', areaEngName: 'Sanzhi Dist.' },
      { zipCode: '253', areaName: '石門區', areaEngName: 'Shimen Dist.' },
    ],
  },
  {
    cityName: '連江縣',
    cityEngName: 'Lienchiang County',
    areaList: [
      {
        zipCode: '209',
        areaName: '南竿鄉',
        areaEngName: 'Nangan Township',
      },
      {
        zipCode: '210',
        areaName: '北竿鄉',
        areaEngName: 'Beigan Township',
      },
      {
        zipCode: '211',
        areaName: '莒光鄉',
        areaEngName: 'Juguang Township',
      },
      {
        zipCode: '212',
        areaName: '東引鄉',
        areaEngName: 'Dongyin Township',
      },
    ],
  },
  {
    cityName: '宜蘭縣',
    cityEngName: 'Yilan County',
    areaList: [
      { zipCode: '260', areaName: '宜蘭市', areaEngName: 'Yilan City' },
      {
        zipCode: '263',
        areaName: '壯圍鄉',
        areaEngName: 'Zhuangwei Township',
      },
      {
        zipCode: '261',
        areaName: '頭城鎮',
        areaEngName: 'Toucheng Township',
      },
      {
        zipCode: '262',
        areaName: '礁溪鄉',
        areaEngName: 'Jiaoxi Township',
      },
      {
        zipCode: '264',
        areaName: '員山鄉',
        areaEngName: 'Yuanshan Township',
      },
      {
        zipCode: '265',
        areaName: '羅東鎮',
        areaEngName: 'Luodong Township',
      },
      {
        zipCode: '266',
        areaName: '三星鄉',
        areaEngName: 'Sanxing Township',
      },
      {
        zipCode: '267',
        areaName: '大同鄉',
        areaEngName: 'Datong Township',
      },
      {
        zipCode: '268',
        areaName: '五結鄉',
        areaEngName: 'Wujie Township',
      },
      {
        zipCode: '269',
        areaName: '冬山鄉',
        areaEngName: 'Dongshan Township',
      },
      {
        zipCode: '270',
        areaName: '蘇澳鎮',
        areaEngName: 'Su’ao Township',
      },
      {
        zipCode: '272',
        areaName: '南澳鄉',
        areaEngName: 'Nan’ao Township',
      },
      { zipCode: '290', areaName: '釣魚臺', areaEngName: 'Diaoyutai' },
    ],
  },
  {
    cityName: '釣魚臺',
    cityEngName: 'Diauyutai',
    areaList: [
      { zipCode: '290', areaName: '釣魚臺', areaEngName: 'Diaoyutai' },
    ],
  },
  {
    cityName: '新竹市',
    cityEngName: 'Hsinchu City',
    areaList: [
      { zipCode: '300', areaName: '東區', areaEngName: 'East Dist.' },
      { zipCode: '300', areaName: '北區', areaEngName: 'North Dist.' },
      {
        zipCode: '300',
        areaName: '香山區',
        areaEngName: 'Xiangshan Dist.',
      },
    ],
  },
  {
    cityName: '新竹縣',
    cityEngName: 'Hsinchu County',
    areaList: [
      {
        zipCode: '308',
        areaName: '寶山鄉',
        areaEngName: 'Baoshan Township',
      },
      { zipCode: '302', areaName: '竹北市', areaEngName: 'Zhubei City' },
      {
        zipCode: '303',
        areaName: '湖口鄉',
        areaEngName: 'Hukou Township',
      },
      {
        zipCode: '304',
        areaName: '新豐鄉',
        areaEngName: 'Xinfeng Township',
      },
      {
        zipCode: '305',
        areaName: '新埔鎮',
        areaEngName: 'Xinpu Township',
      },
      {
        zipCode: '306',
        areaName: '關西鎮',
        areaEngName: 'Guanxi Township',
      },
      {
        zipCode: '307',
        areaName: '芎林鄉',
        areaEngName: 'Qionglin Township',
      },
      {
        zipCode: '310',
        areaName: '竹東鎮',
        areaEngName: 'Zhudong Township',
      },
      {
        zipCode: '311',
        areaName: '五峰鄉',
        areaEngName: 'Wufeng Township',
      },
      {
        zipCode: '312',
        areaName: '橫山鄉',
        areaEngName: 'Hengshan Township',
      },
      {
        zipCode: '313',
        areaName: '尖石鄉',
        areaEngName: 'Jianshi Township',
      },
      {
        zipCode: '314',
        areaName: '北埔鄉',
        areaEngName: 'Beipu Township',
      },
      { zipCode: '315', areaName: '峨眉鄉', areaEngName: 'Emei Township' },
    ],
  },
  {
    cityName: '桃園市',
    cityEngName: 'Taoyuan City',
    areaList: [
      {
        zipCode: '320',
        areaName: '中壢區',
        areaEngName: 'Zhongli Dist.',
      },
      {
        zipCode: '324',
        areaName: '平鎮區',
        areaEngName: 'Pingzhen Dist.',
      },
      {
        zipCode: '325',
        areaName: '龍潭區',
        areaEngName: 'Longtan Dist.',
      },
      {
        zipCode: '326',
        areaName: '楊梅區',
        areaEngName: 'Yangmei Dist.',
      },
      { zipCode: '327', areaName: '新屋區', areaEngName: 'Xinwu Dist.' },
      {
        zipCode: '328',
        areaName: '觀音區',
        areaEngName: 'Guanyin Dist.',
      },
      {
        zipCode: '330',
        areaName: '桃園區',
        areaEngName: 'Taoyuan Dist.',
      },
      {
        zipCode: '333',
        areaName: '龜山區',
        areaEngName: 'Guishan Dist.',
      },
      { zipCode: '334', areaName: '八德區', areaEngName: 'Bade Dist.' },
      { zipCode: '335', areaName: '大溪區', areaEngName: 'Daxi Dist.' },
      { zipCode: '336', areaName: '復興區', areaEngName: 'Fuxing Dist.' },
      { zipCode: '337', areaName: '大園區', areaEngName: 'Dayuan Dist.' },
      { zipCode: '338', areaName: '蘆竹區', areaEngName: 'Luzhu Dist.' },
    ],
  },
  {
    cityName: '苗栗縣',
    cityEngName: 'Miaoli County',
    areaList: [
      {
        zipCode: '350',
        areaName: '竹南鎮',
        areaEngName: 'Zhunan Township',
      },
      { zipCode: '351', areaName: '頭份市', areaEngName: 'Toufen City' },
      {
        zipCode: '352',
        areaName: '三灣鄉',
        areaEngName: 'Sanwan Township',
      },
      {
        zipCode: '353',
        areaName: '南庄鄉',
        areaEngName: 'Nanzhuang Township',
      },
      {
        zipCode: '354',
        areaName: '獅潭鄉',
        areaEngName: 'Shitan Township',
      },
      {
        zipCode: '356',
        areaName: '後龍鎮',
        areaEngName: 'Houlong Township',
      },
      {
        zipCode: '357',
        areaName: '通霄鎮',
        areaEngName: 'Tongxiao Township',
      },
      {
        zipCode: '358',
        areaName: '苑裡鎮',
        areaEngName: 'Yuanli Township',
      },
      { zipCode: '360', areaName: '苗栗市', areaEngName: 'Miaoli City' },
      {
        zipCode: '361',
        areaName: '造橋鄉',
        areaEngName: 'Zaoqiao Township',
      },
      {
        zipCode: '362',
        areaName: '頭屋鄉',
        areaEngName: 'Touwu Township',
      },
      {
        zipCode: '363',
        areaName: '公館鄉',
        areaEngName: 'Gongguan Township',
      },
      {
        zipCode: '364',
        areaName: '大湖鄉',
        areaEngName: 'Dahu Township',
      },
      {
        zipCode: '365',
        areaName: '泰安鄉',
        areaEngName: 'Tai’an Township',
      },
      {
        zipCode: '366',
        areaName: '銅鑼鄉',
        areaEngName: 'Tongluo Township',
      },
      {
        zipCode: '367',
        areaName: '三義鄉',
        areaEngName: 'Sanyi Township',
      },
      {
        zipCode: '368',
        areaName: '西湖鄉',
        areaEngName: 'Xihu Township',
      },
      {
        zipCode: '369',
        areaName: '卓蘭鎮',
        areaEngName: 'Zhuolan Township',
      },
    ],
  },
  {
    cityName: '臺中市',
    cityEngName: 'Taichung City',
    areaList: [
      { zipCode: '400', areaName: '中區', areaEngName: 'Central Dist.' },
      { zipCode: '401', areaName: '東區', areaEngName: 'East Dist.' },
      { zipCode: '402', areaName: '南區', areaEngName: 'South Dist.' },
      { zipCode: '403', areaName: '西區', areaEngName: 'West Dist.' },
      { zipCode: '404', areaName: '北區', areaEngName: 'North Dist.' },
      { zipCode: '406', areaName: '北屯區', areaEngName: 'Beitun Dist.' },
      { zipCode: '407', areaName: '西屯區', areaEngName: 'Xitun Dist.' },
      { zipCode: '408', areaName: '南屯區', areaEngName: 'Nantun Dist.' },
      {
        zipCode: '411',
        areaName: '太平區',
        areaEngName: 'Taiping Dist.',
      },
      { zipCode: '412', areaName: '大里區', areaEngName: 'Dali Dist.' },
      { zipCode: '413', areaName: '霧峰區', areaEngName: 'Wufeng Dist.' },
      { zipCode: '414', areaName: '烏日區', areaEngName: 'Wuri Dist.' },
      {
        zipCode: '420',
        areaName: '豐原區',
        areaEngName: 'Fengyuan Dist.',
      },
      { zipCode: '421', areaName: '后里區', areaEngName: 'Houli Dist.' },
      {
        zipCode: '422',
        areaName: '石岡區',
        areaEngName: 'Shigang Dist.',
      },
      {
        zipCode: '423',
        areaName: '東勢區',
        areaEngName: 'Dongshi Dist.',
      },
      { zipCode: '424', areaName: '和平區', areaEngName: 'Heping Dist.' },
      { zipCode: '426', areaName: '新社區', areaEngName: 'Xinshe Dist.' },
      { zipCode: '427', areaName: '潭子區', areaEngName: 'Tanzi Dist.' },
      { zipCode: '428', areaName: '大雅區', areaEngName: 'Daya Dist.' },
      {
        zipCode: '429',
        areaName: '神岡區',
        areaEngName: 'Shengang Dist.',
      },
      { zipCode: '432', areaName: '大肚區', areaEngName: 'Dadu Dist.' },
      { zipCode: '433', areaName: '沙鹿區', areaEngName: 'Shalu Dist.' },
      {
        zipCode: '434',
        areaName: '龍井區',
        areaEngName: 'Longjing Dist.',
      },
      { zipCode: '435', areaName: '梧棲區', areaEngName: 'Wuqi Dist.' },
      {
        zipCode: '436',
        areaName: '清水區',
        areaEngName: 'Qingshui Dist.',
      },
      { zipCode: '437', areaName: '大甲區', areaEngName: 'Dajia Dist.' },
      { zipCode: '438', areaName: '外埔區', areaEngName: 'Waipu Dist.' },
      { zipCode: '439', areaName: '大安區', areaEngName: 'Da’an Dist.' },
    ],
  },
  {
    cityName: '彰化縣',
    cityEngName: 'Changhua County',
    areaList: [
      {
        zipCode: '500',
        areaName: '彰化市',
        areaEngName: 'Changhua City',
      },
      {
        zipCode: '502',
        areaName: '芬園鄉',
        areaEngName: 'Fenyuan Township',
      },
      {
        zipCode: '503',
        areaName: '花壇鄉',
        areaEngName: 'Huatan Township',
      },
      {
        zipCode: '504',
        areaName: '秀水鄉',
        areaEngName: 'Xiushui Township',
      },
      {
        zipCode: '505',
        areaName: '鹿港鎮',
        areaEngName: 'Lukang Township',
      },
      {
        zipCode: '506',
        areaName: '福興鄉',
        areaEngName: 'Fuxing Township',
      },
      {
        zipCode: '507',
        areaName: '線西鄉',
        areaEngName: 'Xianxi Township',
      },
      {
        zipCode: '508',
        areaName: '和美鎮',
        areaEngName: 'Hemei Township',
      },
      {
        zipCode: '509',
        areaName: '伸港鄉',
        areaEngName: 'Shengang Township',
      },
      { zipCode: '510', areaName: '員林市', areaEngName: 'Yuanlin City' },
      {
        zipCode: '511',
        areaName: '社頭鄉',
        areaEngName: 'Shetou Township',
      },
      {
        zipCode: '512',
        areaName: '永靖鄉',
        areaEngName: 'Yongjing Township',
      },
      {
        zipCode: '513',
        areaName: '埔心鄉',
        areaEngName: 'Puxin Township',
      },
      {
        zipCode: '514',
        areaName: '溪湖鎮',
        areaEngName: 'Xihu Township',
      },
      {
        zipCode: '515',
        areaName: '大村鄉',
        areaEngName: 'Dacun Township',
      },
      {
        zipCode: '516',
        areaName: '埔鹽鄉',
        areaEngName: 'Puyan Township',
      },
      {
        zipCode: '520',
        areaName: '田中鎮',
        areaEngName: 'Tianzhong Township',
      },
      {
        zipCode: '521',
        areaName: '北斗鎮',
        areaEngName: 'Beidou Township',
      },
      {
        zipCode: '522',
        areaName: '田尾鄉',
        areaEngName: 'Tianwei Township',
      },
      {
        zipCode: '523',
        areaName: '埤頭鄉',
        areaEngName: 'Pitou Township',
      },
      {
        zipCode: '524',
        areaName: '溪州鄉',
        areaEngName: 'Xizhou Township',
      },
      {
        zipCode: '525',
        areaName: '竹塘鄉',
        areaEngName: 'Zhutang Township',
      },
      {
        zipCode: '526',
        areaName: '二林鎮',
        areaEngName: 'Erlin Township',
      },
      {
        zipCode: '527',
        areaName: '大城鄉',
        areaEngName: 'Dacheng Township',
      },
      {
        zipCode: '528',
        areaName: '芳苑鄉',
        areaEngName: 'Fangyuan Township',
      },
      {
        zipCode: '530',
        areaName: '二水鄉',
        areaEngName: 'Ershui Township',
      },
    ],
  },
  {
    cityName: '南投縣',
    cityEngName: 'Nantou County',
    areaList: [
      { zipCode: '540', areaName: '南投市', areaEngName: 'Nantou City' },
      {
        zipCode: '541',
        areaName: '中寮鄉',
        areaEngName: 'Zhongliao Township',
      },
      {
        zipCode: '542',
        areaName: '草屯鎮',
        areaEngName: 'Caotun Township',
      },
      {
        zipCode: '544',
        areaName: '國姓鄉',
        areaEngName: 'Guoxing Township',
      },
      {
        zipCode: '545',
        areaName: '埔里鎮',
        areaEngName: 'Puli Township',
      },
      {
        zipCode: '546',
        areaName: '仁愛鄉',
        areaEngName: 'Ren’ai Township',
      },
      {
        zipCode: '551',
        areaName: '名間鄉',
        areaEngName: 'Mingjian Township',
      },
      {
        zipCode: '552',
        areaName: '集集鎮',
        areaEngName: 'Jiji Township',
      },
      {
        zipCode: '553',
        areaName: '水里鄉',
        areaEngName: 'Shuili Township',
      },
      {
        zipCode: '555',
        areaName: '魚池鄉',
        areaEngName: 'Yuchi Township',
      },
      {
        zipCode: '556',
        areaName: '信義鄉',
        areaEngName: 'Xinyi Township',
      },
      {
        zipCode: '557',
        areaName: '竹山鎮',
        areaEngName: 'Zhushan Township',
      },
      { zipCode: '558', areaName: '鹿谷鄉', areaEngName: 'Lugu Township' },
    ],
  },
  {
    cityName: '嘉義市',
    cityEngName: 'Chiayi City',
    areaList: [
      { zipCode: '600', areaName: '西區', areaEngName: 'West Dist.' },
      { zipCode: '600', areaName: '東區', areaEngName: 'East Dist.' },
    ],
  },
  {
    cityName: '嘉義縣',
    cityEngName: 'Chiayi County',
    areaList: [
      {
        zipCode: '602',
        areaName: '番路鄉',
        areaEngName: 'Fanlu Township',
      },
      {
        zipCode: '603',
        areaName: '梅山鄉',
        areaEngName: 'Meishan Township',
      },
      {
        zipCode: '604',
        areaName: '竹崎鄉',
        areaEngName: 'Zhuqi Township',
      },
      {
        zipCode: '605',
        areaName: '阿里山鄉',
        areaEngName: 'Alishan Township',
      },
      {
        zipCode: '606',
        areaName: '中埔鄉',
        areaEngName: 'Zhongpu Township',
      },
      {
        zipCode: '607',
        areaName: '大埔鄉',
        areaEngName: 'Dapu Township',
      },
      {
        zipCode: '608',
        areaName: '水上鄉',
        areaEngName: 'Shuishang Township',
      },
      {
        zipCode: '611',
        areaName: '鹿草鄉',
        areaEngName: 'Lucao Township',
      },
      { zipCode: '612', areaName: '太保市', areaEngName: 'Taibao City' },
      { zipCode: '613', areaName: '朴子市', areaEngName: 'Puzi City' },
      {
        zipCode: '614',
        areaName: '東石鄉',
        areaEngName: 'Dongshi Township',
      },
      {
        zipCode: '615',
        areaName: '六腳鄉',
        areaEngName: 'Liujiao Township',
      },
      {
        zipCode: '616',
        areaName: '新港鄉',
        areaEngName: 'Xingang Township',
      },
      {
        zipCode: '621',
        areaName: '民雄鄉',
        areaEngName: 'Minxiong Township',
      },
      {
        zipCode: '622',
        areaName: '大林鎮',
        areaEngName: 'Dalin Township',
      },
      {
        zipCode: '623',
        areaName: '溪口鄉',
        areaEngName: 'Xikou Township',
      },
      {
        zipCode: '624',
        areaName: '義竹鄉',
        areaEngName: 'Yizhu Township',
      },
      {
        zipCode: '625',
        areaName: '布袋鎮',
        areaEngName: 'Budai Township',
      },
    ],
  },
  {
    cityName: '雲林縣',
    cityEngName: 'Yunlin County',
    areaList: [
      {
        zipCode: '630',
        areaName: '斗南鎮',
        areaEngName: 'Dounan Township',
      },
      {
        zipCode: '631',
        areaName: '大埤鄉',
        areaEngName: 'Dapi Township',
      },
      {
        zipCode: '632',
        areaName: '虎尾鎮',
        areaEngName: 'Huwei Township',
      },
      {
        zipCode: '633',
        areaName: '土庫鎮',
        areaEngName: 'Tuku Township',
      },
      {
        zipCode: '634',
        areaName: '褒忠鄉',
        areaEngName: 'Baozhong Township',
      },
      {
        zipCode: '635',
        areaName: '東勢鄉',
        areaEngName: 'Dongshi Township',
      },
      {
        zipCode: '636',
        areaName: '臺西鄉',
        areaEngName: 'Taixi Township',
      },
      {
        zipCode: '637',
        areaName: '崙背鄉',
        areaEngName: 'Lunbei Township',
      },
      {
        zipCode: '638',
        areaName: '麥寮鄉',
        areaEngName: 'Mailiao Township',
      },
      { zipCode: '640', areaName: '斗六市', areaEngName: 'Douliu City' },
      {
        zipCode: '643',
        areaName: '林內鄉',
        areaEngName: 'Linnei Township',
      },
      {
        zipCode: '646',
        areaName: '古坑鄉',
        areaEngName: 'Gukeng Township',
      },
      {
        zipCode: '647',
        areaName: '莿桐鄉',
        areaEngName: 'Citong Township',
      },
      {
        zipCode: '648',
        areaName: '西螺鎮',
        areaEngName: 'Xiluo Township',
      },
      {
        zipCode: '649',
        areaName: '二崙鄉',
        areaEngName: 'Erlun Township',
      },
      {
        zipCode: '651',
        areaName: '北港鎮',
        areaEngName: 'Beigang Township',
      },
      {
        zipCode: '652',
        areaName: '水林鄉',
        areaEngName: 'Shuilin Township',
      },
      {
        zipCode: '653',
        areaName: '口湖鄉',
        areaEngName: 'Kouhu Township',
      },
      {
        zipCode: '654',
        areaName: '四湖鄉',
        areaEngName: 'Sihu Township',
      },
      {
        zipCode: '655',
        areaName: '元長鄉',
        areaEngName: 'Yuanchang Township',
      },
    ],
  },
  {
    cityName: '臺南市',
    cityEngName: 'Tainan City',
    areaList: [
      {
        zipCode: '700',
        areaName: '中西區',
        areaEngName: 'West Central Dist.',
      },
      { zipCode: '701', areaName: '東區', areaEngName: 'East Dist.' },
      { zipCode: '702', areaName: '南區', areaEngName: 'South Dist.' },
      { zipCode: '704', areaName: '北區', areaEngName: 'North Dist.' },
      { zipCode: '708', areaName: '安平區', areaEngName: 'Anping Dist.' },
      { zipCode: '709', areaName: '安南區', areaEngName: 'Annan Dist.' },
      {
        zipCode: '710',
        areaName: '永康區',
        areaEngName: 'Yongkang Dist.',
      },
      { zipCode: '711', areaName: '歸仁區', areaEngName: 'Guiren Dist.' },
      { zipCode: '712', areaName: '新化區', areaEngName: 'Xinhua Dist.' },
      {
        zipCode: '713',
        areaName: '左鎮區',
        areaEngName: 'Zuozhen Dist.',
      },
      { zipCode: '714', areaName: '玉井區', areaEngName: 'Yujing Dist.' },
      { zipCode: '715', areaName: '楠西區', areaEngName: 'Nanxi Dist.' },
      { zipCode: '716', areaName: '南化區', areaEngName: 'Nanhua Dist.' },
      { zipCode: '717', areaName: '仁德區', areaEngName: 'Rende Dist.' },
      {
        zipCode: '718',
        areaName: '關廟區',
        areaEngName: 'Guanmiao Dist.',
      },
      { zipCode: '719', areaName: '龍崎區', areaEngName: 'Longqi Dist.' },
      {
        zipCode: '720',
        areaName: '官田區',
        areaEngName: 'Guantian Dist.',
      },
      { zipCode: '721', areaName: '麻豆區', areaEngName: 'Madou Dist.' },
      { zipCode: '722', areaName: '佳里區', areaEngName: 'Jiali Dist.' },
      { zipCode: '723', areaName: '西港區', areaEngName: 'Xigang Dist.' },
      { zipCode: '724', areaName: '七股區', areaEngName: 'Qigu Dist.' },
      {
        zipCode: '725',
        areaName: '將軍區',
        areaEngName: 'Jiangjun Dist.',
      },
      { zipCode: '726', areaName: '學甲區', areaEngName: 'Xuejia Dist.' },
      { zipCode: '727', areaName: '北門區', areaEngName: 'Beimen Dist.' },
      {
        zipCode: '730',
        areaName: '新營區',
        areaEngName: 'Xinying Dist.',
      },
      { zipCode: '731', areaName: '後壁區', areaEngName: 'Houbi Dist.' },
      { zipCode: '732', areaName: '白河區', areaEngName: 'Baihe Dist.' },
      {
        zipCode: '733',
        areaName: '東山區',
        areaEngName: 'Dongshan Dist.',
      },
      { zipCode: '734', areaName: '六甲區', areaEngName: 'Liujia Dist.' },
      {
        zipCode: '735',
        areaName: '下營區',
        areaEngName: 'Xiaying Dist.',
      },
      {
        zipCode: '736',
        areaName: '柳營區',
        areaEngName: 'Liuying Dist.',
      },
      {
        zipCode: '737',
        areaName: '鹽水區',
        areaEngName: 'Yanshui Dist.',
      },
      {
        zipCode: '741',
        areaName: '善化區',
        areaEngName: 'Shanhua Dist.',
      },
      { zipCode: '744', areaName: '新市區', areaEngName: 'Xinshi Dist.' },
      { zipCode: '742', areaName: '大內區', areaEngName: 'Danei Dist.' },
      {
        zipCode: '743',
        areaName: '山上區',
        areaEngName: 'Shanshang Dist.',
      },
      { zipCode: '745', areaName: '安定區', areaEngName: 'Anding Dist.' },
    ],
  },
  {
    cityName: '高雄市',
    cityEngName: 'Kaohsiung City',
    areaList: [
      {
        zipCode: '800',
        areaName: '新興區',
        areaEngName: 'Xinxing Dist.',
      },
      {
        zipCode: '801',
        areaName: '前金區',
        areaEngName: 'Qianjin Dist.',
      },
      { zipCode: '802', areaName: '苓雅區', areaEngName: 'Lingya Dist.' },
      {
        zipCode: '803',
        areaName: '鹽埕區',
        areaEngName: 'Yancheng Dist.',
      },
      { zipCode: '804', areaName: '鼓山區', areaEngName: 'Gushan Dist.' },
      { zipCode: '805', areaName: '旗津區', areaEngName: 'Qijin Dist.' },
      {
        zipCode: '806',
        areaName: '前鎮區',
        areaEngName: 'Qianzhen Dist.',
      },
      { zipCode: '807', areaName: '三民區', areaEngName: 'Sanmin Dist.' },
      { zipCode: '811', areaName: '楠梓區', areaEngName: 'Nanzi Dist.' },
      {
        zipCode: '812',
        areaName: '小港區',
        areaEngName: 'Xiaogang Dist.',
      },
      {
        zipCode: '813',
        areaName: '左營區',
        areaEngName: 'Zuoying Dist.',
      },
      { zipCode: '814', areaName: '仁武區', areaEngName: 'Renwu Dist.' },
      { zipCode: '815', areaName: '大社區', areaEngName: 'Dashe Dist.' },
      {
        zipCode: '817',
        areaName: '東沙群島',
        areaEngName: 'Dongsha Islands',
      },
      {
        zipCode: '819',
        areaName: '南沙群島',
        areaEngName: 'Nansha Islands',
      },
      {
        zipCode: '820',
        areaName: '岡山區',
        areaEngName: 'Gangshan Dist.',
      },
      { zipCode: '821', areaName: '路竹區', areaEngName: 'Luzhu Dist.' },
      { zipCode: '822', areaName: '阿蓮區', areaEngName: 'Alian Dist.' },
      {
        zipCode: '823',
        areaName: '田寮區',
        areaEngName: 'Tianliao Dist.',
      },
      {
        zipCode: '824',
        areaName: '燕巢區',
        areaEngName: 'Yanchao Dist.',
      },
      {
        zipCode: '825',
        areaName: '橋頭區',
        areaEngName: 'Qiaotou Dist.',
      },
      { zipCode: '826', areaName: '梓官區', areaEngName: 'Ziguan Dist.' },
      { zipCode: '827', areaName: '彌陀區', areaEngName: 'Mituo Dist.' },
      {
        zipCode: '828',
        areaName: '永安區',
        areaEngName: 'Yong’an Dist.',
      },
      { zipCode: '829', areaName: '湖內區', areaEngName: 'Hunei Dist.' },
      {
        zipCode: '830',
        areaName: '鳳山區',
        areaEngName: 'Fengshan Dist.',
      },
      { zipCode: '831', areaName: '大寮區', areaEngName: 'Daliao Dist.' },
      {
        zipCode: '832',
        areaName: '林園區',
        areaEngName: 'Linyuan Dist.',
      },
      {
        zipCode: '833',
        areaName: '鳥松區',
        areaEngName: 'Niaosong Dist.',
      },
      { zipCode: '840', areaName: '大樹區', areaEngName: 'Dashu Dist.' },
      { zipCode: '842', areaName: '旗山區', areaEngName: 'Qishan Dist.' },
      {
        zipCode: '843',
        areaName: '美濃區',
        areaEngName: 'Meinong Dist.',
      },
      { zipCode: '844', areaName: '六龜區', areaEngName: 'Liugui Dist.' },
      { zipCode: '845', areaName: '內門區', areaEngName: 'Neimen Dist.' },
      {
        zipCode: '846',
        areaName: '杉林區',
        areaEngName: 'Shanlin Dist.',
      },
      {
        zipCode: '847',
        areaName: '甲仙區',
        areaEngName: 'Jiaxian Dist.',
      },
      {
        zipCode: '848',
        areaName: '桃源區',
        areaEngName: 'Taoyuan Dist.',
      },
      {
        zipCode: '849',
        areaName: '那瑪夏區',
        areaEngName: 'Namaxia Dist.',
      },
      { zipCode: '851', areaName: '茂林區', areaEngName: 'Maolin Dist.' },
      { zipCode: '852', areaName: '茄萣區', areaEngName: 'Qieding Dist.' },
    ],
  },
  {
    cityName: '南海島',
    cityEngName: 'Nanhai',
    areaList: [
      {
        zipCode: '817',
        areaName: '東沙群島',
        areaEngName: 'Dongsha Islands',
      },
      {
        zipCode: '819',
        areaName: '南沙群島',
        areaEngName: 'Nansha Islands',
      },
    ],
  },
  {
    cityName: '澎湖縣',
    cityEngName: 'Penghu County',
    areaList: [
      { zipCode: '880', areaName: '馬公市', areaEngName: 'Magong City' },
      {
        zipCode: '881',
        areaName: '西嶼鄉',
        areaEngName: 'Xiyu Township',
      },
      {
        zipCode: '882',
        areaName: '望安鄉',
        areaEngName: 'Wang’an Township',
      },
      {
        zipCode: '883',
        areaName: '七美鄉',
        areaEngName: 'Qimei Township',
      },
      {
        zipCode: '884',
        areaName: '白沙鄉',
        areaEngName: 'Baisha Township',
      },
      { zipCode: '885', areaName: '湖西鄉', areaEngName: 'Huxi Township' },
    ],
  },
  {
    cityName: '金門縣',
    cityEngName: 'Kinmen County',
    areaList: [
      {
        zipCode: '890',
        areaName: '金沙鎮',
        areaEngName: 'Jinsha Township',
      },
      {
        zipCode: '891',
        areaName: '金湖鎮',
        areaEngName: 'Jinhu Township',
      },
      {
        zipCode: '892',
        areaName: '金寧鄉',
        areaEngName: 'Jinning Township',
      },
      {
        zipCode: '893',
        areaName: '金城鎮',
        areaEngName: 'Jincheng Township',
      },
      {
        zipCode: '894',
        areaName: '烈嶼鄉',
        areaEngName: 'Lieyu Township',
      },
      {
        zipCode: '896',
        areaName: '烏坵鄉',
        areaEngName: 'Wuqiu Township',
      },
    ],
  },
  {
    cityName: '屏東縣',
    cityEngName: 'Pingtung County',
    areaList: [
      {
        zipCode: '900',
        areaName: '屏東市',
        areaEngName: 'Pingtung City',
      },
      {
        zipCode: '901',
        areaName: '三地門鄉',
        areaEngName: 'Sandimen Township',
      },
      {
        zipCode: '902',
        areaName: '霧臺鄉',
        areaEngName: 'Wutai Township',
      },
      {
        zipCode: '903',
        areaName: '瑪家鄉',
        areaEngName: 'Majia Township',
      },
      {
        zipCode: '904',
        areaName: '九如鄉',
        areaEngName: 'Jiuru Township',
      },
      {
        zipCode: '905',
        areaName: '里港鄉',
        areaEngName: 'Ligang Township',
      },
      {
        zipCode: '906',
        areaName: '高樹鄉',
        areaEngName: 'Gaoshu Township',
      },
      {
        zipCode: '907',
        areaName: '鹽埔鄉',
        areaEngName: 'Yanpu Township',
      },
      {
        zipCode: '908',
        areaName: '長治鄉',
        areaEngName: 'Changzhi Township',
      },
      {
        zipCode: '909',
        areaName: '麟洛鄉',
        areaEngName: 'Linluo Township',
      },
      {
        zipCode: '911',
        areaName: '竹田鄉',
        areaEngName: 'Zhutian Township',
      },
      {
        zipCode: '912',
        areaName: '內埔鄉',
        areaEngName: 'Neipu Township',
      },
      {
        zipCode: '913',
        areaName: '萬丹鄉',
        areaEngName: 'Wandan Township',
      },
      {
        zipCode: '920',
        areaName: '潮州鎮',
        areaEngName: 'Chaozhou Township',
      },
      {
        zipCode: '921',
        areaName: '泰武鄉',
        areaEngName: 'Taiwu Township',
      },
      {
        zipCode: '922',
        areaName: '來義鄉',
        areaEngName: 'Laiyi Township',
      },
      {
        zipCode: '923',
        areaName: '萬巒鄉',
        areaEngName: 'Wanluan Township',
      },
      {
        zipCode: '924',
        areaName: '崁頂鄉',
        areaEngName: 'Kanding Township',
      },
      {
        zipCode: '925',
        areaName: '新埤鄉',
        areaEngName: 'Xinpi Township',
      },
      {
        zipCode: '926',
        areaName: '南州鄉',
        areaEngName: 'Nanzhou Township',
      },
      {
        zipCode: '927',
        areaName: '林邊鄉',
        areaEngName: 'Linbian Township',
      },
      {
        zipCode: '928',
        areaName: '東港鎮',
        areaEngName: 'Donggang Township',
      },
      {
        zipCode: '929',
        areaName: '琉球鄉',
        areaEngName: 'Liuqiu Township',
      },
      {
        zipCode: '931',
        areaName: '佳冬鄉',
        areaEngName: 'Jiadong Township',
      },
      {
        zipCode: '932',
        areaName: '新園鄉',
        areaEngName: 'Xinyuan Township',
      },
      {
        zipCode: '940',
        areaName: '枋寮鄉',
        areaEngName: 'Fangliao Township',
      },
      {
        zipCode: '941',
        areaName: '枋山鄉',
        areaEngName: 'Fangshan Township',
      },
      {
        zipCode: '942',
        areaName: '春日鄉',
        areaEngName: 'Chunri Township',
      },
      {
        zipCode: '943',
        areaName: '獅子鄉',
        areaEngName: 'Shizi Township',
      },
      {
        zipCode: '944',
        areaName: '車城鄉',
        areaEngName: 'Checheng Township',
      },
      {
        zipCode: '945',
        areaName: '牡丹鄉',
        areaEngName: 'Mudan Township',
      },
      {
        zipCode: '946',
        areaName: '恆春鎮',
        areaEngName: 'Hengchun Township',
      },
      {
        zipCode: '947',
        areaName: '滿州鄉',
        areaEngName: 'Manzhou Township',
      },
    ],
  },
  {
    cityName: '臺東縣',
    cityEngName: 'Taitung County',
    areaList: [
      { zipCode: '950', areaName: '臺東市', areaEngName: 'Taitung City' },
      {
        zipCode: '951',
        areaName: '綠島鄉',
        areaEngName: 'Ludao Township',
      },
      {
        zipCode: '952',
        areaName: '蘭嶼鄉',
        areaEngName: 'Lanyu Township',
      },
      {
        zipCode: '953',
        areaName: '延平鄉',
        areaEngName: 'Yanping Township',
      },
      {
        zipCode: '954',
        areaName: '卑南鄉',
        areaEngName: 'Beinan Township',
      },
      {
        zipCode: '955',
        areaName: '鹿野鄉',
        areaEngName: 'Luye Township',
      },
      {
        zipCode: '956',
        areaName: '關山鎮',
        areaEngName: 'Guanshan Township',
      },
      {
        zipCode: '957',
        areaName: '海端鄉',
        areaEngName: 'Haiduan Township',
      },
      {
        zipCode: '958',
        areaName: '池上鄉',
        areaEngName: 'Chishang Township',
      },
      {
        zipCode: '959',
        areaName: '東河鄉',
        areaEngName: 'Donghe Township',
      },
      {
        zipCode: '961',
        areaName: '成功鎮',
        areaEngName: 'Chenggong Township',
      },
      {
        zipCode: '962',
        areaName: '長濱鄉',
        areaEngName: 'Changbin Township',
      },
      {
        zipCode: '963',
        areaName: '太麻里鄉',
        areaEngName: 'Taimali Township',
      },
      {
        zipCode: '964',
        areaName: '金峰鄉',
        areaEngName: 'Jinfeng Township',
      },
      {
        zipCode: '965',
        areaName: '大武鄉',
        areaEngName: 'Dawu Township',
      },
      {
        zipCode: '966',
        areaName: '達仁鄉',
        areaEngName: 'Daren Township',
      },
    ],
  },
  {
    cityName: '花蓮縣',
    cityEngName: 'Hualien County',
    areaList: [
      { zipCode: '970', areaName: '花蓮市', areaEngName: 'Hualien City' },
      {
        zipCode: '971',
        areaName: '新城鄉',
        areaEngName: 'Xincheng Township',
      },
      {
        zipCode: '972',
        areaName: '秀林鄉',
        areaEngName: 'Xiulin Township',
      },
      {
        zipCode: '973',
        areaName: '吉安鄉',
        areaEngName: 'Ji’an Township',
      },
      {
        zipCode: '974',
        areaName: '壽豐鄉',
        areaEngName: 'Shoufeng Township',
      },
      {
        zipCode: '975',
        areaName: '鳳林鎮',
        areaEngName: 'Fenglin Township',
      },
      {
        zipCode: '976',
        areaName: '光復鄉',
        areaEngName: 'Guangfu Township',
      },
      {
        zipCode: '977',
        areaName: '豐濱鄉',
        areaEngName: 'Fengbin Township',
      },
      {
        zipCode: '978',
        areaName: '瑞穗鄉',
        areaEngName: 'Ruisui Township',
      },
      {
        zipCode: '979',
        areaName: '萬榮鄉',
        areaEngName: 'Wanrong Township',
      },
      {
        zipCode: '981',
        areaName: '玉里鎮',
        areaEngName: 'Yuli Township',
      },
      {
        zipCode: '982',
        areaName: '卓溪鄉',
        areaEngName: 'Zhuoxi Township',
      },
      { zipCode: '983', areaName: '富里鄉', areaEngName: 'Fuli Township' },
    ],
  },
];

export default taiwanCities;
