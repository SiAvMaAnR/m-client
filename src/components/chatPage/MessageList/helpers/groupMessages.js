import moment from 'moment'

function isNeedToPrevGroup(lastGroup, message) {
  return (
    lastGroup?.messages &&
    lastGroup.authorId === message.authorId &&
    lastGroup.isRead === message.isRead &&
    lastGroup.pageNumber === message.pageNumber &&
    new Date(message.createdAt).getMinutes() === new Date(lastGroup.createdAt).getMinutes()
  )
}

function groupMessages(messages, memberImages) {
  const groupList = []

  messages.forEach((message) => {
    const lastGroup = groupList[groupList.length - 1]

    if (isNeedToPrevGroup(lastGroup, message)) {
      lastGroup.messages.unshift(message)
    } else {
      groupList.push({
        authorLogin: message.authorLogin,
        authorId: message.authorId,
        createdAt: message.createdAt,
        isRead: message.isRead,
        image: memberImages.find((member) => member.id === message.authorId)?.image,
        messages: [message],
        pageNumber: message.pageNumber
      })
    }
  })

  const adaptedGroupList = groupList.map((group) => ({
    ...group,
    id: group.messages[0].id
  }))

  const resultList = Object.groupBy(adaptedGroupList, ({ createdAt }) =>
    moment(createdAt).format('DD.MM.YYYY')
  )
  console.log('result list', resultList)

  return Object.entries(resultList)
}

export default groupMessages
