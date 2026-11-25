export type ProductStatus = "draft" | "published" | "archived";

export interface ProductItem {
  id: number;
  dbId?: string;
  slug: string;
  name: string;
  nameAr: string;
  tag: string;
  category: "topping" | "fruit";
  desc: string;
  descAr: string;
  image: string;
  imagePath?: string | null;
  status?: ProductStatus;
  sortOrder?: number;
  profile?: FlavourProfile;
  createdAt?: string;
  updatedAt?: string;
}

export interface FlavourProfile {
  title: string;
  titleAr: string;
  intro: string;
  introAr: string;
  uses: string[];
  usesAr: string[];
  method: string;
  methodAr: string;
  weight: string;
  weightAr: string;
}

export interface RecipeItem {
  id: string;
  title: string;
  titleAr: string;
  desc: string;
  descAr: string;
  method: string;
  methodAr: string;
  image: string;
  category: "drink" | "dessert";
  num?: string;
}

export interface JournalArticle {
  id: number;
  title: string;
  titleAr: string;
  excerpt: string;
  excerptAr: string;
  content: string;
  contentAr: string;
  image: string;
  category: string;
  categoryAr: string;
}

export interface HeroSlide {
  image: string;
  title: string;
  titleAr: string;
  desc: string;
  descAr: string;
}

export const heroSlides: HeroSlide[] = [
  {
    image: "/assets/cafe-collection.jpg",
    title: "Made for your<br/>signature creations.",
    titleAr: "نكهات ترتقي<br/>بكل ما تقدّمه.",
    desc: "Toppings and fruit sauces for cafés, pastry shops and creative menus. Discover Akula and find the flavour for your next creation.",
    descAr: "توبينج وصوصات فاكهة للمقاهي والحلواني. اكتشف مجموعة أكولة واختر النكهة التي تمنح مشروباتك وحلوياتك بصمتها الخاصة.",
  },
  {
    image: "/assets/hero.jpg",
    title: "Your recipe.<br/>Your signature.",
    titleAr: "وصفتك.<br/>بصمتك الخاصة.",
    desc: "From a warm caramel latte to a chilled fruit drink, find the flavour that brings your menu to life.",
    descAr: "من لاتيه الكراميل الدافئ إلى مشروبات الفاكهة الباردة، اختر النكهة التي تكمل قائمة كافيهك.",
  },
  {
    image: "/assets/tropical-showcase-new.jpg",
    title: "Made to inspire.<br/>Ready to explore.",
    titleAr: "نكهات تلهمك.<br/>أفكار تنتظرك.",
    desc: "Discover chocolate, caramel and fruit flavours, with serving ideas for drinks and desserts.",
    descAr: "استكشف نكهات الشيكولاته والكراميل والفواكه، مع أفكار لتقديم المشروبات والحلويات.",
  },
  {
    image: "/assets/fruit-banner.webp",
    title: "Fruit flavours.<br/>Fresh ideas.",
    titleAr: "نكهات فاكهة.<br/>أفكار منعشة.",
    desc: "Discover Akula fruit sauces for drinks and desserts.",
    descAr: "اكتشف صوصات الفاكهة من أكولة لتحضير مشروبات وحلويات بطابعك الخاص.",
  },
];

export const productsData: ProductItem[] = [
  {
    id: 0,
    slug: "chocolate",
    name: "Chocolate topping",
    nameAr: "توبينج الشيكولاته",
    tag: "CHOCOLATE",
    category: "topping",
    desc: "Rich chocolate flavor. For hot chocolate, milkshakes, brownies and waffles.",
    descAr: "نكهة شيكولاته غنية. للهوت شوكليت والميلك شيك والبراونيز والوافل.",
    image: "/assets/chocolate.jpg",
  },
  {
    id: 1,
    slug: "caramel",
    name: "Caramel topping",
    nameAr: "توبينج كراميل",
    tag: "CARAMEL",
    category: "topping",
    desc: "Warm caramel flavor. For coffee and desserts.",
    descAr: "نكهة كراميل دافئة. للقهوة والحلويات.",
    image: "/assets/caramel.jpg",
  },
  {
    id: 2,
    slug: "condensed-milk",
    name: "Condensed milk topping",
    nameAr: "توبينج حليب مكثف",
    tag: "CONDENSED MILK",
    category: "topping",
    desc: "Creamy, sweet milk flavor. For coffee, drinks and desserts.",
    descAr: "نكهة حليب مكثف كريمية. للقهوة والمشروبات والحلويات.",
    image: "/assets/condensed-milk.jpg",
  },
  {
    id: 3,
    slug: "salted-caramel",
    name: "Salted caramel topping",
    nameAr: "توبينج كراميل مملح",
    tag: "SALTED CARAMEL",
    category: "topping",
    desc: "Caramel flavor with a salty touch. For coffee and desserts.",
    descAr: "نكهة كراميل مع لمسة مالحة. للقهوة والحلويات.",
    image: "/assets/salted-caramel.jpg",
  },
  {
    id: 4,
    slug: "watermelon",
    name: "Watermelon sauce",
    nameAr: "صوص بطيخ",
    tag: "WATERMELON",
    category: "fruit",
    desc: "For slushies, soda and cold drinks.",
    descAr: "للسلاش والصودا والمشروبات الباردة.",
    image: "/assets/watermelon.jpg",
  },
  {
    id: 5,
    slug: "blueberry",
    name: "Blueberry sauce",
    nameAr: "صوص بلوبيرى",
    tag: "BLUEBERRY",
    category: "fruit",
    desc: "For smoothies, lemonade and cheesecake.",
    descAr: "للسموذي والليموناضة والتشيز كيك.",
    image: "/assets/blueberry.jpg",
  },
  {
    id: 6,
    slug: "pineapple",
    name: "Pineapple sauce",
    nameAr: "صوص اناناس",
    tag: "PINEAPPLE",
    category: "fruit",
    desc: "For smoothies and cold cocktails.",
    descAr: "للسموذي والكوكتيلات الباردة.",
    image: "/assets/pineapple.jpg",
  },
  {
    id: 7,
    slug: "passion-fruit",
    name: "Passion fruit sauce",
    nameAr: "صوص باشون",
    tag: "PASSION FRUIT",
    category: "fruit",
    desc: "For soda, mocktails and smoothies.",
    descAr: "للصودا والموكتيلات والسموذي.",
    image: "/assets/passion-fruit.jpg",
  },
  {
    id: 8,
    slug: "strawberry",
    name: "Strawberry sauce",
    nameAr: "صوص فراولة",
    tag: "STRAWBERRY",
    category: "fruit",
    desc: "For milkshakes, smoothies and desserts.",
    descAr: "للميلك شيك والسموذي والحلويات.",
    image: "/assets/strawberry.jpg",
  },
  {
    id: 9,
    slug: "raspberry",
    name: "Raspberry sauce",
    nameAr: "صوص راسبيرى",
    tag: "RASPBERRY",
    category: "fruit",
    desc: "For drinks and desserts.",
    descAr: "للمشروبات والحلويات.",
    image: "/assets/raspberry.jpg",
  },
  {
    id: 10,
    slug: "mixberry",
    name: "Mixed berry sauce",
    nameAr: "صوص ميكس بيرى",
    tag: "MIXBERRY",
    category: "fruit",
    desc: "For cold drinks and desserts.",
    descAr: "للمشروبات الباردة والحلويات.",
    image: "/assets/mixberry.jpg",
  },
  {
    id: 11,
    slug: "mango",
    name: "Mango sauce",
    nameAr: "صوص مانجو",
    tag: "MANGO",
    category: "fruit",
    desc: "For tropical drinks and desserts.",
    descAr: "للمشروبات الاستوائية والحلويات.",
    image: "/assets/mango.jpg",
  },
  {
    id: 12,
    slug: "peach",
    name: "Peach sauce",
    nameAr: "صوص خوخ",
    tag: "PEACH",
    category: "fruit",
    desc: "For iced tea and summer drinks.",
    descAr: "للشاي المثلج ومشروبات الصيف.",
    image: "/assets/peach.jpg",
  },
  {
    id: 13,
    slug: "kiwi",
    name: "Kiwi sauce",
    nameAr: "صوص كيوى",
    tag: "KIWI",
    category: "fruit",
    desc: "For cold fruit drinks.",
    descAr: "للمشروبات الباردة بنكهة الفاكهة.",
    image: "/assets/kiwi.jpg",
  },
  {
    id: 14,
    slug: "green-apple",
    name: "Green apple sauce",
    nameAr: "صوص تفاح اخضر",
    tag: "GREEN APPLE",
    category: "fruit",
    desc: "For soda and iced tea.",
    descAr: "للصودا والشاي المثلج.",
    image: "/assets/green-apple.jpg",
  },
];

