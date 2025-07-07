import clsx from 'clsx'

export const Icon = () => {
  return (
    <img
      alt="Qorepay favicon"
      width={100}
      height={100}
      decoding="async"
      className={clsx('max-w-[100px] w-full h-[100px]')}
      src="/favicon.png"
    />
  )
}
