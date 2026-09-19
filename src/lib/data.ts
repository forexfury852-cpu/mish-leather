export type CategoryKey = 'shoes' | 'bags' | 'belts' | 'wallets' | 'accessories';

export interface ColorOption {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  latin: string;
  category: CategoryKey;
  price: number;
  oldPrice?: number;
  badge?: 'new' | 'bestseller';
  rating: string;
  reviews: number;
  colors: ColorOption[];
  sizes?: string[];
  dimensions?: string;
  material: string[];
  description: string;
  story: string;
  image: string;
  gallery: string[];
}

export const CATEGORIES: {
  key: CategoryKey;
  title: string;
  latin: string;
  image: string;
  count: number;
  line: string;
}[] = [
  { key: 'shoes', title: 'کفش مردانه', latin: 'Footwear', image: '/images/cat-shoes.jpg', count: 24, line: 'فرم، در خدمت پا' },
  { key: 'bags', title: 'کیف', latin: 'Bags', image: '/images/cat-bag.jpg', count: 31, line: 'همراهِ روزهای بلند' },
  { key: 'belts', title: 'کمربند', latin: 'Belts', image: '/images/cat-belt.jpg', count: 18, line: 'خطِ تمامِ استایل' },
  { key: 'wallets', title: 'کیف پول', latin: 'Small Leather Goods', image: '/images/cat-wallet.jpg', count: 22, line: 'جزئیاتی که در دست زندگی می‌کنند' },
  { key: 'accessories', title: 'اکسسوری', latin: 'Accessories', image: '/images/cat-accessory.jpg', count: 27, line: 'امضای پایانی' },
];

export const CATEGORY_TITLE: Record<CategoryKey, string> = {
  shoes: 'کفش مردانه',
  bags: 'کیف',
  belts: 'کمربند',
  wallets: 'کیف پول',
  accessories: 'اکسسوری',
};

const MATERIALS_SHOE = ['رویه: چرم طبیعی گاوی درجه‌یک', 'زیره: چرم دوبل با دوخت بلیک', 'آستر: چرم گوسفندی', 'کفی: طبی و قابل تعویض'];
const MATERIALS_BAG = ['چرم طبیعی گاوی تمام‌دانه', 'یراق برنجی سناییده', 'آستر پشم و کتان', 'دوخت زین‌دوزی دست با نخ موم‌زده'];
const MATERIALS_SMALL = ['چرم طبیعی گاوی', 'دوخت دست با نخ موم‌زده', 'لبه‌های دست‌ساز و پولیش‌شده'];