const baseProfiles: Record<string, FlavourProfile> = {
  chocolate: {
    title: "Chocolate topping",
    titleAr: "توبينج الشيكولاته",
    intro: "Rich chocolate flavour that adds depth to beverages and an attractive finish to desserts.",
    introAr: "نكهة شيكولاته غنية تضيف عمقًا للمشروبات ولمسة جذابة للحلويات.",
    uses: ["Chocolate milkshake", "Hot chocolate", "Frappes", "Waffles & pancakes", "Ice cream"],
    usesAr: ["ميلك شيك الشيكولاته", "هوت شوكليت", "فرابيه", "وافل وبان كيك", "آيس كريم"],
    method: "Blend cold milk with vanilla ice cream and chocolate topping to your preferred sweetness. Drizzle glass walls and serve immediately.",
    methodAr: "اخلط الحليب البارد مع آيس كريم الفانيليا وتوبينج الشيكولاته حسب الحلاوة المطلوبة. زيّن جدار الكوب بلمسة شيكولاته وقدّم فورًا.",
    weight: "1.25 KG",
    weightAr: "١٫٢٥٠ كجم",
  },
  caramel: {
    title: "Caramel topping",
    titleAr: "توبينج الكراميل",
    intro: "Warm caramel flavour giving coffee and desserts a rich, distinctive touch.",
    introAr: "نكهة كراميل دافئة تمنح القهوة والحلويات طابعًا غنيًا ومميزًا.",
    uses: ["Caramel latte", "Iced latte", "Frappes", "Ice cream", "Cheesecake"],
    usesAr: ["لاتيه كراميل", "آيس لاتيه", "فرابيه", "آيس كريم", "تشيز كيك"],
    method: "Add caramel to espresso, then hot or steamed milk. Stir well and finish with a delicate drizzle on top.",
    methodAr: "أضف الكراميل إلى كوب الإسبريسو، ثم الحليب الساخن أو البارد. قلّب جيدًا واضبط الحلاوة، وزيّن الوجه بلمسة كراميل.",
    weight: "1.25 KG",
    weightAr: "١٫٢٥٠ كجم",
  },
  "salted-caramel": {
    title: "Salted caramel topping",
    titleAr: "توبينج الكراميل المملح",
    intro: "A balanced blend of sweet caramel and sea salt, elevating specialty coffee and desserts.",
    introAr: "نكهة تجمع حلاوة الكراميل ولمسة الملح لتمنح القهوة والحلويات مذاقًا مميزًا.",
    uses: ["Salted caramel latte", "Frappes", "Brownies", "Waffles", "Ice cream"],
    usesAr: ["لاتيه كراميل مملح", "فرابيه", "براونيز", "وافل", "آيس كريم"],
    method: "Stir salted caramel into fresh espresso and milk. Serve hot or over ice with a light top drizzle.",
    methodAr: "أضف توبينج الكراميل المملح إلى الإسبريسو والحليب، وقلّب حتى يمتزج. قدّمه ساخنًا أو مع الثلج وزيّن الوجه بلمسة من التوبينج.",
    weight: "1.25 KG",
    weightAr: "١٫٢٥٠ كجم",
  },
  "condensed-milk": {
    title: "Condensed milk topping",
    titleAr: "توبينج الحليب المكثف",
    intro: "Sweet milky richness adding velvety texture to iced coffee, shakes and pastries.",
    introAr: "لمسة حليبية حلوة تضيف طابعًا كريميًا للقهوة والمشروبات والحلويات.",
    uses: ["Spanish latte", "Iced coffee", "Milkshakes", "Milk cake", "Dessert cups"],
    usesAr: ["سبانش لاتيه", "قهوة مثلجة", "ميلك شيك", "كيكة الحليب", "كاسات الحلوى"],
    method: "Add condensed milk topping gradually to chilled coffee and milk, stir well and add ice.",
    methodAr: "أضف توبينج الحليب المكثف تدريجيًا إلى القهوة الباردة مع الحليب، وقلّب جيدًا ثم أضف الثلج. اضبط الكمية حسب الحلاوة المطلوبة.",
    weight: "1 KG",
    weightAr: "١ كجم",
  },
  blueberry: {
    title: "Blueberry sauce",
    titleAr: "صوص البلوبيرى",
    intro: "Authentic blueberry notes delivering vivid colour and deep berry aroma to drinks and pastry.",
    introAr: "نكهة توت أزرق طبيعية تمنح مشروبات الفاكهة والحلويات لمسة مميزة ولوناً ياقوتياً.",
    uses: ["Blueberry smoothie", "Lemonade", "Mocktails", "Cheesecake", "Yogurt bowls"],
    usesAr: ["سموذي بلوبيرى", "ليموناضة", "موكتيل", "تشيز كيك", "كاسات الزبادي"],
    method: "Blend blueberry sauce with yogurt and ice for a rich smoothie, or layer over vanilla desserts.",
    methodAr: "اخلط صوص البلوبيرى مع الزبادي البارد والثلج لتحضير سموذي. أضف الصوص تدريجيًا حتى تصل إلى الحلاوة والقوام المناسبين، ثم قدّم باردًا.",
    weight: "1.25 KG",
    weightAr: "١٫٢٥٠ كجم",
  },
  raspberry: {
    title: "Raspberry sauce",
    titleAr: "صوص الرزبيري",
    intro: "Tart, sweet and aromatic wild red raspberry sauce, elevating drinks and artisan desserts.",
    introAr: "نكهة التوت الأحمر (الرزبيري) الغنية بتوازن مثالي بين الحلاوة والانتعاش لإثراء المشروبات والحلويات.",
    uses: ["Raspberry lemonade", "Smoothies", "Cheesecake topping", "Ice cream", "Cocktails"],
    usesAr: ["ليموناضة الرزبيري", "سموذي التوت", "تشيز كيك", "آيس كريم", "كوكتيلات باردة"],
    method: "Add 30ml raspberry sauce to ice and lemonade or sparkling soda. Stir gently and garnish with fresh mint.",
    methodAr: "أضف 30 مل من صوص الرزبيري إلى كوب الثلج مع الليموناضة أو المياه الفوارة، وقلّب بلطف للتزيين بالنعناع.",
    weight: "1.25 KG",
    weightAr: "١٫٢٥٠ كجم",
  },
  mixberry: {
    title: "Mixed berry sauce",
    titleAr: "صوص التوت المشكل",
    intro: "A deep blend of blackberries, blueberries, and raspberries creating a multi-layered berry finish.",
    introAr: "مزيج فاخر من التوت الأسود والأزرق والأحمر يمنح المشروبات والحلويات لوناً ياقوتياً ونكهة غنية.",
    uses: ["Berry smoothie", "Iced tea", "Pancakes & waffles", "Dessert bowls", "Frappes"],
    usesAr: ["سموذي التوت المشكل", "آيس تي التوت", "بان كيك ووافل", "كاسات الحلوى", "فرابيه"],
    method: "Blend frozen mixed berries with cold milk or yogurt and Akula mixed berry sauce.",
    methodAr: "اخلط الفواكه المثلجة مع الحليب البارد أو الزبادي وصوص التوت المشكل من أكولة لتقديم سموذي متماسك وغني.",
    weight: "1.25 KG",
    weightAr: "١٫٢٥٠ كجم",
  },
  strawberry: {
    title: "Strawberry sauce",
    titleAr: "صوص الفراولة",
    intro: "Luscious strawberry puree offering bright red fruit flavor to milkshakes, mocktails and cheesecake.",
    introAr: "نكهة فراولة زاهية تضيف لمسة فاكهية منعشة للميلك شيك والسموذي والحلويات والتشيز كيك.",
    uses: ["Milkshake", "Smoothie", "Lemonade", "Cheesecake topping", "Ice cream"],
    usesAr: ["ميلك شيك", "سموذي", "ليموناضة", "تشيز كيك", "زبادي"],
    method: "Blend cold milk and ice cream with strawberry sauce, pour into glass and garnish with fresh fruit.",
    methodAr: "اخلط الحليب البارد وآيس كريم الفانيليا مع صوص الفراولة. اضبط الحلاوة والقوام وقدّم مع قطعة فراولة للتزيين.",
    weight: "1.25 KG",
    weightAr: "١٫٢٥٠ كجم",
  },
  "passion-fruit": {
    title: "Passion fruit sauce",
    titleAr: "صوص الباشون فروت",
    intro: "Exotic tropical passion fruit bringing tart, aromatic citrus notes to summer drinks.",
    introAr: "نكهة باشون فروت بطابع استوائي فريد تضيف لمسة فاكهية واضحة للمشروبات الباردة والحلويات.",
    uses: ["Passion fruit mojito", "Iced tea", "Lemonade", "Smoothies", "Mocktails"],
    usesAr: ["موهيتو باشون", "آيس تي", "ليموناضة", "سموذي", "موكتيلات استوائية"],
    method: "Add passion fruit sauce to a glass with ice and fresh mint, top with sparkling soda and stir.",
    methodAr: "ضع صوص الباشون في الكوب مع الثلج وأوراق النعناع، ثم أضف المياه الفوارة وقلّب بلطف. اضبط الكمية حسب الحلاوة المطلوبة وقدّم فورًا.",
    weight: "1.25 KG",
    weightAr: "١٫٢٥٠ كجم",
  },
  mango: {
    title: "Mango sauce",
    titleAr: "صوص المانجو",
    intro: "Sun-ripened tropical mango puree ideal for thick smoothies, fruit mocktails and sundaes.",
    introAr: "نكهة مانجو استوائية غنية تمنح المشروبات الاستوائية والحلويات طابعًا محببًا وقواماً ممتازاً.",
    uses: ["Mango smoothie", "Milkshake", "Tropical punch", "Ice cream", "Yogurt"],
    usesAr: ["سموذي مانجو", "ميلك شيك", "كوكتيل استوائي", "آيس كريم", "زبادي"],
    method: "Blend mango sauce with ice and yogurt or chilled milk for a velvet-smooth tropical creation.",
    methodAr: "اخلط صوص المانجو مع الزبادي البارد والثلج. أضف قليلًا من الحليب حسب القوام المطلوب وقدّم باردًا.",
    weight: "1.25 KG",
    weightAr: "١٫٢٥٠ كجم",
  },
  peach: {
    title: "Peach sauce",
    titleAr: "صوص الخوخ",
    intro: "Juicy, sweet summer peach notes crafted specifically for iced teas, sodas and blended beverages.",
    introAr: "نكهة الخوخ الصيفي المنعشة بنعومة استثنائية، مثالية لتحضير أشهر أنواع الآيس تي والمشروبات الباردة.",
    uses: ["Peach iced tea", "Peach lemonade", "Fruit punch", "Panna cotta", "Yogurt parfaits"],
    usesAr: ["آيس تي الخوخ", "ليموناضة الخوخ", "مشروبات الفاكهة", "بانا كوتا", "بارفيه الزبادي"],
    method: "Stir 30ml peach sauce into chilled brewed black or green tea with ice for a cafe-grade peach iced tea.",
    methodAr: "امزج 30 مل من صوص الخوخ مع الشاي المثلج والثلج للحصول على أفضل كوب آيس تي خوخ منعش.",
    weight: "1.25 KG",
    weightAr: "١٫٢٥٠ كجم",
  },
  kiwi: {
    title: "Kiwi sauce",
    titleAr: "صوص الكيوي",
    intro: "Vibrant emerald kiwi puree with lively natural acidity and refreshing fruit sweetness.",
    introAr: "نكهة الكيوي الخضراء بحموضتها الطبيعية المنعشة وحلاوتها المتوازنة، لتلوين وتنويع قائمة مشروباتك.",
    uses: ["Kiwi lemonade", "Kiwi mint smoothie", "Tropical mocktails", "Fruit cups", "Cocktails"],
    usesAr: ["ليموناضة الكيوي", "سموذي الكيوي والنعناع", "موكتيلات استوائية", "سلطة فواكه", "عصائر مثلجة"],
    method: "Blend kiwi sauce with ice, lemon juice, and a splash of cold water for a revitalizing green drink.",
    methodAr: "اخلط صوص الكيوي مع الثلج وعصير الليمون والنعناع الطازج لمشروب أخضر منعش ومليء بالحيوية.",
    weight: "1.25 KG",
    weightAr: "١٫٢٥٠ كجم",
  },
  watermelon: {
    title: "Watermelon sauce",
    titleAr: "صوص البطيخ",
    intro: "Refreshing summer watermelon flavour crafted for frozen slushes, iced teas and sodas.",
    introAr: "نكهة بطيخ منعشة تمنح المشروبات الباردة طابعًا صيفيًا مميزًا وترطيباً فائقاً.",
    uses: ["Watermelon iced tea", "Watermelon lemonade", "Sparkling soda", "Summer mocktails", "Slush"],
    usesAr: ["آيس تي بالبطيخ", "ليموناضة بالبطيخ", "مياه فوارة", "موكتيلات صيفية", "سلاش"],
    method: "Blend 30ml watermelon sauce with crushed ice and cold water for a cooling summer slush.",
    methodAr: "ابدأ بـ30 مل من صوص البطيخ مع نحو 200 مل من المياه الباردة أو الفوارة، ثم أضف الثلج. قلّب بلطف وزيّن بالنعناع أو الليمون.",
    weight: "1.25 KG",
    weightAr: "١٫٢٥٠ كجم",
  },
  pineapple: {
    title: "Pineapple sauce",
    titleAr: "صوص الأناناس",
    intro: "Bright tropical pineapple essence delivering crisp sweetness and vibrant exotic aroma.",
    introAr: "عبير الأناناس الاستوائي الغني بالحيوية والانتعاش لتحضير أفضل الموكتيلات الصيفية والسموذي.",
    uses: ["Pina colada mocktails", "Pineapple iced tea", "Tropical smoothies", "Dessert glazes", "Sodas"],
    usesAr: ["بينا كولادا", "آيس تي الأناناس", "سموذي استوائي", "تزيين الحلويات", "صودا الفواكه"],
    method: "Shake pineapple sauce with coconut milk and crushed ice for a non-alcoholic tropical treat.",
    methodAr: "اخفق صوص الأناناس مع حليب جوز الهند والثلج المجروش لمشروب استوائي بطعم فريد.",
    weight: "1.25 KG",
    weightAr: "١٫٢٥٠ كجم",
  },
  "green-apple": {
    title: "Green apple sauce",
    titleAr: "صوص التفاح الأخضر",
    intro: "Crisp, tart granny smith green apple flavour offering an electric zing to sodas and iced teas.",
    introAr: "طعم التفاح الأخضر الحامض المنعش الذي يضفي طاقة وانتعاشاً مميزاً على المشروبات الغازية والعصائر.",
    uses: ["Green apple soda", "Apple iced tea", "Smoothies", "Frozen apple slush", "Mocktails"],
    usesAr: ["صودا التفاح الأخضر", "آيس تي التفاح", "سموذي مثلج", "سلاش التفاح الأخضر", "موكتيلات"],
    method: "Combine 30ml green apple sauce with ice and chilled sparkling soda, finish with a slice of fresh apple.",
    methodAr: "أضف 30 مل من صوص التفاح الأخضر إلى كوب ثلج مع المياه الفوارة وشرائح التفاح لتقديم منعش.",
    weight: "1.25 KG",
    weightAr: "١٫٢٥٠ كجم",
  },
};

