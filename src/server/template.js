
export const template = (content = '', scriptTags, styleTags, apolloState) => {
  const page = `
<!doctype html>
	<html>
			<head>
			 	<title>Hapi</title>
		   	<meta charset="utf-8">
		   	<meta name="viewport" content="width=device-width, initial-scale=1">
		   	<meta name="theme-color" content="#810051">
		   	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />		  
		   	${styleTags}
 	 
      </head>
      <body>
        <div id="root">${content}</div>
 <script> window.__APOLLO_STATE__ = ${JSON.stringify(apolloState).replace(/</g, '\\\u003c')}</script> 
       ${scriptTags}

      </body>
  </html>
`;
  return page;
};
