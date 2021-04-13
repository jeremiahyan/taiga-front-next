import { Project } from '@/app/api/projects/projects.model';
import { Role } from '@/app/api/roles/roles.model';
import { User } from '@/app/api/users/users.model';

export interface Membership {
  color: string;
  createdAt: string;
  email: string;
  fullName: string;
  gravatarId: string;
  id: number;
  invitationExtraText: string | null;
  invitedBy: number | null;
  isAdmin: boolean;
  isOwner: boolean;
  isUserActive: boolean;
  photo: string | null;
  project: Project['id'];
  projectName: Project['name'];
  projectSlug: Project['slug'];
  role: Role['id'];
  roleName: Role['name'];
  user: User['id'];
  userEmail: User['email'];
  userOrder: number;
}

export interface MembershipCreation {
  project: Project['id'];
  role: Role['id'];
  username: User['username'];
}

export interface MemberInBulk {
  roleId: Role['id'];
  username: User['username'];
}

export interface MembershipCreationInBulk {
  project: Project['id'];
  members: MemberInBulk[];
  invitationText?: string;
}

export type MembershipPartialInput = Partial<Membership>;
