import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();

    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
      });

    const prod = process.env.NODE_ENV === "production";

    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      prod,
      styles: [...initialProps.styles, ...sheet.getStyleElement()]
    };
  }

  _setGoogleAnalytics = () => {
    return {
      __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          dataLayer.push(arguments);
        }
        gtag("js", new Date());
        gtag("config", "${process.env.GA_USERID}");
			`
    };
  };

  render() {
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" type="image/png" href="/static/favicon.png" />
          <style>{`@import url(https://use.fontawesome.com/releases/v5.6.3/css/all.css)`}</style>
          <style>{`@import url(https://fonts.googleapis.com/css?family=Montserrat:700|Open+Sans:700,400)`}</style>
          {this.props.prod && (
            <>
              <script async src={`https://www.googletagmanager.com/gtag/js?id="${process.env.GA_USERID}"`} />
              <script dangerouslySetInnerHTML={this._setGoogleAnalytics()} />
            </>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
