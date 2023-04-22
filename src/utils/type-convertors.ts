import { ChapterId } from '../chapters/entities/chapter.entity'
import { ReplyId } from '../replies/entities/reply.entity'
import { SentenceId } from '../sentences/entities/sentence.entity'
import { StoryId } from '../stories/entities/story.entity'
import { TUserId } from '../t-users/entities/t-user.entity'

const typeConvertor = <T>(id: number | string): T => {
  return <T>+id
}

export const convertToSentenceId = typeConvertor<SentenceId>
export const convertToStoryId = typeConvertor<StoryId>
export const convertToReplyId = typeConvertor<ReplyId>
export const convertToChapterId = typeConvertor<ChapterId>
export const convertToTUserId = typeConvertor<TUserId>
