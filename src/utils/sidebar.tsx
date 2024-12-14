import { ReactComponent as Dashboard } from '@src/assets/images/sidebar/v2/Dashboard.svg'
import { ReactComponent as Avatar } from '@src/assets/images/sidebar/v2/avatar.svg'
import { ReactComponent as Settings } from '@src/assets/images/sidebar/v2/Settings.svg'
import { ReactComponent as Help_Center } from '@src/assets/images/sidebar/v2/Help_Center.svg'
import { ReactComponent as Terms_Policies } from '@src/assets/images/sidebar/v2/Terms_Policies.svg'
import { ReactComponent as LogoutIcon } from '@src/assets/icons/navbar/logout.svg'
import AccountView from '@src/components/AccountView/AccountView'
import { TFunction } from 'i18next'

const getAccountView = (t: TFunction<'translation', undefined>) => {
  return {
    head: {
      navigator: '/profile',
    },
    body: [
      {
        icon: Settings,
        title: t('settings'),
        navigator: '/settings/integration',
      },
      {
        icon: Help_Center,
        title: t('help_center'),
        navigator: 'Help_Center',
      },
      {
        icon: Terms_Policies,
        title: t('terms_policies'),
        navigator: 'Terms_Policies',
      },
    ],
    footer: {
      icon: LogoutIcon,
      title: t('logout'),
      navigator: '/login',
    },
  }
}
export const getSidebar = (t: TFunction<'translation', undefined>) => {
  return {
    top: [
      {
        key: 'dashboard',
        icon: Dashboard,
        title: t('dashboard'),
        navigator: '/dashboard',
      },
    ],
    bottom: [
      {
        icon: Avatar,
        placement: 'rightBottom',
        subItems: <AccountView {...getAccountView(t)} />,
      },
    ],
  }
}
