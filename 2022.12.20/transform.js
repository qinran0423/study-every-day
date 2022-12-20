const { parse } = require("@babel/parser")
const traverse = require("@babel/traverse").default
const generator = require("@babel/generator").default
const t = require("@babel/types")

const code = `
const x = null
const y = x?.a
`

const transCondition = (node) => {
  return t.conditionalExpression(
    t.logicalExpression(
      "||",
      t.binaryExpression("===", node.object, t.nullLiteral()),
      t.binaryExpression(
        "===",
        node.object,
        t.unaryExpression("void", t.numericLiteral(0))
      )
    ),
    t.unaryExpression("void", t.numericLiteral(0)),
    t.memberExpression(node.object, node.property, node.computed, node.optional)
  )
}

const ast = parse(code)
traverse(ast, {
  OptionalMemberExpression(path) {
    path.replaceWith(transCondition(path.node))
  }
})

console.log(generator(ast).code)
