import { Schedule } from "./schedule.interface"

export interface Location {
  id: number,
  title: string,
  content?: string,
  opened?: boolean,
  mask?: string,
  towel?: string,
  fountain?: string,
  locker_room?: string,
  uf?: string,
  street?: string,
  state_name?: string,
  region?: string,
  schedules: Schedule[]
}
