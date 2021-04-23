export interface PutUserDto {
  email: string
  password: string
  username: string
  avatarImage: string
  permissionFlags: number
  profile: UserProfile
}

export interface UserProfile {
  firstName: string
  lastName: string

  bio: string

  facebookUrl: string
  linkedInUrl: string
  youtubeUrl: string

  addressLine1: string
  addressLine2: string
  city: string
  postCode: string
  state: string
  country: string
}