const router = require('express').Router({ mergeParams: true });
const {
  Sitter,
  User,
  Sitter_Client,
  Sitter_Rating,
  Sitter_Pref,
  Sitter_Review,
  Pet,
  Booking,
  Booking_Pet,
  Access,
} = require('../../db');
const { requireToken, isSitter } = require('../authMiddleware');
const sequelize = require('sequelize');

// get all sitters with their user info
router.get('/', async (req, res, next) => {
  try {
    // Fetch all sitters
    const allSitters = await Sitter.findAll({
      attributes: {
        exclude: ['password'],
      },
    });
    // Get all userIds of sitters
    const userIdsOfSitters = allSitters.map((sitter) => sitter.userId);
    // Fetch all user data of sitters
    const userDataOfSitters = await Promise.all(
      userIdsOfSitters.map((userId) =>
        User.findByPk(userId, {
          attributes: {
            exclude: ['password'],
          },
        })
      )
    );

    // Fetch sitter ratings data with their average ratings by sitterId, rounded to 2 decimal places
    const sitterRatings = await Sitter_Rating.findAll({
      attributes: [
        'sitterId',
        [sequelize.literal('ROUND(AVG(rating), 2)'), 'averageRating'],
      ],
      group: ['sitterId'],
    });

    const ratingMap = {};
    sitterRatings.forEach((rating) => {
      ratingMap[rating.sitterId] = rating.dataValues.averageRating;
    });

    // count sitter reviews
    const sitterReviewCount = await Sitter_Review.findAll({
      attributes: ['sitterId', [sequelize.fn('COUNT', 'sitterId'), 'count']],
      group: ['sitterId'],
    });

    const reviewCountMap = {};
    sitterReviewCount.forEach((review) => {
      reviewCountMap[review.sitterId] = review.dataValues.count;
    });

    // Combine all data into one array
    const combinedData = [];
    allSitters.forEach((sitter) => {
      const userData = userDataOfSitters.find(
        (user) => user.id === sitter.userId
      );
      const sitterRating = ratingMap[sitter.id] || 0;
      const sitterReviewCount = reviewCountMap[sitter.id] || 0;
      combinedData.push({
        ...userData.dataValues,
        ...sitter.dataValues,
        sitterRating,
        sitterReviewCount,
      });
    });

    res.status(200).json(combinedData);
  } catch (err) {
    console.log('BACKED ISSUE FETCHING SITTERS');
    next(err);
  }
});

router.get(
  '/:id/clients/:userId/access',
  requireToken,
  async (req, res, next) => {
    try {
      const sitterObject = await Sitter.findByPk(+req.params.id);

      if (+req.user.id === +sitterObject.userId || req.user.role === 'admin') {
        const clientStatus = await Sitter_Client.findOne({
          where: { sitterId: +req.params.id, userId: +req.params.userId },
        });

        if (!clientStatus) {
          return res.status(404).send('no client data!');
        } else if (clientStatus.status) {
          const accessData = await Access.findOne({
            where: { userId: +req.params.userId },
          });
          if (!accessData) {
            return res.status(404).send('no access data!');
          } else res.status(200).send(accessData);
        }
      }
    } catch (err) {
      console.log('BACKEND ISSUE FETCHING CLIENT ACCESS DATA');
      next(err);
    }
  }
);

router.post('/name', async (req, res, next) => {
  try {
    const name = req.body.params.name;
    const users = await User.findAll({
      where: {
        firstName: {
          [sequelize.Op.iLike]: `%${name}%`,
        },
      },
    });
    const userIds = users.map((user) => user.dataValues.id);
    const sitters = await Sitter.findAll({
      where: {
        userId: userIds,
      },
    });

    const sitterIds = sitters.map((sitter) => sitter.id);
    const sitterRatings = await Sitter_Rating.findAll({
      attributes: [
        'sitterId',
        [sequelize.literal('ROUND(AVG(rating), 2)'), 'averageRating'],
      ],
      group: ['sitterId'],
    });

    const ratingMap = {};
    sitterRatings.forEach((rating) => {
      ratingMap[rating.sitterId] = rating.dataValues.averageRating;
    });

    // count sitter reviews
    const sitterReviewCount = await Sitter_Review.findAll({
      attributes: ['sitterId', [sequelize.fn('COUNT', 'sitterId'), 'count']],
      group: ['sitterId'],
    });

    const reviewCountMap = {};
    sitterReviewCount.forEach((review) => {
      reviewCountMap[review.sitterId] = review.dataValues.count;
    });

    const combinedData = [];
    sitters.forEach((sitter) => {
      const userData = users.find((user) => user.id === sitter.userId);
      const sitterRating = ratingMap[sitter.id] || 0;
      const sitterReviewCount = reviewCountMap[sitter.id] || 0;
      combinedData.push({
        ...userData.dataValues,
        ...sitter.dataValues,
        sitterRating,
        sitterReviewCount,
      });
    });

    res.status(200).json(combinedData);
  } catch (err) {
    console.log('BACKED ISSUE FETCHING SITTERS');
    next(err);
  }
});

