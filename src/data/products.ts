export interface Product {
  id: number;
  name: string;
  price: string;
  oldPrice?: string;
  tag: string;
  img: string;
  description: string;
  category: string;
  affinities: string[];
  specs: {
    label: string;
    value: string;
  }[];
  images: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Vòng Tay Thạch Anh Tóc Vàng 12ly",
    price: "4.500.000đ",
    oldPrice: "5.200.000đ",
    tag: "Mệnh Kim / Thổ",
    category: "Vòng tay phong thủy",
    affinities: ["Mệnh Kim", "Mệnh Thổ"],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDof1wiAg6wIvHX5YicHUgsEzR0gdcDHsUvF7xv8PipKXMKzPG7SW2B4rNj0d9jdbZPV4Na8hYQVlZwEbS0szs9lXiTlBQHjXgZw9qfaNCisgdGCbi3YkuG95I7-waw-WmjQ9KgXSdq52y0fwUFmQFpNH2h24tGfpm6jmMV7oUvpbGtLmY4hU5uv2oLISjFrwu_x5DNuTLAcwrDvON_v4ob_VXV2BvQjjt5DhFiqT0m9ov6AwDhOzB_qij28vcFlLu92ijUy6eEB9Y",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDof1wiAg6wIvHX5YicHUgsEzR0gdcDHsUvF7xv8PipKXMKzPG7SW2B4rNj0d9jdbZPV4Na8hYQVlZwEbS0szs9lXiTlBQHjXgZw9qfaNCisgdGCbi3YkuG95I7-waw-WmjQ9KgXSdq52y0fwUFmQFpNH2h24tGfpm6jmMV7oUvpbGtLmY4hU5uv2oLISjFrwu_x5DNuTLAcwrDvON_v4ob_VXV2BvQjjt5DhFiqT0m9ov6AwDhOzB_qij28vcFlLu92ijUy6eEB9Y",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCixKcPu0cIxjecMdM1Z0pEb8zg-hrom0p44vWEqda7Fqaez3lUIfpPgB7Yvf6j2Lc2mgjGAYsGsjceHOo9TCIrV9mGF4463ZBMkuewiWSrAMHvFzrIfUP8PuYUFEgQLqYf1rHvVdLt2hVK1k-4eLyDA0h2jgISg2t-1iDi5SK53eV2tomq5wkr-9KpWxuxKQ_R8eIBgpKQUQ1C_iM71qo6eMgvCIcO5Q6jMhxtufYVUENKFUwYlgofdZAhfxckmJyZGERiProhDR8"
    ],
    description: "Thạch anh tóc vàng (Rutilated Quartz) là một trong những loại đá quý phong thủy được ưa chuộng nhất bởi vẻ đẹp lộng lẫy và năng lượng mạnh mẽ. Những sợi 'tóc' vàng bên trong thực chất là các tinh thể rutil, mang lại hiệu ứng ánh kim rực rỡ dưới ánh sáng. Trong phong thủy, màu vàng tượng trưng cho hành Thổ và hành Kim. Do đó, vòng tay thạch anh tóc vàng cực kỳ phù hợp cho những người thuộc hai cung mệnh này. Nó giúp kích hoạt cung tài lộc, mang lại sự quyết đoán trong kinh doanh và bảo vệ chủ nhân khỏi những năng lượng tiêu cực.",
    specs: [
      { label: "Chất liệu", value: "Đá Thạch Anh Tóc Vàng Tự Nhiên" },
      { label: "Kích thước hạt", value: "12mm (12ly)" },
      { label: "Số lượng hạt", value: "17 - 19 hạt (Tùy size tay)" },
      { label: "Hợp mệnh", value: "Mệnh Kim, Mệnh Thổ" },
      { label: "Xuất xứ", value: "Brazil / Madagascar" }
    ]
  },
  {
    id: 2,
    name: "Mặt Dây Chuyền Cẩm Thạch Sơn Thủy",
    price: "12.800.000đ",
    tag: "Mệnh Mộc / Hỏa",
    category: "Trang sức đá quý",
    affinities: ["Mệnh Mộc", "Mệnh Hỏa"],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8kCjMU42GVAewzYTzkq6-vML64Hu9Bi_Gqwoa4Tbm8vQneAi8Pgz0WZ31X0RCjaTUXI7KL4_9OK6cFnWuRBkUZEtQ8K-Gnj9ZEvFA5kmerOQgfyw4D3dZlKWZZ2oKkJzeVnv2TQLVtLpY8B8PFfBXmoQK1iLZnV1WxUyntOthVxoKdUdrecYWDwRVGayFFcVyQQD2vUCB7VoXyai9iMIoCghLRJT4bj1q-TIfr8gSV88BEkj0dprC-68BhiRo7N9WtbnahcXtLkg",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC8kCjMU42GVAewzYTzkq6-vML64Hu9Bi_Gqwoa4Tbm8vQneAi8Pgz0WZ31X0RCjaTUXI7KL4_9OK6cFnWuRBkUZEtQ8K-Gnj9ZEvFA5kmerOQgfyw4D3dZlKWZZ2oKkJzeVnv2TQLVtLpY8B8PFfBXmoQK1iLZnV1WxUyntOthVxoKdUdrecYWDwRVGayFFcVyQQD2vUCB7VoXyai9iMIoCghLRJT4bj1q-TIfr8gSV88BEkj0dprC-68BhiRo7N9WtbnahcXtLkg"
    ],
    description: "Cẩm thạch sơn thủy với những vân đá xanh mướt như bức tranh phong cảnh hữu tình. Loại đá này mang năng lượng mộc mạnh mẽ, giúp cân bằng tâm hồn và mang lại may mắn.",
    specs: [
      { label: "Chất liệu", value: "Cẩm Thạch Sơn Thủy Tự Nhiên" },
      { label: "Kích thước", value: "35mm x 25mm" },
      { label: "Hợp mệnh", value: "Mệnh Mộc, Mệnh Hỏa" }
    ]
  },
  {
    id: 3,
    name: "Vòng Tay Aquamarine Hải Lam Ngọc",
    price: "6.200.000đ",
    tag: "Mệnh Thủy / Mộc",
    category: "Vòng tay phong thủy",
    affinities: ["Mệnh Thủy", "Mệnh Mộc"],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYGzG1iMm6XbsoSuFH3NAvS2MiRYwD1_hJNjy4uUzVaVAfZO1nDGbxt1UOZtkE84M3gZcFXyYZJMecIfUTZxCxhPvGh-wAETyj7N6HeHmJ_Y6EEVQ-IggJSCHn-tR39hQF8Yxs6pwBW7kNuK5-X0yRDmkisRcdMm36ErmnNjz32YAsokL6QmNAKuU4emIHohOoIJ6lPo6T5Px6EL9WwFiPpayZVUWo4cKOA1DXZ3qBN-t_YLDMTkU3ZvgemjgxQ5CY7xWbV3xw3Rs",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCYGzG1iMm6XbsoSuFH3NAvS2MiRYwD1_hJNjy4uUzVaVAfZO1nDGbxt1UOZtkE84M3gZcFXyYZJMecIfUTZxCxhPvGh-wAETyj7N6HeHmJ_Y6EEVQ-IggJSCHn-tR39hQF8Yxs6pwBW7kNuK5-X0yRDmkisRcdMm36ErmnNjz32YAsokL6QmNAKuU4emIHohOoIJ6lPo6T5Px6EL9WwFiPpayZVUWo4cKOA1DXZ3qBN-t_YLDMTkU3ZvgemjgxQ5CY7xWbV3xw3Rs"
    ],
    description: "Aquamarine hay còn gọi là Hải Lam Ngọc, mang màu xanh trong trẻo của đại dương. Đây là viên đá của sự bình an, giúp tăng cường khả năng giao tiếp và làm dịu tâm trí.",
    specs: [
      { label: "Chất liệu", value: "Đá Aquamarine Tự Nhiên" },
      { label: "Kích thước hạt", value: "10mm" },
      { label: "Hợp mệnh", value: "Mệnh Thủy, Mệnh Mộc" }
    ]
  },
  {
    id: 4,
    name: "Thiềm Thừ Ngọc Hoàng Long Tự Nhiên",
    price: "25.000.000đ",
    tag: "Mệnh Thổ / Kim",
    category: "Linh vật chiêu tài",
    affinities: ["Mệnh Thổ", "Mệnh Kim"],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMmDbMKoJZ04EdH3TL4DZ04xdcifqfjNhjW4BPev53RrIjM7RYrnzEIz19tBr92zfRcCPVV8r_4TSBJ2SIC0yzm_FJxykOTUmOtnJ3tyssSz_jKowYbKHZZSHXR2Z1Y5e5JacLyubCbb_D7phBIZdzewAoj2Se3YHkUOJ1jFleOw8W9hS9Ea07RywN7gFnanb0hNsUWemIBQnUnZvhbyKp-Zz20ZoooPwALfsGuL4p4oKToIrFs57GCZNrsJpQXAEEQQwGpho-8GU",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAMmDbMKoJZ04EdH3TL4DZ04xdcifqfjNhjW4BPev53RrIjM7RYrnzEIz19tBr92zfRcCPVV8r_4TSBJ2SIC0yzm_FJxykOTUmOtnJ3tyssSz_jKowYbKHZZSHXR2Z1Y5e5JacLyubCbb_D7phBIZdzewAoj2Se3YHkUOJ1jFleOw8W9hS9Ea07RywN7gFnanb0hNsUWemIBQnUnZvhbyKp-Zz20ZoooPwALfsGuL4p4oKToIrFs57GCZNrsJpQXAEEQQwGpho-8GU"
    ],
    description: "Thiềm Thừ (Cóc ngậm tiền) được tạc từ Ngọc Hoàng Long nguyên khối. Đây là linh vật phong thủy hàng đầu giúp chiêu tài lộc, giữ tiền của và mang lại sự thịnh vượng.",
    specs: [
      { label: "Chất liệu", value: "Ngọc Hoàng Long Tự Nhiên" },
      { label: "Kích thước", value: "Dài 25cm" },
      { label: "Hợp mệnh", value: "Mệnh Thổ, Mệnh Kim" }
    ]
  },
  {
    id: 5,
    name: "Vòng Tay Thạch Anh Tím Brazil",
    price: "3.200.000đ",
    tag: "Mệnh Hỏa / Thổ",
    category: "Vòng tay phong thủy",
    affinities: ["Mệnh Hỏa", "Mệnh Thổ"],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-FBhgysGJxLK-IoqB4XDA-9i704fWJJ-jO3NRgJouVFE_j6GYjFdS3vALROq_Bb0p5sjsr-9KBL-U1tXJJ_YdNCSlMUfXAWXg7A08lTXHcMMeu7hDAmo-BMBuIHA0tkkWAJGFchTiB46imAsl0qzUxD1hwSDOfJKHwQabk9Q0S6xdtZcVwR73eZr5z_7BLiYU8YKVkyOAE-TyUMXwlbkhCZ80M92XCEZDJZbR1b7ged15oXEuZ92j1gKtMSXO9OFntNdYTj_Iltg",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB-FBhgysGJxLK-IoqB4XDA-9i704fWJJ-jO3NRgJouVFE_j6GYjFdS3vALROq_Bb0p5sjsr-9KBL-U1tXJJ_YdNCSlMUfXAWXg7A08lTXHcMMeu7hDAmo-BMBuIHA0tkkWAJGFchTiB46imAsl0qzUxD1hwSDOfJKHwQabk9Q0S6xdtZcVwR73eZr5z_7BLiYU8YKVkyOAE-TyUMXwlbkhCZ80M92XCEZDJZbR1b7ged15oXEuZ92j1gKtMSXO9OFntNdYTj_Iltg"
    ],
    description: "Thạch anh tím (Amethyst) từ Brazil với sắc tím đậm đà, sang trọng. Viên đá này giúp cải thiện giấc ngủ, giảm căng thẳng và tăng cường trực giác.",
    specs: [
      { label: "Chất liệu", value: "Đá Thạch Anh Tím Tự Nhiên" },
      { label: "Kích thước hạt", value: "8mm" },
      { label: "Hợp mệnh", value: "Mệnh Hỏa, Mệnh Thổ" }
    ]
  },
  {
    id: 6,
    name: "Nhẫn Kim Cương Moissanite 18k",
    price: "15.500.000đ",
    tag: "Mệnh Kim / Thủy",
    category: "Trang sức đá quý",
    affinities: ["Mệnh Kim", "Mệnh Thủy"],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5xWzm6Mgl8Iobn7b8eKJm9rYTkERxf-A5dVOWDzD98kslzs-l9w7XktMvuT3y8xeuo1QJ_PliPzfY0mINOnpHjj12Qhpukk7tKqcmExVuq2H0RuVpi8dRNN51WXeVbf1Baf5xK-yiMFTk3l_Xyw6oYoPLXa1f8-3vGudrA3dshJjpr88-0GCAdXoDnSkXOO5fYebTKzYxTzY7_RrdH7YepunsDEle6RfwStqJMWf0dt9n1REavtHU6FFxggGFqJpeSxZlSBYmGDM",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC5xWzm6Mgl8Iobn7b8eKJm9rYTkERxf-A5dVOWDzD98kslzs-l9w7XktMvuT3y8xeuo1QJ_PliPzfY0mINOnpHjj12Qhpukk7tKqcmExVuq2H0RuVpi8dRNN51WXeVbf1Baf5xK-yiMFTk3l_Xyw6oYoPLXa1f8-3vGudrA3dshJjpr88-0GCAdXoDnSkXOO5fYebTKzYxTzY7_RrdH7YepunsDEle6RfwStqJMWf0dt9n1REavtHU6FFxggGFqJpeSxZlSBYmGDM"
    ],
    description: "Nhẫn Kim Cương Moissanite với độ lấp lánh tuyệt mỹ, được chế tác trên nền vàng 18k cao cấp. Mang lại vẻ đẹp sang trọng và đẳng cấp cho chủ nhân.",
    specs: [
      { label: "Chất liệu", value: "Vàng 18k, Moissanite" },
      { label: "Kích thước đá", value: "6.5mm (1 carat)" },
      { label: "Hợp mệnh", value: "Mệnh Kim, Mệnh Thủy" }
    ]
  }
];
