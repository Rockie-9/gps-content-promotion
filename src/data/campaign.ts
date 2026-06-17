// ============================================================
// 品牌戰役視覺套件 · Brand Campaign Visual Kit
// 自 Prompt Suite v1.5/v1.6 遷移而來（站點已關閉）
// 影像為主（CS2-02），影片為從（CS2-03 引用本檔）
// prompt 文本逐字保留 — 生產資產，複製貼上需保真
// ============================================================

export const creativeDirection = {
  concept: '「體貼的夥伴 · The Considerate Partner」。GPS 既不缺席,也不侵擾。GPS 在您身旁守候——專注而從容,像一位陪您走到門口卻不會跟進門的體貼朋友;像一位注意到您晚歸、在您抵達前先把大廳暖好的飯店門房;像一位不動聲色把目的地安全卡放進您包裡的同事。守護,在於體貼的設計——也在於體貼的在場。',
  audienceFeel: '被一位尊重您自主的人照顧著的那種溫暖鬆一口氣。不是被保護——是被陪伴。不是被監看——是被留意。',
  presenceRule: '大約半數場景中,GPS 僅以環境設計呈現——光、路、備妥的空間。另一半場景,GPS 以一位身著輕便正裝、專注於安靜任務、站在稍側位置的平靜身影出現——永遠不置中、永遠不注視主角。參考:精緻飯店門房、私人健康照護者、劍橋學院門房。肢體語言隨時待命,從不緊繃戒備。',
  references: [
    { label: '攝影參考', labelEn: 'Cinematic editorial', desc: 'A24 電影攝影、Apple「Behind the Mac」、青山裕企的紀實靜照、Iwan Baan 的建築人文主義。絕非企業圖庫;絕非會議室裡微笑的多元團隊。' },
    { label: '光線', labelEn: 'Found light, never staged', desc: '偏好藍色時刻與黃金時刻。畫面中可見實用光源——檯燈、門口、步道照明。允許陰影。臉部部分受光。光源往往就是安全的故事本身。' },
    { label: '相機', labelEn: 'Medium-format register', desc: 'Hasselblad H 系列、Phase One IQ4、Leica SL2 的質感。淺景深但絕不極端。人物用 50–80mm,環境用 35mm。細微顆粒感,絕不銳利到臨床感。' },
    { label: '色彩', labelEn: 'Warm neutrals, brand teal as accent', desc: '基底:紙感暖白、深黑、銅灰中間調。點綴:青綠 #26A7B0 僅作為實用光(門口標示、車內儀表、螢幕光暈)。絕不作為濾鏡罩色。' },
    { label: '主體', labelEn: 'Taiwanese, multi-generation', desc: '以台灣人/東亞人為主。年齡層:近三十歲的工程師、三十多歲的父母、年長的祖父母、年幼的孩童。家庭是必要元素——單人主體只呈現品牌的三分之一,其餘需要所在意的人入鏡。' },
    { label: 'GPS 身影(出現時)', labelEn: 'The partner who waits beside', desc: '輕便專業正裝,絕非制服。平靜姿態,專注於安靜任務——整理花、查看小裝置、整理桌面。從不注視主角。肢體語言:隨時待命,從不戒備。' },
  ],
};

export const antiPatterns = [
  '監視攝影機、CCTV、監控設備入鏡——品牌正是這些的「不在場」',
  '制服警衛、戰術裝束、識別證、安檢棒、金屬探測器——我們不是守門人',
  '嚴肅臉孔、警戒姿態、雙手緊握的戒備站姿——夥伴是平靜的,不是戒備的',
  '全像 UI 疊層、漂浮資料、科技光暈效果——責任科技意味著克制的科技:強大到足以守護,克制到足以尊重',
  '辦公室裡微笑的多元團隊、握手、會議室、headset——企業圖庫是品牌毒藥',
  '科幻資料中心、藍光伺服器機櫃、「cyber」美學——錯誤的範疇',
  'logo、招牌、品牌制服(TSMC、GPS、第三方)——影像內不放品牌標識;品牌在後製加入',
  '過度的青橙色調、Instagram 濾鏡感——自然色彩,僅品牌點綴',
  'AI 光滑皮膚、完美對稱、通用亞洲融合圖庫臉——要求真實皮膚、不對稱、有性格的臉',
  '陪伴身影注視主角、盤旋、監督——身影專注於自己的任務,從不注視',
];

