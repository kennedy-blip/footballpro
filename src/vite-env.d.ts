/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FOOTBALL_API_KEY: string;
  readonly VITE_FOOTBALL_API_HOST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
