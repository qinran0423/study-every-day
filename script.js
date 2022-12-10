const fs = require("fs")
const dayjs = require("dayjs")

async function createFile() {
  const now = dayjs().format("YYYY.MM.DD")
  await createDIR(now)
  await writeFile(now)
}

async function createDIR(now) {
  await fs.mkdirSync(now, (err) => {
    if (err) throw err
  })
}

async function writeFile(now) {
  await fs.writeFileSync(`${now}/README.md`, `## ${now}`, (err) => {
    if (err) throw err
  })

  await fs.writeFileSync(`${now}/index.js`, ``, (err) => {
    if (err) throw err
  })
}

createFile()
