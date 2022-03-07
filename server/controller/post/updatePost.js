const { User, Article, UserArticles, Category } = require('../../models');
const { checkAccessToken } = require('../tokenFunction');
const deleteImage = require('../../modules/multerDeleteImg');

module.exports = async (req, res) => {
  // 게시물 수정

  const accessTokenData = checkAccessToken(req);
  if (!accessTokenData) {
    return res.status(401).send('Not authorized');
  }
  const userId = accessTokenData.id;

  const articleId = req.params.articleid;
  if (!articleId) {
    return res.status(422).send({ message: 'Incorrect parameters supplied' });
  }

  const isHost = await UserArticles.findOne({
    where: {
      article_id: articleId,
      user_id: userId,
      is_host: true,
    },
  });

  if (!isHost) {
    return res.status(401).send({ message: 'No writer' });
  }

  const originalData = await Article.findOne({
    where: { id: articleId },
  });

  console.log('Original', originalData);

  const articleInfo = req.body;
  const {
    title,
    content,
    category,
    market,
    tradeType,
    date,
    time,
    totalMate,
    address,
    url,
    region,
  } = articleInfo;
  let { imageKey } = articleInfo;

  if (totalMate) {
    articleInfo['total_mate'] = totalMate;
    delete articleInfo.totalMate;
  }

  // 조인해서 수정 => category
  if (category) {
    Category.findOne({
      where: { food_type: category },
    })
      .then((data) => {
        delete articleInfo.category;
        const categoryId = data.dataValues.id;
        Article.update(
          { category_id: categoryId },
          { where: { id: articleId } }
        );
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send({ message: 'Internal server error' });
      });
  }

  // 이미 이미지가 있으면 삭제 후 업로드
  const originalImageKey = originalData.dataValues.image_key;
  if (imageKey) {
    if (
      originalImageKey !== 'jointPurchaseDefaultImage.jpeg' &&
      originalImageKey !== 'shareDefaultImage.jpeg'
    ) {
      const params = {
        Bucket: 'banana-mk-image',
        Key: originalImageKey,
      };
      try {
        deleteImage(params);
      } catch (err) {
        console.log(err);
        return res.status(500).send({ message: '' });
      }
    }
  } else {
    imageKey = originalImageKey;
  }

  if (tradeType) {
    articleInfo['trade_type'] = tradeType;
    delete articleInfo.tradeType;
    if (
      imageKey === 'shareDefaultImage.jpeg' ||
      imageKey === 'jointPurchaseDefaultImage.jpeg'
    ) {
      if (tradeType === 'share') {
        imageKey = 'shareDefaultImage.jpeg';
      } else {
        imageKey = 'jointPurchaseDefaultImage.jpeg';
      }
    }

    delete articleInfo.tradeType;
  }

  articleInfo['image_key'] = imageKey;

  Article.update(articleInfo, { where: { id: articleId } }).catch((err) => {
    console.log(err);
    return res.status(500).send({ message: 'Fail upload' });
  });

  return res.status(200).send({ message: 'ok' });
};
