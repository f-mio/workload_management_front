# workload management front

## 本アプリについて
workload managementはプロジェクトの工数管理を行うためのアプリケーションです。各担当者が、タスクレベルでの工数を日毎に記録できるアプリケーションです。  
このリポジトリはフロント部分です。

## 本アプリを用いて実現したいこと
- 期間(月,クォータ等)で工数を見える化し、管理,編集コストを低減させる。
  - 各人の工数を見える化する
  - プロジェクト単位で工数を見える化する

## 使用技術 (現時点で使用予定のものを記載)

![React](https://img.shields.io/badge/React-XX.X-blue)
![Next.js](https://img.shields.io/badge/Next.js-15.1.3-blue)
![Tailwindcss](https://img.shields.io/badge/Tailwindcss-blue)
<!-- ![Jspreadsheet](https://img.shields.io/badge/Jspreadsheet-XX.X-blue)
![Jest](https://img.shields.io/badge/Jest-XX.X-blue) -->


## ディレクトリ構成
ディレクトリ構成は下記になります。
```text
./
├── node_modules/            # パッケージ
├── public/
├── src/                     # "app" is a Python package
│   ├── app/
│   │   ├── lib/
│   │   ├── users/           # URLのuserパス配下
│   │   │   ├── xxx          # xxx
│   │   │   └── xxx          # xxx
│   │   ├── workloads/       # URLのworkloadパス配下
│   │   │   ├── xxx          # xxx
│   │   │   └── xxx          # xxx
│   │   ├── ui/              # コンポーネントを格納したディレクトリ
│   │   │   ├── xxx          # xxx
│   │   │   ├── xxx          # xxx
│   │   │   └── xxx          # xxx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── config/              # 環境変数等の設定情報を格納しているディレクトリ
│       ├── envConfig.ts     # 環境変数ファイル.envを読み込むためのファイル
│       └── serverConfig.ts  # 設定値をハッシュ化して他のファイルに渡す情報を提供
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── .env
├── tailwind.config.ts
├── tsconfig.json
├── .gitignore
└── README.md
```


### 環境設定ファイル .env
```text
WORKLOAD_APP_API_SERVER="your host information  ex. localhost:8000"
# CSRFトークン設定用
ENDPOINT_GET_CSRF=${WORKLOAD_APP_API_SERVER}/api/auth/csrftoken
ENDPOINT_VERIFY_JWT=${WORKLOAD_APP_API_SERVER}/api/auth/verify_jwt
# ユーザ管理機能用
ENDPOINT_USER_LOGIN=${WORKLOAD_APP_API_SERVER}/api/user/signin
ENDPOINT_USER_SIGNUP=${WORKLOAD_APP_API_SERVER}/api/user/signup
ENDPOINT_DELETE_USER_LOGOUT=${WORKLOAD_APP_API_SERVER}/api/user/logout
ENDPOINT_PUT_USER_DEACTIVATE=${WORKLOAD_APP_API_SERVER}/api/user/deactivate
ENDPOINT_GET_ALL_USERS=${WORKLOAD_APP_API_SERVER}/api/user/active/all
# JIRA情報取得
ENDPOINT_GET_PROJECTS=${WORKLOAD_APP_API_SERVER}/api/project/db/all
ENDPOINT_GET_ISSUES=${WORKLOAD_APP_API_SERVER}/api/issue/main-task/db/all
ENDPOINT_GET_SUBTASKS=${WORKLOAD_APP_API_SERVER}/api/issue/subtask_with_parents/db/all
# 全更新機能用
ENDPOINT_UPDATE_ALL_PROJECTS_AND_ISSUES=${WORKLOAD_APP_API_SERVER}/api/project/db/update/all
# 工数関係
ENDPOINT_GET_WL=${WORKLOAD_APP_API_SERVER}/api/workload/db/
ENDPOINT_POST_WL=${WORKLOAD_APP_API_SERVER}/api/workload/db/post
ENDPOINT_PUT_WL=${WORKLOAD_APP_API_SERVER}/api/workload/db/update
ENDPOINT_DEL_WL=${WORKLOAD_APP_API_SERVER}/api/workload/db/delete
ENDPOINT_GET_WORKLOADS_USING_CONDITION=${WORKLOAD_APP_API_SERVER}/api/workload/db/search
# 管理者機能用
ENDPOINT_GET_JIRA_PROJECTS_ROOT=${WORKLOAD_APP_API_SERVER}/api/project/root/jira/all
ENDPOINT_PUT_PROJECT_ROOT=${WORKLOAD_APP_API_SERVER}/api/project/root/project/edit/target
ENDPOINT_PUT_ACTIVATE_LOG_DEL_USER=${WORKLOAD_APP_API_SERVER}/api/user/root/activate
ENDPOINT_DEL_PHISICAL_DEL_USER=${WORKLOAD_APP_API_SERVER}/api/user/root/delete
ENDPOINT_PUT_USER_TO_ROOT=${WORKLOAD_APP_API_SERVER}/api/user/root/permission
```


# 環境構築

[TODO]




# 利用に関して

## 日本語版
```text
本ソフトウェアは、私的利用に限り無償で使用することができます。  
商用目的での使用または商業的な価値を生む活動に使用する場合は事前に開発者（[f-mio](https://github.com/f-mio)）の許可を得る必要があります。  
本ソフトウェアの改変や再配布は、開発者の許可を得た場合にのみ可能です。  

本ソフトウェアの使用により生じたいかなる損害や問題についても、開発者は一切の責任を負いません。
```

## English version
```text
This software may be used free of charge for personal use only.  
For any commercial use, or activities generating commercial value, prior permission must be obtained from the developer ([f-mio](https://github.com/f-mio)).  
Modification or redistribution of this software is permitted only with the developer's approval.  

The developer assumes no responsibility for any damages or issues caused by the use of this software.
```
