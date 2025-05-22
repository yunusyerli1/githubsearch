import classes from './loading-spinner.module.scss';
export default function LoadingSpinner() {
    return (
        <div className={classes['loading-state']} role="status" aria-live="polite">
            <div className={classes['loading-spinner']} aria-hidden="true"></div>
            <div>Loading repositories...</div>
        </div>
    )

}