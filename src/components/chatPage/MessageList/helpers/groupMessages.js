import moment from 'moment'

function groupMessages(messages, memberImages) {
  const groupList = []

  messages.forEach((message) => {
    const lastGroup = groupList[groupList.length - 1]

    if (
      lastGroup?.messages &&
      lastGroup.authorId === message.authorId &&
      new Date(message.createdAt).getMinutes() === new Date(lastGroup.createdAt).getMinutes()
    ) {
      lastGroup.messages.unshift(message)
    } else {
      groupList.push({
        id: message.id,
        authorLogin: message.authorLogin,
        authorId: message.authorId,
        createdAt: message.createdAt,
        image: memberImages.find((member) => member.id === message.authorId)?.image,
        messages: [message]
      })
    }
  })

  const resultList = Object.groupBy(groupList, ({ createdAt }) =>
    moment(createdAt).format('DD.MM.YYYY')
  )

  return Object.entries(resultList)
}

export default groupMessages
