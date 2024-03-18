import { ReactComponent as LogoSvg } from '../../../assets/logo.svg';

export const LogoComponent = (props: any) => {
    const { classes } = props;
    return (
        <div className={classes}>
            <div className="flex items-center gap-1">
                <LogoSvg />
                <div className="text-light-accent1 text-xl font-special font-normal">FeedbackApp</div>
            </div>
            <div className="text-light-accent1 text-xs pl-1 font-special font-normal">Your opinion matter us</div>
        </div>
    )
}