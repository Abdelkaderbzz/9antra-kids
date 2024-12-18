import routes, { renderRoutes } from '@src/routes'
import GetPermissions from '@src/casl/GetPermissions'
import { useAppSelector } from '@src/store'
import { useTranslation } from 'react-i18next'
import { AbilityContext } from '@src/casl/Can'
import { Button } from 'antd'
import ProductTourBuilder from '@src/plugins/ProductTourBuilder/ProductTourBuilder'
const App = () =>
{
  const { i18n } = useTranslation('translation')
  document.body.dir = i18n?.dir()

  const theme = useAppSelector((state) => state.theme.mode)
  const user: any = useAppSelector((state) => state.auth.user)

  const listOfPermissions = GetPermissions(user?.roles)
  return (
    <AbilityContext.Provider value={listOfPermissions}>
      <Button>send message</Button>
      <ProductTourBuilder />

      <div id={theme}>{renderRoutes(routes)}</div>
    </AbilityContext.Provider>
  )
}

export default App
