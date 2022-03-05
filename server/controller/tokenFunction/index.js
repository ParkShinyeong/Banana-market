require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {
  // access token 생성
  generateAccessToken: (data) => {
    return jwt.sign(data, process.env.ACCESS_SECRET, { expiresIn: '1d' });
  },
  // refresh token 생성
  generateRefreshToken: (data) => {
    return jwt.sign(data, process.env.REFRESH_SECRET, { expiresIn: '30d' });
  },
  // 쿠키로 access token 전달
  sendAccessToken: (res, accessToken) => {
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      // signed: true,
      domain: process.env.SERVER_DOMAIN,
      path: '/',
      secure: true,
      sameSite: 'none',
    });
  },
  // 쿠키로 refresh token 전달
  sendRefreshToken: (res, refreshToken) => {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      // signed: true,
      domain: process.env.SERVER_DOMAIN,
      path: '/',
      secure: true,
      sameSite: 'none',
    });
  },
  // access token 유효성 확인
  checkAccessToken: (req) => {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      return null;
    }
    try {
      return jwt.verify(accessToken, process.env.ACCESS_SECRET);
    } catch (err) {
      return null;
    }
  },
  // refresh token 유효성 확인
  checkRefreshToken: (req) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return null;
    }
    try {
      return jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    } catch (err) {
      return null;
    }
  },
};