// Build dictionary supporting BOTH slug and numeric index
export const flavourProfilesData: Record<string, FlavourProfile> = {
  ...baseProfiles,
  "0": baseProfiles["chocolate"],
  "1": baseProfiles["caramel"],
  "2": baseProfiles["condensed-milk"],
  "3": baseProfiles["salted-caramel"],
  "4": baseProfiles["watermelon"],
  "5": baseProfiles["blueberry"],
  "6": baseProfiles["pineapple"],
  "7": baseProfiles["passion-fruit"],
  "8": baseProfiles["strawberry"],
  "9": baseProfiles["raspberry"],
  "10": baseProfiles["mixberry"],
  "11": baseProfiles["mango"],
  "12": baseProfiles["peach"],
  "13": baseProfiles["kiwi"],
  "14": baseProfiles["green-apple"],
};

export const editorialFlavours = [
  {
    slug: "chocolate",
    title: "Chocolate topping",
    titleAr: "توبينج الشيكولاته",
    desc: "For hot chocolate, milkshakes, brownies and waffles.",
    descAr: "للهوت شوكليت والميلك شيك والبراونيز والوافل.",
    image: "/assets/chocolate.jpg",
    accent: "chocolate",
    productId: 0,
  },
  {
    slug: "salted-caramel",
    title: "Salted caramel topping",
    titleAr: "توبينج كراميل مملح",
    desc: "For salted caramel lattes, cold brew and cheesecake.",
    descAr: "للاتيه الكراميل المملح والكولد برو والتشيز كيك.",
    image: "/assets/salted-caramel.jpg",
    accent: "salted",
    productId: 3,
  },
  {
    slug: "blueberry",
    title: "Blueberry sauce",
    titleAr: "صوص بلوبيرى",
    desc: "For blueberry smoothies, cold teas and yogurt cups.",
    descAr: "لسموذي البلوبيري والشاي المثلج وكاسات الزبادي.",
    image: "/assets/blueberry.jpg",
    accent: "blueberry",
    productId: 5,
  },
  {
    slug: "passion-fruit",
    title: "Passion fruit sauce",
    titleAr: "صوص باشون",
    desc: "For passion fruit mojitos and tropical iced drinks.",
    descAr: "لموهيتو الباشون ومشروبات الصيف الاستوائية.",
    image: "/assets/passion-fruit.jpg",
    accent: "passion",
    productId: 7,
  },
  {
    slug: "watermelon",
    title: "Watermelon sauce",
    titleAr: "صوص بطيخ",
    desc: "For watermelon slush, iced teas and summer sodas.",
    descAr: "لسلاش البطيخ والشاي المثلج وصودا الصيف المنعشة.",
    image: "/assets/watermelon.jpg",
    accent: "watermelon",
    productId: 4,
  },
];

