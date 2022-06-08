import { ROLE } from "../roles/roles"

export const canViewPage:boolean = (user, page) => {
  return (
    user.role === ROLE.ADMIN || 
    page.userId === user.id
  )
}