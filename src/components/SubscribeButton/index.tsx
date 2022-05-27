import { signIn, useSession } from 'next-auth/react';
import styles from './styles.module.scss';

interface SubscribeButtonProps {
    priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {

    const session = useSession();

    function handleSubscribe() {
        if(!session) {
            signIn('github')
            return;
        }

        
    }

    return (
        <button className={styles.subscribeButton} type="button" onClick={handleSubscribe}>
            Subscribe now
        </button>
    );
}