export const recipesData: RecipeItem[] = [
  {
    id: "mango",
    num: "01",
    title: "Mango smoothie",
    titleAr: "سموذي المانجو",
    desc: "A chilled fruit drink with Akula mango flavour. Fresh inspiration for your smoothie menu.",
    descAr: "مشروب فاكهة مثلج بنكهة مانجو أكولة. فكرة منعشة لقائمة السموذي في كافيهك.",
    method: "Blend ice with your favourite smoothie base and gradually add Akula mango sauce to taste. Garnish with fresh mango.",
    methodAr: "اخلط الثلج مع قاعدة السموذي المفضّلة لديك، وأضف توبينج المانجو تدريجيًا حسب الطعم والقوام المطلوبين. زيّن الكوب بقطعة مانجو.",
    image: "/assets/mango.jpg",
    category: "drink",
  },
  {
    id: "caramel",
    num: "02",
    title: "Caramel latte",
    titleAr: "لاتيه الكراميل",
    desc: "Hot espresso and steamed milk finished with smooth Akula caramel flavour.",
    descAr: "إسبريسو دافئ وحليب مبخّر مع لمسة ناعمة من كراميل أكولة.",
    method: "Add caramel topping to the cup, then espresso and milk. Adjust the amount to your cup size and preferred sweetness. Finish with a drizzle of caramel.",
    methodAr: "أضف صوص الكراميل إلى كوب القهوة، ثم الإسبريسو والحليب. اضبط الكمية حسب حجم الكوب ودرجة الحلاوة المطلوبة، وزيّن الوجه بلمسة كراميل.",
    image: "/assets/caramel.jpg",
    category: "drink",
  },
  {
    id: "strawberry",
    num: "03",
    title: "Strawberry cheesecake",
    titleAr: "تشيز كيك الفراولة",
    desc: "A rich dessert slice finished with bright fruit flavour.",
    descAr: "قطعة تشيز كيك غنية مكللة بنكهة فاكهة زاهية.",
    method: "Spoon strawberry sauce over cheesecake just before serving and garnish with a fresh strawberry. Adjust the amount to your portion.",
    methodAr: "ضع توبينج الفراولة على قطعة التشيز كيك عند التقديم، وأضف ثمرة فراولة للتزيين. اضبط الكمية حسب حجم القطعة.",
    image: "/assets/strawberry.jpg",
    category: "dessert",
  },
  {
    id: "cocktail",
    title: "Fruit cocktail",
    titleAr: "كوكتيل الفاكهة",
    desc: "A sparkling cold fruit beverage with Akula tropical notes.",
    descAr: "مشروب فاكهة فوار ومنعش بنكهات أكولة الاستوائية.",
    method: "Add pineapple or passion fruit sauce to a glass with ice, then top with chilled sparkling water. Stir gently and garnish with fruit slices.",
    methodAr: "أضف صوص الأناناس أو الباشون إلى كوب مع الثلج، ثم مياه غازية باردة. قلّب بلطف واضبط كمية الصوص حسب الحلاوة المطلوبة.",
    image: "/assets/recipe-8662.webp",
    category: "drink",
  },
  {
    id: "frappe",
    title: "Chocolate frappe",
    titleAr: "فرابيه الشيكولاته",
    desc: "Creamy blended ice and chocolate dessert beverage.",
    descAr: "مشروب مثلج ومخفوق غني بالشيكولاتة والكريمة.",
    method: "Blend cold milk and ice with chocolate topping. Add chilled coffee if desired and drizzle chocolate inside the glass.",
    methodAr: "اخلط الحليب البارد والثلج مع توبينج الشيكولاته. اضبط الكمية حسب حجم الكوب والقوام المطلوب. أضف قهوة باردة اختياريًا، وقدّم فورًا.",
    image: "/assets/recipe-8665.webp",
    category: "drink",
  },
  {
    id: "berry",
    title: "Berry smoothie",
    titleAr: "سموذي التوت",
    desc: "Thick, nutrient-rich frozen berry blend.",
    descAr: "مزيج توت مثلج كثيف ومغذي بنكهة التوت الطبيعي.",
    method: "Blend frozen berries with cold milk or yogurt and Akula mixed berry sauce. Adjust sweetness and texture, then serve chilled.",
    methodAr: "اخلط التوت المجمّد مع الحليب البارد أو الزبادي وصوص ميكس بيرى أكولة. اضبط الحلاوة والقوام، وقدّم باردًا.",
    image: "/assets/recipe-8663.webp",
    category: "drink",
  },
  {
    id: "fruitcream",
    title: "Strawberry fruit cream",
    titleAr: "كريمة الفراولة بالفواكه",
    desc: "Layered chilled cream with vibrant strawberry ribbons.",
    descAr: "طبقات كريمة باردة مع خطوط فراولة غنية.",
    method: "Fold Akula strawberry sauce into chilled cream or yogurt. Layer with fresh fruit in dessert cups and chill before serving.",
    methodAr: "امزج صوص فراولة أكولة مع الكريمة الباردة أو الزبادي. وزّعها في كاسات مع الفواكه الطازجة، وبرّدها قبل التقديم.",
    image: "/assets/recipe-8660.webp",
    category: "dessert",
  },
  {
    id: "blueberrycream",
    title: "Blueberry dessert cups",
    titleAr: "كاسات حلوى البلوبيري",
    desc: "Buttery crumbs, velvet cream and wild blueberry compote.",
    descAr: "بسكويت مقرمش، كريمة فانيليا ناعمة ولمسة توت أزرق.",
    method: "Layer biscuit crumbs, vanilla cream and Akula blueberry sauce. Finish with fresh blueberries and chill.",
    methodAr: "رتّب طبقات من فتات البسكويت وكريمة الفانيليا وصوص بلوبيرى أكولة. زيّن بحبات البلوبيري وقدّم باردًا.",
    image: "/assets/recipe-8661.webp",
    category: "dessert",
  },
  {
    id: "choccream",
    title: "Chocolate cream",
    titleAr: "كريمة الشيكولاته",
    desc: "Decadent dark chocolate over light whipped cream.",
    descAr: "صوص شيكولاتة غني مسكوب فوق كريمة خفيفة وشهية.",
    method: "Spoon Akula chocolate topping over chilled vanilla cream. Dust with dark cocoa powder and serve.",
    methodAr: "أضف توبينج شيكولاته أكولة فوق كريمة الفانيليا الباردة. زيّن برشة كاكاو وقدّم.",
    image: "/assets/recipe-8666.webp",
    category: "dessert",
  },
  {
    id: "passion",
    title: "Passion fruit mojito",
    titleAr: "موهيتو الباشون",
    desc: "Zesty mint, lime, passion fruit and sparkling soda.",
    descAr: "نعناع طازج، ليمون، باشون فروت وصودا فوارة.",
    method: "Add passion fruit sauce to a glass, followed by ice, mint leaves and chilled sparkling water. Stir gently and enjoy.",
    methodAr: "ضع صوص الباشون في كوب، وأضف الثلج وأوراق النعناع ثم المياه الغازية الباردة. قلّب برفق واضبط كمية الصوص.",
    image: "/assets/recipe-8667.webp",
    category: "drink",
  },
  {
    id: "cheesecakeflavours",
    title: "Akula flavour cheesecake",
    titleAr: "تشيز كيك بنكهات أكولة",
    desc: "A flight of artisanal sauces over New York style cheesecake.",
    descAr: "تشكيلة من صوصات أكولة فوق تشيز كيك نيويورك الفاخرة.",
    method: "Slice vanilla cheesecake into equal wedges. Top each separately with chocolate, caramel, condensed milk, blueberry, or mango sauce.",
    methodAr: "قطّع تشيز كيك الفانيليا المبردة إلى شرائح متساوية. زيّن كل شريحة بصوص مختلف من أكولة، مثل الشيكولاتة أو الكراميل أو الحليب المكثف أو البلوبيرى.",
    image: "/assets/cheesecake-akula-flavours.webp",
    category: "dessert",
  },
];

