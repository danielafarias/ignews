import Head from 'next/head';
import styles from './styles.module.scss';

export default function Posts() {
    return (
        <>
            <Head>
                <title>Posts | ignews </title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    <a href="">
                        <time>
                            29 de maio de 2022
                        </time>
                        <strong>
                            Lorem ipsum dolor sit amet
                        </strong>
                        <p>Lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolor sit amet</p>
                    </a>
                    <a href="">
                        <time>
                            29 de maio de 2022
                        </time>
                        <strong>
                            Lorem ipsum dolor sit amet
                        </strong>
                        <p>Lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolor sit amet</p>
                    </a>
                    <a href="">
                        <time>
                            29 de maio de 2022
                        </time>
                        <strong>
                            Lorem ipsum dolor sit amet
                        </strong>
                        <p>Lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolor sit amet</p>
                    </a>
                </div>
            </main>
        </>
    );
}