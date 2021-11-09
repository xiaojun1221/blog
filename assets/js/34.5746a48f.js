(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{543:function(t,e,s){"use strict";s.r(e);var n=s(3),a=Object(n.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("p",[t._v("本教程主要讲解了怎么使用 Jenkins 和 Github Actions 部署前端项目。")]),t._v(" "),s("ol",[s("li",[t._v("第一部分是使用 Gitea 配置局域网 git 服务器，再使用 Jenkins 将 Gitea 下的项目部署到局域网服务器。")]),t._v(" "),s("li",[t._v("第二部分是使用 Github Actions 将 Github 项目部署到 Github Page 和阿里云。")])]),t._v(" "),s("p",[t._v("阅读本教程并不需要你提前了解 Jenkins 和 Github Actions 的知识，只要按照本教程的指引，就能够实现自动化部署项目。")]),t._v(" "),s("p",[t._v("PS：本人所用电脑操作系统为 windows，即以下所有的操作均在 windows 下运行。其他操作系统的配置大同小异，不会有太大差别。")]),t._v(" "),s("h2",{attrs:{id:"gitea-jenkins-自动构建前端项目并部署到服务器"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#gitea-jenkins-自动构建前端项目并部署到服务器"}},[t._v("#")]),t._v(" Gitea + Jenkins 自动构建前端项目并部署到服务器")]),t._v(" "),s("p",[t._v("Gitea 用于构建 Git 局域网服务器，Jenkins 是 CI/CD 工具，用于部署前端项目。")]),t._v(" "),s("h3",{attrs:{id:"配置-gitea"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#配置-gitea"}},[t._v("#")]),t._v(" 配置 Gitea")]),t._v(" "),s("ol",[s("li",[t._v("下载 "),s("a",{attrs:{href:"https://dl.gitea.io/gitea",target:"_blank",rel:"noopener noreferrer"}},[t._v("Gitea"),s("OutboundLink")],1),t._v("，选择一个喜欢的版本，例如 1.13，选择 "),s("code",[t._v("gitea-1.13-windows-4.0-amd64.exe")]),t._v(" 下载。")]),t._v(" "),s("li",[t._v("下载完后，新建一个目录（例如 gitea），将下载的 Gitea 软件放到该目录下，双击运行。")]),t._v(" "),s("li",[t._v("打开 "),s("code",[t._v("localhost:3000")]),t._v(" 就能看到 Gitea 已经运行在你的电脑上了。")]),t._v(" "),s("li",[t._v("点击注册，第一次会弹出一个初始配置页面，数据库选择 "),s("code",[t._v("SQLite3")]),t._v("。另外把 "),s("code",[t._v("localhost")]),t._v(" 改成你电脑的局域网地址，例如我的电脑 IP 为 "),s("code",[t._v("192.168.0.118")]),t._v("。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/520095e5af088f207b982ce7316b96ed.png",alt:"在这里插入图片描述"}}),s("br"),t._v(" "),s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/4e11ce17e832edbbace18910daf72e40.png",alt:"在这里插入图片描述"}})]),t._v(" "),s("ol",[s("li",[t._v("填完信息后，点击立即安装，等待一会，即可完成配置。")]),t._v(" "),s("li",[t._v("继续点击注册用户，第一个注册的用户将会成会管理员。")]),t._v(" "),s("li",[t._v("打开 Gitea 的安装目录，找到 "),s("code",[t._v("custom\\conf\\app.ini")]),t._v("，在里面加上一行代码 "),s("code",[t._v("START_SSH_SERVER = true")]),t._v("。这时就可以使用 ssh 进行 push 操作了。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/cb7ba7baeff9fe8d052aa9df6eb35d7d.png",alt:"在这里插入图片描述"}})]),t._v(" "),s("ol",[s("li",[s("p",[t._v("如果使用 http 的方式无法克隆项目，请取消 git 代理。")]),t._v(" "),s("p",[t._v("git config --global --unset http.proxygit config --global --unset https.proxy")])])]),t._v(" "),s("h3",{attrs:{id:"配置-jenkins"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#配置-jenkins"}},[t._v("#")]),t._v(" 配置 Jenkins")]),t._v(" "),s("ol",[s("li",[t._v("需要提前安装 JDK，JDK 安装教程网上很多，请自行搜索。")]),t._v(" "),s("li",[t._v("打开 "),s("a",{attrs:{href:"https://www.jenkins.io/zh/download/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Jenkins"),s("OutboundLink")],1),t._v(" 下载页面。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/a3bd6fcd42818cefbe368314c86e944b.png",alt:"在这里插入图片描述"}})]),t._v(" "),s("ol",[s("li",[t._v("安装过程中遇到 "),s("code",[t._v("Logon Type")]),t._v(" 时，选择第一个。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/eb7206b9eba79f93b0fc7952022139dc.png",alt:"在这里插入图片描述"}})]),t._v(" "),s("ol",[s("li",[t._v("端口默认为 8080，这里我填的是 8000。安装完会自动打开 "),s("code",[t._v("http://localhost:8000")]),t._v(" 网站，这时需要等待一会，进行初始化。")]),t._v(" "),s("li",[t._v("按照提示找到对应的文件（直接复制路径在我的电脑中打开），其中有管理员密码。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/3cf4959f18c7240de3584f248ca0fecb.png",alt:"在这里插入图片描述"}})]),t._v(" "),s("ol",[s("li",[t._v("安装插件，选择第一个。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/c9d3e29b593fe18b6195ab1ed5383a4b.png",alt:"在这里插入图片描述"}})]),t._v(" "),s("ol",[s("li",[t._v("创建管理员用户，点击完成并保存，然后一路下一步。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/a968859cabdc199c9ab9e0761e613dee.png",alt:"在这里插入图片描述"}})]),t._v(" "),s("ol",[s("li",[t._v("配置完成后自动进入首页，这时点击 "),s("code",[t._v("Manage Jenkins")]),t._v(" -> "),s("code",[t._v("Manage plugins")]),t._v(" 安装插件。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/1b098597a4e0d0d952dd023ee6a45d4f.png",alt:"在这里插入图片描述"}})]),t._v(" "),s("ol",[s("li",[t._v("点击 "),s("code",[t._v("可选插件")]),t._v("，输入 nodejs，搜索插件，然后安装。")]),t._v(" "),s("li",[t._v("安装完成后回到首页，点击 "),s("code",[t._v("Manage Jenkins")]),t._v(" -> "),s("code",[t._v("Global Tool Configuration")]),t._v(" 配置 nodejs。如果你的电脑是 win7 的话，nodejs 版本最好不要太高，选择 v12 左右的就行。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/68a1b34717d2a272ff239c7b060ce327.png",alt:"在这里插入图片描述"}})]),t._v(" "),s("h3",{attrs:{id:"创建静态服务器"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#创建静态服务器"}},[t._v("#")]),t._v(" 创建静态服务器")]),t._v(" "),s("ol",[s("li",[t._v("建立一个空目录，在里面执行 "),s("code",[t._v("npm init -y")]),t._v("，初始化项目。")]),t._v(" "),s("li",[t._v("执行 "),s("code",[t._v("npm i express")]),t._v(" 下载 express。")]),t._v(" "),s("li",[t._v("然后建立一个 "),s("code",[t._v("server.js")]),t._v(" 文件，代码如下：")])]),t._v(" "),s("div",{staticClass:"language-javascript line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[t._v("    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" express "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'express'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" app "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("express")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" port "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("8080")]),t._v(" app"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("use")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("express"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("static")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'dist'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" app"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("listen")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("port"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("    console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token template-string"}},[s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("Example app listening at http://localhost:")]),s("span",{pre:!0,attrs:{class:"token interpolation"}},[s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("port"),s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br")])]),s("p",[t._v("它将当前目录下的 "),s("code",[t._v("dist")]),t._v(" 文件夹设为静态服务器资源目录，然后执行 "),s("code",[t._v("node server.js")]),t._v(" 启动服务器。")]),t._v(" "),s("p",[t._v("由于现在没有 "),s("code",[t._v("dist")]),t._v(" 文件夹，所以访问网站是空页面。"),s("br"),t._v(" "),s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/913fd3538a8e910b55eb2084a9d7a5cf.png",alt:"在这里插入图片描述"}}),s("br"),t._v("\n不过不要着急，一会就能看到内容了。")]),t._v(" "),s("h3",{attrs:{id:"自动构建-部署到服务器"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#自动构建-部署到服务器"}},[t._v("#")]),t._v(" 自动构建 + 部署到服务器")]),t._v(" "),s("ol",[s("li",[t._v("下载 Jenkins 提供的 demo 项目 "),s("a",{attrs:{href:"https://github.com/jenkins-docs/building-a-multibranch-pipeline-project",target:"_blank",rel:"noopener noreferrer"}},[t._v("building-a-multibranch-pipeline-project"),s("OutboundLink")],1),t._v("，然后在你的 Gitea 新建一个仓库，把内容克隆进去，并提交到 Gitea 服务器。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/9c14de8d274f8f2d40c39a66e395be39.png",alt:"在这里插入图片描述"}})]),t._v(" "),s("ol",[s("li",[t._v("打开 Jenkins 首页，点击 "),s("code",[t._v("新建 Item")]),t._v(" 创建项目。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/40233ccc8ee106a9faaa13f0b2b0360a.png",alt:"在这里插入图片描述"}})]),t._v(" "),s("ol",[s("li",[t._v("选择"),s("code",[t._v("源码管理")]),t._v("，输入你的 Gitea 上的仓库地址。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/0114bcdfc9b1a3d0a11fcef351502027.png",alt:"在这里插入图片描述"}})]),t._v(" "),s("ol",[s("li",[t._v("你也可以尝试一下定时构建，下面这个代码表示每 5 分钟构建一次。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/faa0955fb771afa52715b07af3f73332.png",alt:"在这里插入图片描述"}})]),t._v(" "),s("ol",[s("li",[t._v("选择你的构建环境，这里选择刚才配置的 nodejs。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/4b605c8bd3aeb3f7eedbdfeedc82a489.png",alt:"在这里插入图片描述"}})]),t._v(" "),s("ol",[s("li",[t._v("点击增加构建步骤，windows 要选 "),s("code",[t._v("execute windows batch command")]),t._v("，linux 要选 "),s("code",[t._v("execute shell")]),t._v("。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/39f7d2586817a724b3c8394f33f4648c.png",alt:""}})]),t._v(" "),s("ol",[s("li",[t._v("输入 "),s("code",[t._v("npm i && npm run build && xcopy .\\build\\* G:\\node-server\\dist\\ /s/e/y")]),t._v("，这行命令的作用是安装依赖，构建项目，并将构建后的静态资源复制到指定目录 "),s("code",[t._v("G:\\node-server\\dist\\")]),t._v("。这个目录是静态服务器资源目录。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/d16853ac6129634ac8ae2321ed48f95f.png",alt:"在这里插入图片描述"}})]),t._v(" "),s("ol",[s("li",[t._v("保存后，返回首页。点击项目旁边的小三角，选择 "),s("code",[t._v("build now")]),t._v("。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/ca3bfea094071d53e8ea82a75b13c7e3.png",alt:"在这里插入图片描述"}})]),t._v(" "),s("ol",[s("li",[t._v("开始构建项目，我们可以点击项目查看构建过程。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/7541b90620de83a51354e5f2b4523fe2.png",alt:"在这里插入图片描述"}})]),t._v(" "),s("ol",[s("li",[t._v("构建成功，打开 "),s("code",[t._v("http://localhost:8080/")]),t._v(" 看一下结果。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/f964a0b3ccb9854a703eb08b3d364229.png",alt:"在这里插入图片描述"}}),s("br"),t._v(" "),s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/b2b02a62e067f776c333bce1d4f507cc.png",alt:"在这里插入图片描述"}})]),t._v(" "),s("ol",[s("li",[t._v("由于刚才设置了每 5 分钟构建一次，我们可以改变一下网站的内容，然后什么都不做，等待一会再打开网站看看。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/cf4f10c6bdc644adfc4bafa67b8cffa1.png",alt:"在这里插入图片描述"}})]),t._v(" "),s("ol",[s("li",[t._v("把修改的内容提交到 Gitea 服务器，稍等一会。打开网站，发现内容已经发生了变化。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/a0a2a7d46a704bb7662c81b9ac18d478.png",alt:"在这里插入图片描述"}})]),t._v(" "),s("h3",{attrs:{id:"使用-pipeline-构建项目"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#使用-pipeline-构建项目"}},[t._v("#")]),t._v(" 使用 pipeline 构建项目")]),t._v(" "),s("p",[t._v("使用流水线构建项目可以结合 Gitea 的 "),s("code",[t._v("webhook")]),t._v(" 钩子，以便在执行 "),s("code",[t._v("git push")]),t._v(" 的时候，自动构建项目。")]),t._v(" "),s("ol",[s("li",[t._v("点击首页右上角的用户名，选择"),s("code",[t._v("设置")]),t._v("。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/2c4158c6c0b27174a8a9ef75899b94a6.png",alt:"在这里插入图片描述"}})]),t._v(" "),s("ol",[s("li",[t._v("添加 token，记得将 token 保存起来。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/7baa64b97cbf8d0cdfc2ca6de5ea63e4.png",alt:"在这里插入图片描述"}})]),t._v(" "),s("ol",[s("li",[t._v("打开 Jenkins 首页，点击 "),s("code",[t._v("新建 Item")]),t._v(" 创建项目。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/4616e947b99ad187870bf26d5098ff37.png",alt:"在这里插入图片描述"}})]),t._v(" "),s("ol",[s("li",[t._v("点击"),s("code",[t._v("构建触发器")]),t._v("，选择"),s("code",[t._v("触发远程构建")]),t._v("，填入刚才创建的 token。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/83e327994438d72d38385e81ac9bedc0.png",alt:"在这里插入图片描述"}})]),t._v(" "),s("ol",[s("li",[t._v("选择流水线，按照提示输入内容，然后点击"),s("code",[t._v("保存")]),t._v("。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/0da9f3aefc97d794a48f37876c0b35ba.png",alt:"在这里插入图片描述"}})]),t._v(" "),s("ol",[s("li",[t._v("打开 Jenkins 安装目录下的 "),s("code",[t._v("jenkins.xml")]),t._v(" 文件，找到 "),s("code",[t._v("<arguments>")]),t._v(" 标签，在里面加上 "),s("code",[t._v("-Dhudson.security.csrf.GlobalCrumbIssuerConfiguration.DISABLE_CSRF_PROTECTION=true")]),t._v("。它的作用是关闭 "),s("code",[t._v("CSRF")]),t._v(" 验证，不关的话，Gitea 的 "),s("code",[t._v("webhook")]),t._v(" 会一直报 403 错误，无法使用。加好参数后，在该目录命令行下输入 "),s("code",[t._v("jenkins.exe restart")]),t._v(" 重启 Jenkins。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/a30be7fe24f3290238851942108fe5be.png",alt:"在这里插入图片描述"}})]),t._v(" "),s("ol",[s("li",[t._v("回到首页，配置全局安全选项。勾上"),s("code",[t._v("匿名用户具有可读权限")]),t._v("，再保存。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/2f5b8a85b2becf9ff3715a1e370c85b1.png",alt:"在这里插入图片描述"}}),s("br"),t._v(" "),s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/33ee523ac7d201325390ad6262685004.png",alt:"在这里插入图片描述"}})]),t._v(" "),s("ol",[s("li",[t._v("打开你的 Gitea 仓库页面，选择"),s("code",[t._v("仓库设置")]),t._v("。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/51b6a2a255d2fa90ce47fa165703a642.png",alt:"在这里插入图片描述"}})]),t._v(" "),s("ol",[s("li",[t._v("点击"),s("code",[t._v("管理 web 钩子")]),t._v("，添加 web 钩子，钩子选项选择 "),s("code",[t._v("Gitea")]),t._v("。")]),t._v(" "),s("li",[t._v("目标 URL 按照 Jenkins 的提示输入内容。然后点击"),s("code",[t._v("添加 web 钩子")]),t._v("。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/d56316ca7233fca3217b9af825b687f7.png",alt:"在这里插入图片描述"}}),s("br"),t._v(" "),s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/0cfaa485170194ee7dc1f1785aaf9df2.png",alt:"在这里插入图片描述"}})]),t._v(" "),s("ol",[s("li",[t._v("点击创建好的 web 钩子，拉到下方，点击测试推送。不出意外，应该能看到推送成功的消息，此时回到 Jenkins 首页，发现已经在构建项目了。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/b7211420053093aac03db7f3fd022474.png",alt:"在这里插入图片描述"}})]),t._v(" "),s("ol",[s("li",[t._v("由于没有配置 "),s("code",[t._v("Jenkinsfile")]),t._v(" 文件，此时构建是不会成功的。所以接下来需要配置一下 "),s("code",[t._v("Jenkinsfile")]),t._v(" 文件。将以下代码复制到你 Gitea 项目下的 "),s("code",[t._v("Jenkinsfile")]),t._v(" 文件。jenkins 在构建时会自动读取文件的内容执行构建及部署操作。")])]),t._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("    pipeline {    agent any    stages {        stage('Build') {            steps {  // window 使用 bat， linux 使用 sh                bat 'npm i'                bat 'npm run build'            }        }        stage('Deploy') {            steps {                bat 'xcopy .\\\\build\\\\* D:\\\\node-server\\\\dist\\\\ /s/e/y' // 这里需要改成你的静态服务器资源目录            }        }    }}\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br")])]),s("ol",[s("li",[t._v("每当你的 Gitea 项目执行 "),s("code",[t._v("push")]),t._v(" 操作时，Gitea 都会通过 "),s("code",[t._v("webhook")]),t._v(" 发送一个 post 请求给 Jenkins，让它执行构建及部署操作。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/bcde6c0f240d7c787fda4792901cfb87.png",alt:"在这里插入图片描述"}})]),t._v(" "),s("h3",{attrs:{id:"小结"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#小结"}},[t._v("#")]),t._v(" 小结")]),t._v(" "),s("p",[t._v("如果你的操作系统是 Linux，可以在 Jenkins 打包完成后，使用 ssh 远程登录到阿里云，将打包后的文件复制到阿里云上的静态服务器上，这样就能实现阿里云自动部署了。具体怎么远程登录到阿里云，请看下文中的 《Github Actions 部署到阿里云》 一节。")]),t._v(" "),s("h2",{attrs:{id:"github-actions-自动构建前端项目并部署到服务器"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#github-actions-自动构建前端项目并部署到服务器"}},[t._v("#")]),t._v(" Github Actions 自动构建前端项目并部署到服务器")]),t._v(" "),s("p",[t._v("如果你的项目是 Github 项目，那么使用 Github Actions 也许是更好的选择。")]),t._v(" "),s("h3",{attrs:{id:"部署到-github-page"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#部署到-github-page"}},[t._v("#")]),t._v(" 部署到 Github Page")]),t._v(" "),s("p",[t._v("接下来看一下如何使用 Github Actions 部署到 Github Page。")]),t._v(" "),s("p",[t._v("在你需要部署到 Github Page 的项目下，建立一个 yml 文件，放在 "),s("code",[t._v(".github/workflow")]),t._v(" 目录下。你可以命名为 "),s("code",[t._v("ci.yml")]),t._v("，它类似于 Jenkins 的 "),s("code",[t._v("Jenkinsfile")]),t._v(" 文件，里面包含的是要自动执行的脚本代码。")]),t._v(" "),s("p",[t._v("这个 yml 文件的内容如下：")]),t._v(" "),s("div",{staticClass:"language-javascript line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[t._v("   "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* name: Build and Deployon: # 监听 master 分支上的 push 事件  push:    branches:      - masterjobs:  build-and-deploy:    runs-on: ubuntu-latest # 构建环境使用 ubuntu    steps:      - name: Checkout        uses: actions/checkout@v2.3.1          with:          persist-credentials: false       - name: Install and Build # 下载依赖 打包项目        run: |          npm install          npm run build       - name: Deploy # 将打包内容发布到 github page        uses: JamesIves/github-pages-deploy-action@3.5.9 # 使用别人写好的 actions        with:  # 自定义环境变量          ACCESS_TOKEN: ${{ secrets.VUE_ADMIN_TEMPLATE }} # VUE_ADMIN_TEMPLATE 是我的 secret 名称，需要替换成你的          BRANCH: master          FOLDER: dist          REPOSITORY_NAME: woai3c/woai3c.github.io # 这是我的 github page 仓库          TARGET_FOLDER: github-actions-demo # 打包的文件将放到静态服务器 github-actions-demo 目录下\n   */")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br")])]),s("p",[t._v("上面有一个 "),s("code",[t._v("ACCESS_TOKEN")]),t._v(" 变量需要自己配置。")]),t._v(" "),s("ol",[s("li",[t._v("打开 Github 网站，点击你右上角的头像，选择 "),s("code",[t._v("settings")]),t._v("。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/1c45c656794064a20575d54bab73b81d.png",alt:"在这里插入图片描述"}})]),t._v(" "),s("ol",[s("li",[t._v("点击左下角的 "),s("code",[t._v("developer settings")]),t._v("。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/d6def57fd82bcb9a088c30f1904b474f.png",alt:"在这里插入图片描述"}})]),t._v(" "),s("ol",[s("li",[t._v("在左侧边栏中，单击 "),s("code",[t._v("Personal access tokens（个人访问令牌）")]),t._v("。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/92adedd4aa6839d6b3ecd1429c6d7c12.png",alt:"在这里插入图片描述"}})]),t._v(" "),s("ol",[s("li",[t._v("单击 "),s("code",[t._v("Generate new token（生成新令牌）")]),t._v("。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/4813eb0994920052466ab2a3f802c4b0.png",alt:"在这里插入图片描述"}})]),t._v(" "),s("ol",[s("li",[t._v("输入名称并勾选 "),s("code",[t._v("repo")]),t._v("。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/e0160a24caa2aa695ff0e49947445f4b.png",alt:"在这里插入图片描述"}})]),t._v(" "),s("ol",[s("li",[t._v("拉到最下面，点击 "),s("code",[t._v("Generate token")]),t._v("，并将生成的 token 保存起来。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/c226380f310c97a03577094fb619aa43.png",alt:"在这里插入图片描述"}})]),t._v(" "),s("ol",[s("li",[t._v("打开你的 Github 项目，点击 "),s("code",[t._v("settings")]),t._v("。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/adb8a7b8154d9a1d263bbdcb7c5c5a32.png",alt:"在这里插入图片描述"}}),s("br"),t._v("\n点击 "),s("code",[t._v("secrets")]),t._v("->"),s("code",[t._v("new secret")]),t._v("。"),s("br"),t._v(" "),s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/fcb20bddabc465210a8dc83696ddcbb3.png",alt:"在这里插入图片描述"}}),s("br"),t._v("\n创建一个密钥，名称随便填（中间用下划线隔开），内容填入刚才创建的 token。"),s("br"),t._v(" "),s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/812b1e95c0b3a4ac663e9e488ba6d53c.png",alt:"在这里插入图片描述"}})]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/c8367944f3e04344764f16b546696a0f.png",alt:"在这里插入图片描述"}})]),t._v(" "),s("div",{staticClass:"language-JavaScript line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//将上文代码中的 `ACCESS_TOKEN: ${{ secrets.VUE_ADMIN_TEMPLATE }}` 替换成刚才创建的 secret 名字，替换后代码如下 `ACCESS_TOKEN: ${{ secrets.TEST_A_B }}`。保存后，提交到 Github。")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br")])]),s("p",[t._v("以后你的项目只要执行 "),s("code",[t._v("git push")]),t._v("，Github Actions 就会自动构建项目并发布到你的 Github Page 上。")]),t._v(" "),s("p",[t._v("Github Actions 的执行详情点击仓库中的 "),s("code",[t._v("Actions")]),t._v(" 选项查看。")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/6ab827211eb0c4a863bf6dcaa3c8b0fb.png",alt:"在这里插入图片描述"}}),s("br"),t._v(" "),s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/0e1014f4cb51083d5080d720e0f58a5d.png",alt:"在这里插入图片描述"}}),s("br"),t._v("\n具体详情可以参考一下我的 demo 项目 "),s("strong",[s("a",{attrs:{href:"https://github.com/woai3c/github-actions-demo",target:"_blank",rel:"noopener noreferrer"}},[t._v("github-actions-demo"),s("OutboundLink")],1)]),t._v("。")]),t._v(" "),s("p",[t._v("构建成功后，打开 Github Page 网站，可以发现内容已经发布成功。")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/504c0a60105b3986022648ca2ce3e6c1.png",alt:"在这里插入图片描述"}})]),t._v(" "),s("h3",{attrs:{id:"github-actions-部署到阿里云"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#github-actions-部署到阿里云"}},[t._v("#")]),t._v(" Github Actions 部署到阿里云")]),t._v(" "),s("p",[t._v("初始化阿里云服务器")]),t._v(" "),s("ol",[s("li",[t._v("购买阿里云服务器，选择操作系统，我选的 ubuntu")]),t._v(" "),s("li",[t._v("在云服务器管理控制台选择实例->更多->密钥->重置实例密码（一会登陆用）")]),t._v(" "),s("li",[t._v("选择远程连接->VNC，会弹出一个密码，记住它，以后远程连接要用（ctrl + alt + f1~f6 切换终端，例如 ctrl + alt + f1 是第一个终端）")]),t._v(" "),s("li",[t._v("进入后是一个命令行 输入 "),s("code",[t._v("root")]),t._v("（默认用户名），密码为你刚才重置的实例密码")]),t._v(" "),s("li",[t._v("登陆成功， 更新安装源 "),s("code",[t._v("sudo apt-get update && sudo apt-get upgrade -y")])]),t._v(" "),s("li",[t._v("安装 npm "),s("code",[t._v("sudo apt-get install npm")])]),t._v(" "),s("li",[t._v("安装 npm 管理包 "),s("code",[t._v("sudo npm install -g n")])]),t._v(" "),s("li",[t._v("安装 node 最新稳定版 "),s("code",[t._v("sudo n stable")])])]),t._v(" "),s("p",[t._v("创建一个静态服务器")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[t._v("mkdir node-server // 创建 node-server 文件夹cd node-server // 进入 node-server 文件夹npm init -y // 初始化项目npm i expresstouch server.js // 创建 server.js 文件vim server.js // 编辑 server.js 文件\n")])])]),s("p",[t._v("将以下代码输入进去（用 vim 进入文件后按 i 进行编辑，保存时按 esc 然后输入 :wq，再按 enter），更多使用方法请自行搜索。")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[t._v("const express = require('express')const app = express()const port = 3388 // 填入自己的阿里云映射端口，在网络安全组配置。 app.use(express.static('dist')) app.listen(port, '0.0.0.0', () => {    console.log(`listening`)})\n")])])]),s("p",[t._v("执行 "),s("code",[t._v("node server.js")]),t._v(" 开始监听，由于暂时没有 "),s("code",[t._v("dist")]),t._v(" 目录，先不要着急。")]),t._v(" "),s("p",[t._v("注意，监听 IP 必须为 "),s("code",[t._v("0.0.0.0")]),t._v(" ，详情请看"),s("a",{attrs:{href:"https://www.alibabacloud.com/help/zh/doc-detail/50775.htm",target:"_blank",rel:"noopener noreferrer"}},[t._v("部署Node.js项目注意事项"),s("OutboundLink")],1),t._v("。")]),t._v(" "),s("p",[t._v("阿里云入端口要在网络安全组中查看与配置。")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/0ea71854d8f7a0e9ff149ab5b3b49957.png",alt:"在这里插入图片描述"}})]),t._v(" "),s("p",[t._v("创建阿里云密钥对")]),t._v(" "),s("p",[t._v("请参考"),s("a",{attrs:{href:"https://www.alibabacloud.com/help/zh/doc-detail/51793.htm",target:"_blank",rel:"noopener noreferrer"}},[t._v("创建SSH密钥对"),s("OutboundLink")],1),t._v("和"),s("a",{attrs:{href:"https://www.alibabacloud.com/help/zh/doc-detail/51796.htm?spm=a2c63.p38356.879954.9.cf992580IYf2O7#concept-zzt-nl1-ydb",target:"_blank",rel:"noopener noreferrer"}},[t._v("绑定SSH密钥对"),s("OutboundLink")],1),t._v(" ，将你的 ECS 服务器实例和密钥绑定，然后将私钥保存到你的电脑（例如保存在 ecs.pem 文件）。")]),t._v(" "),s("p",[t._v("打开你要部署到阿里云的 Github 项目，点击 setting->secrets。")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/7aa3e2602f6e4f60658fd811b1ed0608.png",alt:"在这里插入图片描述"}}),s("br"),t._v("\n点击 new secret"),s("br"),t._v(" "),s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/c0ec96e911488537d1d6309daf711f3f.png",alt:"在这里插入图片描述"}}),s("br"),t._v("\nsecret 名称为 "),s("code",[t._v("SERVER_SSH_KEY")]),t._v("，并将刚才的阿里云密钥填入内容。")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/65e65aad844183a4a7365afb89821390.png",alt:"在这里插入图片描述"}}),s("br"),t._v("\n点击 add secret 完成。")]),t._v(" "),s("p",[t._v("在你项目下建立 "),s("code",[t._v(".github\\workflows\\ci.yml")]),t._v(" 文件，填入以下内容：")]),t._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("    name: Build app and deploy to aliyunon:  #监听push操作  push:    branches:      # master分支，你也可以改成其他分支      - masterjobs:  build:     runs-on: ubuntu-latest     steps:    - uses: actions/checkout@v1    - name: Install Node.js      uses: actions/setup-node@v1      with:        node-version: '12.16.2'    - name: Install npm dependencies      run: npm install    - name: Run build task      run: npm run build    - name: Deploy to Server      uses: easingthemes/ssh-deploy@v2.1.5      env:          SSH_PRIVATE_KEY: ${{ secrets.SERVER_SSH_KEY }}          ARGS: '-rltgoDzvO --delete'          SOURCE: dist # 这是要复制到阿里云静态服务器的文件夹名称          REMOTE_HOST: '118.190.217.8' # 你的阿里云公网地址          REMOTE_USER: root # 阿里云登录后默认为 root 用户，并且所在文件夹为 root          TARGET: /root/node-server # 打包后的 dist 文件夹将放在 /root/node-server\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br")])]),s("p",[t._v("保存，推送到 Github 上。")]),t._v(" "),s("p",[t._v("以后只要你的项目执行 "),s("code",[t._v("git push")]),t._v(" 操作，就会自动执行 "),s("code",[t._v("ci.yml")]),t._v(" 定义的脚本，将打包文件放到你的阿里云静态服务器上。")]),t._v(" "),s("p",[t._v("这个 Actions 主要做了两件事：")]),t._v(" "),s("ol",[s("li",[t._v("克隆你的项目，下载依赖，打包。")]),t._v(" "),s("li",[t._v("用你的阿里云私钥以 SSH 的方式登录到阿里云，把打包的文件上传（使用 rsync）到阿里云指定的文件夹中。")])]),t._v(" "),s("p",[t._v("如果还是不懂，建议看一下我的 "),s("a",{attrs:{href:"https://github.com/woai3c/github-actions-aliyun-demo",target:"_blank",rel:"noopener noreferrer"}},[t._v("demo"),s("OutboundLink")],1),t._v("。")]),t._v(" "),s("h3",{attrs:{id:"ci-yml-配置文件讲解"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#ci-yml-配置文件讲解"}},[t._v("#")]),t._v(" "),s("code",[t._v("ci.yml")]),t._v(" 配置文件讲解")]),t._v(" "),s("ol",[s("li",[s("code",[t._v("name")]),t._v("，表示这个工作流程（workflow）的名称。")]),t._v(" "),s("li",[s("code",[t._v("on")]),t._v("，表示监听的意思，后面可以加上各种事件，例如 "),s("code",[t._v("push")]),t._v(" 事件。")])]),t._v(" "),s("p",[t._v("下面这段代码表示要监听 "),s("code",[t._v("master")]),t._v(" 分支的 "),s("code",[t._v("push")]),t._v(" 事件。当 Github Actions 监听到 "),s("code",[t._v("push")]),t._v(" 事件发生时，它就会执行下面 "),s("code",[t._v("jobs")]),t._v(" 定义的一系列操作。")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[t._v("name: Build app and deploy to aliyunon:  #监听push操作  push:    branches:      # master分支，你也可以改成其他分支      - masterjobs:...\n")])])]),s("ol",[s("li",[s("p",[s("code",[t._v("jobs")]),t._v("，看字面意思就是一系列的作业，你可以在 "),s("code",[t._v("jobs")]),t._v(" 字段下面定义很多作业，例如 "),s("code",[t._v("job1")]),t._v("、"),s("code",[t._v("job2")]),t._v(" 等等，并且它们是并行执行的。")]),t._v(" "),s("p",[t._v("jobs:  job1:      ...  job2:      ...  job3:    ...")])])]),t._v(" "),s("p",[t._v("回头看一下 "),s("code",[t._v("ci.yml")]),t._v(" 文件，它只有一个作业，即 "),s("code",[t._v("build")]),t._v("，作业的名称是自己定义的，你叫 "),s("code",[t._v("good")]),t._v(" 也可以。")]),t._v(" "),s("ol",[s("li",[s("code",[t._v("runs-on")]),t._v("，表示你这个工作流程要运行在什么操作系统上，"),s("code",[t._v("ci.yml")]),t._v(" 文件定义的是最新稳定版的 "),s("code",[t._v("ubuntu")]),t._v("。除了 ubuntu，它还可以选择 Mac 或 Windows。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/6c46c2172a9e75edba0dcf38e941fe74.png",alt:""}})]),t._v(" "),s("ol",[s("li",[s("code",[t._v("steps")]),t._v("，看字面意思就是一系列的步骤，也就是说这个作业由一系列的步骤完成。例如先执行 "),s("code",[t._v("step1")]),t._v("，再执行 "),s("code",[t._v("step2")]),t._v("...")])]),t._v(" "),s("p",[s("code",[t._v("setps")]),t._v(" 步骤讲解")]),t._v(" "),s("p",[s("code",[t._v("setps")]),t._v(" 其实是一个数组，在 YAML 语法中，以 "),s("code",[t._v("-")]),t._v(" 开始就是一个数组项。例如 "),s("code",[t._v("['a', 'b', 'c']")]),t._v(" 用 YAML 语法表示为：")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[t._v("- a- b- c\n")])])]),s("p",[t._v("所以 "),s("code",[t._v("setps")]),t._v(" 就是一个步骤数组，从上到下开始执行。从 "),s("code",[t._v("ci.yml")]),t._v(" 文件来看，每一个小步骤都有几个相关选项：")]),t._v(" "),s("ol",[s("li",[s("code",[t._v("name")]),t._v("，小步骤的名称。")]),t._v(" "),s("li",[s("code",[t._v("uses")]),t._v("，小步骤使用的 actions 库名称或路径，Github Actions 允许你使用别人写好的 Actions 库。")]),t._v(" "),s("li",[s("code",[t._v("run")]),t._v("，小步骤要执行的 "),s("code",[t._v("shell")]),t._v(" 命令。")]),t._v(" "),s("li",[s("code",[t._v("env")]),t._v("，设置与小步骤相关的环境变量。")]),t._v(" "),s("li",[s("code",[t._v("with")]),t._v("，提供参数。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/9990b9848162b402f9f087669dffebc3.png",alt:""}})]),t._v(" "),s("p",[t._v("综上所述，"),s("code",[t._v("ci.yml")]),t._v(" 文件中的 "),s("code",[t._v("setps")]),t._v(" 就很好理解了，下面从头到尾解释一边：")]),t._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("        steps:    - uses: actions/checkout@v1    - name: Install Node.js      uses: actions/setup-node@v1      with:        node-version: '12.16.2'    - name: Install npm dependencies      run: npm install    - name: Run build task      run: npm run build    - name: Deploy to Server      uses: easingthemes/ssh-deploy@v2.1.5      env:          SSH_PRIVATE_KEY: ${{ secrets.SERVER_SSH_KEY }}          ARGS: '-rltgoDzvO --delete'          SOURCE: dist # 这是要复制到阿里云静态服务器的文件夹名称          REMOTE_HOST: '118.190.217.8' # 你的阿里云公网地址          REMOTE_USER: root # 阿里云登录后默认为 root 用户，并且所在文件夹为 root          TARGET: /root/node-server # 打包后的 dist 文件夹将放在 /root/node-server\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br")])]),s("ol",[s("li",[t._v("使用 "),s("code",[t._v("actions/checkout@v1")]),t._v(" 库克隆代码到 "),s("code",[t._v("ubuntu")]),t._v(" 上。")]),t._v(" "),s("li",[t._v("使用 "),s("code",[t._v("actions/setup-node@v1")]),t._v(" 库安装 nodejs，"),s("code",[t._v("with")]),t._v(" 提供了一个参数 "),s("code",[t._v("node-version")]),t._v(" 表示要安装的 nodejs 版本。")]),t._v(" "),s("li",[t._v("在 "),s("code",[t._v("ubuntu")]),t._v(" 的 "),s("code",[t._v("shell")]),t._v(" 上执行 "),s("code",[t._v("npm install")]),t._v(" 下载依赖。")]),t._v(" "),s("li",[t._v("执行 "),s("code",[t._v("npm run build")]),t._v(" 打包项目。")]),t._v(" "),s("li",[t._v("使用 "),s("code",[t._v("easingthemes/ssh-deploy@v2.1.5")]),t._v(" 库，这个库的作用就是用 "),s("code",[t._v("SSH")]),t._v(" 的方式远程登录到阿里云服务器，将打包好的文件夹复制到阿里云指定的目录上。")])]),t._v(" "),s("p",[t._v("从 "),s("code",[t._v("env")]),t._v(" 上可以看到，这个 actions 库要求我们提供几个环境变量：")]),t._v(" "),s("ol",[s("li",[s("code",[t._v("SSH_PRIVATE_KEY")]),t._v(": 阿里云密钥对中的私钥（需要你提前写在 github secrets 上），")]),t._v(" "),s("li",[s("code",[t._v("ARGS: '-rltgoDzvO --delete'")]),t._v("，没仔细研究，我猜是复制完文件就删除掉。")]),t._v(" "),s("li",[s("code",[t._v("SOURCE")]),t._v("：打包后的文件夹名称")]),t._v(" "),s("li",[s("code",[t._v("REMOTE_HOST")]),t._v(": 阿里云公网 IP 地址")]),t._v(" "),s("li",[s("code",[t._v("REMOTE_USER")]),t._v(": 阿里云服务器的用户名")]),t._v(" "),s("li",[s("code",[t._v("TARGET")]),t._v(": 你要拷贝到阿里云服务器指定目录的名称")])]),t._v(" "),s("p",[t._v("如果你想了解一下其他 actions 库的实现，可以直接复制 actions 库的名称去搜索引擎搜索一下，例如搜索 "),s("code",[t._v("actions/checkout")]),t._v(" 的结果为：")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/img_convert/5412f79fb666b0dd1759d17e53f013d7.png",alt:""}})]),t._v(" "),s("p",[t._v("都看到这了，给个赞再走吧。")])])}),[],!1,null,null,null);e.default=a.exports}}]);