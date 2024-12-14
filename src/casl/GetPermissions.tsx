import { AbilityBuilder, Ability } from '@casl/ability'

const GetPermissions = (roles: any) => {
  const { can, build } = new AbilityBuilder(Ability)

  roles?.forEach((item: any) => {
    item?.permissions?.forEach((el: string) => {
      can(el.split('_')[0], el.split('_')[1])
    })
  })

  return build()
}

export default GetPermissions
