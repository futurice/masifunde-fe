import { FC, ReactNode } from 'react'

export type Props = {
  children?: ReactNode
  className?: string
  withoutContainer?: boolean
}

const CenteredGrid: FC<Props> = ({ children, className, withoutContainer }) => (
  <div className={`${className} ${withoutContainer ? '' : 'container'}`}>
    <div className="row">
      <div className="offset-lg-1 col-lg-10">{children}</div>
    </div>
  </div>
)

export default CenteredGrid