// returns single sitter, clients and sitter prefs
router.get('/:id', async (req, res, next) => {
  try {
    // Fetch sitter
    const sitter = await Sitter.findByPk(+req.params.id);

    // Fetch all sitter preferences of sitter
    const sitterPrefs = await Sitter_Pref.findAll({
      where: {
        sitterId: +req.params.id,
      },
    });
    // Get all userId of sitter and fetch user data
    const userIdOfSitter = sitter.userId;
    const user = await User.findByPk(userIdOfSitter);

    // Combine sitter and user data
    const sitterAndUser = {
      ...user.dataValues,
      ...sitter.dataValues,
      sitterPrefs,
    };
    // Send back sitter and clients
    res.status(200).json(sitterAndUser);
  } catch (err) {
    console.log('Backend issue fetching single user');
    next(err);
  }
});

// create sitter (userId must already exist)
router.post('/', requireToken, async (req, res, next) => {
  const id = req.body.userId || req.user.id;

  if (req.user.id !== id && req.user.role !== 'admin') {
    return res.status(403).send('inadequate access rights');
  }

  try {
    const { rate, calendar, bio, userId } = req.body;
    const [newSitter, wasCreated] = await Sitter.findOrCreate({
      where: {
        userId,
      },
      defaults: {
        rate,
        calendar,
        bio,
        userId,
      },
    });

    if (!wasCreated) {
      return res.status(400).send('Sitter already exists!');
    }
    res.status(201).send(newSitter);
  } catch (e) {
    console.error('BACKEND ISSUE CREATING SITTER');
    next(e);
  }
});

// Edit sitter as sitter or admin
router.put('/:id', requireToken, async (req, res, next) => {
  const id = +req.params.id;

  const sitterObject = await Sitter.findByPk(id);

  const userId = sitterObject.userId;

  try {
    if (userId === req.user.id || req.user.role === 'admin') {
      const sitter = await Sitter.findByPk(req.params.id, {
        attributes: {
          exclude: ['password'],
        },
      });
      if (!sitter) return res.status(404).send('No sitter exists!');
      const updatedSitter = await sitter.update(req.body);
      res.json(updatedSitter);
    } else {
      return res
        .status(403)
        .send(
          'inadequate access rights / requested user does not match logged in user'
        );
    }
  } catch (e) {
    console.error('BACKEND ISSUE UPDATING SITTER');
    next(e);
  }
});

// delete sitter and all associated data
router.delete('/:id', requireToken, async (req, res, next) => {
  const id = +req.params.id;

  const sitterObject = await Sitter.findByPk(id);

  if (!sitterObject) {
    return res.status(404).send('sitter doesnt exist!');
  }

  const userId = sitterObject.userId;

  try {
    if (userId === req.user.id || req.user.role === 'admin') {
      const sitter = await Sitter.findByPk(req.params.id, {
        attributes: {
          exclude: ['password'],
        },
      });
      if (!sitter) return res.status(404).send('No sitter exists!');
      const sitterPrefs = await Sitter_Pref.findOne({
        where: {
          sitterId: +req.params.id,
        },
      });

      // Fetch all sitter clients
      const sitterClients = await Sitter_Client.findOne({
        where: {
          sitterId: +req.params.id,
        },
      });
      // Fetch all sitter ratings
      const sitterRatings = await Sitter_Rating.findOne({
        where: {
          sitterId: +req.params.id,
        },
      });
      // Fetch all sitter reviews
      const sitterReviews = await Sitter_Review.findOne({
        where: {
          sitterId: +req.params.id,
        },
      });
      // Destroy all associated data
      if (sitterReviews) await sitterReviews.destroy();
      if (sitterPrefs) await sitterPrefs.destroy();
      if (sitterClients) await sitterClients.destroy();
      if (sitterRatings) await sitterRatings.destroy();
      // Destroy sitter
      await sitter.destroy();
      res.status(204).send('Sitter deleted!');
    } else {
      return res
        .status(403)
        .send(
          'inadequate access rights / requested user does not match logged in user'
        );
    }
  } catch (err) {
    console.log('Backend issue deleting sitter');
    next(err);
  }
});

