'use client'
import { useTheme } from '@payloadcms/ui'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props
  const { theme } = useTheme()

  const [src, setSrc] = useState('/media/logo/qoreLogo.svg') // default to light

  useEffect(() => {
    if (theme === 'dark') {
      setSrc('/media/logo/qorepaylogo.png')
    } else {
      setSrc('/media/logo/qoreLogo.svg')
    }
  }, [theme])

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Qorepay Logo"
      width={193}
      height={34}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('max-w-[9.375rem] w-full h-[34px]', className)}
      src={src}
    />
  )
}
