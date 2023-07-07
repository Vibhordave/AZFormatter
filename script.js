window.addEventListener("load", startLoading, false);

function startLoading() {
  const btn = getFormatButton();
  const nav_bar2 = document.querySelectorAll(".nav-item");
  nav_bar2[15].parentElement.appendChild(btn);
}

const getFormatButton = function () {
  var button = document.createElement("button");
  button.innerHTML = "Format";
  button.className = "tool-button";
  button.id = "format-button";
  button.setAttribute("icon", "information");
  button.setAttribute("data-no-border", "true");
  button.setAttribute("type", "ghost");
  button.style.marginRight = "10px";
  button.style.border = "none";
  button.style.backgroundColor = "#ffffff";
  button.style.borderImage = "none";
  button.style.outline = "none";
  button.style.cursor = "pointer";
  button.title = "Format";
  button.style.padding = "4px 20px";
  button.style.color = "black";
  button.style.fontWeight = "600";
  button.style.borderRadius = "3px";

  // Add animation class to the button
  button.classList.add("animate-button");
  
  // Append the button to the document body or any other element
  document.body.appendChild(button);

  // Define CSS styles for the animation
  var style = document.createElement("style");
  style.innerHTML = `
  @keyframes pulse-animation {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }

  .animate-button {
    animation: pulse-animation 1s infinite;
  }
  `;

  // Append the style to the document head
  document.head.appendChild(style);


  button.addEventListener("click", ()=>{
    process(button);
  });
  return button;
};

function process(button) {
  button.classList.remove("animate-button");

  let code = getCode();
  // console.log(code);
  let formattedCode = js_beautify(code, {
    indent_size: 4,
    brace_style: "expand",
  });
  // Define the code to be inserted as a string
  const codeToInsert = applyCustomRules(formattedCode);
  insertCode(codeToInsert);
}

function insertCode(code) {
  if (code) {
    let codeMirrorSelector = document.querySelector(".CodeMirror");
    let codeMirror = codeMirrorSelector.CodeMirror;
    codeMirror.setValue(code);
  }
}

