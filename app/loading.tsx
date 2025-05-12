import classes from './loading.module.scss';

export default function Loading() {
    return (
        <div className={`${classes.layout} d-flex justify-content-center align-items-center`}>
            <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}