// get all reviews of a sitter (public)
router.get('/:id/reviews', async (req, res, next) => {
  try {
    const sitterReviews = await Sitter_Review.findAll({
      where: {
        sitterId: req.params.id,
      },
      include: User,
    });

    if (!sitterReviews) {
      return res.status(404).send('no reviews yet!');
    }

    res.status(200).send(sitterReviews);
  } catch (err) {
    console.log('BACKED ISSUE FETCHING SINGLE REVIEWS');
    next(err);
  }
});

// get review of sitter (public)
router.get('/:id/reviews/:reviewId', async (req, res, next) => {
  try {
    const sitterReview = await Sitter_Review.findByPk(req.params.reviewId);
    if (!sitterReview) {
      return res.status(404).send('no review exists');
    }
    res.status(200).send(sitterReview);
  } catch (err) {
    console.log('BACKED ISSUE FETCHING SINGLE REVIEWS');
    next(err);
  }
});

// get all clients of a sitter (private)
router.get('/:id/clients', requireToken, async (req, res, next) => {
  const id = +req.params.id;

  const sitterObject = await Sitter.findByPk(id);

  if (!sitterObject) {
    return res.status(404).send('sitter doesnt exist!');
  }

  const userId = sitterObject.userId;

  try {
    if (userId === req.user.id || req.user.role === 'admin') {
      const sitter = await Sitter.findByPk(req.params.id, {
        attributes: {
          exclude: ['password'],
        },
      });
      if (!sitter) return res.status(404).send('No sitter exists!');

      // Fetch sitter
      const userIdOfSitter = sitter.userId;
      const user = await User.findByPk(userIdOfSitter);

      const clients = await Sitter_Client.findAll({
        where: {
          sitterId: +req.params.id,
        },
      });

      if (clients.length === 0) {
        return res.status(404).send('No clients for this user!');
      }

      // Get all userIds of clients and fetch user data
      const userIds = clients.map((client) => client.userId);

      const users = await Promise.all(
        userIds.map((userId) =>
          User.findByPk(userId, {
            attributes: {
              exclude: ['password'],
            },
          })
        )
      );

      const clientsOfSitter = users.map((user) => user.dataValues);

      // combine status from Sitter_Client with client details
      let clientsAndStatus = [];

      clientsOfSitter.forEach((clientObj) => {
        for (let i = 0; i < clients.length; i++) {
          if (clientObj.id === clients[i].userId) {
            let status = clients[i].status;
            clientsAndStatus.push({ ...clientObj, status });
          }
        }
      });

      const sitterAndClients = {
        ...user.dataValues,
        ...sitter.dataValues,
        clientsAndStatus,
      };

      res.status(200).send(sitterAndClients);
    } else {
      return res
        .status(403)
        .send(
          'inadequate access rights / requested user does not match logged in user'
        );
    }
  } catch (err) {
    console.log('BACKED ISSUE FETCHING SINGLE REVIEWS');
    next(err);
  }
});

// get one client of sitter include pets
router.get('/:id/clients/:userId', requireToken, async (req, res, next) => {
  // if user is trying to change someone else's info and they are NOT an admin, fail w/403
  const id = +req.params.id;
  // const clientId = +req.params.id;

  const sitterObject = await Sitter.findByPk(id);

  if (!sitterObject) {
    return res.status(404).send('sitter doesnt exist!');
  }

  const userId = sitterObject.userId;

  try {
    if (userId === req.user.id || req.user.role === 'admin') {
      const sitter = await Sitter.findByPk(id, {
        attributes: {
          exclude: ['password'],
        },
      });

      if (!sitter) return res.status(404).send('No sitter exists!');

      const client = await Sitter_Client.findOne({
        where: {
          sitterId: id,
          userId: +req.params.userId,
        },
      });

      if (!client) {
        return res.status(404).send('client doesnt exist!');
      }

      // fetch userdata of client
      const user = await User.findByPk(+req.params.userId, {
        attributes: {
          exclude: ['password'],
        },
      });

      // fetch all pets of client
      const pets = await Pet.findAll({
        where: {
          userId: +req.params.userId,
        },
      });

      // combine client, user and pets data
      const status = client.dataValues.status;

      const clientAndPets = {
        ...user.dataValues,
        // ...client.dataValues,
      };

      if (pets.length > 0) {
        clientAndPets.pets = pets;
        clientAndPets.status = status;
      }

      res.status(200).send(clientAndPets);
    } else {
      return res
        .status(403)
        .send(
          'inadequate access rights / requested user does not match logged in user'
        );
    }
  } catch (err) {
    console.log('BACKED ISSUE FETCHING SINGLE REVIEWS');
    next(err);
  }
});