export const scenes = [
  {
    num: '01', title: '歸 · 晚歸的步伐', titleEn: 'Return · Late Walk Home',
    ratios: ['16:9', '2:3', '4:5'],
    concept: '一位女性深夜從停車處走向住所大門。步道照明在她腳邊柔和亮起。她接近時門廊燈自動亮起。她沒有察覺——她只是走著。夥伴在她抵達之前,已備妥這條路。',
    mj: `A Taiwanese woman in her early 30s walking from her parked car toward a residential building entrance late at night, ground-level pathway lighting glowing softly at her feet, automatic porch light just turning on as she approaches, calm and unhurried, holding her phone loosely at her side, her face partially lit by warm interior light spilling from the doorway, cinematic editorial photography, A24 film aesthetic, shot on Hasselblad H6D-100c, 80mm f/2.8, shallow depth of field, blue hour ambient with warm tungsten accents, deep teal night sky and warm copper doorway light, real skin texture, asymmetric composition, no signage, no logos, no security cameras, no uniformed guards --ar 16:9 --style raw --v 6.1 --s 250`,
    gemini: `Photorealistic editorial-style photograph in landscape 16:9 aspect ratio. Subject: a Taiwanese woman in her early 30s, wearing simple modern clothing, walking from her parked car toward a residential building entrance late at night. Lighting story: ground-level pathway lighting glows softly at her feet illuminating her path; automatic porch light just turning on as she approaches the door; her face partially lit by warm interior light spilling from the doorway. Expression: calm and unhurried, mid-stride, never posing. She holds her phone loosely. Camera: medium-format aesthetic, 80mm equivalent, shallow depth of field on her, environment slightly soft. Time: blue hour with warm tungsten accents. Color: warm neutral palette with deep teal in night sky and warm copper in doorway light. Real skin texture. Asymmetric composition, woman placed off-center to right, gaze directed forward not toward camera. Strictly do not include: security cameras, uniformed guards, badges, surveillance equipment, signage, branded logos, holographic UI overlays.`,
  },
  {
    num: '02', title: '行 · 出差前的擁抱', titleEn: 'Journey · Father at Departure',
    ratios: ['16:9', '3:2'],
    concept: '一位父親清晨在機場航廈跪下,與年幼的女兒道別擁抱。在柔焦的遠景,一位平靜著裝的夥伴在行李推車旁查看小裝置——從不注視這家人,只是在場。夥伴在旅程開始之前,已在旅程之中。',
    mj: `A middle-aged Taiwanese man in business casual clothing at an airport terminal at dawn, kneeling to hug his five-year-old daughter goodbye, intimate parting moment, soft natural light from large windows behind them, the airport corridor designed with clear sightlines and warm wood architectural elements, subtle pathway lighting integrated into floor edge, in soft-focus background a single calm figure in smart-casual attire occupied with a small handheld device near a luggage cart, never watching the family, just present, documentary editorial photography, shot on Phase One IQ4 150MP, 50mm prime, shallow depth of field on the family with partner figure soft-focus, dawn golden light, neutral warm palette with hints of teal, real skin texture, candid emotional intimacy, no airline branding, no signage, no uniformed personnel, no surveillance cameras --ar 16:9 --style raw --v 6.1 --s 250`,
    gemini: `Photorealistic documentary editorial photograph in 16:9 landscape. Foreground: a middle-aged Taiwanese man in soft business casual attire kneeling at an airport terminal at dawn, hugging his approximately five-year-old daughter goodbye. The moment is intimate — he holds her gently, she rests her head on his shoulder. Background, in soft focus: a single calmly-dressed figure in smart-casual professional attire (no uniform, no badge), occupied with a small handheld device near a luggage cart, looking down at the device — never watching the family. Time: dawn, soft natural backlight from terminal windows. Architecture: clear sightlines, warm wood and stone, subtle floor-edge pathway lighting. Camera: medium-format aesthetic, 50mm equivalent, shallow depth of field on family with background figure soft-focus. Color: dawn golden light dominant, warm neutrals, faint teal in morning sky. Real skin texture, candid emotion. Composition: family slightly left of center, generous space to right showing corridor depth. Strictly do not include: airline logos, signage, uniformed personnel, surveillance equipment, badges, holographic overlays.`,
  },
  {
    num: '03', title: '候 · 為您備妥的大廳', titleEn: 'Await · A Lobby Made Ready',
    ratios: ['21:9', '16:9'],
    concept: '黃昏時分的接待大廳,備妥而溫暖。一位夥伴身影站在側邊檯面旁,平靜地在花瓶裡插著鮮花。空間在等待——等待幾分鐘後將抵達、卻還不知道大廳已為他暖好的某個人。夥伴是大廳安靜的在場。',
    mj: `A beautifully designed corporate reception lobby at dusk, polished concrete floor reflecting warm light, low decorative lighting strips integrated at curb edges glowing softly amber, a single calm figure of an Asian person in smart-casual professional attire (cream sweater, simple trousers, no uniform, no badge) standing slightly aside at a side console, calmly arranging fresh flowers in a small ceramic vase, looking down at the flowers not at camera, the lobby otherwise empty and waiting, architectural photography in the style of Iwan Baan and Hélène Binet, shot on Hasselblad XCD 35mm, balanced exposure across deep range, neutral warm palette with subtle teal accents in lighting fixtures, the entire space conveying "prepared and hospitable" rather than "monitored", no other people, no signage, no security cameras, no surveillance equipment --ar 21:9 --style raw --v 6.1 --s 250`,
    gemini: `Photorealistic architectural photograph in cinematic 21:9 ultra-wide. Subject: a beautifully designed corporate reception lobby at dusk, prepared and warm. Single human element: an Asian person in smart-casual professional attire (cream sweater, simple trousers, no uniform, no badge of any kind), standing slightly aside at a side console, calmly arranging fresh flowers in a small ceramic vase, looking down at the flowers — never toward camera, never toward an entrance, just absorbed in their quiet task. Architecture: polished concrete floor reflecting warm light, low decorative lighting integrated at curb edges glowing softly amber, the rest of the lobby empty and waiting. Mood: "prepared and hospitable" not "monitored." Architectural reference: Iwan Baan, Hélène Binet. Camera: 35mm wide-angle equivalent, balanced exposure with deep tonal range. Color: neutral warm palette, subtle teal accents only in lighting fixtures themselves. Strictly do not include: other people, signage, security cameras, surveillance equipment, harsh fluorescent overhead lighting, uniformed personnel.`,
  },
  {
    num: '04', title: '聚 · 三代人的晚餐', titleEn: 'Gather · Three-Generation Dinner',
    ratios: ['4:5', '3:2'],
    concept: '三代台灣家庭圍在暖光的餐桌——祖父母、父母、年幼孩童共享一餐。透過窗戶:一條安靜的住宅街道帶著柔和的步道照明,遠方一輛停著的車裡有人在閱讀。夥伴在他們夜晚的某個背景裡,從不在夜晚之內。',
    mj: `Three generations of a Taiwanese family at a warm-lit residential dinner table, grandparents in their late 60s, parents in their late 30s, a young child around six, sharing a meal together, soft pendant lighting overhead, a candid moment of laughter and conversation, natural skin tones with real texture, the window in background revealing a quiet residential street at dusk with subtle pathway lighting glowing softly, and far in the distance through the window one parked vehicle with someone reading inside it lit faintly by interior light, documentary editorial photography, shot on Leica SL2, 50mm Summilux f/1.4, shallow depth of field on the family with deeper environmental focus through window, warm tungsten color temperature, hint of teal in exterior twilight, no posed expressions, no other people in foreground, no signage, no security cameras --ar 4:5 --style raw --v 6.1 --s 250`,
    gemini: `Photorealistic documentary editorial photograph in 4:5 portrait aspect ratio. Foreground: three generations of a Taiwanese family at a warm-lit residential dinner table — grandparents in their late 60s, parents in their late 30s, a child around six — sharing a meal. Soft pendant lighting overhead. Candid moment of laughter and conversation, no posed expressions, faces partially lit naturally. Background through the window: a quiet residential street at dusk with subtle pathway lighting glowing softly, and far in the distance one parked vehicle with a single person reading inside it, lit faintly by interior light — present but unconnected to the family, simply part of the evening's quiet attendance. Camera: 50mm equivalent, shallow depth of field on family with deeper environmental focus through window. Color: warm tungsten dominant, hint of teal in exterior twilight. Real skin texture. Strictly do not include: any other people in foreground, signage, security cameras, branded vehicles, posed expressions.`,
  },
  {
    num: '05', title: '啟 · 清晨的啟程', titleEn: 'Begin · Dawn Approach',
    ratios: ['21:9', '16:9'],
    concept: '一個長鏡頭的風景,清晨從一條彎曲的聯外道路望向廠區,建築被晨霧柔化,直覺式的尋路照明融入景觀設計。道路遠方,一位身影站在小型接待亭旁,專注於一張列印的紙,從不注視道路。夥伴在一天的門檻上,在一天開始之前。',
    mj: `A long landscape shot of a modern semiconductor fab facility approached from a curving access road at dawn, the building's geometric mass softened by morning mist, the access road designed with intuitive wayfinding lighting integrated into landscaping along the edges glowing softly amber, generic architecture without any visible logos or signage, far down the road a single figure of an Asian person in smart-casual professional attire standing at a small modest reception kiosk, occupied with a printed sheet looking down at it, never watching the road, the figure small in the frame, cinematic landscape photography in the style of Edward Burtynsky but warmer and more humane, shot on Hasselblad XCD 35-75mm zoom, balanced exposure for sky and ground, blue-grey dawn palette with occasional warm amber from pathway lights, no signage, no logos, no security cameras, no uniformed personnel --ar 21:9 --style raw --v 6.1 --s 250`,
    gemini: `Photorealistic cinematic landscape photograph in 21:9 ultra-wide. Subject: a long approach view of a modern semiconductor fab facility at dawn, viewed from a curving access road. The building's geometric mass softened by morning mist. The access road designed with intuitive wayfinding lighting integrated into landscaping along the edges, glowing softly amber. Generic architecture, no visible logos or branded signage anywhere. Human element: far down the road, a single small figure of an Asian person in smart-casual professional attire standing at a modest reception kiosk, occupied with a printed sheet looking down at it — never watching the road, just absorbed in their task. Style reference: Edward Burtynsky landscape photography, but warmer and more humane. Camera: 35mm wide-angle equivalent, balanced exposure across sky and ground. Color: blue-grey dawn palette with occasional warm amber from pathway lights. Strictly do not include: corporate signage, logos, security cameras, uniformed personnel, harsh contrast.`,
  },
];

