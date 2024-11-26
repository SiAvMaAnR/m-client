const aiIntegration = {
  chatGPT: 'chat-gpt',
  youChat: 'you-chat',
  yandexGPT: 'yandex-gpt',
  gigaChat: 'giga-chat'
}

const aiModel = {
  gpt3T: 'gpt-3.5-turbo',
  gpt4OM: 'gpt-4o-mini',
  gpt4: 'gpt-4',
  gigaChat: 'GigaChat',
  gigaChatPlus: 'GigaChat-Plus',
  gigaChatPro: 'GigaChat-Pro',
  gptLite: 'yandex-gpt-lite'
}

const aiModelItems = [
  {
    key: 0,
    value: aiIntegration.chatGPT,
    items: [
      {
        key: 0,
        value: aiModel.gpt3T
      },
      {
        key: 1,
        value: aiModel.gpt4OM
      },
      {
        key: 2,
        value: aiModel.gpt4
      }
    ]
  },
  {
    key: 1,
    value: aiIntegration.gigaChat,
    items: [
      {
        key: 0,
        value: aiModel.gigaChat
      },
      {
        key: 1,
        value: aiModel.gigaChatPlus
      },
      {
        key: 2,
        value: aiModel.gigaChatPro
      }
    ]
  },
  {
    key: 2,
    value: aiIntegration.yandexGPT,
    items: [
      {
        key: 0,
        value: aiModel.gptLite
      }
    ]
  }
]

export { aiIntegration, aiModel, aiModelItems }
