const user = {
  state: {
    createdAt: '',
    sessionId: '',
    accessToken: '',
    user: {},
    card: {},
    userId: '',
    wxOpenId: '',
    teamId: '',
    cardId: '',
    isSystemUser: false, // 标记是否是已经授权的系统用户
    impressions: [],
    userCards: [],
    timelineSetting: {
      card: {
        coverImage: '',
        limitDays: 0,
        privateFlag: 0
      },
      team: {
        coverImage: '',
        limitDays: 0,
        privateFlag: 0
      }
    }
  },
  mutations: {
    setUserInfo (state, info) {
      // 设置用户登录信息
      if (!info) { return }
      state.createdAt = info.createdAt
      state.sessionId = info.sessionId
      state.accessToken = info.accessToken
      state.wxOpenId = info.wxOpenId
      if (state.accessToken) {
        state.isSystemUser = true
        state.user = info.user
        state.card = info.card
        state.userId = info.userId
        state.teamId = info.teamId
        state.cardId = info.cardId
        state.impressions = info.impressions

        if (info.timelineSetting) {
          state.timelineSetting.card.coverImage = info.timelineSetting.card.coverImage
          state.timelineSetting.card.limitDays = info.timelineSetting.card.limitDays
          state.timelineSetting.card.privateFlag = info.timelineSetting.card.privateFlag
          state.timelineSetting.team.coverImage = info.timelineSetting.team.coverImage
          state.timelineSetting.team.limitDays = info.timelineSetting.team.limitDays
          state.timelineSetting.team.privateFlag = info.timelineSetting.team.privateFlag
        }

        state.userCards = info.userCards
      }
      console.log('state', state)
    },
    changeCoverImage (state, info) {
      state.timelineSetting.card.coverImage = info.url
    }
  }
}

export default user
