import Link from "next/link";
import Image from 'next/image';
import classes from './social-media.module.scss';

const SocialMedia: React.FC = () => {
    return (
        <ul className={`d-flex gap-1 ${classes['circle-icon-menu']}`}>
            <li className={classes.linkedin}>
                <Link href="https://www.linkedin.com/company/moneytolia/" target="_blank" rel="noopener" title="Linkedin">
                    <Image src="/svg/linkedin.svg" alt="Linkedin" title="Linkedin" width={20} height={20} />
                </Link>
            </li>
            <li className={classes.website}>
                <Link href="https://www.moneytolia.com/" target="_blank" rel="noopener" title="Website">
                    <Image src="/svg/global-line.svg" alt="Website" title="Website" width={20} height={20} />
                </Link>
            </li>
            <li className={classes.twitter}>
                <Link href="https://x.com/moneytolia" target="_blank" rel="noopener" title="Twitter" className={classes.shadow}>
                    <Image src="/svg/twitter.svg" alt="Twitter" title="Twitter" width={20} height={20} />
                </Link>
            </li>
            <li className={classes.email}>
                <Link href="mailto:destek@moneytolia.com" target="_blank" rel="noopener" title="email" >
                    <Image src="/svg/envelope.svg" alt="email" title="email" width={20} height={20} />
                </Link>
            </li>
        </ul >
    );
};

export default SocialMedia;