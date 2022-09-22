/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly REACT_APP_REGION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}