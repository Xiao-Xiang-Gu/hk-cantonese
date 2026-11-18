// 課程資料：香港口語粵語、繁體字、粵拼 (LSHK Jyutping)、台灣國語對照
// 新課程請依照同樣格式加進 LESSONS 陣列（GPT 產出的內容貼在這裡）
window.LESSONS = [
  {
    id: "greetings",
    title: "打招呼",
    goal: "見面、道謝、道歉、問名字",
    vocab: [
      { hanzi: "你好", jyutping: "nei5 hou2", mandarin: "你好", note: "比較正式，熟人之間少用" },
      { hanzi: "早晨", jyutping: "zou2 san4", mandarin: "早安", note: "早上見面最常用" },
      { hanzi: "唔該", jyutping: "m4 goi1", mandarin: "麻煩你／請問／謝謝", note: "請人幫忙、向陌生人開口，或為服務道謝時用" },
      { hanzi: "多謝", jyutping: "do1 ze6", mandarin: "謝謝", note: "收到禮物或稱讚時用" },
      { hanzi: "唔好意思", jyutping: "m4 hou2 ji3 si1", mandarin: "不好意思" },
      { hanzi: "係", jyutping: "hai6", mandarin: "是" },
      { hanzi: "唔係", jyutping: "m4 hai6", mandarin: "不是" },
      { hanzi: "拜拜", jyutping: "baai1 baai3", mandarin: "掰掰" },
      { hanzi: "你係唔係台灣人呀？", jyutping: "nei5 hai6 m4 hai6 toi4 waan1 jan4 aa3?", mandarin: "你是不是台灣人？", note: "「係唔係」把肯定和否定放一起問；回答「係」或「唔係」" },
      { hanzi: "你係咪台灣人呀？", jyutping: "nei5 hai6 mai6 toi4 waan1 jan4 aa3?", mandarin: "你是不是台灣人？", note: "「係咪」是「係唔係」的口語縮略，日常更常聽到" },
      { hanzi: "你叫咩名呀？", jyutping: "nei5 giu3 me1 meng2 aa3?", mandarin: "你叫什麼名字？" },
      { hanzi: "我叫阿明", jyutping: "ngo5 giu3 aa3 ming4", mandarin: "我叫阿明" },
      { hanzi: "食咗飯未呀？", jyutping: "sik6 zo2 faan6 mei6 aa3?", mandarin: "吃飯了沒？", note: "常見的寒暄，不一定真的要約吃飯" }
    ],
    dialogue: [
      { speaker: "A", hanzi: "早晨！", jyutping: "zou2 san4!", mandarin: "早安！" },
      { speaker: "B", hanzi: "早晨！食咗早餐未呀？", jyutping: "zou2 san4! sik6 zo2 zou2 caan1 mei6 aa3?", mandarin: "早安！吃早餐了沒？" },
      { speaker: "A", hanzi: "食咗喇，你呢？", jyutping: "sik6 zo2 laa3, nei5 ne1?", mandarin: "吃過了，你呢？" },
      { speaker: "B", hanzi: "未呀，而家去食。", jyutping: "mei6 aa3, ji4 gaa1 heoi3 sik6.", mandarin: "還沒，我現在要去吃。" }
    ],
    tips: [
      "「咗」(zo2) 放在動詞後面表示完成，等於國語的「了」。",
      "「未」(mei6) 放句尾問「……了沒？」，回答「未」就是「還沒」。",
      "「唔」(m4) 等於國語的「不」。"
    ]
  },
  {
    id: "cha-chaan-teng",
    title: "茶餐廳點餐",
    goal: "點飲料、點食物、內用外帶、結帳",
    vocab: [
      { hanzi: "凍檸茶", jyutping: "dung3 ning2 caa4", mandarin: "冰檸檬茶", note: "簡稱「檸茶」的「檸」讀 ning2；完整說「檸檬茶」是 ning4 mung1 caa4" },
      { hanzi: "奶茶", jyutping: "naai5 caa4", mandarin: "港式奶茶" },
      { hanzi: "菠蘿油", jyutping: "bo1 lo4 jau4", mandarin: "夾奶油的菠蘿麵包" },
      { hanzi: "我要", jyutping: "ngo5 jiu3", mandarin: "我要" },
      { hanzi: "少甜", jyutping: "siu2 tim4", mandarin: "少糖" },
      { hanzi: "走冰", jyutping: "zau2 bing1", mandarin: "去冰", note: "「走」在點餐時是「不要加」的意思；店員之間也常說「走雪」(zau2 syut3)" },
      { hanzi: "堂食", jyutping: "tong4 sik6", mandarin: "內用" },
      { hanzi: "外賣", jyutping: "ngoi6 maai6", mandarin: "外帶" },
      { hanzi: "喺度食定拎走呀？", jyutping: "hai2 dou6 sik6 ding6 ling1 zau2 aa3?", mandarin: "內用還是外帶？", note: "「堂食定外賣呀？」的另一種口語問法；「拎走」就是帶走" },
      { hanzi: "埋單", jyutping: "maai4 daan1", mandarin: "結帳" },
      { hanzi: "幾多錢呀？", jyutping: "gei2 do1 cin2 aa3?", mandarin: "多少錢？" },
      { hanzi: "蚊", jyutping: "man1", mandarin: "（港幣）元", note: "書面寫「元」，口語說「蚊」" }
    ],
    dialogue: [
      { speaker: "店員", hanzi: "食乜嘢呀？", jyutping: "sik6 mat1 je5 aa3?", mandarin: "要點什麼？" },
      { speaker: "客人", hanzi: "一個菠蘿油，一杯凍檸茶少甜，唔該。", jyutping: "jat1 go3 bo1 lo4 jau4, jat1 bui1 dung3 ning2 caa4 siu2 tim4, m4 goi1.", mandarin: "一個菠蘿油、一杯冰檸檬茶少糖，謝謝。" },
      { speaker: "店員", hanzi: "堂食定外賣呀？", jyutping: "tong4 sik6 ding6 ngoi6 maai6 aa3?", mandarin: "內用還是外帶？" },
      { speaker: "客人", hanzi: "堂食，唔該。", jyutping: "tong4 sik6, m4 goi1.", mandarin: "內用，謝謝。" },
      { speaker: "客人", hanzi: "唔該，埋單！", jyutping: "m4 goi1, maai4 daan1!", mandarin: "麻煩結帳！" },
      { speaker: "店員", hanzi: "四十六蚊。", jyutping: "sei3 sap6 luk6 man1.", mandarin: "港幣四十六元。" }
    ],
    tips: [
      "「定」(ding6) 用在選擇問句，等於國語的「還是」。",
      "「乜嘢」(mat1 je5) 等於「什麼」，口語也常簡化成「咩」(me1)，例如「食咩呀？」(sik6 me1 aa3?)。",
      "香港點餐常省略「我要」，直接講餐點，句尾加「唔該」。",
      "叫店員時說「唔該」就可以，不用說「你好」。"
    ]
  },
  {
    id: "asking-for-directions",
    title: "街上問路",
    goal: "能有禮貌地問地點在哪裡、怎麼走，並聽懂轉彎方向和步行時間。",
    vocab: [
      { hanzi: "港鐵站", jyutping: "gong2 tit3 zaam6", mandarin: "港鐵車站", note: "「港鐵」是香港的鐵路系統，類似台灣的捷運。" },
      { hanzi: "廁所", jyutping: "ci3 so2", mandarin: "廁所" },
      { hanzi: "喺邊度呀？", jyutping: "hai2 bin1 dou6 aa3?", mandarin: "在哪裡？", note: "「喺」表示「在」，「邊度」是口語的「哪裡」。" },
      { hanzi: "點去呀？", jyutping: "dim2 heoi3 aa3?", mandarin: "怎麼去？", note: "「點」在這裡是口語的「怎麼」。" },
      { hanzi: "前面", jyutping: "cin4 min6", mandarin: "前面" },
      { hanzi: "直行", jyutping: "zik6 haang4", mandarin: "直走", note: "「行」表示走路時讀 haang4。問路時口語更常說「一直行」(jat1 zik6 haang4)。" },
      { hanzi: "路口", jyutping: "lou6 hau2", mandarin: "路口" },
      { hanzi: "轉左", jyutping: "zyun3 zo2", mandarin: "左轉" },
      { hanzi: "轉右", jyutping: "zyun3 jau6", mandarin: "右轉" },
      { hanzi: "右手邊", jyutping: "jau6 sau2 bin1", mandarin: "右手邊" },
      { hanzi: "要幾耐呀？", jyutping: "jiu3 gei2 noi6 aa3?", mandarin: "要多久？", note: "「幾耐」是口語的「多久」。" },
      { hanzi: "唔該晒！", jyutping: "m4 goi1 saai3!", mandarin: "太謝謝你了！", note: "對方幫忙後，可以用這句加強謝意。" }
    ],
    dialogue: [
      { speaker: "A", hanzi: "唔該，港鐵站喺邊度呀？", jyutping: "m4 goi1, gong2 tit3 zaam6 hai2 bin1 dou6 aa3?", mandarin: "請問，港鐵車站在哪裡？" },
      { speaker: "B", hanzi: "喺前面，你一直行，去到路口轉左。", jyutping: "hai2 cin4 min6, nei5 jat1 zik6 haang4, heoi3 dou3 lou6 hau2 zyun3 zo2.", mandarin: "在前面，你一直走，走到路口左轉。" },
      { speaker: "A", hanzi: "轉左之後呢？", jyutping: "zyun3 zo2 zi1 hau6 ne1?", mandarin: "左轉之後呢？" },
      { speaker: "B", hanzi: "就喺你右手邊。", jyutping: "zau6 hai2 nei5 jau6 sau2 bin1.", mandarin: "就在你右手邊。" },
      { speaker: "A", hanzi: "行過去要幾耐呀？", jyutping: "haang4 gwo3 heoi3 jiu3 gei2 noi6 aa3?", mandarin: "走過去要多久？" },
      { speaker: "B", hanzi: "五分鐘左右。", jyutping: "ng5 fan1 zung1 zo2 jau6.", mandarin: "大約五分鐘。" },
      { speaker: "A", hanzi: "唔該晒！", jyutping: "m4 goi1 saai3!", mandarin: "太謝謝你了！" }
    ],
    tips: [
      "問位置用「地點＋喺邊度呀？」，回答可以直接說「喺前面」。",
      "問走法用「點去呀？」，可以把目的地放前面：「港鐵站點去呀？」。",
      "粵語說「轉左、轉右」，方向放在「轉」後面；「動作＋之後」表示做完以後。",
      "「幾耐」問時間長短；「五分鐘左右」的「左右」放在時間後面，表示大約。"
    ]
  },
  {
    id: "taking-the-mtr",
    title: "搭港鐵",
    goal: "能在旺角站問清楚去尖沙咀要搭哪條線、往哪個方向、要不要轉車、要搭幾站。",
    vocab: [
      { hanzi: "旺角", jyutping: "wong6 gok3", mandarin: "旺角" },
      { hanzi: "尖沙咀", jyutping: "zim1 saa1 zeoi2", mandarin: "尖沙咀", note: "「咀」在這裡讀 zeoi2。" },
      { hanzi: "荃灣綫", jyutping: "cyun4 waan1 sin3", mandarin: "荃灣線", note: "港鐵標示用「綫」，和「線」同義。" },
      { hanzi: "中環", jyutping: "zung1 waan4", mandarin: "中環" },
      { hanzi: "搭", jyutping: "daap3", mandarin: "搭乘", note: "口語說「搭車」，正式文字會寫「乘搭」或「乘坐」。" },
      { hanzi: "搭邊條綫呀？", jyutping: "daap3 bin1 tiu4 sin3 aa3?", mandarin: "要搭哪一條線？", note: "「邊」是「哪」，「條」是路線的量詞。" },
      { hanzi: "使唔使轉車呀？", jyutping: "sai2 m4 sai2 zyun3 ce1 aa3?", mandarin: "要轉車嗎？", note: "「使唔使」是口語的「要不要／需不需要」。" },
      { hanzi: "唔使", jyutping: "m4 sai2", mandarin: "不用" },
      { hanzi: "要搭幾多個站呀？", jyutping: "jiu3 daap3 gei2 do1 go3 zaam6 aa3?", mandarin: "要搭幾站？" },
      { hanzi: "落車", jyutping: "lok6 ce1", mandarin: "下車", note: "口語說「落車」，正式文字寫「下車」。" },
      { hanzi: "月台", jyutping: "jyut6 toi4", mandarin: "月台", note: "香港：月台／中國大陸：站台。台灣、澳門也說「月台」。" },
      { hanzi: "往中環", jyutping: "wong5 zung1 waan4", mandarin: "往中環方向", note: "港鐵廣播和標示的說法，例如「往中環列車即將到達」；口語也會說「去中環嗰班車」。" }
    ],
    dialogue: [
      { speaker: "A", hanzi: "唔該，我想去尖沙咀，要搭邊條綫呀？", jyutping: "m4 goi1, ngo5 soeng2 heoi3 zim1 saa1 zeoi2, jiu3 daap3 bin1 tiu4 sin3 aa3?", mandarin: "請問，我想去尖沙咀，要搭哪一條線？" },
      { speaker: "B", hanzi: "搭荃灣綫，去中環方向。", jyutping: "daap3 cyun4 waan1 sin3, heoi3 zung1 waan4 fong1 hoeng3.", mandarin: "搭荃灣線，往中環方向。" },
      { speaker: "A", hanzi: "使唔使轉車呀？", jyutping: "sai2 m4 sai2 zyun3 ce1 aa3?", mandarin: "要轉車嗎？" },
      { speaker: "B", hanzi: "唔使。", jyutping: "m4 sai2.", mandarin: "不用。" },
      { speaker: "A", hanzi: "咁要搭幾多個站呀？", jyutping: "gam2 jiu3 daap3 gei2 do1 go3 zaam6 aa3?", mandarin: "那要搭幾站？" },
      { speaker: "B", hanzi: "三個站，喺尖沙咀落車就得喇。", jyutping: "saam1 go3 zaam6, hai2 zim1 saa1 zeoi2 lok6 ce1 zau6 dak1 laa3.", mandarin: "三站，在尖沙咀下車就可以了。" },
      { speaker: "A", hanzi: "明白喇，唔該晒！", jyutping: "ming4 baak6 laa3, m4 goi1 saai3!", mandarin: "懂了，謝謝你！" }
    ],
    tips: [
      "問「哪一條線」用「邊條綫」，問「幾站」用「幾多個站」，粵語都保留量詞。",
      "「使唔使」把肯定和否定放一起問，意思是「需不需要」；回答「不用」就說「唔使」。",
      "「往中環方向」指列車開往的終點方向，沿途可在尖沙咀下車；口語也說「去中環嗰班車」，「嗰班車」就是「那班車」。",
      "「就得喇」表示「這樣就可以了」。"
    ]
  },
  {
    id: "shopping-for-clothes",
    title: "逛街買東西",
    goal: "能用「呢、嗰」和量詞指商品，用兩種說法問價錢，並問尺寸和試衣間的位置。",
    vocab: [
      { hanzi: "呢件衫", jyutping: "ni1 gin6 saam1", mandarin: "這件衣服", note: "「呢」是口語的「這」，在這裡讀 ni1；「件」是衣服的量詞。" },
      { hanzi: "嗰件衫", jyutping: "go2 gin6 saam1", mandarin: "那件衣服", note: "「嗰」是口語的「那」，放在量詞前面。" },
      { hanzi: "呢條褲", jyutping: "ni1 tiu4 fu3", mandarin: "這件褲子", note: "粵語用「條」數褲子。" },
      { hanzi: "嗰對鞋", jyutping: "go2 deoi3 haai4", mandarin: "那雙鞋", note: "粵語用「對」數成雙的鞋子。" },
      { hanzi: "幾錢呀？", jyutping: "gei2 cin2 aa3?", mandarin: "多少錢？", note: "香港購物時常聽到的簡短問法。" },
      { hanzi: "幾多錢呀？", jyutping: "gei2 do1 cin2 aa3?", mandarin: "多少錢？", note: "和「幾錢呀？」都可以問價錢。" },
      { hanzi: "中碼", jyutping: "zung1 maa5", mandarin: "中號", note: "小號叫「細碼」，大號叫「大碼」。" },
      { hanzi: "有冇細碼呀？", jyutping: "jau5 mou5 sai3 maa5 aa3?", mandarin: "有小號嗎？" },
      { hanzi: "試身", jyutping: "si3 san1", mandarin: "試穿", note: "香港買衣服時常用的說法。" },
      { hanzi: "試身室喺邊度呀？", jyutping: "si3 san1 sat1 hai2 bin1 dou6 aa3?", mandarin: "試衣間在哪裡？" },
      { hanzi: "啱身", jyutping: "ngaam1 san1", mandarin: "合身", note: "「啱」在這裡表示合適。" },
      { hanzi: "我要呢件。", jyutping: "ngo5 jiu3 ni1 gin6.", mandarin: "我要這件。", note: "雙方都知道在講衣服時，可以省略「衫」。" }
    ],
    dialogue: [
      { speaker: "A", hanzi: "唔該，呢件衫幾錢呀？", jyutping: "m4 goi1, ni1 gin6 saam1 gei2 cin2 aa3?", mandarin: "請問，這件衣服多少錢？" },
      { speaker: "B", hanzi: "一百二十蚊。", jyutping: "jat1 baak3 ji6 sap6 man1.", mandarin: "港幣一百二十元。" },
      { speaker: "A", hanzi: "嗰件呢？", jyutping: "go2 gin6 ne1?", mandarin: "那件呢？" },
      { speaker: "B", hanzi: "嗰件一百蚊。", jyutping: "go2 gin6 jat1 baak3 man1.", mandarin: "那件港幣一百元。" },
      { speaker: "A", hanzi: "嗰件有冇細碼呀？", jyutping: "go2 gin6 jau5 mou5 sai3 maa5 aa3?", mandarin: "那件有小號嗎？" },
      { speaker: "B", hanzi: "有呀。", jyutping: "jau5 aa3.", mandarin: "有啊。" },
      { speaker: "A", hanzi: "唔該，我想試身。試身室喺邊度呀？", jyutping: "m4 goi1, ngo5 soeng2 si3 san1. si3 san1 sat1 hai2 bin1 dou6 aa3?", mandarin: "我想試穿。請問試衣間在哪裡？" },
      { speaker: "B", hanzi: "喺嗰邊。", jyutping: "hai2 go2 bin1.", mandarin: "在那邊。" }
    ],
    tips: [
      "指商品用「呢／嗰＋量詞＋名詞」：「衫」用「件」，「褲」用「條」，「鞋」用「對」。",
      "雙方都知道在指什麼時，可以只說「呢件」「嗰件」。「嗰件呢？」句尾的「呢」讀 ne1，和「呢件」的 ni1 不同。",
      "「幾錢呀？」和「幾多錢呀？」都能問價格；先說商品：「呢件衫幾錢呀？」。",
      "問有沒有某個尺寸用「有冇＋尺寸＋呀？」，回答「有呀」或「冇呀」。"
    ]
  },
  {
    id: "checking-in-at-a-hotel",
    title: "入住酒店",
    goal: "能說明已經訂房、出示護照辦理入住，並詢問退房時間和能不能寄放行李。",
    vocab: [
      { hanzi: "酒店", jyutping: "zau2 dim3", mandarin: "飯店", note: "香港說「酒店」，台灣通常說「飯店」。" },
      { hanzi: "訂咗房", jyutping: "deng6 zo2 fong2", mandarin: "已經訂房了", note: "預訂的「訂」口語讀 deng6。" },
      { hanzi: "book 咗房", jyutping: "buk1 zo2 fong2", mandarin: "已經訂房了", note: "香港口語常把英文 book 接上「咗」；book 的港式讀法標 buk1。" },
      { hanzi: "check in", jyutping: "check in", mandarin: "辦理入住", note: "香港飯店情境直接夾用英文；書面寫「辦理入住手續」。" },
      { hanzi: "check out", jyutping: "check out", mandarin: "辦理退房", note: "也可以說「退房」。" },
      { hanzi: "護照", jyutping: "wu6 ziu3", mandarin: "護照", note: "量詞用「本」：一本護照。" },
      { hanzi: "房卡", jyutping: "fong2 kaat1", mandarin: "房卡", note: "量詞用「張」：一張房卡。" },
      { hanzi: "聽日", jyutping: "ting1 jat6", mandarin: "明天", note: "口語說「聽日」，書面寫「明天」。" },
      { hanzi: "幾點要 check out 呀？", jyutping: "gei2 dim2 jiu3 check out aa3?", mandarin: "幾點要退房？" },
      { hanzi: "中午十二點前", jyutping: "zung1 ng5 sap6 ji6 dim2 cin4", mandarin: "中午十二點前" },
      { hanzi: "寄存行李", jyutping: "gei3 cyun4 hang4 lei5", mandarin: "寄放行李", note: "正式的服務名稱。單講「寄行李」容易被聽成要郵寄出去。" },
      { hanzi: "可唔可以幫我睇住啲行李呀？", jyutping: "ho2 m4 ho2 ji5 bong1 ngo5 tai2 zyu6 di1 hang4 lei5 aa3?", mandarin: "可以幫我顧一下行李嗎？", note: "口頭請櫃台寄放行李時，比「寄存行李」更口語。" },
      { hanzi: "擺低", jyutping: "baai2 dai1", mandarin: "放下／放在這裡", note: "「擺低喺度」就是「放在這裡」。" }
    ],
    dialogue: [
      { speaker: "A", hanzi: "唔該，我訂咗房，想 check in。", jyutping: "m4 goi1, ngo5 deng6 zo2 fong2, soeng2 check in.", mandarin: "你好，我有訂房，想辦理入住。" },
      { speaker: "B", hanzi: "好呀，唔該，可唔可以畀我睇下你嘅護照？", jyutping: "hou2 aa3, m4 goi1, ho2 m4 ho2 ji5 bei2 ngo5 tai2 haa5 nei5 ge3 wu6 ziu3?", mandarin: "好的，麻煩讓我看一下您的護照好嗎？" },
      { speaker: "A", hanzi: "好，畀你。", jyutping: "hou2, bei2 nei5.", mandarin: "好，給您。" },
      { speaker: "B", hanzi: "唔該，呢張係你嘅房卡。", jyutping: "m4 goi1, ni1 zoeng1 hai6 nei5 ge3 fong2 kaat1.", mandarin: "謝謝，這是您的房卡。" },
      { speaker: "A", hanzi: "唔該，聽日幾點要 check out 呀？", jyutping: "m4 goi1, ting1 jat6 gei2 dim2 jiu3 check out aa3?", mandarin: "謝謝，請問明天幾點要退房？" },
      { speaker: "B", hanzi: "中午十二點前。", jyutping: "zung1 ng5 sap6 ji6 dim2 cin4.", mandarin: "中午十二點前。" },
      { speaker: "A", hanzi: "check out 之後，可唔可以寄存行李呀？", jyutping: "check out zi1 hau6, ho2 m4 ho2 ji5 gei3 cyun4 hang4 lei5 aa3?", mandarin: "退房後可以寄放行李嗎？" },
      { speaker: "B", hanzi: "可以呀，擺低喺度就得喇。", jyutping: "ho2 ji5 aa3, baai2 dai1 hai2 dou6 zau6 dak1 laa3.", mandarin: "可以，放在這裡就好。" }
    ],
    tips: [
      "「訂咗房」表示訂房已經完成；英文動詞也能套這個句型：「book 咗房」。",
      "「想＋動作」說明來意，例如「我想 check in」。",
      "「可唔可以＋動作」問能不能做某件事，例如「可唔可以寄存行李呀？」。",
      "「嘅」表示所屬：「你嘅房卡」就是「你的房卡」。"
    ]
  },
  {
    id: "meeting-new-friends",
    title: "認識新朋友",
    goal: "能介紹自己從哪裡來、做什麼工作、平常喜歡做什麼，並用「你呢？」把話題接回去。",
    vocab: [
      { hanzi: "我係台灣人。", jyutping: "ngo5 hai6 toi4 waan1 jan4.", mandarin: "我是台灣人。", note: "「係」讀 hai6，表示「是」。" },
      { hanzi: "我喺台北嚟嘅。", jyutping: "ngo5 hai2 toi4 bak1 lai4 ge3.", mandarin: "我是從台北來的。", note: "句尾的「嘅」讓句子聽起來完整，單講「我喺台北嚟」像沒說完。" },
      { hanzi: "你邊度嚟㗎？", jyutping: "nei5 bin1 dou6 lai4 gaa3?", mandarin: "你是從哪裡來的？", note: "「㗎」是這句的語氣詞。" },
      { hanzi: "你做邊行㗎？", jyutping: "nei5 zou6 bin1 hong4 gaa3?", mandarin: "你做哪一行的？", note: "「行」表示行業時讀 hong4。" },
      { hanzi: "我做設計嘅。", jyutping: "ngo5 zou6 cit3 gai3 ge3.", mandarin: "我是做設計的。", note: "可以換成其他工作，例如「我做會計嘅」。" },
      { hanzi: "得閒", jyutping: "dak1 haan4", mandarin: "有空", note: "「得閒嗰陣」就是「有空的時候」。" },
      { hanzi: "你得閒嗰陣鍾意做咩呀？", jyutping: "nei5 dak1 haan4 go2 zan6 zung1 ji3 zou6 me1 aa3?", mandarin: "你有空的時候喜歡做什麼？" },
      { hanzi: "我鍾意", jyutping: "ngo5 zung1 ji3", mandarin: "我喜歡", note: "後面直接接活動，例如「我鍾意影相」。" },
      { hanzi: "行山", jyutping: "haang4 saan1", mandarin: "爬山／健行", note: "香港口語指沿山徑健行。" },
      { hanzi: "影相", jyutping: "jing2 soeng2", mandarin: "拍照" },
      { hanzi: "睇戲", jyutping: "tai2 hei3", mandarin: "看電影" },
      { hanzi: "你呢？", jyutping: "nei5 ne1?", mandarin: "你呢？", note: "說完自己的答案後，請對方回答同一個問題。" }
    ],
    dialogue: [
      { speaker: "A", hanzi: "你好！你邊度嚟㗎？", jyutping: "nei5 hou2! nei5 bin1 dou6 lai4 gaa3?", mandarin: "你好！你是哪裡人？" },
      { speaker: "B", hanzi: "我係台灣人，喺台北嚟嘅。你呢？", jyutping: "ngo5 hai6 toi4 waan1 jan4, hai2 toi4 bak1 lai4 ge3. nei5 ne1?", mandarin: "我是台灣人，從台北來的。你呢？" },
      { speaker: "A", hanzi: "我係香港人。你做邊行㗎？", jyutping: "ngo5 hai6 hoeng1 gong2 jan4. nei5 zou6 bin1 hong4 gaa3?", mandarin: "我是香港人。你做哪一行的？" },
      { speaker: "B", hanzi: "我做設計嘅。你呢？", jyutping: "ngo5 zou6 cit3 gai3 ge3. nei5 ne1?", mandarin: "我是做設計的。你呢？" },
      { speaker: "A", hanzi: "我做會計嘅。你得閒嗰陣鍾意做咩呀？", jyutping: "ngo5 zou6 wui6 gai3 ge3. nei5 dak1 haan4 go2 zan6 zung1 ji3 zou6 me1 aa3?", mandarin: "我是做會計的。你有空的時候喜歡做什麼？" },
      { speaker: "B", hanzi: "我鍾意行山同影相。你呢？", jyutping: "ngo5 zung1 ji3 haang4 saan1 tung4 jing2 soeng2. nei5 ne1?", mandarin: "我喜歡爬山和拍照。你呢？" },
      { speaker: "A", hanzi: "我鍾意睇戲。", jyutping: "ngo5 zung1 ji3 tai2 hei3.", mandarin: "我喜歡看電影。" },
      { speaker: "B", hanzi: "我都鍾意睇戲！", jyutping: "ngo5 dou1 zung1 ji3 tai2 hei3!", mandarin: "我也喜歡看電影！" }
    ],
    tips: [
      "「我係＋地方＋人」說自己是哪裡人；「我喺＋地方＋嚟嘅」說從哪裡來。注意「係」hai6、「喺」hai2。",
      "問行業用「你做邊行㗎？」，回答用「我做＋工作＋嘅」。",
      "「我鍾意＋活動」說興趣；「同」連接兩個活動：「行山同影相」。",
      "回答完加一句「你呢？」；興趣相同時說「我都鍾意……」（我也喜歡……）。"
    ]
  },
  {
    id: "making-plans",
    title: "約時間見面",
    goal: "能問對方有沒有空，約好見面的日期、時間和地點，並在改約時確認新的安排。",
    vocab: [
      { hanzi: "今日", jyutping: "gam1 jat6", mandarin: "今天" },
      { hanzi: "聽日", jyutping: "ting1 jat6", mandarin: "明天", note: "口語說「聽日」，書面寫「明天」。" },
      { hanzi: "後日", jyutping: "hau6 jat6", mandarin: "後天" },
      { hanzi: "下晝", jyutping: "haa6 zau3", mandarin: "下午", note: "口語說「下晝」，書面寫「下午」。" },
      { hanzi: "你聽日得唔得閒呀？", jyutping: "nei5 ting1 jat6 dak1 m4 dak1 haan4 aa3?", mandarin: "你明天有空嗎？", note: "有空答「得呀」，沒空答「唔得閒呀」。" },
      { hanzi: "幾點見呀？", jyutping: "gei2 dim2 gin3 aa3?", mandarin: "幾點見？", note: "問哪天見可以說「邊日見呀？」。" },
      { hanzi: "下晝三點半", jyutping: "haa6 zau3 saam1 dim2 bun3", mandarin: "下午三點半" },
      { hanzi: "喺邊度等呀？", jyutping: "hai2 bin1 dou6 dang2 aa3?", mandarin: "在哪裡碰面？" },
      { hanzi: "喺旺角站等。", jyutping: "hai2 wong6 gok3 zaam6 dang2.", mandarin: "在旺角站碰面。" },
      { hanzi: "可唔可以改到後日呀？", jyutping: "ho2 m4 ho2 ji5 goi2 dou3 hau6 jat6 aa3?", mandarin: "可以改到後天嗎？", note: "「改到」後面接新的日期或時間。" },
      { hanzi: "OK", jyutping: "OK", mandarin: "好啊／沒問題", note: "香港口語常直接用英文 OK 表示同意。" },
      { hanzi: "後日見！", jyutping: "hau6 jat6 gin3!", mandarin: "後天見！" }
    ],
    dialogue: [
      { speaker: "A", hanzi: "你聽日下晝得唔得閒呀？", jyutping: "nei5 ting1 jat6 haa6 zau3 dak1 m4 dak1 haan4 aa3?", mandarin: "你明天下午有空嗎？" },
      { speaker: "B", hanzi: "得呀，幾點見呀？", jyutping: "dak1 aa3, gei2 dim2 gin3 aa3?", mandarin: "有啊，幾點見？" },
      { speaker: "A", hanzi: "下晝三點半，你想喺邊度等呀？", jyutping: "haa6 zau3 saam1 dim2 bun3, nei5 soeng2 hai2 bin1 dou6 dang2 aa3?", mandarin: "下午三點半。你想在哪裡碰面？" },
      { speaker: "B", hanzi: "喺旺角站等啦。", jyutping: "hai2 wong6 gok3 zaam6 dang2 laa1.", mandarin: "在旺角站碰面吧。" },
      { speaker: "A", hanzi: "唔好意思，我聽日有啲事，可唔可以改到後日三點半呀？", jyutping: "m4 hou2 ji3 si1, ngo5 ting1 jat6 jau5 di1 si6, ho2 m4 ho2 ji5 goi2 dou3 hau6 jat6 saam1 dim2 bun3 aa3?", mandarin: "不好意思，我明天有點事，可以改到後天三點半嗎？" },
      { speaker: "B", hanzi: "OK，咁都係喺旺角站等呀？", jyutping: "OK, gam2 dou1 hai6 hai2 wong6 gok3 zaam6 dang2 aa3?", mandarin: "好啊，那一樣在旺角站碰面嗎？" },
      { speaker: "A", hanzi: "係呀，後日見！", jyutping: "hai6 aa3, hau6 jat6 gin3!", mandarin: "是啊，後天見！" }
    ],
    tips: [
      "日期放在鐘點前面：「聽日下晝三點半」。",
      "問時間用「幾點見呀？」，問地點用「喺邊度等呀？」，回答用「喺＋地點＋等」。",
      "改約時先說「唔好意思」，再用「可唔可以改到＋新時間＋呀？」。",
      "「都係喺旺角站等」的「都係」表示「還是／一樣」。"
    ]
  },
  {
    "id": "talk-about-today",
    "title": "聊今天做了什麼",
    "goal": "學會用「咗、未、過」聊今天做過的事、問事情做了沒或做完了沒，也能分享有沒有某種經驗。",
    "vocab": [
      {
        "hanzi": "今日",
        "jyutping": "gam1 jat6",
        "mandarin": "今天"
      },
      {
        "hanzi": "食咗",
        "jyutping": "sik6 zo2",
        "mandarin": "吃了"
      },
      {
        "hanzi": "未食",
        "jyutping": "mei6 sik6",
        "mandarin": "還沒吃"
      },
      {
        "hanzi": "做完",
        "jyutping": "zou6 jyun4",
        "mandarin": "做完"
      },
      {
        "hanzi": "睇戲",
        "jyutping": "tai2 hei3",
        "mandarin": "看電影"
      },
      {
        "hanzi": "去過",
        "jyutping": "heoi3 gwo3",
        "mandarin": "去過"
      },
      {
        "hanzi": "未去過",
        "jyutping": "mei6 heoi3 gwo3",
        "mandarin": "還沒去過"
      },
      {
        "hanzi": "試過",
        "jyutping": "si3 gwo3",
        "mandarin": "試過"
      },
      {
        "hanzi": "食飯",
        "jyutping": "sik6 faan6",
        "mandarin": "吃飯"
      },
      {
        "hanzi": "放工",
        "jyutping": "fong3 gung1",
        "mandarin": "下班",
        "note": "香港日常說法；收工 (sau1 gung1) 意思相近。"
      }
    ],
    "dialogue": [
      {
        "speaker": "A",
        "hanzi": "你今日放工未呀？",
        "jyutping": "nei5 gam1 jat6 fong3 gung1 mei6 aa3?",
        "mandarin": "你今天下班了嗎？"
      },
      {
        "speaker": "B",
        "hanzi": "放咗喇，你食咗飯未？",
        "jyutping": "fong3 zo2 laa3, nei5 sik6 zo2 faan6 mei6?",
        "mandarin": "下班了，你吃飯了嗎？"
      },
      {
        "speaker": "A",
        "hanzi": "未食呀，啱啱先收工。",
        "jyutping": "mei6 sik6 aa3, ngaam1 ngaam1 sin1 sau1 gung1.",
        "mandarin": "還沒吃，我剛下班。"
      },
      {
        "speaker": "B",
        "hanzi": "我都未食，不如一齊去食飯？",
        "jyutping": "ngo5 dou1 mei6 sik6, bat1 jyu4 jat1 cai4 heoi3 sik6 faan6?",
        "mandarin": "我也還沒吃，不如一起去吃飯？"
      },
      {
        "speaker": "A",
        "hanzi": "好呀。你去過呢間餐廳未？",
        "jyutping": "hou2 aa3. nei5 heoi3 gwo3 ni1 gaan1 caan1 teng1 mei6?",
        "mandarin": "好啊。你去過這間餐廳嗎？"
      },
      {
        "speaker": "B",
        "hanzi": "未去過。聽講佢啲嘢食幾好。",
        "jyutping": "mei6 heoi3 gwo3. teng1 gong2 keoi5 di1 je5 sik6 gei2 hou2.",
        "mandarin": "還沒去過。聽說那裡的東西滿好吃的。"
      },
      {
        "speaker": "A",
        "hanzi": "係咩？咁你試過佢哋個招牌菜未？",
        "jyutping": "hai6 me1? gam2 nei5 si3 gwo3 keoi5 dei6 go3 ziu1 paai4 coi3 mei6?",
        "mandarin": "是嗎？那你試過他們的招牌菜嗎？"
      },
      {
        "speaker": "B",
        "hanzi": "未呀，今晚試吓先。",
        "jyutping": "mei6 aa3, gam1 maan5 si3 haa5 sin1.",
        "mandarin": "還沒，今晚先試試看。"
      }
    ],
    "tips": [
      "「咗」常放在動詞後，表示動作已發生，例如「食咗」是吃了；「做完」表示事情完成，想說做完了可說「做完喇」。",
      "「未」常放在句尾提問，問事情做了沒有，例如「你食咗飯未？」；回答可說「未食呀」。",
      "「過」放在動詞後，表示曾有某種經驗，例如「去過」「試過」；否定經驗說「未去過」。",
      "傍晚問朋友「放工未呀？」很自然，回答「放咗喇」或「未呀」。"
    ]
  },
  {
    "id": "what-to-say-when-you-dont-understand",
    "title": "聽不懂時怎麼接話",
    "goal": "學會請對方說慢一點或再說一次、詢問詞語意思，並用自己的話確認理解。",
    "vocab": [
      {
        "hanzi": "唔該",
        "jyutping": "m4 goi1",
        "mandarin": "麻煩你／謝謝你",
        "note": "請人配合時用，例如請對方說慢一點。"
      },
      {
        "hanzi": "講慢啲",
        "jyutping": "gong2 maan6 di1",
        "mandarin": "說慢一點"
      },
      {
        "hanzi": "可唔可以",
        "jyutping": "ho2 m4 ho2 ji5",
        "mandarin": "可不可以"
      },
      {
        "hanzi": "講多次",
        "jyutping": "gong2 do1 ci3",
        "mandarin": "再說一次"
      },
      {
        "hanzi": "你頭先講咩呀？",
        "jyutping": "nei5 tau4 sin1 gong2 me1 aa3?",
        "mandarin": "你剛剛說什麼？",
        "note": "「頭先」是「剛剛」；前面加「唔好意思」更客氣。"
      },
      {
        "hanzi": "即係",
        "jyutping": "zik1 hai6",
        "mandarin": "也就是／所以是"
      },
      {
        "hanzi": "咩意思",
        "jyutping": "me1 ji3 si1",
        "mandarin": "什麼意思"
      },
      {
        "hanzi": "啱啱",
        "jyutping": "ngaam1 ngaam1",
        "mandarin": "剛剛"
      },
      {
        "hanzi": "學",
        "jyutping": "hok6",
        "mandarin": "學"
      },
      {
        "hanzi": "廣東話",
        "jyutping": "gwong2 dung1 waa2",
        "mandarin": "粵語／廣東話"
      },
      {
        "hanzi": "聽唔明",
        "jyutping": "teng1 m4 ming4",
        "mandarin": "聽不懂"
      }
    ],
    "dialogue": [
      {
        "speaker": "A",
        "hanzi": "你今晚得唔得閒呀？想唔想去食糖水？",
        "jyutping": "nei5 gam1 maan5 dak1 m4 dak1 haan4 aa3? soeng2 m4 soeng2 heoi3 sik6 tong4 seoi2?",
        "mandarin": "你今晚有空嗎？想不想去吃甜品？"
      },
      {
        "speaker": "B",
        "hanzi": "唔好意思，你頭先講咩呀？",
        "jyutping": "m4 hou2 ji3 si1, nei5 tau4 sin1 gong2 me1 aa3?",
        "mandarin": "不好意思，你剛剛說什麼？"
      },
      {
        "speaker": "A",
        "hanzi": "我問你今晚想唔想去食糖水。",
        "jyutping": "ngo5 man6 nei5 gam1 maan5 soeng2 m4 soeng2 heoi3 sik6 tong4 seoi2.",
        "mandarin": "我問你今晚想不想去吃甜品。"
      },
      {
        "speaker": "B",
        "hanzi": "唔該講慢啲，我啱啱學廣東話。",
        "jyutping": "m4 goi1 gong2 maan6 di1, ngo5 ngaam1 ngaam1 hok6 gwong2 dung1 waa2.",
        "mandarin": "麻煩你說慢一點，我剛開始學粵語。"
      },
      {
        "speaker": "A",
        "hanzi": "好呀，我想去食糖水。",
        "jyutping": "hou2 aa3, ngo5 soeng2 heoi3 sik6 tong4 seoi2.",
        "mandarin": "好啊，我想去吃甜品。"
      },
      {
        "speaker": "B",
        "hanzi": "可唔可以講多次「糖水」？",
        "jyutping": "ho2 m4 ho2 ji5 gong2 do1 ci3, tong4 seoi2?",
        "mandarin": "可以再說一次「糖水」嗎？"
      },
      {
        "speaker": "A",
        "hanzi": "糖水即係甜品。你知唔知「得閒」咩意思？",
        "jyutping": "tong4 seoi2 zik1 hai6 tim4 ban2. nei5 zi1 m4 zi1 dak1 haan4 me1 ji3 si1?",
        "mandarin": "「糖水」就是甜品。你知道「得閒」是什麼意思嗎？"
      },
      {
        "speaker": "B",
        "hanzi": "即係有時間，係咪呀？",
        "jyutping": "zik1 hai6 jau5 si4 gaan3, hai6 mai6 aa3?",
        "mandarin": "也就是有時間，對嗎？"
      }
    ],
    "tips": [
      "「唔該講慢啲」是請對方說慢一點；「可唔可以講多次？」是請對方再說一次。",
      "沒聽清楚時說「唔好意思，你頭先講咩呀？」比較客氣；單講「咩話？」比較直接。",
      "想問詞語意思，可以說「『得閒』咩意思呀？」；「咩意思」是口語說法。",
      "「即係……？」可以用自己的話重述，再加「係咪呀？」確認理解。"
    ]
  }
];

