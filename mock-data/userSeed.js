const users = [
  {
    firstName: 'Michael',
    lastName: 'Garcia',
    email: 'mgarcia@gmail.com',
    phone: '646-555-5678',
    address1: '456 Broadway',
    address2: 'Suite 3A',
    city: 'New York',
    state: 'New York',
    zip: '10003',
    role: 'sitter',
    imageSrc:
      'https://img.freepik.com/free-photo/latin-man-smiling-mockup-psd-cheerful-expression-closeup-portrai_53876-145665.jpg?size=626&ext=jpg&uid=R97253778&ga=GA1.1.1091660285.1679576791&semt=sph',
    password: 'p8Vr5nKsBt6',
    totalPets: 1,
    canFoster: true,
    userName: 'mgarcia',
  },
  {
    firstName: 'Amanda',
    lastName: 'Nguyen',
    email: 'amandan@yahoo.com',
    phone: '917-555-7890',
    address1: '789 Lexington Ave',
    address2: '',
    city: 'New York',
    state: 'New York',
    zip: '10022',
    role: 'sitter',
    imageSrc:
      'https://img.freepik.com/free-photo/smiling-asian-girl-sunglasses-using-smartphone-app-holding-mobile-phone-standing-blue-background_1258-89908.jpg?size=626&ext=jpg&uid=R97253778&ga=GA1.1.1091660285.1679576791&semt=sph',
    password: 'h7Bc3pLmDf5',
    totalPets: 3,
    canFoster: true,
    userName: 'amandan',
  },
  {
    firstName: 'Nicolette',
    lastName: 'Litchmore',
    email: 'nlitchmore2@bloglovin.com',
    phone: '212-555-0187',
    address1: '42 Henry Street',
    address2: '',
    city: 'New York',
    state: 'New York',
    zip: '10002',
    role: 'sitter',
    imageSrc:
      'https://img.freepik.com/free-photo/dreamy-young-woman-sunglasses-looking-front_197531-16739.jpg?size=626&ext=jpg&uid=R97253778&ga=GA1.1.1091660285.1679576791&semt=sph',
    password: 'P4ssw0rd',
    totalPets: 2,
    canFoster: false,
    userName: 'nlitchmore2',
  },
  {
    firstName: 'Andrew',
    lastName: 'Cohen',
    email: 'acohen3@yahoo.com',
    phone: '917-555-1029',
    address1: '645 5th Ave',
    address2: 'Apt 14B',
    city: 'New York',
    state: 'New York',
    zip: '10022',
    role: 'sitter',
    imageSrc:
      'https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=626&ext=jpg&uid=R97253778&ga=GA1.1.1091660285.1679576791&semt=sph',
    password: 'password123',
    totalPets: 1,
    canFoster: true,
    userName: 'acohen3',
  },
  {
    firstName: 'Lila',
    lastName: 'Kimber',
    email: 'lkimber5@nytimes.com',
    phone: '917-254-6798',
    address1: '46 Walton Street',
    address2: '',
    city: 'New York',
    state: 'New York',
    zip: '10002',
    role: 'sitter',
    imageSrc:
      'https://img.freepik.com/free-photo/amazing-african-american-model-woman-green-pants-black-hat-posed-with-different-emotions-park-shows-surprise-face_627829-2914.jpg?size=626&ext=jpg&uid=R97253778&ga=GA1.2.1091660285.1679576791&semt=sph',
    password: 'nXRk26X9',
    totalPets: 2,
    canFoster: false,
    userName: 'lkimber5',
  },
  {
    firstName: 'Armando',
    lastName: 'Dunlevey',
    email: 'adunlevey6@forbes.com',
    phone: '917-986-4327',
    address1: '11 Sunnyside Drive',
    address2: '',
    city: 'New York',
    state: 'New York',
    zip: '10003',
    role: 'sitter',
    imageSrc:
      'https://img.freepik.com/free-photo/happy-man-with-earphones-smiling-camera_23-2148322120.jpg?size=626&ext=jpg&uid=R97253778&ga=GA1.1.1091660285.1679576791&semt=ais',
    password: 'VpyHqxS9',
    totalPets: 1,
    canFoster: true,
    userName: 'adunlevey6',
  },
  {
    firstName: 'Talia',
    lastName: 'Garcia',
    email: 'tgarcia4@google.com',
    phone: '718-555-2819',
    address1: '525 W 28th St',
    address2: '',
    city: 'New York',
    state: 'New York',
    zip: '10001',
    role: 'sitter',
    imageSrc:
      'https://img.freepik.com/free-photo/close-up-smiley-woman-outdoors_23-2149066143.jpg?size=626&ext=jpg&uid=R97253778&ga=GA1.1.1091660285.1679576791&semt=ais',
    password: 'letmein',
    totalPets: 3,
    canFoster: true,
    userName: 'tgarcia4',
  },
  {
    firstName: 'Ki',
    lastName: 'Loxston',
    email: 'kloxston7@amazonaws.com',
    phone: '212-854-5016',
    address1: '6480 Hoepker Trail',
    address2: '',
    city: 'New York',
    state: 'New York',
    zip: '10128',
    role: 'sitter',
    imageSrc:
      'https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg&uid=R97253778&ga=GA1.1.1091660285.1679576791&semt=sph',
    password: 'TifrsVXfYr',
    totalPets: 3,
    canFoster: true,
    userName: 'kloxston7',
  },
  {
    firstName: 'Madonna',
    lastName: 'MacCracken',
    email: 'mmaccracken8@columbia.edu',
    phone: '212-854-5016',
    address1: '75054 Anderson Parkway',
    address2: '',
    city: 'New York',
    state: 'New York',
    zip: '10019',
    role: 'sitter',
    imageSrc:
      'https://img.freepik.com/free-photo/outdoor-lifestyle-portrait-smiling-black-woman-pink-glasses_273443-1969.jpg?size=626&ext=jpg&uid=R97253778&ga=GA1.1.1091660285.1679576791&semt=ais',
    password: 'UkDY6U4',
    totalPets: 1,
    canFoster: false,
    userName: 'mmaccracken8',
  },
  {
    firstName: 'Geralda',
    lastName: 'McIlvenna',
    email: 'gmcilvenna9@nytimes.com',
    phone: '917-254-6659',
    address1: '1153 Hagan Lane',
    address2: '',
    city: 'New York',
    state: 'New York',
    zip: '10001',
    role: 'sitter',
    imageSrc:
      'https://img.freepik.com/free-photo/closeup-portrait-beautiful-smiling-brunette-girl-summer-hipster-jacket-model-taking-selfie-smartphone-woman-making-photos-warm-sunny-day-street-sunglasses_158538-1654.jpg?size=626&ext=jpg&uid=R97253778&ga=GA1.1.1091660285.1679576791&semt=ais',
    password: 'ew49oIhW8',
    totalPets: 2,
    canFoster: false,
    userName: 'gmcilvenna9',
  },
  {
    firstName: 'Nicholas',
    lastName: 'Wattinham',
    email: 'nwattinhamf@cnbc.com',
    phone: '631-747-4064',
    address1: '573 Fuller Terrace',
    address2: '',
    city: 'Sag Harbor',
    state: 'New York',
    zip: '11963',
    role: 'user',
    imageSrc:
      'https://img.freepik.com/free-photo/close-up-portrait-attractive-unshaved-dark-skinned-man-with-afro-hairstyle-smiling-expressing-happiness-while-sitting-park-enjoying-nice-weather-listening-music_176420-19804.jpg?size=626&ext=jpg&uid=R97253778&ga=GA1.1.1091660285.1679576791&semt=ais',
    password: 'tZMyIlnL5C',
    totalPets: 2,
    canFoster: false,
    userName: 'nwattinhamf',
  },
  {
    firstName: 'Hannah',
    lastName: 'Maroney',
    email: 'hmaroneyg@wired.com',
    phone: '917-554-2263',
    address1: '3216 Wayridge Street',
    address2: '',
    city: 'New York',
    state: 'New York',
    zip: '10016',
    role: 'user',
    imageSrc:
      'https://img.freepik.com/free-photo/positive-carefree-woman-with-two-hair-buns-wears-trendy-pink-sunglasses-blouse-carries-shopping-bags-poses-outdoors-during-daytime-smiling-female-shopper-poses-making-selfie-city_273609-56848.jpg?size=626&ext=jpg&uid=R97253778&ga=GA1.1.1091660285.1679576791&semt=ais',
    password: '8OyBpjvEQp',
    totalPets: 1,
    canFoster: true,
    userName: 'hmaroneyg',
  },
  {
    firstName: 'Carrie',
    lastName: 'Pincott',
    email: 'cpincotth@yelp.com',
    phone: '718-614-5561',
    address1: '48 Golden Leaf Point',
    address2: '',
    city: 'Brooklyn',
    state: 'New York',
    zip: '11220',
    role: 'user',
    imageSrc:
      'https://img.freepik.com/free-photo/expressive-senior-woman-posing_344912-3132.jpg?size=626&ext=jpg&uid=R97253778&ga=GA1.1.1091660285.1679576791&semt=ais',
    password: 'H4Ez4sJSfj',
    totalPets: 2,
    canFoster: true,
    userName: 'cpincotth',
  },
  {
    firstName: 'Dylan',
    lastName: 'Goldingham',
    email: 'dgoldinghami@usatoday.com',
    phone: '212-627-5716',
    address1: '9656 Autumn Leaf Plaza',
    address2: '',
    city: 'New York',
    state: 'New York',
    zip: '10150',
    role: 'user',
    imageSrc:
      'https://img.freepik.com/free-photo/close-up-smiling-retired-man_23-2147562098.jpg?size=626&ext=jpg&uid=R97253778&ga=GA1.1.1091660285.1679576791&semt=ais',
    password: 'gmzGkgptbKJx',
    totalPets: 1,
    canFoster: false,
    userName: 'dgoldinghami',
  },
  {
    firstName: 'Linda',
    lastName: 'Butler',
    email: 'lbutlerj@techcrunch.com',
    phone: '646-759-7738',
    address1: '99785 Dixon Court',
    address2: '',
    city: 'New York',
    state: 'New York',
    zip: '10048',
    role: 'user',
    imageSrc:
      'https://img.freepik.com/free-photo/miling-mature-woman_1398-1619.jpg?size=626&ext=jpg&uid=R97253778&ga=GA1.1.1091660285.1679576791&semt=ais',
    password: 'nLKp7opCl',
    totalPets: 3,
    canFoster: true,
    userName: 'lbutlerj',
  },
  {
    firstName: 'Zachary',
    lastName: 'Fulford',
    email: 'zfulfordk@businessweek.com',
    phone: '516-541-3186',
    address1: '9 Marcy Drive',
    address2: '',
    city: 'Hempstead',
    state: 'New York',
    zip: '11550',
    role: 'user',
    imageSrc:
      'https://img.freepik.com/free-photo/close-up-portrait-happy-young-african-american-man-smiling-against-black-neon-studio-background_155003-22873.jpg?size=626&ext=jpg&uid=R97253778&ga=GA1.1.1091660285.1679576791&semt=sph',
    password: 'cvG2btxeRs',
    totalPets: 2,
    canFoster: true,
    userName: 'zfulfordk',
  },
  {
    firstName: 'Darius',
    lastName: 'Cazin',
    email: 'dcazin6@outlook.com',
    phone: '212-555-0178',
    address1: '1431 5th Ave',
    address2: '',
    city: 'New York',
    state: 'New York',
    zip: '10029',
    role: 'user',
    imageSrc:
      'https://img.freepik.com/free-photo/bohemian-man-with-his-arms-crossed_1368-3542.jpg?w=740&t=st=1680534080~exp=1680534680~hmac=8629e7a1ac247628f7a9c3d543804d0f1072f8d10f3b57850fcdcff3b55cc36a',
    password: 'pL47Jz9bYkw',
    totalPets: 2,
    canFoster: false,
    userName: 'dcazin6',
  },
  {
    firstName: 'Isabella',
    lastName: 'Ferrero',
    email: 'iferrero7@gmail.com',
    phone: '718-555-0139',
    address1: '650 West 42nd St',
    address2: 'Apt 1101',
    city: 'New York',
    state: 'New York',
    zip: '10036',
    role: 'user',
    imageSrc:
      'https://img.freepik.com/free-photo/headshot-cute-emotional-caucasian-girl-with-hair-knot-having-rest-cafe_273609-9038.jpg?size=626&ext=jpg&uid=R97253778&ga=GA1.1.1091660285.1679576791&semt=ais',
    password: 'E9VKvH8WfjU',
    totalPets: 1,
    canFoster: true,
    userName: 'iferrero7',
  },
  {
    firstName: 'Kevin',
    lastName: 'Liu',
    email: 'kliu8@yahoo.com',
    phone: '917-555-0198',
    address1: '20 Jay St',
    address2: 'Apt 1607',
    city: 'Brooklyn',
    state: 'New York',
    zip: '11201',
    role: 'user',
    imageSrc:
      'https://img.freepik.com/free-photo/vertical-shot-attractive-african-american-man-posing-smiling_181624-15027.jpg?w=740&t=st=1680534127~exp=1680534727~hmac=a79925c9f3ccaca5adc64a22ea31886518d1e96d88eef4b4f1f3ced33c0a4454',
    password: '9ZsCgTbJhnL',
    totalPets: 3,
    canFoster: true,
    userName: 'kliu8',
  },
  {
    firstName: 'Lila',
    lastName: 'Ahmed',
    email: 'lahmed9@hotmail.com',
    phone: '718-555-0148',
    address1: '142-20 84th Dr',
    address2: '',
    city: 'Jamaica',
    state: 'New York',
    zip: '11435',
    role: 'user',
    imageSrc:
      'https://img.freepik.com/free-photo/close-up-shot-pretty-woman-with-perfect-teeth-dark-clean-skin-having-rest-indoors-smiling-happily-after-received-good-positive-news_273609-1248.jpg?size=626&ext=jpg&uid=R97253778&ga=GA1.1.1091660285.1679576791&semt=sph',
    password: 'zVj2GtWxh4A',
    totalPets: 1,
    canFoster: false,
    userName: 'lahmed9',
  },
  {
    firstName: 'Allyssa',
    lastName: 'Deorocki',
    email: 'allyssa@gmail.com',
    phone: '555-555-5555',
    address1: '55 Somewhere',
    address2: '',
    city: 'Over',
    state: 'New York',
    zip: '55555',
    role: 'user',
    imageSrc:
      'https://media.licdn.com/dms/image/D4E03AQES_HIeRjYfOw/profile-displayphoto-shrink_200_200/0/1677031262866?e=1686182400&v=beta&t=M211mOaEqB7OPYg-_FhsYlu4DdkmYUFGptHzE7e32wA',
    password: '12345678',
    totalPets: 1,
    canFoster: true,
    userName: 'candylovah3',
  },
  {
    firstName: 'Paul',
    lastName: 'Schofield',
    email: 'paul@gmail.com',
    phone: '555-555-5555',
    address1: '33 Somewhere',
    address2: '',
    city: 'Over',
    state: 'New York',
    zip: '55555',
    role: 'user',
    imageSrc:
      'https://media.licdn.com/dms/image/D4E03AQFSay1e5SIYcA/profile-displayphoto-shrink_800_800/0/1667243405851?e=1686182400&v=beta&t=obxL-0fJQmqtO-jAz5JI48YgTw5UBLxwp13nvCZf59w',
    password: '12345678',
    totalPets: 0,
    canFoster: true,
    userName: 'pawl',
  },
  {
    firstName: 'Forhad',
    lastName: 'Zinnah',
    email: 'forhad@gmail.com',
    phone: '555-555-5555',
    address1: '55 Somewhere',
    address2: '',
    city: 'Over',
    state: 'California',
    zip: '55555',
    role: 'user',
    password: '12345678',
    totalPets: 0,
    imageSrc:
      'https://media.licdn.com/dms/image/D5603AQGWfW9Bui6nTg/profile-displayphoto-shrink_800_800/0/1677027359477?e=1686182400&v=beta&t=SQ7aznEgMhZUxp-gjQ8ZfqN98nTRVPHqQ18b_z_pQ6g',
    canFoster: false,
    userName: 'furrhad',
  },
  {
    firstName: 'Nica',
    lastName: 'Weisinger',
    email: 'nica@gmail.com',
    phone: '555-555-5555',
    address1: '22 Somewhere',
    address2: '',
    city: 'Over',
    state: 'New York',
    zip: '55555',
    role: 'user',
    imageSrc:
      'https://media.licdn.com/dms/image/C4D03AQHDO6K3t4XtxA/profile-displayphoto-shrink_800_800/0/1647479135334?e=1686182400&v=beta&t=JKQgvZlysYhSsoXJa8rrz8t3JYa4RLKY37tIi55OH0w',
    password: '12345678',
    totalPets: 0,
    canFoster: true,
    userName: 'nicachu',
  },
];

// const passwordEdit = users.map((user) => {
//   if (user.password.length < 8) {
//     return user.password;
//   }
// });

// console.log(passwordEdit);

module.exports = users;
