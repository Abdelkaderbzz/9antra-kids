// @ts-nocheck
import { setNestedObjectValues } from 'formik'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AsyncPaginate } from 'react-select-async-paginate'
import { handleValuesChange } from './Func'
import { useAppDispatch } from '@store/index'
import { guestFiltersChange } from '@src/store/slices/clientFilter/clientFilterSlice'
import { handleAudienceValue } from '@src/store/slices/popup/popupSlice'

const AsyncSelect = ({
  setState,
  isMulti = false,
  disabled,
  loadPageOptions,
  required,
  handleChange,
  defaultValue,
  border = true,
  placeholder,
  Prefix,
  name,
  height,
  className,
  label,
  formik,
  form,
  topMenu = false,
  valueDefault,
  endPoint,
  property,
}: any) => {
  const theme = useSelector((state) => state?.theme?.mode)
  const [colourStyles, setColourStyles]: any = useState(false)
  const dispatch = useAppDispatch()
  useEffect(() => {
    setColourStyles({
      multiValueLabel: (styles: any) => {
        return {
          ...styles,
          marginRight: '3px',
          color: '#333',
          // fontSize: '2rem',
        }
      },
      multiValue: (styles: any) => {
        return {
          ...styles,
          // fontSize: '2rem',
          padding: '4px',
          backgroundColor: '#E7E8EA',
          borderRadius: '8px',
          background: '#f0f6f8',
        }
      },
      multiValueRemove: (styles) => {
        return {
          ...styles,
          cursor: 'pointer',
        }
      },
      clearIndicator: (styles) => {
        return {
          ...styles,
          '&:hover': {
            color: 'unset',
          },
          cursor: 'pointer',
          svg: {
            fill: `${theme === 'dark' ? '#8b949e !important' : '#333 !important'}`,
          },
        }
      },
      input: (styles, { isFocused, isSeleced, ...rest }) => {
        return {
          ...styles,
          color: `${theme === 'dark' ? '#8b949e !important' : '#333 !important'}`,
          fontSize: '16px',
        }
      },
      control: (styles, { isFocused, isSelected, ...rest }) => {
        return {
          ...styles,
          cursor: 'pointer',
          // backgroundColor: `${theme === 'dark' ? '#161A22 !important' : 'white !important'}`,
          // boxShadow: 'none !important',
          outline: 'none',
          // border: '0px',
          // borderColor: `${theme === 'dark' ? '#8B949E !important' : '#cbd5e1 !important'}`,
          // borderRadius: '10px !important',
          ...(height ? { minHeight: `${height} !important` } : { minHeight: '50px !important' }),
          fontSize: '16px',
        }
      },
      menuList: (styles) => ({
        ...styles,
        background: `${theme === 'dark' ? '#0d1117 !important' : 'white !important'}`,
        borderRadius: '10px !important',
        // fontSize: '2rem',
      }),
      option: (styles, { isFocused, isSelected }) => {
        return isSelected
          ? {
              ...styles,
              background: '#99C6D3',
              fontSize: '12px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              color: '#727272 ',
            }
          : isFocused
            ? {
                ...styles,
                background: '#F0F6F8',
                fontSize: '12px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                color: '#727272 ',
              }
            : {
                ...styles,
                color: `${theme === 'dark' ? '#8b949e !important' : '#727272 !important'}`,
                zIndex: 1,
                cursor: 'pointer',
                fontSize: '12px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
              }
      },

      menu: (base) => ({
        ...base,
        zIndex: 1000,
        fontSize: '2rem',
        background: 'white',
        borderRadius: '8px',

        ...(Prefix
          ? {
              marginLeft: '-5%',
              width: '105%',
            }
          : {}),

        ...(topMenu
          ? {
              position: 'absolute',
              top: '-700%',
            }
          : {}),
      }),
      indicatorSeparator: (base) => ({
        ...base,
        display: 'none',
        fontSize: '2rem',
      }),
      dropdownIndicator: (provided) => ({
        ...provided,
        svg: {
          fill: `${theme === 'dark' ? '#8b949e !important' : '#333 !important'}`,
        },
        fontSize: '2rem',
      }),
      loadingIndicator: (styles) => {
        return {
          ...styles,
          filter: `${theme === 'dark' ? 'invert(50%)' : 'invert(0%)'}`,
          fontSize: '2rem',
          display: 'none',
        }
      },
    })
  }, [])

  const defaultAdditional = {
    page: 1,
  }
  const [value, setValue] = useState(valueDefault || [])
  useEffect(() => {
    if (!valueDefault) {
      setValue([])
    }
  }, [valueDefault])
  return (
    <div className={`select-async ${className ? className : ''}`}>
      {label && (
        <p className="children-select-name">
          {label}
          {required && <span style={{ color: 'red' }}>*</span>}
        </p>
      )}
      <div
        className={`${
          formik
            ? formik?.errors[name]
            : form?.getFieldError()[name]
              ? 'select-container-error'
              : ''
        } ${border ? 'select-container' : 'select-container-borderless'}`}
      >
        {Prefix && <Prefix />}

        <AsyncPaginate
          isDisabled={disabled}
          value={value}
          isMulti={isMulti}
          defaultValue={defaultValue || formik?.initialValues[name] || form?.initialValues}
          placeholder={placeholder}
          styles={colourStyles}
          onChange={(value: any) => {
            setValue(value)
            name === 'group'
              ? dispatch(handleAudienceValue(value))
              : dispatch(guestFiltersChange({ value, label: property }))
          }}
          additional={defaultAdditional}
          loadOptions={loadPageOptions}
        />
      </div>
    </div>
  )
}

export default AsyncSelect
