import React from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import Template from './Template'

/* Client render (optional) */
if (typeof document !== 'undefined') {
  const outlet = document.getElementById('outlet')
  ReactDOM.render(<BrowserRouter><App/></BrowserRouter>, outlet)
}

/* Exported static site renderer */
export default (locals) => {
  return ReactDOMServer.renderToStaticMarkup(
    <Template>
        <StaticRouter location={locals.path} context={{}}>
          <App/>
        </StaticRouter>
    </Template>
  );
}
