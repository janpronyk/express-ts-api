import { PermissionFlag } from "../../common/middleware/common.permissionflag.enum";

export interface CreateUserDto {
  email: string
  password: string
  username: string
  avatarImage?: string
  permissionFlags?: PermissionFlag
  profile?: UserProfile
}

export interface UserProfile {
  firstName?: string
  lastName?: string

  bio?: string

  facebookUrl?: string
  linkedInUrl?: string
  youtubeUrl?: string

  addressLine1?: string
  addressLine2?: string
  city?: string
  postCode?: string
  state?: string
  country?: string
}