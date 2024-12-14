import { useState } from 'react'
import {
  languages,
  LanguageKeysType,
  LanguageType,
  checkLanguage,
  setLanguage,
} from '@src/utils/languages'
import { ReactComponent as Select_Arrow_Down } from '@src/assets/images/auth/Select_Arrow_Down.svg'
import CustomSelect from '../Select/Select'
import i18n from '@src/i18n'

const SwicthLanguage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageKeysType>(checkLanguage)
  const [options, setOptions] = useState<LanguageType>(languages[checkLanguage])

  const handleLanguageChange = (value: LanguageKeysType) => {
    i18n.changeLanguage(value)
    setSelectedLanguage(value)
    setOptions(languages[value])
    setLanguage(value)
  }

  return (
    <CustomSelect
      value={selectedLanguage}
      onChange={handleLanguageChange}
      options={options}
      className="auth_header_select_languages"
      suffixIcon={<Select_Arrow_Down />}
      size="large"
    />
  )
}

export default SwicthLanguage
