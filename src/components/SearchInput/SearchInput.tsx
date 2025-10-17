import React, { useState, useEffect } from 'react'
import { useDebounce } from 'use-debounce'
import { HugeiconsIcon } from '@hugeicons/react'
import { Search01Icon } from '@hugeicons/core-free-icons'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setSearchQuery } from '@/redux/slices/searchSlice'
import styles from './SearchInput.module.css'

interface SearchInputProps {
  placeholder?: string
  className?: string
  debounceDelay?: number
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Пошук товарів...',
  className = '',
  debounceDelay = 500
}) => {
  const dispatch = useAppDispatch()
  const globalQuery = useAppSelector((state) => state.search.query)
  const [localQuery, setLocalQuery] = useState(globalQuery)
  
  // Debounced значение с задержкой
  const [debouncedQuery] = useDebounce(localQuery, debounceDelay)

  // Синхронизируем с глобальным состоянием
  useEffect(() => {
    setLocalQuery(globalQuery)
  }, [globalQuery])

  // Отправляем debounced значение в Redux
  useEffect(() => {
    dispatch(setSearchQuery(debouncedQuery))
  }, [debouncedQuery, dispatch])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLocalQuery(value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // При submit отправляем сразу без задержки
    dispatch(setSearchQuery(localQuery))
  }

  const handleClear = () => {
    setLocalQuery('')
    dispatch(setSearchQuery(''))
  }

  return (
    <form className={`${styles.searchForm} ${className}`} onSubmit={handleSubmit}>
      <div className={styles.searchWrapper}>
        <HugeiconsIcon 
          icon={Search01Icon} 
          className={styles.searchIcon}
        />
        <input
          type="text"
          placeholder={placeholder}
          value={localQuery}
          onChange={handleChange}
          className={styles.searchInput}
        />
        {localQuery && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={handleClear}
            aria-label="Очистити пошук"
          >
            ✕
          </button>
        )}
      </div>
    </form>
  )
}

export default SearchInput

