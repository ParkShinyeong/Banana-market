const { Article, User, Chat, UserArticles } = require('./models');
// const { Op } = require("sequelize");

module.exports = (io) => {
  const chatroom = io.of('/chatroom');

  chatroom.on('connect', (socket) => {
    console.log(
      '= = = = = = = = = socket - chatroom 네임스페이스와 연결!!= = = = = = = = = '
    );

    // A. 채팅방 참여 요청 from client
    socket.on('join', async ({ userId, roomId }) => {
      if (roomId) {
        socket.join(roomId);
        console.log(' 참여중인 룸 ?? : ', socket.rooms);
      }
    });

    // B. 채팅방에서 나가기
    socket.on('leave', async ({ userId, roomId }) => {
      // B-a. 해당 유저가 참여한 아티클인지 확인
      const checkJoin = await UserArticles.findOne({
        where: {
          user_id: userId,
          article_id: roomId,
        },
      }).catch((e) => console.log(e));
      console.log('참여한 사람 맞아?', checkJoin.get({ plain: true }));

      // B-b. 참여한 유저 맞으면 room에서 내보내기
      if (checkJoin) {
        const isHostLeave = checkJoin.get({ plain: true }).is_host;
        console.log('호스트면 1, 아니면 0 :::', isHostLeave);

        socket.leave(roomId);
        console.log(`😳 서버 ${roomId}번 방을 나갔습니다`);

        // B-b. userArticles 테이블에서 해당 article의 user 레코드 지우기
        await checkJoin.destroy();

        // B-b. Article
        const articleData = await Article.findOne({
          where: {
            id: roomId,
          },
          attributes: ['id', 'current_mate', 'total_mate', 'status'],
        }).catch((error) => console.log(error));
        console.log(
          '      삭제하기 전 커런트??',
          articleData.get({ plain: true })
        );

        // B-c. 게시글 상태 및 참여 인원 변경
        // B-c-1. 방장이 나갔을 경우 마감 & current-1
        if (isHostLeave === '1') {
          console.log('     방장이 나감!! 게시글 마감으로 변경! ');
          await articleData.update({ status: false });

          await articleData.update({
            current_mate: articleData.current_mate - 1,
          });
          // B-c-2. 방장이 아닌 일반 유저가 나갔을 경우
        } else {
          console.log('     그냥 유저가 나간다 @@@');
          // B-c-2. 현재 인원과 모집 인원이 같았으면, current -1, status -> true
          if (articleData.current_mate === articleData.total_mate) {
            await articleData.update({
              status: true,
              current_mate: articleData.current_mate - 1,
            });
          } else {
            // B-c-2. 모집 인원이 남은 상태였으면 current만 -1
            await articleData.update({
              current_mate: articleData.current_mate - 1,
            });
          }
        }
        console.log(
          '      삭제한 후 커런트??',
          articleData.get({ plain: true })
        );
      } else {
        console.log(' ? ? 참여한 사람 아닌데 ? ? ? ');
      }
    });

    // C. 메세지 작성 -> 작성자, 게시글, 메세지 받아서 채팅 db에 저장
    socket.on('sendMessage', async ({ userId, roomId, message }, callback) => {
      console.log(' 📨 ', '유저:', userId, ', 룸: ', roomId, message);

      let receivedMessage = await Chat.create({
        user_id: userId,
        article_id: roomId,
        contents: message,
      });

      let userPfp = await User.findByPk(userId, {
        attributes: ['id', 'name', ['profile_image_key', 'profileImage']],
      });
      userPfp = userPfp.get({ plain: true });
      receivedMessage = receivedMessage.get({ plain: true });
      receivedMessage = { ...receivedMessage, ...userPfp };

      chatroom.to(roomId).emit('message', receivedMessage);
      callback();
    });

    // D. 소켓 연결 종료 (브라우저 닫을 때)
    socket.on('disconnect', () => {
      // socket.leave(roomId)
      console.log(`서버 연결 종료`);
    });
  });
};
