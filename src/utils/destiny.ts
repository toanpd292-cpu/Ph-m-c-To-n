export type Element = 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ';

export interface DestinyResult {
  year: number;
  canChi: string;
  element: Element;
  description: string;
  colors: {
    compatible: string[];
    generative: string[];
  };
  image: string;
}

const CAN = ["Canh", "Tân", "Nhâm", "Quý", "Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ"];
const CHI = ["Thân", "Dậu", "Tuất", "Hợi", "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi"];

const ELEMENT_MAP: Record<number, Element> = {
  1: 'Kim',
  2: 'Thủy',
  3: 'Hỏa',
  4: 'Thổ',
  5: 'Mộc'
};

const DESCRIPTIONS: Record<Element, string> = {
  'Kim': 'Tượng trưng cho kim khí, sự sắc sảo và công minh. Người mệnh Kim thường có ý chí sắt đá, quyết đoán và khả năng tập trung cao.',
  'Mộc': 'Tượng trưng cho cây cối, sự sinh trưởng và lòng nhân ái. Người mệnh Mộc thường sáng tạo, năng động và luôn hướng về phía trước.',
  'Thủy': 'Tượng trưng cho nước, sự linh hoạt và trí tuệ. Người mệnh Thủy có khả năng giao tiếp tốt, thích nghi nhanh và giàu lòng trắc ẩn.',
  'Hỏa': 'Tượng trưng cho lửa, sự nhiệt huyết và đam mê. Người mệnh Hỏa thường tràn đầy năng lượng, dũng cảm và có khả năng lãnh đạo.',
  'Thổ': 'Tượng trưng cho đất, sự ổn định và tin cậy. Người mệnh Thổ thường điềm đạm, kiên nhẫn và là chỗ dựa vững chắc cho mọi người.'
};

const COLORS: Record<Element, { compatible: string[], generative: string[] }> = {
  'Kim': { compatible: ['Trắng', 'Xám', 'Ghi'], generative: ['Vàng', 'Nâu đất'] },
  'Mộc': { compatible: ['Xanh lá cây'], generative: ['Đen', 'Xanh nước biển'] },
  'Thủy': { compatible: ['Đen', 'Xanh nước biển'], generative: ['Trắng', 'Xám', 'Ghi'] },
  'Hỏa': { compatible: ['Đỏ', 'Hồng', 'Tím'], generative: ['Xanh lá cây'] },
  'Thổ': { compatible: ['Vàng', 'Nâu đất'], generative: ['Đỏ', 'Hồng', 'Tím'] }
};

const IMAGES: Record<Element, string> = {
  'Kim': 'https://lh3.googleusercontent.com/aida-public/AB6AXuDof1wiAg6wIvHX5YicHUgsEzR0gdcDHsUvF7xv8PipKXMKzPG7SW2B4rNj0d9jdbZPV4Na8hYQVlZwEbS0szs9lXiTlBQHjXgZw9qfaNCisgdGCbi3YkuG95I7-waw-WmjQ9KgXSdq52y0fwUFmQFpNH2h24tGfpm6jmMV7oUvpbGtLmY4hU5uv2oLISjFrwu_x5DNuTLAcwrDvON_v4ob_VXV2BvQjjt5DhFiqT0m9ov6AwDhOzB_qij28vcFlLu92ijUy6eEB9Y',
  'Mộc': 'https://lh3.googleusercontent.com/aida-public/AB6AXuAADqpaemuAFKJ46sYK-kbeZBg-5PzMCw4UgexESf6zeLl9kg98tjO7iEFY3JEwYGFOLFuFAhM1x0jWXEGD6ncb5wZNDr6vTejryFHEdevmsAUJCkX2SCjI9NPYj34aWaMOxlxuCFDpz0BoyK4nGxsHxS1f7A7qQ6c38-XOskJaY5lUV3U1za5jPQQrQO5sfCQwFy8k-Km69l2v4b6hGPm_rZwJIft7XA0H5wwLL1KvEY-VQGp3xqqjcdbTL-foL3LtES41lDCeLNY',
  'Thủy': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYGzG1iMm6XbsoSuFH3NAvS2MiRYwD1_hJNjy4uUzVaVAfZO1nDGbxt1UOZtkE84M3gZcFXyYZJMecIfUTZxCxhPvGh-wAETyj7N6HeHmJ_Y6EEVQ-IggJSCHn-tR39hQF8Yxs6pwBW7kNuK5-X0yRDmkisRcdMm36ErmnNjz32YAsokL6QmNAKuU4emIHohOoIJ6lPo6T5Px6EL9WwFiPpayZVUWo4cKOA1DXZ3qBN-t_YLDMTkU3ZvgemjgxQ5CY7xWbV3xw3Rs',
  'Hỏa': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuKhaRs8fLAkMt2d57f83bv7IPhLefpeCvxNW0Kz-FNxQJwm0vhS5Iu_Q9WPuq4H7W3GldSQcKYHPc7xQNkqB3nCKVyY1d-4AgA7JgtHmdotpJzumUlOWVNCY_ORb-YDFVOMuhi6wn5MhN0-Xc2Y3YjWDdWp1COBIkNi-P9m6hMEPHJH1UlsWn39ZFuiQlk8Ex9cEcX9kcCuAS6MGj5R26k692G8CjraLRT9mCq0kRPnnRtbtaY6nKz6ZoZmbTS2BQZb_kK_DwTYc',
  'Thổ': 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMmDbMKoJZ04EdH3TL4DZ04xdcifqfjNhjW4BPev53RrIjM7RYrnzEIz19tBr92zfRcCPVV8r_4TSBJ2SIC0yzm_FJxykOTUmOtnJ3tyssSz_jKowYbKHZZSHXR2Z1Y5e5JacLyubCbb_D7phBIZdzewAoj2Se3YHkUOJ1jFleOw8W9hS9Ea07RywN7gFnanb0hNsUWemIBQnUnZvhbyKp-Zz20ZoooPwALfsGuL4p4oKToIrFs57GCZNrsJpQXAEEQQwGpho-8GU'
};

export function calculateDestiny(year: number): DestinyResult {
  const canIndex = year % 10;
  const chiIndex = year % 12;
  
  const canStr = CAN[canIndex];
  const chiStr = CHI[chiIndex];
  
  // Logic tính Mệnh (Can + Chi)
  let canVal = 0;
  if ([4, 5].includes(canIndex)) canVal = 1; // Giáp, Ất
  else if ([6, 7].includes(canIndex)) canVal = 2; // Bính, Đinh
  else if ([8, 9].includes(canIndex)) canVal = 3; // Mậu, Kỷ
  else if ([0, 1].includes(canIndex)) canVal = 4; // Canh, Tân
  else if ([2, 3].includes(canIndex)) canVal = 5; // Nhâm, Quý
  
  let chiVal = 0;
  if ([4, 5, 10, 11].includes(chiIndex)) chiVal = 0; // Tý, Sửu, Ngọ, Mùi
  else if ([6, 7, 0, 1].includes(chiIndex)) chiVal = 1; // Dần, Mão, Thân, Dậu
  else if ([8, 9, 2, 3].includes(chiIndex)) chiVal = 2; // Thìn, Tỵ, Tuất, Hợi
  
  let sum = canVal + chiVal;
  if (sum > 5) sum -= 5;
  
  const element = ELEMENT_MAP[sum];
  
  return {
    year,
    canChi: `${canStr} ${chiStr}`,
    element,
    description: DESCRIPTIONS[element],
    colors: COLORS[element],
    image: IMAGES[element]
  };
}
