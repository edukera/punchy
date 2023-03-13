const pager = require('./pager.json');
var punchy = [];
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
  Object.keys(part).forEach(k => {
    if (k !== "id" && k !== "icon") {
      const chapter  = part[k]
      const tutorial = chapter["Tutorial"]
      if (tutorial != undefined) {
        const exercices = get_tutorial_exercises(tutorial)
        punchy.push({
          id : part.id + '_' + chapter.id + '_tutorial',
          exercises : exercices,
          trad_id : chapter.id,
          nb : exercices.length
        })
      }
      const exercises = chapter["Exercises"]
      if (exercises != undefined) {
        Object.keys(exercises).forEach(section => {
          const exercices = get_section_exercices(exercises[section])
          punchy.push({
            id : part.id + '_' + chapter.id + '_' + exercises[section].id,
            exercises : exercices,
            trad_id : exercises[section].id,
            nb : exercices.length
          })
        })
      }
    }
  })
}
console.log(JSON.stringify(punchy, 0, 2))