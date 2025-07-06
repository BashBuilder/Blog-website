import clsx from 'clsx'

export const Icon = () => {
  return (
    <img
      alt="Qorepay favicon"
      width={193}
      height={34}
      // loading={loading}
      // fetchPriority={priority}
      decoding="async"
      className={clsx('max-w-[9.375rem] w-full h-[34px]')}
      // src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-logo-light.svg"
      src="/favicon.svg"
    />
  )
}