export const kvSystem = {
  intro: '16:9 主視覺由場景 01、02、03 或 05 構成——每幕原生即為 16:9 或更寬。以下選用指引將場景對應至使用情境。影像生成後,主視覺於設計工具中依規範加上文字疊層。',
  useCases: [
    { label: 'A', context: '大型集會 / 品牌啟動', contextEn: 'Town hall / Brand launch', desc: '用場景 03(為您備妥的大廳)——備妥、好客的空間最能體現品牌轉位。文字疊層置左上,不打擾身影。', source: '場景 03 · 21:9 → 裁切為 16:9' },
    { label: 'B', context: '網站主視覺 / 入口首頁', contextEn: 'Web hero / Portal landing', desc: '用場景 01(晚歸的步伐)——敘事最溫暖、最有共鳴。文字疊層右對齊至身影後方的負空間。', source: '場景 01 · 原生 16:9' },
    { label: 'C', context: '年度報告 / 策略文件封面', contextEn: 'Annual report / Strategy doc cover', desc: '用場景 05(清晨的啟程)——機構的莊重感與人性兼具。文字疊層置中下方,壓在道路上。', source: '場景 05 · 21:9 → 裁切為 16:9' },
    { label: 'D', context: '家人延伸溝通', contextEn: 'Family extension comms', desc: '用場景 02(出差前的擁抱)——明確錨定家人延伸支柱。文字疊層置右上,在建築線條之上。', source: '場景 02 · 原生 16:9' },
  ],
  typeSpec: `文字疊加規範 · Type overlay spec
標題(DM Serif Display Italic, 64–84pt, 紙白)——每個使用情境選一句正典句:
· "Make you feel safe." · 讓您安心(品牌承諾——溫暖、面向同仁)
· "Quietly beside." · 始終在側(概念語——戰役簽名)
· "Before you need it." · 在您需要之前(品牌核心——機構場合)
· "Wherever you are." · 無論您身在何處(支柱召喚——延伸敘事)

副標(Noto Serif TC Medium, 22–28pt, 80% 不透明度):EN 標題下方的 TC 對應句。
品牌鎖定(左下或右下, 11pt Lato Bold, 字距 0.22em 大寫):GPS · Global Physical Security
任何邊緣永遠保留 12% 安全邊界。影像承載 70% 情緒重量;文字完成它,絕不與之競爭。`,
};

