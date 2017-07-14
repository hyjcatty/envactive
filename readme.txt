Please install the Node.js v5.1.0 or higher (higher than 6.0 is not recommended).
IF your environment have not install the gulp & webpack, u neek install them first:
npm install gulp -g
npm install webpack -g

Then add your npm node path into System PATH, and keep command "gulp" & "webpack" can run everywhere.

Change your work DIR to source folder.
Keep your internet link fluent, or you can use the set the npm mirror in your country.
1) Prepare the environment for node_modules, command:
npm install --save-dev
2) build the source, command:
npm run build
3) copy the useful resource to the deliver folder, command:
gulp

U can get the output in fold /dist.

Directory structure:
----+-build         // save the js & resource file after they are built
    +-resource      // 3rd resource folder, main content is font-awesome
    +-dist          // save the final deliver files
    +-node_modules  // Node.js plugin folder, all dependence will be save in it after npm install
    +-src           // source folder
    --gulpfile.js   // gulp command configuration
    --index.html    // entry of the UI, will be compiled
    --package.json  // npm configuration file
    --readme.txt    // help file
    --product_description.txt    // Production discription
    --request.php   // php entry for Apache&PHP environment
    --webpack.config.js //webpack react hot server configuration file
    --webpack.build.config.js //webpack build configuration file


.