export const comingSoonItems = [
  {
    title: "Pistachio topping",
    titleAr: "توبينج الفستق",
    image: "/assets/coming-pistachio.webp",
  },
  {
    title: "Espresso topping",
    titleAr: "توبينج الإسبريسو",
    image: "/assets/coming-espresso.webp",
  },
  {
    title: "White chocolate topping",
    titleAr: "توبينج الشيكولاته البيضاء",
    image: "/assets/coming-white-chocolate.webp",
  },
  {
    title: "Lotus topping",
    titleAr: "توبينج اللوتس",
    image: "/assets/coming-lotus.webp",
  },
];

export const journalArticlesData: JournalArticle[] = [
  {
    id: 0,
    category: "IDEAS & INSPIRATION",
    categoryAr: "أفكار وإلهام",
    title: "A finishing touch for chocolate desserts",
    titleAr: "لمسة الشيكولاته للحلويات",
    excerpt: "Explore simple ways to finish cream desserts with Akula chocolate topping.",
    excerptAr: "استكشف طرقًا بسيطة لتزيين الحلويات والكريمة بتوبينج الشيكولاته من أكولة.",
    content: "Add chocolate topping just before serving to create a rich finishing layer. Try it over vanilla cream, ice cream or pancakes, and adjust the portion to taste. The deep cocoa notes provide the ideal temperature contrast with cold gelato.",
    contentAr: "أضف توبينج الشيكولاته قبل التقديم مباشرة لتحصل على طبقة غنية. جرّبه فوق كريمة الفانيليا أو الآيس كريم أو البان كيك، واضبط الكمية حسب ذوقك.",
    image: "/assets/recipe-8668.webp",
  },
  {
    id: 1,
    category: "SUMMER RECIPES",
    categoryAr: "وصفات الصيف",
    title: "Fruit sauces for summer drinks",
    titleAr: "صوصات الفاكهة لمشروبات الصيف",
    excerpt: "Ideas for cold mocktails and smoothies made with fruit flavours.",
    excerptAr: "أفكار للموكتيلات الباردة والسموذي بنكهات الفواكه المنعشة.",
    content: "Blend berries with ice and your preferred smoothie base. Add Akula mixed berry sauce gradually to adjust sweetness and texture. Serve immediately and garnish with fresh fruit slices. Perfect for beach and rooftop café menus.",
    contentAr: "اخلط التوت والثلج مع قاعدة السموذي المفضلة لديك. أضف صوص ميكس بيرى أكولة تدريجيًا لضبط الحلاوة والقوام. قدّم فورًا وزيّن بالفواكه.",
    image: "/assets/recipe-8663.webp",
  },
  {
    id: 2,
    category: "COFFEE TRENDS",
    categoryAr: "اتجاهات القهوة",
    title: "Caramel in your coffee menu",
    titleAr: "الكراميل في قائمة القهوة",
    excerpt: "How to balance caramel flavour in warm lattes and cold coffees.",
    excerptAr: "كيف توازن نكهة الكراميل في اللاتيه الدافئ والقهوة الباردة.",
    content: "Add caramel topping to your cup, then espresso and milk. Stir gently, taste and adjust the caramel quantity. Finish with a light caramel drizzle over microfoam for an irresistible aroma and presentation.",
    contentAr: "أضف توبينج الكراميل إلى الكوب، ثم القهوة والحليب. قلّب بلطف وتذوق المشروب لضبط كمية الكراميل. أكمل التقديم بلمسة خفيفة على الوجه.",
    image: "/assets/caramel.jpg",
  },
];