export const PRODUCTS: Product[] = [
  {
    id: 'arta-messenger',
    name: 'کیف پیکانی «آرتا»',
    latin: 'Arta Messenger',
    category: 'bags',
    price: 12800000,
    oldPrice: 14500000,
    badge: 'new',
    rating: '۴٫۹',
    reviews: 132,
    colors: [
      { name: 'قهوه‌ای تیره', hex: '#3e2a1c' },
      { name: 'مشکی', hex: '#1a1817' },
      { name: 'اسپرسو', hex: '#2c1e14' },
    ],
    dimensions: '۳۵ × ۲۸ × ۱۱ سانتی‌متر',
    material: MATERIALS_BAG,
    description:
      'کیف پیکانی «آرتا» از چرم تمام‌دانه‌ی گاوی با یراق برنجی سناییده ساخته می‌شود؛ قطعه‌ای برای مردانی که ساده‌گویی را بلدند. جیب داخلی لپ‌تاپ ۱۴ اینچ و بند قابل تنظیم از ویژگی‌های آن است.',
    story:
      'هر «آرتا» چهارده ساعت در کارگاه میش روی میز کار می‌ماند؛ از برش دستی الگو تا پرداخت نهایی لبه‌ها با موم زنبور. چرم این قطعه از دباغی گیاهی تبریز تأمین می‌شود و با گذر زمان، پتینه‌ای گرم و شخصی می‌گیرد.',
    image: '/images/prod-bag-1.jpg',
    gallery: ['/images/prod-bag-1.jpg', '/images/gallery-1.jpg', '/images/gallery-2.jpg', '/images/gallery-3.jpg'],
  },
  {
    id: 'arash-oxford',
    name: 'کفش آکسفورد «آرش»',
    latin: 'Arash Oxford',
    category: 'shoes',
    price: 8900000,
    badge: 'new',
    rating: '۴٫۸',
    reviews: 214,
    colors: [
      { name: 'مشکی', hex: '#1a1817' },
      { name: 'قهوه‌ای تیره', hex: '#3e2a1c' },
    ],
    sizes: ['۴۰', '۴۱', '۴۲', '۴۳', '۴۴', '۴۵'],
    material: MATERIALS_SHOE,
    description:
      'آکسفورد «آرش» با دوخت بلیک و رویه‌ی چرم کلف‌اسکین مشکی، رسمی‌ترین قطعه‌ی کمد شماست؛ سیلوئتی کشیده و قرینه‌ای بی‌نقص برای لباس رسمی.',
    story:
      'قالب «آرش» بر اساس آناتومی پای ایرانی طراحی شده و بعد از ده روز استفاده، فرم پای شما را به خود می‌گیرد؛ مثل یک لباس دوختگیِ اختصاصی.',
    image: '/images/prod-shoe-1.jpg',
    gallery: ['/images/prod-shoe-1.jpg', '/images/ig-2.jpg', '/images/gallery-1.jpg'],
  },
  {
    id: 'barzan-derby',
    name: 'کفش دربی «برزن»',
    latin: 'Barzan Derby',
    category: 'shoes',
    price: 9400000,
    rating: '۴٫۷',
    reviews: 158,
    colors: [
      { name: 'کنیاک', hex: '#7a4a28' },
      { name: 'مشکی', hex: '#1a1817' },
    ],
    sizes: ['۴۰', '۴۱', '۴۲', '۴۳', '۴۴', '۴۵'],
    material: MATERIALS_SHOE,
    description:
      'دربی «برزن» با جزئیات براگ و چرم کنیاک، مرز میان رسمی و غیررسمی را جابه‌جا می‌کند؛ از شلوار پارچه‌ای تا جینِ تیره بی‌نقص می‌نشیند.',
    story:
      'رنگ کنیاک این قطعه از دباغی گیاهی چندمرحله‌ای می‌آید؛ فرآیندی که ده روز طول می‌کشد و رنگی عمیق و زنده می‌سازد که با گذر زمان عمیق‌تر می‌شود.',
    image: '/images/prod-shoe-2.jpg',
    gallery: ['/images/prod-shoe-2.jpg', '/images/ig-2.jpg', '/images/craft-hides.jpg'],
  },
  {
    id: 'alborz-chelsea',
    name: 'بوت چلسی «البرز»',
    latin: 'Alborz Chelsea',
    category: 'shoes',
    price: 11200000,
    badge: 'bestseller',
    rating: '۴٫۹',
    reviews: 341,
    colors: [
      { name: 'اسپرسو', hex: '#2c1e14' },
      { name: 'مشکی', hex: '#1a1817' },
    ],
    sizes: ['۴۰', '۴۱', '۴۲', '۴۳', '۴۴', '۴۵'],
    material: MATERIALS_SHOE,
    description:
      'چلسی «البرز» با کشِ ابریشمی و پاشنه‌ی چرمی، استقامت بوت و نجابت کفش رسمی را یک‌جا دارد؛ قطعه‌ای برای پاییزهای طولانی تهران.',
    story:
      'کشِ کناری این بوت از ابریشم بافته‌شده در یزد است و تا ده هزار کشش آزمون شده؛ جزئیاتی که فقط در استفاده‌ی روزمره معنا پیدا می‌کند.',
    image: '/images/prod-shoe-3.jpg',
    gallery: ['/images/prod-shoe-3.jpg', '/images/craft-hands.jpg', '/images/ig-2.jpg'],
  },
  {
    id: 'kian-briefcase',
    name: 'کیف کارگانی «کیان»',
    latin: 'Kian Briefcase',
    category: 'bags',
    price: 14500000,
    badge: 'bestseller',
    rating: '۴٫۹',
    reviews: 187,
    colors: [
      { name: 'مشکی', hex: '#1a1817' },
      { name: 'قهوه‌ای تیره', hex: '#3e2a1c' },
    ],
    dimensions: '۳۹ × ۳۰ × ۹ سانتی‌متر',
    material: MATERIALS_BAG,
    description:
      '«کیان» کیف کارگانی ساختارمند با قفل مغناطیسی پنهان و پایه‌های فلزی است؛ برای جلسه‌هایی که جزئیاتشان قبل از شما صحبت می‌کنند.',
    story:
      'اسکلت داخلی «کیان» از مقوای چرمی دست‌ساز است؛ تکنیکی قدیمی که فرم کیف را سال‌ها حفظ می‌کند و از تولید انبوه فاصله‌ای ابدی دارد.',
    image: '/images/prod-bag-2.jpg',
    gallery: ['/images/prod-bag-2.jpg', '/images/gallery-2.jpg', '/images/gallery-3.jpg'],
  },
  {
    id: 'diba-duffle',
    name: 'کیف سفر «دیبا»',
    latin: 'Diba Duffle',
    category: 'bags',
    price: 16900000,
    badge: 'new',
    rating: '۴٫۸',
    reviews: 76,
    colors: [
      { name: 'اسپرسو', hex: '#2c1e14' },
      { name: 'کنیاک', hex: '#7a4a28' },
    ],
    dimensions: '۵۲ × ۲۸ × ۲۶ سانتی‌متر',
    material: MATERIALS_BAG,
    description:
      '«دیبا» کیف سفر چهل‌وهشت‌ساعته با زیپ برنجی دوطرفه و بند شانه‌ی بالشتکی است؛ ظرفیتی که برای دو روز طراحی شده و برای یک عمر ساخته.',
    story:
      'دوخت «دیبا» با نخ موم‌زده‌ی مالتا انجام می‌شود؛ هر کوک دستی، دو برابر استحکام دوخت ماشینی دارد و بخشی از ضمانت مادام‌العمر ماست.',
    image: '/images/prod-bag-3.jpg',
    gallery: ['/images/prod-bag-3.jpg', '/images/craft-hides.jpg', '/images/gallery-1.jpg'],
  },
  {
    id: 'mehr-bifold',
    name: 'کیف پول تاشو «مهر»',
    latin: 'Mehr Bifold',
    category: 'wallets',
    price: 3900000,
    badge: 'bestseller',
    rating: '۴٫۹',
    reviews: 428,
    colors: [
      { name: 'مشکی', hex: '#1a1817' },
      { name: 'قهوه‌ای تیره', hex: '#3e2a1c' },
    ],
    dimensions: '۱۱ × ۹٫۵ سانتی‌متر',
    material: MATERIALS_SMALL,
    description:
      '«مهر» بیفولد کلاسیک با هشت جای کارت، دو جیب اسکناس و محفظه‌ی مخفی سکه؛ نازک‌تر از چیزی که فکر می‌کنید، مقاوم‌تر از چیزی که تصور دارید.',
    story:
      'چرم «مهر» پیش از برش، چهل روز در خشت و روناس دباغی می‌شود؛ برای همین است که لبه‌هایش حتی بعد از سال‌ها وا نمی‌رود.',
    image: '/images/prod-wallet-1.jpg',
    gallery: ['/images/prod-wallet-1.jpg', '/images/ig-3.jpg', '/images/craft-tools.jpg'],
  },
  {
    id: 'sarv-cardholder',
    name: 'کارت‌هدلر «سرو»',
    latin: 'Sarv Cardholder',
    category: 'wallets',
    price: 2800000,
    badge: 'new',
    rating: '۴٫۷',
    reviews: 203,
    colors: [
      { name: 'کنیاک', hex: '#7a4a28' },
      { name: 'مشکی', hex: '#1a1817' },
    ],
    dimensions: '۱۰ × ۷ سانتی‌متر',
    material: MATERIALS_SMALL,
    description:
      '«سرو» کارت‌هدلر مینیمال با شش شیار و لبه‌های دست‌پولیش است؛ برای کسی که سبک سفر می‌کند و سنگین می‌نشیند.',
    story:
      'هر لبه‌ی «سرو» سه مرحله سنباده، دو مرحله موم و یک مرحله حرارت دستی می‌گذرد؛ فرآیندی چهارصدساله که در کارگاه میش هنوز زنده است.',
    image: '/images/prod-wallet-2.jpg',
    gallery: ['/images/prod-wallet-2.jpg', '/images/ig-3.jpg', '/images/gallery-1.jpg'],
  },
  {
    id: 'simorgh-belt',
    name: 'کمربند رسمی «سیمرغ»',
    latin: 'Simorgh Dress Belt',
    category: 'belts',
    price: 4500000,
    rating: '۴٫۸',
    reviews: 167,
    colors: [
      { name: 'مشکی', hex: '#1a1817' },
      { name: 'قهوه‌ای تیره', hex: '#3e2a1c' },
    ],
    sizes: ['۹۰', '۱۰۰', '۱۱۰', '۱۲۰'],
    material: MATERIALS_SMALL,
    description:
      '«سیمرغ» کمربند رسمی با سگک استیل مات و چرم یک‌تکه است؛ خطی تمیز برای کت‌وشلوارهایی که به جزئیات اهمیت می‌دهند.',
    story:
      'سگک «سیمرغ» در قالب دستی ریخته‌گری می‌شود و هر یک، شماره‌ی سری خود را دارد؛ نشانه‌ای از تولید محدودِ کارگاه.',
    image: '/images/prod-belt-1.jpg',
    gallery: ['/images/prod-belt-1.jpg', '/images/ig-4.jpg', '/images/craft-tools.jpg'],
  },
  {
    id: 'rostam-belt',
    name: 'کمربند کلاسیک «رستمان»',
    latin: 'Rostam Classic Belt',
    category: 'belts',
    price: 4900000,
    badge: 'bestseller',
    rating: '۴٫۹',
    reviews: 289,
    colors: [
      { name: 'کنیاک', hex: '#7a4a28' },
      { name: 'مشکی', hex: '#1a1817' },
    ],
    sizes: ['۹۰', '۱۰۰', '۱۱۰', '۱۲۰'],
    material: MATERIALS_SMALL,
    description:
      '«رستمان» با سگک برنجی سناییده و دوخت لبه‌ی دستی، روزهای غیررسمی شما را امضا می‌کند؛ کمربندی که با جین هم و با کتان هم می‌نشیند.',
    story:
      'برنج سگک «رستمان» عمداً سنیما می‌شود؛ پتینه‌ای که با دست‌های شما کامل‌تر خواهد شد و روایت‌گر سال‌های همراهی است.',
    image: '/images/prod-belt-2.jpg',
    gallery: ['/images/prod-belt-2.jpg', '/images/ig-4.jpg', '/images/craft-hides.jpg'],
  },
  {
    id: 'shab-gloves',
    name: 'دستکش رانندگی «شب»',
    latin: 'Shab Driving Gloves',
    category: 'accessories',
    price: 3200000,
    badge: 'new',
    rating: '۴٫۶',
    reviews: 94,
    colors: [
      { name: 'مشکی', hex: '#1a1817' },
      { name: 'اسپرسو', hex: '#2c1e14' },
    ],
    sizes: ['M', 'L', 'XL'],
    material: MATERIALS_SMALL,
    description:
      '«شب» دستکش رانندگی از چرم بره‌ی لمس‌شده با سوراخ‌های تهویه و بند مچ مینیمال؛ چرمی که فرم دست را مثل خاطره نگه می‌دارد.',
    story:
      'چرم بره‌ی «شب» از دباغی آلومینیومی نرم می‌آید و ضخامتی کمتر از یک میلی‌متر دارد؛ حس فرمان را بدون واسطه به پوست منتقل می‌کند.',
    image: '/images/prod-accessory-1.jpg',
    gallery: ['/images/prod-accessory-1.jpg', '/images/cat-accessory.jpg', '/images/craft-hands.jpg'],
  },
  {
    id: 'zarrin-strap',
    name: 'بند ساعت «زرین»',
    latin: 'Zarrin Watch Strap',
    category: 'accessories',
    price: 1900000,
    badge: 'bestseller',
    rating: '۴٫۸',
    reviews: 176,
    colors: [
      { name: 'شاه‌بلوطی', hex: '#4a3220' },
      { name: 'مشکی', hex: '#1a1817' },
    ],
    sizes: ['۱۸ میلی‌متر', '۲۰ میلی‌متر', '۲۲ میلی‌متر'],
    material: MATERIALS_SMALL,
    description:
      '«زرین» بند ساعت دست‌دوز با دوخت زین‌دوزی و سگک برنجی؛ ارتقایی بی‌سروصدا برای ساعتی که سال‌هاست همراه شماست.',
    story:
      'هر بند «زرین» از تکه‌ی باقی‌مانده‌ی کیف‌های سفارشی برش می‌خورد؛ فلسفه‌ی ما: هیچ چرمی نباید بی‌روایت بماند.',
    image: '/images/prod-accessory-2.jpg',
    gallery: ['/images/prod-accessory-2.jpg', '/images/cat-accessory.jpg', '/images/craft-tools.jpg'],
  },
];

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id) ?? PRODUCTS[0];