// get all ratings of a sitter (public) include user model
router.get('/:id/ratings', async (req, res, next) => {
  try {
    const ratings = await Sitter_Rating.findAll({
      where: {
        sitterId: +req.params.id,
      },
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });

    if (!ratings) {
      return res.status(404).send('no sitter ratings!');
    } else res.status(200).send(ratings);
  } catch (err) {
    console.log('BACKEND ISSUE FETCHING ALL SITTER RATINGS');
    next(err);
  }
});

// get one rating of a sitter (public)
router.get('/:id/ratings/:ratingId', async (req, res, next) => {
  try {
    const rating = await Sitter_Rating.findByPk(+req.params.ratingId, {
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
    if (!rating) {
      return res.status(404).send('no sitter rating!');
    } else res.status(200).send(rating);
  } catch (err) {
    console.log('BACKEND ISSUE FETCHING SINGLE SITTER RATINGS');
    next(err);
  }
});

// get All bookings for sitter (private)
router.get('/:id/bookings', requireToken, async (req, res, next) => {
  // if user is trying to change someone else's info and they are NOT an admin, fail w/403
  const id = +req.params.id;

  const sitterObject = await Sitter.findByPk(id);

  if (!sitterObject) {
    return res.status(404).send('sitter doesnt exist!');
  }

  const userId = sitterObject.userId;

  try {
    if (userId === req.user.id || req.user.role === 'admin') {
      const sitter = await Sitter.findByPk(req.params.id, {
        attributes: {
          exclude: ['password'],
        },
      });
      if (!sitter) return res.status(404).send('No sitter exists!');

      const userIdOfSitter = sitter.userId;
      const user = await User.findByPk(userIdOfSitter);

      const allSitterBookings = await Booking.findAll({
        where: {
          sitterId: id,
        },
        include: [
          {
            model: User,
            attributes: { exclude: ['password'] },
          },
          Pet,
        ],
      });
      if (!allSitterBookings) {
        return res.status(404).send('no user bookings!');
        // returns all bookings for sitter (bookings and user who made the booking)
      }

      res.status(200).send(allSitterBookings);
    } else {
      return res
        .status(403)
        .send(
          'inadequate access rights / requested user does not match logged in user'
        );
    }
  } catch (err) {
    console.log('BACKED ISSUE FETCHING BOOKINGS');
    next(err);
  }
});

// get ONE booking for sitter
router.get('/:id/bookings/:bookingId', requireToken, async (req, res, next) => {
  // if user is trying to change someone else's info and they are NOT an admin, fail w/403
  const id = +req.params.id;

  const sitterObject = await Sitter.findByPk(id);

  if (!sitterObject) {
    return res.status(404).send('sitter doesnt exist!');
  }

  const userId = sitterObject.userId;

  try {
    if (userId === req.user.id || req.user.role === 'admin') {
      const sitter = await Sitter.findByPk(req.params.id, {
        attributes: {
          exclude: ['password'],
        },
      });
      if (!sitter) return res.status(404).send('No sitter exists!');
      const sitterId = +req.params.id;

      const userIdOfSitter = sitter.userId;
      const user = await User.findByPk(userIdOfSitter);

      const oneSitterBooking = await Booking.findByPk(+req.params.bookingId, {
        where: {
          sitterId: id,
        },
        include: [{ model: User, attributes: { exclude: ['password'] } }, Pet],
      });
      if (!oneSitterBooking) {
        return res.status(404).send('no user bookings!');
        // returns one booking for sitter (booking and user who made the booking)
      }

      res.status(200).send(oneSitterBooking);
    } else {
      return res
        .status(403)
        .send(
          'inadequate access rights / requested user does not match logged in user'
        );
    }
  } catch (err) {
    console.log('BACKED ISSUE FETCHING SINGLE BOOKING');
    next(err);
  }
});

// router.get(
//   '/:id/bookings/:bookingId/access',
//   requireToken,
//   async (req, res, next) => {
//     const id = +req.params.id;
//     const { userId } = +req.body;

//     try {
//     } catch (err) {
//       console.log('BACKED ISSUE FETCHING BOOKING ACCESS');
//       next(err);
//     }
//   }
// );

// edit booking from pending to complete (sitter)
router.put('/:id/bookings/:bookingId', requireToken, async (req, res, next) => {
  // if user is trying to change someone else's info and they are NOT an admin, fail w/403
  const id = +req.params.id;

  const sitterObject = await Sitter.findByPk(id);

  if (!sitterObject) {
    return res.status(404).send('sitter doesnt exist!');
  }

  const userId = sitterObject.userId;

  try {
    if (userId === req.user.id || req.user.role === 'admin') {
      const sitter = await Sitter.findByPk(req.params.id, {
        attributes: {
          exclude: ['password'],
        },
      });
      if (!sitter) return res.status(404).send('No sitter exists!');
      const sitterId = +req.params.id;

      const booking = await Booking.findByPk(+req.params.bookingId, {
        where: {
          sitterId: sitterId,
        },
        include: [{ model: User, attributes: { exclude: ['password'] } }, Pet],
      });
      if (!booking) {
        return res.status(404).send('no user bookings!');
        // returns one booking for sitter (booking and user who made the booking)
      }

      const updatedBooking = await booking.update(req.body);

      res.status(200).send(updatedBooking);
    } else {
      return res
        .status(403)
        .send(
          'inadequate access rights / requested user does not match logged in user'
        );
    }
  } catch (err) {
    console.log('BACKED ISSUE FETCHING SINGLE BOOKING');
    next(err);
  }
});

// create sitter_prefs for an existing sitter (private)
router.post('/:id/prefs', requireToken, async (req, res, next) => {
  // if user is trying to change someone else's info and they are NOT an admin, fail w/403
  const id = +req.params.id;

  const sitterObject = await Sitter.findByPk(id);

  if (!sitterObject) {
    return res.status(404).send('sitter doesnt exist!');
  }

  const userId = sitterObject.userId;

  try {
    if (userId === req.user.id || req.user.role === 'admin') {
      const sitter = await Sitter.findByPk(req.params.id, {
        attributes: {
          exclude: ['password'],
        },
      });
      if (!sitter) return res.status(404).send('No sitter exists!');

      const {
        hostAtHome,
        atOwnerHouse,
        reactive,
        puppies,
        small,
        medium,
        large,
        extraLarge,
        multiplePets,
        cats,
        disabled,
        medication,
        sitterId,
      } = req.body;

      const [newPrefs, wasCreated] = await Sitter_Pref.findOrCreate({
        where: {
          sitterId: sitter.id,
        },
        defaults: {
          hostAtHome,
          atOwnerHouse,
          reactive,
          puppies,
          small,
          medium,
          large,
          extraLarge,
          multiplePets,
          cats,
          disabled,
          medication,
          sitterId,
        },
      });

      if (!wasCreated) {
        return res.status(403).send('sitter prefs already exist!');
      }

      res.status(201).send(newPrefs);
    } else {
      return res
        .status(403)
        .send(
          'inadequate access rights / requested user does not match logged in user'
        );
    }
  } catch (err) {
    console.log('BACKED ISSUE CREATING SITTER PREFS');
    next(err);
  }
});

// edit sitter_prefs for an existing sitter (private)
router.put('/:id/prefs', requireToken, async (req, res, next) => {
  // if user is trying to change someone else's info and they are NOT an admin, fail w/403
  const id = +req.params.id;

  const sitterObject = await Sitter.findByPk(id);

  if (!sitterObject) {
    return res.status(404).send('sitter doesnt exist!');
  }

  const userId = sitterObject.userId;

  try {
    if (userId === req.user.id || req.user.role === 'admin') {
      const sitter = await Sitter.findByPk(req.params.id, {
        attributes: {
          exclude: ['password'],
        },
      });
      if (!sitter) return res.status(404).send('No sitter exists!');

      const sitterPrefs = await Sitter_Pref.findOne({
        where: {
          sitterId: id,
        },
      });

      const updatedSitterPrefs = await sitterPrefs.update(req.body);

      const updatedSitter = await Sitter.findByPk(id, {
        include: Sitter_Pref,
      });

      res.status(200).send(updatedSitter);
    } else {
      return res
        .status(403)
        .send(
          'inadequate access rights / requested user does not match logged in user'
        );
    }
  } catch (err) {
    console.log('BACKED ISSUE UPDATING SITTER PREFERENCES');
    next(err);
  }
});

module.exports = router;
