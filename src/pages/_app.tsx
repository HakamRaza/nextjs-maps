import '../styles/components.css';
import '../styles/globals.css';
import '../styles/mapbox-gl.css';
import { compose } from "redux";
import { createAppStore, rootEpic } from '../redux/store'
import { Provider } from "react-redux";
import { withObservable } from 'next-redux-observable'
import App from "next/app";
import React from "react";
import withRedux from "next-redux-wrapper";


class MyApp extends App {
    static async getInitialProps({ Component, ctx }: { Component: any, ctx: any }) {
        const pageProps = Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {};

        return { pageProps }
    }

    render() {
        const { Component, pageProps, store } = this.props

        return (
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        );
    }
}

export default compose(
    withRedux(createAppStore),
    withObservable(rootEpic),
)(MyApp)