const { User, Region, Article, Category } = require('../../models');
const { checkAccessToken } = require('../tokenFunction');

const getAccessTokenData = (req) => {
  const guestUserId = 3;
  if (!req.cookie) {
    return guestUserId;
  } else {
    return checkAccessToken(req).id;
  }
};

module.exports = async (req, res) => {
  const userId = getAccessTokenData(req);
  console.log('UserId', userId);

  const articleId = req.params.articleid;
  if (!articleId) {
    return res.status(422).send({ message: 'Incorrect parameters supplied' });
  }

  Article.findOne({
    where: { id: articleId },
    attributes: [
      'id',
      'title',
      ['image_key', 'image'],
      'content',
      'market',
      'date',
      'time',
      ['total_mate', 'totalMate'],
      ['current_mate', 'currentMate'],
      'status',
      'address',
      'url',
      ['trade_type', 'tradeType'],
      'createdAt',
      'updatedAt',
    ],

    include: [
      {
        model: Region,
        attributes: [['city', 'region']],
      },
      {
        model: Category,
        attributes: [['food_type', 'category']],
      },
      {
        model: User,
        include: [
          {
            model: Region,
            attributes: [['city', 'region']],
          },
          {
            model: Article,
            attributes: [['id', 'participantArticleId']],
          },
        ],
        attributes: [
          ['id', 'userId'],
          'name',
          'email',
          'block',
          'type',
          'createdAt',
          'updatedAt',
          ['profile_image_key', 'profile_image'],
        ],
        through: {
          where: { is_host: true },
          attributes: [
            ['user_id', 'writerId'],
            ['is_host', 'isHost'],
          ],
        },
      },
    ],
  })
    .then((data) => {
      const postData = data.dataValues;
      postData['region'] = postData.Region.dataValues.region;
      delete postData.Region;

      postData['category'] = postData.Category.dataValues.category;
      delete postData.Category;

      if (postData.tradeType === 'share') {
        postData.tradeType = '나눔';
      } else {
        postData.tradeType = '공구';
      }

      if (!postData.Users.length) {
        return res
          .status(404)
          .send({ message: '작성자가 없거나, 존재하지 않는 게시물 입니다' });
      } else {
        const userData = postData.Users[0].dataValues;
        userData.region = userData.Region.dataValues.region;
        userData.totalTrade = userData.Articles.length;
        delete userData.Region;
        delete userData.Articles;

        // 포스트의 작성자가 나인지 확인합니다.
        let isMyPost = false;
        if (userData.UserArticles.dataValues.writerId === userId) {
          isMyPost = true;
        }
        userData.isMyPost = isMyPost;
        delete userData.UserArticles;
        delete postData.Users;

        res.status(200).send({
          data: {
            postWriter: userData,
            post: postData,
          },
          message: 'ok',
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};
