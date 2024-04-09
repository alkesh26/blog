import Document, { Html, Head, Main, NextScript } from 'next/document';
import { TypographyStyle } from 'react-typography';
import typography from '../utils/typography';
import { GA_TRACKING_ID } from '../lib/gtag';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <script
             dangerouslySetInnerHTML={{
               __html: `
               (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
               new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
               j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
               'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
               })(window,document,'script','dataLayer','GTM-59XCBD27');
             `
             }}
          />
          <script type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
              var _iub = _iub || [];
              _iub.csConfiguration = {"askConsentAtCookiePolicyUpdate":true,"enableFadp":true,"enableLgpd":true,"enableTcf":true,"enableUspr":true,"fadpApplies":true,"floatingPreferencesButtonDisplay":"bottom-right","googleAdditionalConsentMode":true,"lang":"en","perPurposeConsent":true,"siteId":3588912,"tcfPurposes":{"2":"consent_only","7":"consent_only","8":"consent_only","9":"consent_only","10":"consent_only","11":"consent_only"},"usprApplies":true,"whitelabel":false,"cookiePolicyId":85595604, "banner":{ "acceptButtonDisplay":true,"closeButtonDisplay":false,"customizeButtonDisplay":true,"explicitWithdrawal":true,"listPurposes":true,"position":"float-top-center","rejectButtonDisplay":true,"showTitle":false }};
              `
            }}
          />
          <script type="text/javascript" src="https://cs.iubenda.com/autoblocking/3588912.js"/>
          <script type="text/javascript" src="//cdn.iubenda.com/cs/tcf/stub-v2.js"/>
          <script type="text/javascript" src="//cdn.iubenda.com/cs/tcf/safe-tcf-v2.js"/>
          <script type="text/javascript" src="//cdn.iubenda.com/cs/gpp/stub.js"/>
          <script type="text/javascript" src="//cdn.iubenda.com/cs/iubenda_cs.js" charset="UTF-8" async/>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `
            }}
          />
          <TypographyStyle typography={typography} />
        </Head>
        <body>
          <noscript
            dangerouslySetInnerHTML={{
              __html: `
              <iframe
                src="https://www.googletagmanager.com/ns.html?id=GTM-59XCBD27"
                height="0"
                width="0"
                style="display:none;visibility:hidden">
              </iframe>
              `
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