export const partnershipsData = {
  eyebrow: "AKULA PARTNERS",
  eyebrowAr: "شركاء أكولة",
  title: "Join our network",
  titleAr: "انضم إلى شبكة شركائنا",
  desc: "Whether you run a café, a pastry business or a distribution company, discover Akula flavours and contact our team about products, quantities and supply.",
  descAr: "سواء كنت تدير مقهى أو مشروع حلويات أو شركة توزيع، اكتشف نكهات أكولة وتواصل مع فريقنا لمعرفة المنتجات والكميات وطرق التوريد.",
  benefits: [
    {
      title: "Cafés & Coffee Shops",
      titleAr: "المقاهي والكافيهات",
      desc: "Reliable flavours that integrate seamlessly into your hot and cold drink menu.",
      descAr: "نكهات متناسقة وسهلة الاستخدام في مشروباتك الساخنة والباردة لتميز قائمتك.",
    },
    {
      title: "Pastry & Dessert Makers",
      titleAr: "صنّاع الحلويات والمعجنات",
      desc: "Rich sauces crafted to finish cakes, waffles, crepes and artisanal gelato.",
      descAr: "صوصات غنية مصممة لتزيين الكيك والوافل والكريب والآيس كريم الحرفي.",
    },
    {
      title: "Regional Distributors",
      titleAr: "الموزعون في المحافظات",
      desc: "Stable supply chain, professional packaging, and long-term commercial partnership across Egypt.",
      descAr: "سلاسل إمداد مستقرة، عبوات عملية، وشراكة تجارية طويلة الأمد في مختلف المحافظات.",
    },
  ],
};