export const posters = [
  {
    id: 'A', context: '接待牆面 / 大廳', contextEn: 'Reception walls / Lobby', ratio: 'A1 直式 · 594 × 841 mm',
    brief: `POSTER A · RECEPTION WALLS / LOBBY
A1 PORTRAIT · 594 × 841 mm

HERO IMAGE
場景 01(晚歸的步伐)—— 生成 2:3 直式變體。下方 30% 應自然淡入陰影,以利文字疊層可讀。

LAYOUT ZONES
上 60% — 影像主視覺
中 25% — 標題 + 內文,置於深色漸層上
下 15% — 品牌標記 + tagline,置中

HEADLINE TC
在您還沒走到之前,
光,已為您而亮。

HEADLINE EN
Before you arrive,
the light is already on for you.

BODY COPY TC
我們設計每一處光,
我們設計每一段路,
讓回家,成為一日中最安心的時刻。

BODY COPY EN
We design the light. We design the path. So coming home is the safest moment of your day.

BRAND BLOCK
Before you need it. · 在您需要之前。
GPS · Global Physical Security

TYPE SPECS
Headline TC: Noto Serif TC Medium 64pt
Headline EN: DM Serif Display Italic 56pt
Body: Lato Light + Noto Sans TC Light 18pt, line-height 1.85
Brand mark: Lato Bold 11pt with letter-spacing 0.22em uppercase

COLOR
影像承載深色基底。文字:紙白 #FAF8F5。點綴:青綠 #26A7B0 僅用於 "Before you need it." 斜體。`,
  },
  {
    id: 'B', context: '差旅與出發牆面', contextEn: 'Travel & departure walls', ratio: 'A1 直式 · 594 × 841 mm',
    brief: `POSTER B · TRAVEL & DEPARTURE WALLS
A1 PORTRAIT · 594 × 841 mm

HERO IMAGE
場景 02(出差前的擁抱)—— 裁切為 2:3 直式,保留遠景柔焦的夥伴身影。

HEADLINE TC
無論您去哪裡,
我們始終陪伴在側。

HEADLINE EN
Wherever you go,
we are quietly beside you.

BODY COPY TC
出差前一週,目的地的安全提示,已先一步送到您手上。
您離家之後,他們身旁,有我們。

BODY COPY EN
A week before you depart, your destination safety brief is already in your hands. While you're away, we are quietly beside them.

BRAND BLOCK
Before you need it. · 在您需要之前。
GPS · Global Physical Security

TYPE SPECS
同 Poster A — Headline TC: Noto Serif TC Medium 64pt;Headline EN: DM Serif Display Italic 56pt;Body: Lato Light + Noto Sans TC Light 18pt, line-height 1.85;Brand mark: Lato Bold 11pt, letter-spacing 0.22em uppercase。

COLOR
影像承載深色基底。文字:紙白 #FAF8F5。點綴:青綠 #26A7B0 僅用於 "Before you need it." 斜體。`,
  },
  {
    id: 'C', context: '家人延伸溝通', contextEn: 'Family extension comms', ratio: 'A1 直式 · 594 × 841 mm',
    brief: `POSTER C · FAMILY EXTENSION COMMS
A1 PORTRAIT · 594 × 841 mm

HERO IMAGE
場景 04(三代人的晚餐)—— 裁切更緊,保留溫暖室內,僅透過窗戶帶一抹室外步道光。

HEADLINE TC
您所在意的人,
我們也在意。

HEADLINE EN
The people you care for,
we care for too.

BODY COPY TC
您在前線的時候,他們在後方。
而我們,守在他們身旁。

BODY COPY EN
While you are at the frontline, they are at home. And we are quietly beside them.

BRAND BLOCK
Before you need it. · 在您需要之前。
GPS · Global Physical Security

TYPE SPECS
同 Poster A — Headline TC: Noto Serif TC Medium 64pt;Headline EN: DM Serif Display Italic 56pt;Body: Lato Light + Noto Sans TC Light 18pt, line-height 1.85;Brand mark: Lato Bold 11pt, letter-spacing 0.22em uppercase。

COLOR
影像承載深色基底。文字:紙白 #FAF8F5。點綴:青綠 #26A7B0 僅用於 "Before you need it." 斜體。`,
  },
];

