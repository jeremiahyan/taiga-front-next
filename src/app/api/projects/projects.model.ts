/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */
import { Optional } from 'utility-types';
import { User } from '@/app/api/users/users.model';

export interface ProjectsListFilter {
  member?: number;
  members?: number[];
  isLookingForPeople?: boolean;
  isFeatured?: boolean;
  isBacklogActivated?: boolean;
  isKanbanActivated?: boolean;
}

type NewProjectFields =
  'name' |
  'description' |
  'creationTemplate' |
  'isBacklogActivated' |
  'isIssuesActivated' |
  'isKanbanActivated' |
  'isPrivate' |
  'isWikiActivated' |
  'videoconferences' |
  'videoconferencesExtraData' |
  'totalMilestones' |
  'totalStoryPoints';

type NewProjectRequiredFields = 'name' | 'description';

type NewProjectOptionalFields = Exclude<NewProjectFields, NewProjectRequiredFields>;

export type NewProject = Optional<Pick<Project, NewProjectFields>, NewProjectOptionalFields>;

export interface DuplicateProject extends Pick<Project,
'description' |
'isPrivate' |
'name'> {
  users: User['id'][];
}

export enum ProjectsListOrderBy {
  membershipsUserOrder = 'memberships_user_order',
  totalFans = 'total_fans',
  totalFansLastWeek = 'total_fans_last_week',
  totalFansLastMonth = 'total_fans_last_month',
  totalFansLastYear = 'total_fans_last_year',
  totalActivity = 'total_activity',
  totalActivityLastWeek = 'total_activity_last_week',
  totalActivityLastMonth = 'total_activity_last_month',
  totalActivityLastYear = 'total_activity_last_year',
}

export enum Permissions {
  modifyTask = 'modify_task',
  modifyEpic = 'modify_epic',
  addTask = 'add_task',
  adminRoles = 'admin_roles',
  commentWikiPage = 'comment_wiki_page',
  viewProject = 'view_project',
  modifyProject = 'modify_project',
  modifyWikiPage = 'modify_wiki_page',
  adminProjectValues = 'admin_project_values',
  modifyUs = 'modify_us',
  viewEpics = 'view_epics',
  deleteProject = 'delete_project',
  modifyIssue = 'modify_issue',
  modifyWikiLink = 'modify_wiki_link',
  addIssue = 'add_issue',
  deleteMilestone = 'delete_milestone',
  removeMember = 'remove_member',
  deleteEpic = 'delete_epic',
  deleteWikiLink = 'delete_wiki_link',
  addEpic = 'add_epic',
  commentEpic = 'comment_epic',
  deleteTask = 'delete_task',
  commentTask = 'comment_task',
  commentIssue = 'comment_issue',
  viewIssues = 'view_issues',
  addUs = 'add_us',
  addMember = 'add_member',
  addWikiPage = 'add_wiki_page',
  deleteIssue = 'delete_issue',
  viewWikiPages = 'view_wiki_pages',
  viewMilestones = 'view_milestones',
  addMilestone = 'add_milestone',
  commentUs = 'comment_us',
  deleteWikiPage = 'delete_wiki_page',
  viewUs = 'view_us',
  modifyMilestone = 'modify_milestone',
  addWikiLink = 'add_wiki_link',
  deleteUs = 'delete_us',
  viewWikiLinks = 'view_wiki_links',
  viewTasks = 'view_tasks',
}

export interface Status {
  color: string;
  id: number;
  isClosed: boolean;
  name: string;
  order: number;
  projectId: number;
  slug: string;
}

export interface Duedates {
  byDefault: boolean;
  color: string;
  daysToDue: null | string;
  id: number;
  name: string;
  order: number;
  projectId: number;
}

export interface Attribute {
  color: string;
  id: number;
  name: string;
  order: number;
  projectId: number;
}