export const aboutContent = {
  eyebrow: "About us · Akula Topping",
  eyebrowAr: "من نحن · أكولة توبينج",
  headingPrimary: "Nature’s finest flavours,",
  headingPrimaryAr: "أروع نكهات الطبيعة،",
  headingSecondary: "taste as it should be.",
  headingSecondaryAr: "المذاق كما يجب أن يكون.",
  intro:
    "We believe the finest flavours are not manufactured, but harvested from the gifts of the earth. Our mission is to preserve this authenticity and bring it directly to your table through premium sauces, defined by uncompromising quality, clarity, and complete respect for every natural ingredient.",
  introAr:
    "نحن نؤمن بأن أرقى النكهات لا تُصنَّع، بل تُحصد من خيرات الأرض. مهمتنا هي الحفاظ على هذه الأصالة ونقلها مباشرة إلى مائدتك من خلال صوصات فاخرة، قوامها الجودة المطلقة، الوضوح، والاحترام الكامل لكل مكون طبيعي.",
  evolutionTitle: "Our evolution",
  evolutionTitleAr: "تطورنا",
  evolutionP1:
    "What began as a specialized pursuit of artisanal chocolate and caramel has evolved into a regional benchmark for excellence. Our early success was built on a simple promise: Seamless Perfection.",
  evolutionP1Ar:
    "ما بدأ كشغف متخصص في صناعة الشوكولاتة والكراميل تحول اليوم إلى معيار إقليمي للتميز والجودة. وقد قامت انطلاقتنا الأولى على وعد بسيط: إتقان متكامل بلا مساومة.",
  evolutionP2:
    "By 2025, we scaled our vision, introducing a diverse line of premium sauces crafted from carefully selected natural fruits, delivering rich and genuine flavors to culinary creators.",
  evolutionP2Ar:
    "بحلول عام ٢٠٢٥، ارتقينا برؤيتنا لنقدم خطاً متنوعاً من الصوصات الفاخرة، المصنوعة بعناية من ثمار الفواكه الطبيعية المختارة، لتمنح صنّاع المذاق نكهات أصيلة وغنية.",
  evolutionP3:
    "Today, our network bridges governorates across Egypt, connecting elite distributors with a shared passion for setting new industry standards through innovation and long-term integrity.",
  evolutionP3Ar:
    "اليوم، تمتد شبكتنا عبر المحافظات، لتجمع نخبة من الموزعين يجمعهم شغف واحد: وضع معايير جديدة وغير مسبوقة في هذه الصناعة عبر الابتكار والنزاهة المستمرة.",
  stat1Num: "100%",
  stat1Label: "RAW NATURAL ORIGINS",
  stat1LabelAr: "مكونات طبيعية خالصة",
  stat2Num: "55+",
  stat2Label: "ELITE DISTRIBUTORS",
  stat2LabelAr: "وكلاء وموزعون معتمدون",
  essenceTitle: "The Essence",
  essenceTitleAr: "الجوهر",
  essenceQuote:
    "We don't just supply ingredients; we provide the elemental soul for every drink and dessert masterpiece.",
  essenceQuoteAr:
    "نحن لا نوفر المكونات فقط؛ بل نقدم الروح الأساسية لكل مشروب وحلوى مميزة.",
  mapImage: "/assets/distribution-egypt-v2.webp",
  showcaseImage: "/assets/about-showcase.webp",
};