export const relatedProducts = (id: string, category: CategoryKey, count = 4) =>
  [...PRODUCTS.filter((p) => p.id !== id && p.category === category), ...PRODUCTS.filter((p) => p.id !== id && p.category !== category)].slice(0, count);

export const NEW_COLLECTION = ['arta-messenger', 'barzan-derby', 'sarv-cardholder', 'diba-duffle'].map(
  (id) => PRODUCTS.find((p) => p.id === id)!
);
export const BEST_SELLERS = ['alborz-chelsea', 'mehr-bifold', 'rostam-belt', 'kian-briefcase', 'zarrin-strap', 'arash-oxford'].map(
  (id) => PRODUCTS.find((p) => p.id === id)!
);

/* ---------- Persian numerals & formatting ---------- */
const FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹';
export const toFa = (value: number | string): string =>
  String(value).replace(/\d/g, (d) => FA_DIGITS[Number(d)]);

export const faPrice = (n: number): string =>
  toFa(n.toLocaleString('en-US')).replace(/,/g, '٬') + ' تومان';

/* ---------- Editorial content ---------- */
export const TESTIMONIALS = [
  {
    quote:
      'کیف «آرتا» را سه سال پیش خریدم و هر روز به دست می‌گیرم. رنگش الان مثل ویسکی کهنه شده — هر خط و خشی روی آن، روایت یک روز کاری است.',
    name: 'امیرحسین راد',
    role: 'معمار، تهران',
  },
  {
    quote:
      'بوت چلسی «البرز» را برای سفر کاری خریدم؛ پنج شهر، پانزده پرواز. باورم نمی‌شد چیزی دست‌دوز بتواند این‌قدر بی‌ادعا و مطمئن باشد.',
    name: 'کیوان مرادی',
    role: 'مدیر بازرگانی، اصفهان',
  },
  {
    quote:
      'کمربند «رستمان» را پدرم هدیه گرفت. دو سال بعد برای خودم یکی خریدم. این یعنی چیزی که می‌خواهم به فرزندم بدهم: چیزی که می‌ماند.',
    name: 'بابک افشار',
    role: 'حقوق‌دان، شیراز',
  },
];

