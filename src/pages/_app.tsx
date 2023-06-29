import {AppProps} from "next/app";

interface PageProps {

}

export default function MyApp({ Component, pageProps }: AppProps<PageProps>) {
    return <Component {...pageProps} />
}