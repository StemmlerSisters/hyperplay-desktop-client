import { fetchWithCookie } from 'backend/utils/fetch_with_cookie'
import { DEV_PORTAL_URL } from 'common/constants'
import { GenericApiResponse, PointsClaimReturn } from 'common/types'
import { app, ipcMain } from 'electron'

ipcMain.handle('getQuests', async (e, projectId) => {
  let url = `${DEV_PORTAL_URL}api/v1/quests?questStatus=ACTIVE`
  if (projectId) {
    url += `&projectId=${projectId}`
  }
  const questMetaResults = await fetch(url)
  if (!questMetaResults.ok) {
    throw await questMetaResults.text()
  }
  let questsMetaJson = await questMetaResults.json()

  if (!app.isPackaged || process.env.DEBUG_HYPERPLAY === 'true') {
    url += `&isTest=true`
    const testQuestMetaResults = await fetch(url)
    if (!testQuestMetaResults.ok) {
      throw await testQuestMetaResults.text()
    }
    const testQuestsMetaJson = await testQuestMetaResults.json()
    questsMetaJson = questsMetaJson.concat(testQuestsMetaJson)
  }
  return questsMetaJson
})

ipcMain.handle('getQuest', async (e, questId) => {
  const questResult = await fetch(`${DEV_PORTAL_URL}api/v1/quests/${questId}`)
  const questResultJson = await questResult.json()
  return questResultJson
})

ipcMain.handle('getUserPlayStreak', async (e, questId) => {
  const questResultJson = await fetchWithCookie({
    url: `${DEV_PORTAL_URL}api/v1/quests/${questId}/playstreak`,
    method: 'GET'
  })
  return questResultJson
})

ipcMain.handle('getSteamGameMetadata', async (e, gameId) => {
  const result = await fetch(`${DEV_PORTAL_URL}api/v1/steam/games/${gameId}`)
  const resultJson = await result.json()
  return resultJson
})

ipcMain.handle('claimQuestPointsReward', async (e, rewardId) => {
  const url = `${DEV_PORTAL_URL}api/v1/quests/rewards/${rewardId}/points-claim`
  return (await fetchWithCookie({ url, method: 'POST' })) as PointsClaimReturn
})

ipcMain.handle('completeExternalTask', async (e, rewardId) => {
  const url = `${DEV_PORTAL_URL}api/v1/quests/rewards/${rewardId}/external-tasks/completed`
  return (await fetchWithCookie({ url, method: 'POST' })) as GenericApiResponse
})

ipcMain.handle('resyncExternalTask', async (e, rewardId) => {
  const url = `${DEV_PORTAL_URL}api/v1/quests/rewards/${rewardId}/external-tasks/re-sync`
  return (await fetchWithCookie({ url, method: 'POST' })) as GenericApiResponse
})
