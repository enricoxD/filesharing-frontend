import App, {AppContext, AppProps} from "next/app";

const MyCustomApp = ({Component, pageProps}: AppProps) => (
    <html>
        <Component {...pageProps} />
    </html>
);

MyCustomApp.getInitialProps = async (context: AppContext) => {
    const ctx = await App.getInitialProps(context);

    return {...ctx, example: "foo"};
};

export default MyCustomApp;