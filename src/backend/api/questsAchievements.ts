import {
  GetAchievementsOptions,
  PlayerOptions,
  GetIndividualAchievementsOptions
} from 'common/types'
import { ipcRenderer } from 'electron'

export const getSummaryAchievements = async (options: GetAchievementsOptions) =>
  ipcRenderer.invoke('getSummaryAchievements', options)

export const getIndividualAchievements = async (
  options: GetIndividualAchievementsOptions
) => ipcRenderer.invoke('getIndividualAchievements', options)

export const getAchievementsStats = async (options: PlayerOptions) =>
  ipcRenderer.invoke('getAchievementsStats', options)

export const syncAchievements = async (options: PlayerOptions) =>
  ipcRenderer.invoke('syncAchievements', options)

export const getQuests = async (projectId?: string) =>
  ipcRenderer.invoke('getQuests', projectId)

export const getQuest = async (questId: number) =>
  ipcRenderer.invoke('getQuest', questId)

export const getUserPlayStreak = async (questId: number) =>
  ipcRenderer.invoke('getUserPlayStreak', questId)

export const getSteamGameMetadata = async (gameId: number) =>
  ipcRenderer.invoke('getSteamGameMetadata', gameId)

export const getQuestRewardSignature = async (
  address: `0x${string}`,
  rewardId: number,
  tokenId?: number
) => ipcRenderer.invoke('getQuestRewardSignature', address, rewardId, tokenId)

export const getDepositContracts = async (questId: number) =>
  ipcRenderer.invoke('getDepositContracts', questId)

export const claimQuestPointsReward = async (rewardId: string) =>
  ipcRenderer.invoke('claimQuestPointsReward', rewardId)

export const completeExternalTask = async (rewardId: string) =>
  ipcRenderer.invoke('completeExternalTask', rewardId)

export const resyncExternalTask = async (rewardId: string) =>
  ipcRenderer.invoke('resyncExternalTask', rewardId)
