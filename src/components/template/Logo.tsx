import classNames from 'classnames'
import { APP_NAME } from '@/constants/app.constant'


const LOGO_SRC_PATH = '/img/logo/'

const Logo = (props) => {
    const {
        type = 'full',
        mode = 'light',
        className,
        imgClass,
        style,
       
    } = props

    return (
        <div
            className={classNames('logo', className)}
            style={{
                ...style,
             
            }}
        >
            <img
                className={imgClass}
                src={`${LOGO_SRC_PATH}logo-${mode}-${type}.png`}
                alt={`${APP_NAME} logo`}
            />
        </div>
    )
}

export default Logo
