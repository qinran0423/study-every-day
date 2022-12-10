const fs = require("fs")
const dayjs = require("dayjs")

console.log(__dirname)

async function createFile() {
  console.log("hahah")

  const now = dayjs().format("YYYY.MM.DD")
  console.log(now)

  await createDIR(now)
  await writeFile(now)
}

async function createDIR(now) {
  await fs.mkdirSync(now, (err) => {
    if (err) throw err
  })
}

async function writeFile(now) {
  console.log(fs.writeFile)
  await fs.writeFileSync(`${now}/README.md`, `## ${now}`, (err) => {
    if (err) throw err
  })

  await fs.writeFileSync(`${now}/index.js`, ``, (err) => {
    if (err) throw err
  })
}

createFile()