export type ProjectListEntry = Pick<Project,
  'anonPermissions' |
  'blockedCode' |
  'createdDate' |
  'creationTemplate' |
  'defaultEpicStatus' |
  'defaultIssueStatus' |
  'defaultIssueType' |
  'defaultPoints' |
  'defaultPriority' |
  'defaultSeverity' |
  'defaultTaskStatus' |
  'defaultUsStatus' |
  'description' |
  'iAmAdmin' |
  'iAmMember' |
  'iAmOwner' |
  'id' |
  'isBacklogActivated' |
  'isContactActivated' |
  'isEpicsActivated' |
  'isFan' |
  'isFeatured' |
  'isIssuesActivated' |
  'isKanbanActivated' |
  'isLookingForPeople' |
  'isPrivate' |
  'isWatcher' |
  'isWikiActivated' |
  'logoBigUrl' |
  'logoSmallUrl' |
  'lookingForPeopleNote' |
  'members' |
  'modifiedDate' |
  'myHomepage' |
  'myPermissions' |
  'name' |
  'notifyLevel' |
  'owner' |
  'publicPermissions' |
  'slug' |
  'tags' |
  'tagsColors' |
  'totalActivity' |
  'totalActivityLastMonth' |
  'totalActivityLastWeek' |
  'totalActivityLastYear' |
  'totalClosedMilestones' |
  'totalFans' |
  'totalFansLastMonth' |
  'totalFansLastWeek' |
  'totalFansLastYear' |
  'totalMilestones' |
  'totalStoryPoints' |
  'totalWatchers' |
  'totalsUpdatedDatetime' |
  'videoconferences' |
  'videoconferencesExtraData'>;

export interface CustomAttribute {
  createdDate: string;
  description: string;
  extra: null | string;
  id: number;
  modifiedDate: string;
  name: string;
  order: number;
  projectId: number;
  type: 'text' | 'multiline' | 'richtext' | 'date' | 'url' | 'dropdown' | 'checkbox' | 'number';
}

export interface Project {
  anonPermissions: string[];
  blockedCode: null | string;
  createdDate: string;
  creationTemplate: number;
  defaultEpicStatus: number;
  defaultIssueStatus: number;
  defaultIssueType: number;
  defaultPoints: number;
  defaultPriority: number;
  defaultSeverity: number;
  defaultTaskStatus: number;
  defaultUsStatus: number;
  description: string;
  epicCustomAttributes: CustomAttribute[];
  epicStatuses: Status;
  epicsCsvUuid: null | string;
  iAmAdmin: boolean;
  iAmMember: boolean;
  iAmOwner: boolean;
  id: number;
  isBacklogActivated: boolean;
  isContactActivated: boolean;
  isEpicsActivated: boolean;
  isFan: boolean;
  isFeatured: boolean;
  isIssuesActivated: boolean;
  isKanbanActivated: boolean;
  isLookingForPeople: boolean;
  isOutOfOwnerLimits: boolean;
  isPrivate: boolean;
  isPrivateExtraInfo: {
      canBeUpdated: boolean;
      reason: null | string;
  };
  isWatcher: boolean;
  isWikiActivated: boolean;
  issueCustomAttributes: CustomAttribute[];
  issueDuedates: Duedates[];
  issueStatuses: Status[];
  issueTypes: Attribute[];
  issuesCsvUuid: null | string;
  logoBigUrl: string;
  logoSmallUrl: string;
  lookingForPeopleNote: string;
  maxMemberships: null | number;
  members: {
    role: number;
    roleName: string;
  } & Pick<User,
      'color' |
      'fullName' |
      'fullNameDisplay' |
      'gravatarId' |
      'id' |
      'isActive' |
      'photo' |
      'username'>;
  milestones: {
    closed: boolean;
    id: number;
    name: string;
    slug: string;
  }[];
  modifiedDate: string;
  myHomepage: number;
  myPermissions: Permissions[];
  name: string;
  notifyLevel: number;
  owner: Pick<User,
    'bigPhoto' |
    'fullNameDisplay' |
    'gravatarId' |
    'id' |
    'isActive' |
    'photo' |
    'username'>;
  points: {
    id: number;
    name: string;
    order: number;
    projectId: number;
    value: null | number;
  }[];
  priorities: Attribute[];
  publicPermissions: Permissions[];
  roles: {
    computable: boolean,
    id: number;
    name: string;
    order: number;
    permissions: Permissions[],
    projectId: number;
    slug: string;
  }[];
  severities: Attribute[];
  slug: string;
  tags: string[];
  tagsColors: Record<string, string>;
  taskCustomAttributes: CustomAttribute[];
  taskDuedates: Duedates[];
  taskStatuses: Status[];
  tasksCsvUuid: null | string;
  totalActivity: number;
  totalActivityLastMonth: number;
  totalActivityLastWeek: number;
  totalActivityLastYear: number;
  totalClosedMilestones: number;
  totalFans: number;
  totalFansLastMonth: number;
  totalFansLastWeek: number;
  totalFansLastYear: number;
  totalMemberships: number;
  totalMilestones: number;
  totalStoryPoints: number;
  totalWatchers: number;
  totalsUpdatedDatetime: string;
  transferToken: string;
  usDuedates: Duedates[];
  usStatuses: Status[];
  userstoriesCsvUuid: null | string;
  userstoryCustomAttributes: CustomAttribute[];
  videoconferences: null | string;
  videoconferencesExtraData: null | string;
}

