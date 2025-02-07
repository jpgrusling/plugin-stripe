import path from 'path'
import type { Config } from 'payload/config'
import type { Configuration as WebpackConfig } from 'webpack'

const mockModulePath = path.resolve(__dirname, 'mocks/serverModule.js')

export const extendWebpackConfig =
  (config: Config): ((webpackConfig: WebpackConfig) => WebpackConfig) =>
  webpackConfig => {
    const existingWebpackConfig =
      typeof config.admin?.webpack === 'function'
        ? config.admin.webpack(webpackConfig)
        : webpackConfig

    return {
      ...existingWebpackConfig,
      resolve: {
        ...(existingWebpackConfig.resolve || {}),
        alias: {
          ...(existingWebpackConfig.resolve?.alias ? existingWebpackConfig.resolve.alias : {}),
          stripe: mockModulePath,
          express: mockModulePath,
          [path.resolve(__dirname, './routes/rest')]: mockModulePath,
          [path.resolve(__dirname, './routes/webhooks')]: mockModulePath,
          [path.resolve(__dirname, './webhooks/handleWebhooks')]: mockModulePath,
          [path.resolve(__dirname, './hooks/createNewInStripe')]: mockModulePath,
          [path.resolve(__dirname, './hooks/deleteFromStripe')]: mockModulePath,
          [path.resolve(__dirname, './hooks/syncExistingWithStripe')]: mockModulePath,
        },
      },
    }
  }
