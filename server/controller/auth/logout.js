const { checkAccessToken } = require('../tokenFunction');

module.exports = async (req, res) => {
  // ๋ก๊ทธ์์

  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  return res.status(205).send({ message: 'Logged out successfully' });
  // res.redirect(302, "/posts/lists");
};
