// const moment = require('moment');
const like_sample = { like: 10, neutral: 5, bad: 3 };


// 식단 정보를 담는 클래스
class Menu {
  constructor(id, name, date, type, dishes, image = null, price = null, allergen = null, available = true, likeCnt = like_sample, myLike = null) {
    this.id = id;
    this.name = name;  // NOTE: 교직원식당과 같이 여러 항목이 있는 경우 콤마(,)로 나누어 저장. 필요 시 split하여 사용
    this.date = date;
    this.image = image;
    this.type = type; // 'morning' or 'lunch' or 'employee'
    this.price = price;
    this.allergen = allergen;
    this.available = available;
    this.likeCnt = likeCnt;
    this.myLike = myLike;
  }

  like(kind = 'like') {
    /**
     * 식단을 좋아요한다.
     * TODO: 이미 좋아요를 한 경우, 기존의 좋아요를 덮어씌운다
     * @param {'like' | 'neutral' | 'bad'} kind - 좋아요의 종류
     */
    if (this.myLike != null) {
      this.dislike();
    }
    if (kind in this.like) {
      return ++this.likeCnt[kind];
    }
  }

  dislike() {
    /**
     * 식단을 좋아요 취소한다. 좋아요가 없는 경우 무효하다
     */
    //TODO: 유효성 체크
    return --this.likeCnt[this.myLike];
  }
}

export const menus = [
  new Menu(0, "소고기미역국", "2023-10-13", "morning", (like = like_sample)),
  new Menu(1, "차돌된장찌개", "2023-10-13", "student"),
  new Menu(2, "남산왕돈까스", "2023-10-13", "student"),
  new Menu(3, "나가사키라멘", "2023-10-13", "student"),
  new Menu(4, "돈사태찜", "2023-10-13", "student"),
  new Menu(5, "참치김치볶음밥", "2023-10-13", "student"),
  new Menu(6, "사골만둣국,잡채말이어묵,콩나물무침,무말랭이무침,쌀밥/잡곡밥,배추김치", "2023-10-13", "employee"),
];


export const ranking = {
  type: 'weekly',
  data: [
    { rank: 1, name: '옛날돈까스', likes: 200 },
    { rank: 2, name: '짜장면', likes: 237 },
    { rank: 3, name: '짬뽕', likes: 234 },
    { rank: 4, name: '탕수육', likes: 236 },
    { rank: 4, name: '종헌국수', likes: 238 },
    { rank: 4, name: '재엽국수', likes: 190 },
  ]
};