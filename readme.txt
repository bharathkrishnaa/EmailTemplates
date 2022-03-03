This is a readme file , a guide to how this app works.
The required formats and examples for calling each endpoints are specified below.

The database used with this application is MongoDB
The connection url of a mongodb service can be configured into the config file present in the root folder

A simple level of authentication is enabled for all end points.
To get the token : http://localhost:5000/token
The token received from this call has to be entered into the headers of all endpoint calls under the key "authorization" 

The end points created are:

Template creation:  http://localhost:5000/templates
Its a post method with the template title and body in attached as a json file in body parameter section
Example:-{"type":"test", "templ_body":"Hello custom, this is a test SMS."}
The keyword custom is where the custom names will be replacing.

Template deletion: http://localhost:5000/templates
Its a delete method with a query param "type". The template with the type provided will be deleted from the database.
Example:-http://localhost:5000/templates?type=test

Template updation: http://localhost:5000/templates
Its a put method with the type of the template that needs to be updated is provides as a query param and the new template
can be provided as a json file in body param section.
Example:- http://localhost:5000/templates?type=test,{"templ_body":"That is custom"}

Viewing all templates in databasse: http://localhost:5000/templates
Its a get method.

Custom template:- http://localhost:5000/templates
Its a get method with the type required as query param and the custom name/url that needs to be added as ajson format body param.
Example: http://localhost:5000/templates?type=test,{"input": "http://www.google.com"}

Thank you.