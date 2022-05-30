import { GetStaticProps } from 'next';
import Head from 'next/head';
import { getPrismicClient } from '../../services/prismic';
import styles from './styles.module.scss';
import * as Prismic from '@prismicio/client';

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

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient();
    const response = await prismic.query([
        Prismic.predicates.at('document.type', 'post')
    ], {
        fetch: ['post.title', 'post.content'],
        pageSize: 100,
    });

    console.log(JSON.stringify(response, null, 2));
    return {
        props: {}
    }
}