export const contactDetails = {
  tel: "01050677740",
  support: "01007006871",
  whatsappNumber: "201050677740",
  email: "akulatopping@gmail.com",
  facebook: "https://www.facebook.com/profile.php?id=61586971604087",
  instagram: "https://www.instagram.com/akula_topping?jplx=YXdueTJtYml3bWk=",
  addressEn: "Third Industrial Zone, Cairo–Alexandria Ag. Road, Banha, Egypt",
  addressAr: "المنطقة الصناعية الثالثة، طريق القاهرة الإسكندرية الزراعي، بنها، مصر",
  mapsUrl: "https://maps.app.goo.gl/f1Bj3UmhxLmkqFog9?g_st=iw",
};



export interface ProfessionalApplication {
  num: string;
  tag: string;
  title: string;
  titleAr: string;
  desc: string;
  descAr: string;
  image: string;
  link: string;
}

export const professionalApplications: ProfessionalApplication[] = [
  {
    num: "01",
    tag: "COFFEE",
    title: "Coffee & cafés",
    titleAr: "القهوة والمقاهي",
    desc: "Caramel lattes, chocolate frappés and creamy drinks.",
    descAr: "لاتيه الكراميل، فرابيه الشيكولاته ومشروبات الحليب.",
    image: "/assets/recipe-8663.webp",
    link: "/recipes/",
  },
  {
    num: "02",
    tag: "DESSERTS",
    title: "Pastry & desserts",
    titleAr: "الحلواني والحلويات",
    desc: "Finishing touches for cheesecake, ice cream and plated desserts.",
    descAr: "لمسات تقديم للتشيز كيك والآيس كريم وكاسات الحلوى.",
    image: "/assets/recipe-8668.webp",
    link: "/recipes/",
  },
  {
    num: "03",
    tag: "FRUIT",
    title: "Fruit & refreshment",
    titleAr: "الفاكهة والمشروبات",
    desc: "Fruit sauces for smoothies, iced drinks and summer menus.",
    descAr: "صوصات فاكهة للسموذي والمشروبات الباردة وقائمة الصيف.",
    image: "/assets/recipe-8660.webp",
    link: "/products/?category=fruit",
  },
];

export const comingSoonLines = [
  {
    badge: "Coming soon",
    badgeAr: "قريبًا",
    title: "Powders",
    titleAr: "بودر",
    desc: "A new powder range for preparing drinks.",
    descAr: "مجموعة بودر جديدة لتحضير المشروبات.",
    sub: "AKULA POWDERS",
  },
  {
    badge: "Coming soon",
    badgeAr: "قريبًا",
    title: "Syrups",
    titleAr: "سيرب",
    desc: "A new syrup range to bring more flavours to your menu.",
    descAr: "مجموعة سيرب جديدة لتنويع نكهات قائمتك.",
    sub: "AKULA SYRUPS",
  },
];

export const worldCards = [
  {
    title: "Toppings",
    titleAr: "التوبينج",
    subtitle: "For coffee and desserts",
    subtitleAr: "للقهوة والحلويات",
    image: "/assets/chocolate-drinks-v1.webp",
    link: "/products/?category=topping",
    alt: "Akula toppings",
    altAr: "توبينج أكولة",
  },
  {
    title: "Condensed milk topping",
    titleAr: "توبينج الحليب المكثف",
    subtitle: "Spanish latte and milk cake",
    subtitleAr: "سبانش لاتيه وكيكة الحليب",
    image: "/assets/condensed-milk-serving-v1.webp",
    link: "/products/?category=topping",
    alt: "Condensed milk topping — Spanish latte and milk cake",
    altAr: "توبينج الحليب المكثف — سبانش لاتيه وكيكة الحليب",
  },
  {
    title: "Passion fruit sauce",
    titleAr: "صوص الباشون فروت",
    subtitle: "Passion soda and cheesecake",
    subtitleAr: "صودا باشون وتشيز كيك",
    image: "/assets/passion-fruit-serving-v1.webp",
    link: "/products/?category=fruit",
    alt: "Passion fruit sauce — Passion soda and cheesecake",
    altAr: "صوص الباشون فروت — صودا باشون وتشيز كيك",
  },
  {
    title: "Blueberry sauce",
    titleAr: "صوص البلوبيرى",
    subtitle: "Blueberry smoothie and cheesecake",
    subtitleAr: "سموذي بلوبيرى وتشيز كيك",
    image: "/assets/blueberry-serving-v1.webp",
    link: "/products/?category=fruit",
    alt: "Blueberry sauce — Blueberry smoothie and cheesecake",
    altAr: "صوص البلوبيرى — سموذي بلوبيرى وتشيز كيك",
  },
];
