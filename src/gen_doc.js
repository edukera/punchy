const pager = require('./data/pager.json');
const fr    = require('./data/doc_fr.json')
const h1    = '# '
const h2    = '## '
const get_section_exercices = section => {
  var res = []
  Object.keys(section).forEach(exercise => {
    if (exercise.startsWith("Ex")) {
        res.push(section[exercise]["id"])
    }
  })
  return res
}
const get_tutorial_exercises = tutorial => {
  var res = []
  Object.keys(tutorial).forEach(section => {
    res = res.concat(get_section_exercices(tutorial[section]))
  })
  return res
}
for (var i=4; i < 9; i++) {
  const part = pager.Root["Part" + i]
  const part_title = fr['pager_' + part.id]
  console.log(h1 + part_title)
  Object.keys(part).forEach(k => {
    if (k !== "id" && k !== "icon") {
      const chapter  = part[k]
      //console.log('pager_' + chapter.id)
      const chapter_title = fr['pager_' + chapter.id]
      console.log(h2 + chapter_title)
      const tutorial = chapter["Tutorial"]
      console.log('| Resource | Description | Nb exercices |')
      console.log('|---|---|---|')
      if (tutorial != undefined) {
        const exercices = get_tutorial_exercises(tutorial)
        const exercices_count = exercices.length
        const link = './h5p/' + part.id + '_' + chapter.id + '_tutorial'
        console.log('| [ Didacticiel ]( ' + link + ') | | ' + exercices_count + ' |')
      }
      const exercises = chapter["Exercises"]
      if (exercises != undefined) {
        Object.keys(exercises).forEach(section => {
          //console.log('pager_' + exercises[section].id)
          const exercices = get_section_exercices(exercises[section])
          const exercices_count = exercices.length
          const link = './h5p/' + part.id + '_' + chapter.id + '_' + exercises[section].id + '.h5p'
          const section_title = fr['pager_' + exercises[section].id]
          console.log('| [' + section_title + ']( ' + link + ') | | ' + exercices_count + ' |')
          //console.log('    ' + section_title)
        })
      }
    }
  })
}