export const GUARANTEES = [
  {
    title: 'چرم طبیعی درجه‌یک',
    desc: 'تمام قطعات از چرم تمام‌دانه‌ی دباغی گیاهی ساخته می‌شوند؛ بدون لایه‌ی مصنوعی، بدون استثنا.',
    icon: 'badge',
  },
  {
    title: 'ضمانت مادام‌العمر دوخت',
    desc: 'اگر دوخت دستِ ما روزی کوتاهی کرد، قطعه را بی‌قیدوشرط تعمیر یا تعویض می‌کنیم.',
    icon: 'shield',
  },
  {
    title: 'ارسال بیمه‌شده',
    desc: 'بسته‌بندی چوبی اختصاصی و پیک سریع بیمه‌شده به سراسر ایران؛ تهران، همان روز.',
    icon: 'truck',
  },
  {
    title: 'هفت روز مهلت بازگشت',
    desc: 'اگر قطعه در دستان شما همان احساسی را نداد که در کارگاه داشت، بازمی‌گردانیم.',
    icon: 'return',
  },
];

export const CRAFT_STEPS = [
  {
    title: 'انتخاب پوست',
    desc: 'از میان صدها پوست دباغی‌شده، فقط پوست‌هایی بدون عیب انتخاب می‌شوند که نور را مثل عسل عبور دهند.',
  },
  {
    title: 'برش دستی',
    desc: 'الگوها با کارد نیم‌ماهی و بر پایه‌ی جهت تارهای چرم برش می‌خورند؛ جایی که مقاومت به زیبایی معنا پیدا می‌کند.',
  },
  {
    title: 'زین‌دوزی',
    desc: 'دوخت زین با دو سوزن و نخ موم‌زده؛ کوک‌هایی زنجیره‌ای که حتی اگر یک کوک برود، بقیه استوار می‌مانند.',
  },
  {
    title: 'پرداخت نهایی',
    desc: 'لبه‌ها با سنباده، موم زنبور و حرارت کف دست صیقل می‌خورند؛ آخرین لمسی که نام میش را می‌گیرد.',
  },
];

export const NAV_LINKS = [
  { label: 'خانه', target: 'home' as const },
  { label: 'فروشگاه', target: 'shop' as const },
  { label: 'صنعتگری', target: 'craft' as const },
  { label: 'درباره میش', target: 'craft' as const },
];

export const INSTAGRAM_GRID = [
  { image: '/images/ig-1.jpg', likes: 3214 },
  { image: '/images/ig-2.jpg', likes: 2876 },
  { image: '/images/craft-hands.jpg', likes: 5102 },
  { image: '/images/ig-3.jpg', likes: 1943 },
  { image: '/images/gallery-3.jpg', likes: 4387 },
  { image: '/images/ig-4.jpg', likes: 2451 },
  { image: '/images/craft-hides.jpg', likes: 3829 },
  { image: '/images/cat-shoes.jpg', likes: 2967 },
];
