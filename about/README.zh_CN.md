<div align="center">
	<h1>TermFolio</h1>
</div>
<hr/>
<p align="center">🚀 <strong>一个优雅的终端风格个人作品集展示组件</strong></p>
<p align="center">
  <a href="https://github.com/feross/standard">
    <img src="https://img.shields.io/badge/code%20style-standard-green.svg?style=flat-square">
  </a>
</p>

`TermFolio` 特性：

1. 内置系统命令：`ls`,`cd`,`pwd`，`echo` 等，让访客像使用真实终端一样浏览你的信息
2. 智能命令补全：支持`tab`自动补全命令
3. 历史记录：可使用方向键回溯历史命令
4. 高度可定制：支持自定义命令样式和展示内容
5. 灵活扩展：可以通过JS自定义任何展示命令

使用场景推荐：

- **个人主页**：创建独特的个人介绍页面
- **在线简历**：以交互式终端的方式展示你的职业经历

## 💡安装

```sh
npm i termfolio
```

OR

```sh
yarn add termfolio
```

此应用依赖于`react`, 请确保你已经安装。

## ✨使用

```jsx
import Terminal from 'termfolio'
import staticList from 'command/static'
import dynamicList from 'command/dynamic'

const cmd = {
  dynamicList,
  staticList
}

const config = {
  prompt: '➜  ~ ',
  version: '1.0.0',
  initialDirectory: 'workspace',
  bootCmd: 'intro'
}

function App() {
   return <Terminal cmd={cmd} config={config} />
}
```

### 数据结构

#### PropTypes

```js
{
    cmd: PropTypes.shape({
      dynamicList: PropTypes.object,
      staticList: PropTypes.object
    }).isRequired,

    config: PropTypes.shape({
      initialDirectory: PropTypes.string,
      prompt: PropTypes.string,
      version: PropTypes.string,
      bootCmd: PropTypes.string
    }),

    className: PropTypes.string,
}
```

#### Command

> Command是一个对象，用于定义终端中显示的消息格式：

```ts
interface ICommand {
    time?: string; // time to show time before command body
	type?: string; // label to show a label before command body
	label?: string; // type to set command's type, will set a class to command's label part, there is 7 builtin types: error, success, info, warning, system, black, time
    content?: string; // the main text showed in terminal.
    [propName: string]: any;
}
type command = ICommand | string
```

### Props

#### className

`termfolio` 根节点的类名, 可用来自定义样式，默认值:`termfolio`

#### config

1. prompt

   终端的命令提示符, 默认值:`➜  ~ `.

2. initialDirectory

   终端默认打开的目录，默认值:`src`

3. version

   终端的版本号, 可执行`version`命令查看, 默认值:`1.0.0`

4. bootCmd

   终端初始化时, 所要执行的命令，默认值：`intro`

#### cmd

1. dynamicList

   > 可进行交互的命令列表

   ```js
   {
     命令名称: {
     	description: 命令描述,
       run(print, input) {
         // print: 打印函数
         // input: 当前输入的命令参数
         // eg: echo HelloWorld, input 传入的值便是HelloWorld
         return new Promise((resolve,reject) => {
           // do something
         })
       }
     }
   }
   ```

   eg: 定义一个`open`命令, 来打开输入的网址

   ```js
   export default {
     open: {
       description: 'Open a specified url in a new tab.',
       run(print, input) {
         return new Promise((resolve,reject) => {
           if (!input) {
             return reject({ type: 'error', label: 'Error', content: 'a url is required!' })
           }
           if (!input.startsWith('http')) {
             return reject({ type: 'error', label: 'Error', content: 'Please add `http` prefix!' })
           }
           print({ type: 'success', label: 'Success', content: 'Opening' })
           window.open(input, '_blank')
           resolve({ type: 'success', label: 'Done', content: 'Page Opened!' })
         })
       }
     }
   }
   ```

2. staticList

   > 只展示数据的命令列表

   ```js
   {
     命令名称: {
     	description: 命令描述,
       list: [ <command> ]
     }
   }
   ```

	eg: 定义一个`skills`命令, 用来显示个人所掌握的技能

	```js
	  skill: {
	    description: 'Return a list of my skills and my rating of them.',
	    list: [
	      { type: 'success', label: 'A', content: '· JavaScript 99/100' },
	      { type: 'success', label: 'A', content: '· Go 90/100' },
	      { type: 'success', label: 'A', content: '· Java 80/100' },
	      { type: 'success', label: 'A', content: '· Kotlin 80/100' }
	   ]}
	```

### 内置命令

#### System命令

  - `clear | cls` - clears the screen
   - `help | ls` - list all the commands
   - `exit | back` - exit the current session
   - `pwd` - print name of current directory
   - `cd` - change the current directory
   - `version` - print the version of current app

#### 提示命令

- 跳转页面时 - `Jumping page...`

- 命令未找到时

  ````js
  command => `Command '${command}' not found`
  ````

- help 命令的提示语 - `Here is a list of supporting command.`

- 出错时 - `'Something went wrong!'`


## 🛠️ 如何添加自定义命令

要在 About 页面中添加新的自定义命令，你需要编辑 `demo/src/commands/` 目录下的文件。

### 1. 静态命令 (Static Commands)
静态命令用于显示固定的信息列表，定义在 `demo/src/commands/static.js` 中。

**示例：添加一个 `hobbies` 命令**
```javascript
export default {
  // ... 其他命令
  hobbies: {
    description: 'List my hobbies.',
    list: [
      { type: 'success', label: 'Sports', content: 'Basketball, Swimming' },
      { type: 'info', label: 'Music', content: 'Jazz, Pop' }
    ]
  }
}
```

### 2. 动态命令 (Dynamic Commands)
动态命令可以执行逻辑交互，定义在 `demo/src/commands/dynamic.js` 中。

**示例：添加一个 `greet` 命令**
```javascript
export default {
  // ... 其他命令
  greet: {
    description: 'Greet the user.',
    run(print, input) {
      return new Promise((resolve) => {
        print({ 
          type: 'success', 
          label: 'Greeting', 
          content: `Hello, ${input || 'World'}!` 
        })
        resolve({ type: 'success', label: 'Done', content: '' })
      })
    }
  }
}
```

修改完成后，无需重启，页面通常会自动热更新。如果遇到问题，尝试刷新页面或重新运行 `pnpm run dev`。

## 🎯开发

项目使用的脚手架是[nwb](https://github.com/insin/nwb)。