export interface ProjectModules {
  bitbucket: {
      secret: string;
      validOriginIps: string[];
      webhooksUrl: string;
  };
  github: {
      secret: string;
      webhooksUrl: string;
  };
  gitlab: {
      secret: string;
      validOriginIps: string[];
      webhooksUrl: string;
  };
  gogs: {
      secret: string;
      webhooksUrl: string;
  };
}

export interface ProjectStats {
  assignedPoints: number;
  assignedPointsPerRole: Record<string, number>;
  closedPoints: number;
  closedPointsPerRole: Record<string, number>;
  definedPoints: number;
  definedPointsPerRole: Record<string, number>;
  milestones: {
    'client-increment': number;
    evolution: number;
    name: string;
    optimal: number;
    'team-increment': number;
  }[];
  name: string;
  speed: number;
  totalMilestones: number;
  totalPoints: number;
}

export interface AssignedStat {
  count: number;
  color: string;
  id: number;
  name: string;
  username: string;
}

export interface StatsByOpenClosed {
  color: string;
  data: number[];
  id: number;
  name: string;
}

export interface ProjectIssueStats {
  closedIssues: number;
  issuesPerAssignedTo: Record<string, AssignedStat>;
  issuesPerOwner: Record<string, Omit<AssignedStat, 'username'>>;
  issuesPerPriority: Record<string, Omit<AssignedStat, 'username'>>;
  issuesPerSeverity: Record<string, Omit<AssignedStat, 'username'>>;
  issuesPerStatus: Record<string, Omit<AssignedStat, 'username'>>;
  issuesPerType: Record<string, Omit<AssignedStat, 'username'>>;
  lastFourWeeksDays: {
    byOpenClosed: {
      closed: number[];
      open: number[];
      byPriority: Record<string, StatsByOpenClosed>
      bySeverity: Record<string, StatsByOpenClosed>
      byStatus: Record<string, StatsByOpenClosed>
    };
  };
  openedIssues: number;
  totalIssues: number;
}

export interface Tag {
  color: string;
  tag: string;
}

export interface EditTag {
  color: string;
  fromTag: string;
  toTag: string;
}

export interface ProjectTemplateDetail {
  createdDate: string;
  defaultOptions: {
      epicStatus: string;
      issueStatus: string;
      issueType: string;
      points: string;
      priority: string;
      severity: string;
      taskStatus: string;
      usStatus: string;
  };
  defaultOwnerRole: string;
  description: string;
  epicStatuses: Pick<Status, 'color' | 'isClosed' | 'name' | 'order' | 'slug'>[];
  id: number;
  isBacklogActivated: boolean;
  isContactActivated: boolean;
  isEpicsActivated: boolean;
  isIssuesActivated: boolean;
  isKanbanActivated: boolean;
  isWikiActivated: boolean;
  issueStatuses: Pick<Status, 'color' | 'isClosed' | 'name' | 'order' | 'slug'>[];
  issueTypes: {
    color: string;
    name: string;
    order: number;
  }[];
  modifiedDate: string;
  name: string;
  order: number;
  points: {
    name: string;
    order: number
    value: null | string;
  }[];
  priorities: {
    color: string;
    name: string;
    order: number;
  }[];
  roles: {
    computable: boolean;
    name: string;
    order: number;
    permissions: Permissions[]
    slug: string;
  }[];
  severities: {
    color: string;
    name: string;
    order: number;
  }[];
  slug: string;
  taskStatuses: Pick<Status, 'color' | 'isClosed' | 'name' | 'order' | 'slug'>[];
  usStatuses: {
    isArchived: boolean;
    wipLimit: null | string;
  } & Pick<Status,
    'color' |
    'isClosed' |
    'name' |
    'order' |
    'slug'>[];
  videoconferences: null | string;
  videoconferencesExtraData: string;
}
