export const posts: Object[] = [];

export const images = [
  "https://dr.savee-cdn.com/things/6/3/c7d12a7cb87c160c81e44a.webp",
  "https://dr.savee-cdn.com/things/6/3/cb13395b0c479678a8e8e5.webp",
  "https://dr.savee-cdn.com/things/5/e/68f35e1404e45961765299.gif",
  "https://dr.savee-cdn.com/things/6/3/c5728ef7356f8f6b2dc2fb.webp",
  "https://dr.savee-cdn.com/things/6/3/c97ab2177ff052888805c9.png",
  "https://dr.savee-cdn.com/things/6/3/c837d72b60ed5c41d32114.webp",
  "https://dr.savee-cdn.com/things/6/3/c588429674ec9125aee9c3.webpg",
  "https://dr.savee-cdn.com/things/6/3/b7e4b8e5f0365a68f59a86.webp",
  "https://dr.savee-cdn.com/things/6/3/b9b243828c529797fbe520.webp",
];

let imageIndex = 0;

for (let i = 1; i <= 80; i++) {
  let item: Object = {
    id: i,
    title: `Post ${i}`,
    date: `${i < 10 ? 0 : ""}${i}/10/2021 `,
    image: images[imageIndex],
  };
  posts.push(item);
  imageIndex++;
  if (imageIndex > images.length - 1) imageIndex = 0;
}

export const posts2: Object[] = [];

export const images2 = [
  { color: "#645CBB", height: "200px" },
  { color: "#F55050", height: "100px" },
  { color: "#84D2C5", height: "300px" },
  { color: "#1C82AD", height: "340px" },
  { color: "#4E6C50", height: "80px" },
  { color: "#F0997D", height: "390px" },
];

let imageIndex2 = 0;

for (let i = 1; i <= 80; i++) {
  let item = {
    id: i,
    color: images2[imageIndex2].color,
    height: images2[imageIndex2].height,
  };
  posts2.push(item);
  imageIndex2++;
  if (imageIndex2 > images2.length - 1) imageIndex2 = 0;
}

// type ResponseApi<T> = {
//   success: boolean;
//   message: string;
//   data: T;
// };

// type Book = {
//   id: number;
//   title: string;
//   totalPages: number;
//   genre: string;
// };

// type User = {
//   id: number;
//   fullname: string;
//   role: string;
// };

// const responseApiBook = {
//   success: true,
//   message: "Success get book data",
//   data: [
//     {
//       id: 34,
//       title: "suamiku menikahi ibuku",
//       totalPages: 54,
//       genre: "romance",
//     },
//     {
//       id: 33,
//       title: "Remember of today",
//       totalPages: 67,
//       genre: "romance",
//     },
//   ],
// };

// const responseApiProfile = {
//   success: true,
//   message: "Success get profile data",
//   data: {
//     id: 24,
//     fullname: "Ian Febi Sastrataruna",
//     role: "frontend engineer",
//   },
// };

// const listBook: ResponseApi<Book[]> = responseApiBook;

// const userProfile: ResponseApi<User> = responseApiProfile;

// type Message<T> = T extends { message: unknown } ? T["message"] : string;

// const messageFromApi: Message<ResponseApi> = responseApi.message;
