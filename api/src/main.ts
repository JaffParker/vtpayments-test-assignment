import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app.module'
import { INestApplication } from '@nestjs/common'

type App = INestApplication
export type AppGetter = () => Promise<App>

let app: App
export const getApp: AppGetter = async () => {
  if (!app) {
    app = await NestFactory.create(AppModule)
  }

  return app
}

async function bootstrap(): Promise<void> {
  const app = await getApp()
  await app.listen(8000)
}
bootstrap()
