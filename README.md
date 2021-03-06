# site_utile
 <h2> Projet web & systèmes</h2>
<h4> Mariam et Ombeline <h4>

<div class="divider"></div>
  <div class="section">
    <h5>Step 1: Mettre en place une application node avec un cli</h5>
    <p>Nous avons utilisé Express Application Generator</p>
    <ul style="list-style-type:circle">
	<li> <p> Installer de façon global express-generator que vous utiliserez à chaque fois que vous voulez créer une nouvelle application node.js avec express </p>
		<pre class="language-sh"><code class="language-sh"> $ npm install express-generator -g </code> </pre></li>
	<li> <p> Ce code génère une application appelée "mode application" dont le display sera en ejs </p>
		<pre class="language-sh"><code class="language-sh"> $ express --view=ejs monapplication </code></pre>
	</li>
	<li> <p> Déplacez vous dans le dossier généré et installez les dépendances nécessaires. C'est ici que nous rajouterons les dépendances au fur et à mesure   </p>
		<pre class="language-sh"><code class="language-sh"> $ cd mon application </code></pre>
		<pre class="language-sh"><code class="language-sh"> $ npm install </code></pre>
	</li>
	<li> <p> Pour lancer l'application sur Windows   </p>
		<pre class="language-sh"><code class="language-sh"> > set DEBUG=myapp:* & npm start </code></pre>
	</li>
	<li> <p> Pour lancer l'application sur MacOs or Linux   </p>
		<pre class="language-sh"><code class="language-sh"> $ DEBUG=myapp:* npm start </code></pre>
	</li>
	<li> <p>  L'application est disponible sur http://localhost:3000/ avec la structure suivante: </p>
		<pre class="language-sh"><code class="language-sh">

├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.ejs
    ├── index.ejs
    └── layout.ejs

7 directories, 9 files
</code></pre>	</li>

    </ul>
  </div>
  <div class="divider"></div>
  <div class="section">
    <h5>Step 2: Créer une page administrateur </h5>
    <p> Il suffit de créer une route ici appelé /admin </p>
  </div>
  <div class="divider"></div>
  <div class="section">
    <h5> Step 3: Créer un formulaire qui permet de charger un fichier</h5>
    <pre class="language-sh">
        <code class="language-sh">&lt;input type=&quot;file&quot; multiple id=&quot;fileUpload&quot; name=&quot;uploads[]&quot;&gt;</code>
    </pre>
  </div>
  <div class="divider"></div>
  <div class="section">
    <h5>Gérer l'envoie de fichier avec Node.js</h5>

    <ul style="list-style-type:circle">
	<li> <p>Express utilise un package formidable pour uploader les fichiers. Il faut d'abord installer formidable</p>
		<pre class="language-sh"><code class="language-sh"> $ npm install express formidable --save </code> </pre></li>
	<li> <p> Regardons de près les balises qui permettent le chargement du fichier. Il faut spécifier type = file et multiple si on veut permettre le chargement de plusieurs fichier en même temps </p>
		<pre class="language-sh"><code class="language-sh">  &lt;input type=&quot;file&quot; multiple id=&quot;fileUpload&quot; name=&quot;uploads[]&quot;&gt; </code></pre>
	</li>
	<li> <p> Nous allons gérer avec jquery (du coté client) que le fichier soit chargé et envoyé au serveur   </p>
    <p> Ce code permet de s'assurer que les fichiers sont bien selectionés par le client </p>
    <pre class="language-sh"><code class="language-sh"> $('#fileUpload').on('click', function(){

  var files = $(this).get(0).files;

  if (files.length > 0){
    // One or more files selected, process the file upload

    // create a FormData object which will be sent as the data payload in the
    // AJAX request
    var formData = new FormData();

    // loop through all the selected files
    for (var i = 0; i < files.length; i++) {
      var file = files[i];

      // add the files to formData object for the data payload
      formData.append('uploads[]', file, file.name);
    }

  }

}); </code></pre>
    <p> Il faut maintenant créer un demande AJAX qui envoie ces fichiers au serveur. formData est l'object que nous envoyons qui contient les fichiers. </p>
		<pre class="language-sh"><code class="language-sh"> $.ajax({
        url: "http://" + $(location).attr('host') + "/admin",
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(data){

            console.log('upload successful!\n' + data);
        }
      }) </code></pre>
	</li>
	<li> <p> Il faut créer /upload route qui se charge des uploads arrivant via la méthode POST   </p>
		<pre class="language-sh"><code class="language-sh"> > set DEBUG=myapp:* & npm start </code></pre>
	</li>
	<li> <p> Pour lancer l'application sur MacOs or Linux   </p>
		<pre class="language-sh"><code class="language-sh"> app.post('/upload', function(req, res){

  // create an incoming form object
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '/uploads');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);

}); </code></pre>
	</li>
	<li> <p> Attention à ne pas oublier d'emporter les dépéndances </p>
		<pre class="language-sh"><code class="language-sh">
      var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
</code></pre>
</li>

    </ul>

    <p> Cheers! </p>
  </div>
