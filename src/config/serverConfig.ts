import '@/config/envConfig.ts'


const apiServerInfo = {
  wlHost: process.env.WWORKLOAD_APP_API_SERVER!,
  // csrf token
  epCsrf: process.env.ENDPOINT_GET_CSRF!,
  epVerifyJwt: process.env.ENDPOINT_VERIFY_JWT,
  // ユーザ管理機能用
  epLogin: process.env.ENDPOINT_USER_LOGIN!,
  epSignUp: process.env.ENDPOINT_USER_SIGNUP!,
  epLogout: process.env.ENDPOINT_DELETE_USER_LOGOUT!,
  epUserDeactivate: process.env.ENDPOINT_PUT_USER_DEACTIVATE!,
  epGetAllUser: process.env.ENDPOINT_GET_ALL_USERS!,
  // JIRA情報取得
  epGetProjects: process.env.ENDPOINT_GET_PROJECTS!,
  epGetIssues: process.env.ENDPOINT_GET_ISSUES!,
  epGetSubtasks: process.env.ENDPOINT_GET_SUBTASKS!,
  // 全更新機能用
  epUpdateAllIssues: process.env.ENDPOINT_UPDATE_ALL_PROJECTS_AND_ISSUES!,
  // 工数登録機能用
  epGetSpeciryWorkload: process.env.ENDPOINT_GET_WL!,
  epPostWorkload: process.env.ENDPOINT_POST_WL!,
  epUpdateWorkload: process.env.ENDPOINT_PUT_WL!,
  epDeleteWorkload: process.env.ENDPOINT_DEL_WL!,
  epGetWorkloadsUseCondition: process.env.ENDPOINT_GET_WORKLOADS_USING_CONDITION!,
  // 管理者機能用
  epGetProjectsRoot: process.env.ENDPOINT_GET_JIRA_PROJECTS_ROOT!,
  epPutProjectRoot: process.env.ENDPOINT_PUT_PROJECT_ROOT!,
  epPutActivateUser: process.env.ENDPOINT_PUT_ACTIVATE_LOG_DEL_USER!,
  epDelUser: process.env.ENDPOINT_DEL_PHISICAL_DEL_USER!,
  epPutToRoot: process.env.ENDPOINT_PUT_USER_TO_ROOT!,
};

export default apiServerInfo;