// 課程大綱（尚未完成的課先列出）
window.OUTLINE = [
];

// 聲調對比聽辨（國語母語者最容易混淆的組合）
window.TONE_PAIRS = [
  { label: "第 2 聲 vs 第 5 聲（都是上揚）", a: { hanzi: "史", jyutping: "si2" }, b: { hanzi: "市", jyutping: "si5" } },
  { label: "第 3 聲 vs 第 6 聲（都是平調）", a: { hanzi: "試", jyutping: "si3" }, b: { hanzi: "事", jyutping: "si6" } },
  { label: "第 4 聲 vs 第 6 聲（都偏低）", a: { hanzi: "時", jyutping: "si4" }, b: { hanzi: "事", jyutping: "si6" } },
  { label: "第 2 聲 vs 第 5 聲", a: { hanzi: "粉", jyutping: "fan2" }, b: { hanzi: "憤", jyutping: "fan5" } },
  { label: "第 3 聲 vs 第 6 聲", a: { hanzi: "訓", jyutping: "fan3" }, b: { hanzi: "份", jyutping: "fan6" } },
  { label: "第 2 聲 vs 第 5 聲", a: { hanzi: "口", jyutping: "hau2" }, b: { hanzi: "厚", jyutping: "hau5" } },
  { label: "第 3 聲 vs 第 6 聲", a: { hanzi: "意", jyutping: "ji3" }, b: { hanzi: "二", jyutping: "ji6" } },
  { label: "第 4 聲 vs 第 6 聲", a: { hanzi: "文", jyutping: "man4" }, b: { hanzi: "問", jyutping: "man6" } },
  { label: "第 1 聲 vs 第 3 聲", a: { hanzi: "高", jyutping: "gou1" }, b: { hanzi: "告", jyutping: "gou3" } },
  { label: "第 5 聲 vs 第 6 聲", a: { hanzi: "買", jyutping: "maai5" }, b: { hanzi: "賣", jyutping: "maai6" } }
];

// 六個聲調示範（同一個音節 si）
window.TONES = [
  { tone: 1, hanzi: "詩", jyutping: "si1", contour: "55", name: "高平", desc: "高而平，像唱歌拉長音" },
  { tone: 2, hanzi: "史", jyutping: "si2", contour: "35", name: "高升", desc: "從中間往上揚，類似國語二聲" },
  { tone: 3, hanzi: "試", jyutping: "si3", contour: "33", name: "中平", desc: "中間高度、平平的" },
  { tone: 4, hanzi: "時", jyutping: "si4", contour: "21", name: "低降", desc: "低而往下掉，最低的一個" },
  { tone: 5, hanzi: "市", jyutping: "si5", contour: "23", name: "低升", desc: "從低處稍微上揚，幅度比二聲小" },
  { tone: 6, hanzi: "事", jyutping: "si6", contour: "22", name: "低平", desc: "低而平，比三聲低一點" }
];