export const assetMatrix = [
  { scene: '01 · 歸 晚歸的步伐', ratios: '16:9 / 2:3 / 4:5', deliverables: '16:9 主視覺(網站)· A1 海報 A · Manus 影片 8–18s · LINE OA 推播卡 · 電子報主圖', tool: 'MJ 主、Gemini 備' },
  { scene: '02 · 行 出差前的擁抱', ratios: '16:9 / 3:2', deliverables: '16:9 主視覺(家人延伸)· A1 海報 B · Manus 影片 18–28s · 差旅安全簡報封面', tool: 'MJ 主、Gemini 備' },
  { scene: '03 · 候 為您備妥的大廳', ratios: '21:9 / 16:9', deliverables: '16:9 主視覺(大型集會/品牌啟動)· 品牌手冊 §00 封面 · 接待區顯示循環', tool: 'Gemini 主、MJ 備' },
  { scene: '04 · 聚 三代人的晚餐', ratios: '4:5 / 3:2', deliverables: 'A1 海報 C · Manus 影片 38–50s · 家人延伸微網站 · 內部年度回顧', tool: 'MJ 主、Gemini 備' },
  { scene: '05 · 啟 清晨的啟程', ratios: '21:9 / 16:9', deliverables: '16:9 主視覺(年度報告封面)· Director 簡報開場 · 策略文件封面', tool: 'Gemini 主、MJ 備' },
];