function getCode() {
  let codeMirrorSelector = document.querySelector(".CodeMirror");
  let codeMirror = codeMirrorSelector.CodeMirror;
  const code = codeMirror.getValue();

  return code;
}
const applyCustomRules = function (formatted) {
  return formatted
    .replace(/\}\r\n/g, "}\n\n")
    .replace(/\<\s([a-zA-Z0-9_,: *&<>]+)\s>/g, "<$1>")
    .replace(/\<\s([a-zA-Z0-9_,: *&<>]+)>/g, "<$1>")
    .replace(/\<([a-zA-Z0-9_:*]+)\s>/g, "<$1>")
    .replace(/iterator\s</g, "iterator<")

    .replace(/ = {\s*([0-9 ,-.]+)\s+};/g, " = { $1 };")
    .replace(/\n\s*\n/g, "\n\n")
    .replace(/,\n\n/g, ",\n")
    .replace(/\r\n\t{}/g, " {}")
    .replace(/\{\r\n\n/g, "{\r\n")
    .replace(/\r\n\tconst & /g, " const &")
    .replace(/,\s+const /g, ", const ")
    .replace(/#\r\ndefine/g, "#define")
    .replace(/#\ndefine/g, "#define")
    .replace(/# define/g, "\r\n#define")
    .replace(/;#define/g, ";\r\n#define")
    .replace(/#define/g, "\n#define")
    .replace(/\n\s*\n#define/g, "\n#define")
    .replace(/;\r\n#define/g, ";\r\n\r\n#define")
    .replace(/;\n#define/g, ";\n\n#define")
    .replace(/\r\n#include/g, "#include")
    .replace(/\n#include/g, "#include")
    .replace(
      /([a-zA-Z0-9\t ./<>?;:"'`!@#$%^&*()\[\]{}_+=|\\-]+)#include/g,
      "$1\r\n#include"
    )
    .replace(/vector </g, "vector<")
    .replace(/set </g, "set<")
    .replace(/map </g, "map<")
    .replace(/queue </g, "queue<")
    .replace(/stack </g, "stack<")
    .replace(/stack </g, "stack<")
    .replace(/deque </g, "deque<")
    .replace(/list </g, "list<")
    .replace(/array </g, "array<")
    .replace(/ - > /g, "->")
    .replace(/\(\s+{\s+/g, "({ ")
    .replace(/\s+\}\)/g, " })")
    .replace(/\tpublic_colon/g, "public:")
    .replace(/\tprivate_colon/g, "private:")
    .replace(/\tprotected_colon/g, "protected:")

    .replace(/^#define(.*)$/, "#define")

    .replace(/xxxx/g, "const")
    .replace(/\*(\s+)const/g, "*const")

    .replace(/operator (\W+) /g, "operator$1")
    .replace(/operator<= >/g, "operator<=>")
    .replace(/=(\s+)default/g, "= default")
    .replace(/; \}/g, ";\n}")
    .replace(/{\n\t\t\t/g, "{ ")
    .replace(/= { {/g, "= {\n\t\t{")
    .replace(/} };/g, "}\n\t};")

    .replace(/(\W+)\* /g, "$1*")
    .replace(/;\*/g, "; *")
    .replace(/(\w+) \*(\w+);/g, "$1 * $2;")
    .replace(/(\w+) \*(\w+)\)/g, "$1 * $2)")
    .replace(/(\w+) \*(\w+)\(/g, "$1 * $2(")
    .replace(/(\w+)(\s*)\*(\w+)(\s*)\</g, "$1 * $3 <")
    .replace(/(\w+)(\s*)\*(\w+)(\s*)\>/g, "$1 * $3 >")
    .replace(/(\w+)(\s*)\*(\w+)(\s*)\=/g, "$1 * $3 =")
    .replace(/(\d+)(\s*)\*(\d+)/g, "$1 * $3")

    .replace(/(\W) \* (\w)/g, "$1 *$2")
    .replace(/->\* /g, "->*")
    .replace(/ \[ &/g, " [&")
    .replace(/\r\n\r\nusing/g, "\r\nusing")
    .replace(/\n\nusing/g, "\nusing")
    .replace(/\s,\s/g, ", ")
    .replace(/> ::/g, ">::")

    .replace(/(\s+)&\s+/g, "$1&")
    .replace(/\s\[/g, "[")
    .replace(/\(\s/g, "(")
    .replace(/\s\)/g, ")")

    .replace(/int \* /g, "int *")
    .replace(/char \* /g, "char *")
    .replace(/double \* /g, "double *")
    .replace(/float \* /g, "float *")
    .replace(/bool \* /g, "bool *")
    .replace(/void \* /g, "void *")
    .replace(/wchar_t \* /g, "wchar_t *")

    .replace(/(\w+) \*\* /g, "$1 **")

    .replace(/\((\w+) \*\)/g, "($1*)")
    .replace(/(\w+) \*\>/g, "$1*>")

    .replace(/(\s)\<= /g, "$1 <= ")

    .replace(/\((\w+) &(\w+)\)/g, "($1 & $2)")
    .replace(/\[(\w+) &(\w+)\]/g, "[$1 & $2]")

    .replace(/\s<\s/g, "<")
    .replace(/\s<([^<])/g, "<$1")
    .replace(
      /([A-Za-z0-9_,\.\(\)\[\]\-\>]+)<([A-Za-z0-9_,\.\(\)\[\]\-\>]+)([\s\;\)])/g,
      "$1 < $2$3"
    )

    .replace(/<(\s+)const/g, "<const")

    .replace(/#include</g, "#include <")
    .replace(/#include < /g, "#include <")
    .replace(/(\w)\> /g, "$1 > ")
    .replace(/(\w)\>= /g, "$1 >= ")
    .replace(/\s+{}/g, " {}")
    .replace(/\s+{\s+}/g, " {}")

    .replace(/\s\<\s(\w+)\s\*,/g, "<$1*,")
    .replace(/\[ \*/g, "[*")

    .replace(/\<(\w+)\s\>/g, "<$1>")
    .replace(/, (\w+)\s\>/g, ", $1>")

    .replace(/\/\/TEMPLATE/g, "template <")
    .replace(/\[ = \]/g, "[=]")
    .replace(/\}\n\n}/g, "}\n}")
    .replace(/\}\n\n(\s*)\}/g, "}\n$1}")
    .replace(/\}\n\n(\s+)\}/g, "}\n$1}")

    .replace(/\}\n\n(\s+)else/g, "}\n$1else")

    .replace(/\n\}\)\;/g, "\n\t});")
    .replace(/\,\[/g, ", [")

    .replace(/\;\n\n(\s+)\}/g, ";\n$1}")

    .replace(/(\s+)\{([ \t]+)(\w+)/g, "$1{$1\t$3")
    .replace(/(\s+)\{([ \t]+)\/\//g, "$1{$1$2//")
    .replace(/=\s{(\s+)/g, "= { ")

    .replace(/\{\r\n\s+([0-9,-\s.]+)\r\n\s+\}/g, "{ $1 }")
    .replace(/\{\n\s+([0-9,-\s.]+)\n\s+\}/g, "{ $1 }")
    .replace(/\{ \{/g, "{\n\t\t{")
    .replace(/ \/\//g, "\t//")

    .replace(/(['"])(\s+)\}/g, "$1 }")
    .replace(/(\w+) \* (\w+) =/g, "$1 *$2 =")
    .replace(/(\w+) \* (\w+)\)/g, "$1 *$2)")
    .replace(/(\w+) \* (\w+)\(/g, "$1* $2(")

    .replace(/(\w+) \*\& (\w+)/g, "$1* &$2")

    .replace(/\s\<\s(\w+)\s\>/g, "<$1>")
    .replace(/\s\<\s(\w+)\,/g, "<$1,")
    .replace(/\{\}~/g, "{}\n\t~")
    .replace(/_cast </g, "_cast<")

    .replace(/\>\s+\{\s*([A-Za-z0-9 ,-.\"]+)\s+\}\;/g, "> { $1 };");
};
