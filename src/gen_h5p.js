var fs              = require('fs')
var fs_extra        = require('fs-extra')
const punchy        = require('../jsons/punchy.json');
const child_process = require("child_process")
const build_dir = __dirname + '/../build'
const template  = __dirname + '/H5P.IFrameEmbed-1.0'

if (!fs.existsSync(build_dir)) {
  fs.mkdirSync(build_dir, 0744);
}
const get_h5p_config = (title) => {
  return {
    "title": title,
    "language": "fr",
    "mainLibrary": "H5P.IFrameEmbed",
    "embedTypes": [
      "div"
    ],
    "license": "GNU GPL",
    "defaultLanguage": "fr",
    "preloadedDependencies": [
      {
        "machineName": "H5P.IFrameEmbed",
        "majorVersion": "1",
        "minorVersion": "0"
      }
    ]
  }
}
const get_content = (id) => {
  return {
    "width": "500px",
    "height": "300px",
    "minWidth": "400px",
    "source": "https://app.edukera.com/?punchy_id=" + id,
    "resizeSupported": true
  }
}
const zip = (dir, target) => {
  child_process.execSync(`zip -D -r ${target} *`, {
    cwd: dir
  });
}
async function build() {
  for(var i=0; i < punchy.length; i++) {
    // create H5P component dir
    const h5p_dir = build_dir + '/' + punchy[i].id
    const content_dir = h5p_dir + '/content'
    if (!fs.existsSync(h5p_dir)) {
      fs.mkdirSync(h5p_dir, 0744);
      // create content dir
      fs.mkdirSync(content_dir, 0744);
      // write content.json
      fs.writeFileSync(content_dir + '/content.json', JSON.stringify(get_content(punchy[i].id), 0, 2));
      // write h5p.json
      fs.writeFileSync(h5p_dir + '/h5p.json', JSON.stringify(get_h5p_config(punchy[i].id), 0, 2))
      // copy iframe embed component
      await fs_extra.copy(template, h5p_dir + '/H5P.IFrameEmbed-1.0')
      // zip dir into h5p component
      zip(h5p_dir, punchy[i].id + '.h5p')
    }
    console.log(punchy[i].id)
  }
}
build()