export const videoBrief = {
  masterBrief: `PROJECT: GPS Brand Film · "Quietly Beside · 始終在側"
DURATION: 60 seconds
ASPECT: 16:9, 4K, 24fps
LANGUAGE: Bilingual — Traditional Chinese voiceover with English subtitles
TONE: Warm, quiet, observational; never urgent, never institutional
MUSIC: Solo piano with minimal string pad; single-note motif that resolves at end
CAMERA: Slow movement only — push-ins, gentle dollies, no handheld shake
GRADE: Warm neutral, deep teal accents, paper highlights; never teal-and-orange

STORY ARC:
The film opens on a prepared environment before anyone arrives, then follows three life moments where a considerate partner — sometimes seen, sometimes only felt — has anticipated each person, then resolves on the brand idea. Each scene establishes that GPS waits beside — present, attentive, never intrusive. No security imagery. No guards. No cameras.

SCENE GENERATION INSTRUCTIONS:
For each segment in the treatment, dispatch to the appropriate generator (Runway Gen-3 / Kling / Sora) using the Midjourney prompts from the CS2-02 image scenes as visual reference, animated as the segment specifies. Maintain consistent characters across segments where indicated. Voice generation via ElevenLabs for the TC voiceover (warm female voice, late 30s, unhurried delivery, slight breath between phrases).

OUTPUT: 1 final cut + 1 cutdown 30s + 1 social vertical 9:16 (60s)`,
  treatment: [
    { time: '0–8s', visual: '緩慢推進一條黃昏的住宅步道。步道燈彷彿感應到鏡頭般自動亮起。尚無人影。柔和的傍晚環境音——遠處車聲、隱約蟬鳴。音樂以單一延續的鋼琴音符開始。', vo: '「在您還沒走到之前——」 "Before you arrive—"' },
    { time: '8–18s', visual: '匹配剪接:一位年輕台灣女性走在同一條路上。燈已為她而亮。她沒有察覺——淺淺微笑,邁步中,鬆鬆握著手機。鏡頭維持在她肩膀高度,略偏後方。(用場景 01 參考,動畫化。)', vo: '「光,已為您而亮。」 "the lights are already on for you."' },
    { time: '18–28s', visual: '切到清晨機場。父親跪下擁抱女兒。柔焦背景中,一位平靜的夥伴在附近安靜查看某物——從不注視這家人。擁抱維持兩拍;夥伴從不看向他們。(場景 02 參考。)', vo: '「在您出發之前——」 "Before you set out—"' },
    { time: '28–38s', visual: '父親走過走廊。鏡頭以緩慢橫向 dolly 跟拍。地面尋路燈引導他的路。他沒有低頭看。音樂溫和漸強——第二個鋼琴音符加入第一個。', vo: '「路,已為您打點好。」 "the path is laid for you."' },
    { time: '38–50s', visual: '切到家庭晚餐——三代人在暖光餐桌旁歡笑。緩慢透過窗戶向後拉,揭露室外——步道燈柔和照亮住宅街道,一輛停著的車裡有人在閱讀,微微受光。鏡頭持續溫和後拉。(場景 04 參考。)', vo: '「你所在意的人,我們始終在他們身旁。」 "The people you love — we are quietly beside them."' },
    { time: '50–60s', visual: '緩慢淡入黑。音樂收束至單一延續的最終音符。文字淡入置中,黑底紙白:Before you need it. 在您需要之前。 兩拍後,字句柔化,品牌標記出現於下方:GPS · Global Physical Security。停留三秒。切黑。', vo: '「讓您安心。」 "Make you feel safe."' },
  ],
};
