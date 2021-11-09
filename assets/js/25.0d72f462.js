(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{539:function(t,a,r){"use strict";r.r(a);var i=r(3),s=Object(i.a)({},(function(){var t=this,a=t.$createElement,r=t._self._c||a;return r("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[r("h1",{attrs:{id:"一、git基础概念"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#一、git基础概念"}},[t._v("#")]),t._v(" 一、Git基础概念")]),t._v(" "),r("h2",{attrs:{id:"一些名词：vcs、cvs、svn、git、github、gitlab"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#一些名词：vcs、cvs、svn、git、github、gitlab"}},[t._v("#")]),t._v(" 一些名词：VCS、CVS、SVN、Git、GitHub、GitLab")]),t._v(" "),r("ul",[r("li",[t._v("VCS "),r("strong",[t._v("(Version Control System)")]),t._v("：版本控制系统的统称，CVS、SVN、GIT都可以称为"),r("strong",[t._v("VCS")]),t._v("。")]),t._v(" "),r("li",[t._v("CVS "),r("strong",[t._v("(Concurrent Versions System)")]),t._v("：一种"),r("strong",[t._v("集中式")]),t._v("版本控制系统，后来逐渐被"),r("strong",[t._v("SVN")]),t._v("替代。")]),t._v(" "),r("li",[t._v("SVN "),r("strong",[t._v("(Subversion)")]),t._v("：一种"),r("strong",[t._v("集中式")]),t._v("版本控制系统，仅源代码管理来说，基本已经被"),r("strong",[t._v("Git")]),t._v("取代，但因为其强大的细粒度权限控制要强于Git，所以仍有一席之地。")]),t._v(" "),r("li",[t._v("Git：一种"),r("strong",[t._v("分布式")]),t._v("版本控制系统，目前应用最广泛的源代码版本控制系统。")]),t._v(" "),r("li",[t._v("GitHub：一个面向开源及私有软件项目托管平台"),r("a",{attrs:{href:"(https://github.com)"}},[t._v("https://github.com")]),t._v("，用于管理Git仓库，被微软收购")]),t._v(" "),r("li",[t._v("GitLab：开源和GitHub功能类似的托管平台(可以理解是GitHub的私服版)，类似于(Maven Repository与Nexus的关系)")])]),t._v(" "),r("h2",{attrs:{id:"一张图解释集中式-svn-和分布式-git-版本管理的差异"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#一张图解释集中式-svn-和分布式-git-版本管理的差异"}},[t._v("#")]),t._v(" 一张图解释集中式(SVN)和分布式(Git)版本管理的差异")]),t._v(" "),r("p",[r("img",{attrs:{src:"/media//202102/%E9%9B%86%E4%B8%AD%E5%BC%8F%E5%92%8C%E5%88%86%E5%B8%83%E5%BC%8F%E7%89%88%E6%9C%AC%E7%AE%A1%E7%90%86_1612400667.png",alt:""}})]),t._v(" "),r("h1",{attrs:{id:"二、git合并请求-merge-request"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#二、git合并请求-merge-request"}},[t._v("#")]),t._v(" 二、Git合并请求(Merge Request)")]),t._v(" "),r("ul",[r("li",[t._v("说明：一种保护重要分支的方式")]),t._v(" "),r("li",[t._v("原理：重要分支不允许直接推送，需要发起合并请求，由分支负责人审核通过以后合并上去")])]),t._v(" "),r("p",[r("img",{attrs:{src:"/media//202102/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20210204094323_1612402835.png",alt:""}})]),t._v(" "),r("ul",[r("li",[r("strong",[t._v("几种分支的作用")]),t._v(" "),r("ul",[r("li",[t._v("特性分支(lwc_version)：某个版本的个人分支，用于将个人代码备份到云端，保护代码安全及不同设备的同步")]),t._v(" "),r("li",[t._v("开发分支(develop_version)：某个版本的开发分支，由负责人尽可能保证代码是可运行的分支，同时也是修复bug的分支，通常与test_version同步,"),r("strong",[t._v("通常发起提测以后，该版本的分支develop及特性分支，不允许再开发新需求，仅进入bug修复阶段，如果有新需求，需要用新版本号建立出一套分支进行迭代")])]),t._v(" "),r("li",[t._v("测试分支(test_version)：某个版本的测试分支，通常在提测时，从develop_version合并过去")])])])]),t._v(" "),r("h1",{attrs:{id:"三、基于idea的合并请求操作-idea版本：2020-1-2"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#三、基于idea的合并请求操作-idea版本：2020-1-2"}},[t._v("#")]),t._v(" 三、基于IDEA的合并请求操作(IDEA版本：2020.1.2)")]),t._v(" "),r("ul",[r("li",[r("h2",{attrs:{id:"_1-安装插件《gitlab-projects-2020》"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_1-安装插件《gitlab-projects-2020》"}},[t._v("#")]),t._v(" 1.安装插件《GitLab Projects 2020》")])]),t._v(" "),r("li",[r("strong",[t._v("1. 配置git服务器:Settings > GitLab > Add New GitLab Server")])])]),t._v(" "),r("p",[r("img",{attrs:{src:"/media//202102/clipboard_1612400753.png",alt:""}})]),t._v(" "),r("ul",[r("li",[r("strong",[t._v("2. 设置参数及获取token")])])]),t._v(" "),r("p",[r("img",{attrs:{src:"/media//202102/clipboard_1612400895.png",alt:""}})]),t._v(" "),r("p",[r("img",{attrs:{src:"/media//202102/clipboard_1612400908.png",alt:""}})]),t._v(" "),r("p",[r("img",{attrs:{src:"/media//202102/clipboard_1612400925.png",alt:""}})]),t._v(" "),r("ul",[r("li",[r("strong",[t._v("3.获得token进行设置")])])]),t._v(" "),r("p",[r("img",{attrs:{src:"/media//202102/clipboard_1612400989.png",alt:""}})]),t._v(" "),r("ul",[r("li",[r("strong",[t._v("4.添加完成")])])]),t._v(" "),r("p",[r("img",{attrs:{src:"/media//202102/clipboard_1612401005.png",alt:""}})]),t._v(" "),r("h2",{attrs:{id:"_2-发起合并请求"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_2-发起合并请求"}},[t._v("#")]),t._v(" 2.发起合并请求")]),t._v(" "),r("ul",[r("li",[t._v("操作：VCS > Git > GitLab > Create Merge Request\n"),r("ul",[r("li",[t._v("To Branch：要合并到的分支 > develop")]),t._v(" "),r("li",[t._v("Assignee: 审核人(由小组达成共识)")]),t._v(" "),r("li",[t._v("Title: 请求合并的描述")]),t._v(" "),r("li",[t._v("Description:详细描述")])])])]),t._v(" "),r("p",[r("img",{attrs:{src:"/media//202102/clipboard_1612401070.png",alt:""}})]),t._v(" "),r("p",[r("img",{attrs:{src:"/media//202102/clipboard_1612401085.png",alt:""}})]),t._v(" "),r("h2",{attrs:{id:"_3-负责人审核请求"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_3-负责人审核请求"}},[t._v("#")]),t._v(" 3.负责人审核请求")]),t._v(" "),r("ul",[r("li",[r("strong",[t._v("操作：VCS > Git > GitLab > List Merge Request")])])]),t._v(" "),r("p",[r("img",{attrs:{src:"/media//202102/clipboard_1612401155.png",alt:""}})]),t._v(" "),r("ul",[r("li",[r("strong",[t._v("查看提交详情")])])]),t._v(" "),r("p",[r("img",{attrs:{src:"/media//202102/clipboard_1612401167.png",alt:""}})]),t._v(" "),r("p",[r("img",{attrs:{src:"/media//202102/clipboard_1612401178.png",alt:""}})]),t._v(" "),r("ul",[r("li",[r("strong",[t._v("确认无误后合并")])])]),t._v(" "),r("p",[r("img",{attrs:{src:"/media//202102/clipboard_1612401200.png",alt:""}})]),t._v(" "),r("ul",[r("li",[r("strong",[t._v("如何驳回请求")]),t._v("：暂时插件无法驳回，需要在浏览器上操作")])]),t._v(" "),r("h1",{attrs:{id:"四、基于浏览器的合并请求操作"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#四、基于浏览器的合并请求操作"}},[t._v("#")]),t._v(" 四、基于浏览器的合并请求操作")]),t._v(" "),r("h2",{attrs:{id:"_1-发起合并请求"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_1-发起合并请求"}},[t._v("#")]),t._v(" 1.发起合并请求")]),t._v(" "),r("ul",[r("li",[r("strong",[t._v("操作：打开项目 > 合并请求 > New merge request")])])]),t._v(" "),r("p",[r("img",{attrs:{src:"/media//202102/clipboard_1612401216.png",alt:""}})]),t._v(" "),r("ul",[r("li",[r("strong",[t._v("选好源分支和目标分支")])])]),t._v(" "),r("p",[r("img",{attrs:{src:"/media//202102/clipboard_1612401231.png",alt:""}})]),t._v(" "),r("ul",[r("li",[r("strong",[t._v("确认好源分支和目标分支及审核人,发起合并")])])]),t._v(" "),r("p",[r("img",{attrs:{src:"/media//202102/clipboard_1612401244.png",alt:""}})]),t._v(" "),r("h2",{attrs:{id:"_2-负责人审核请求"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_2-负责人审核请求"}},[t._v("#")]),t._v(" 2.负责人审核请求")]),t._v(" "),r("ul",[r("li",[r("strong",[t._v("操作：打开项目 > 合并请求")])])]),t._v(" "),r("p",[r("img",{attrs:{src:"/media//202102/clipboard_1612401261.png",alt:""}})]),t._v(" "),r("ul",[r("li",[r("strong",[t._v("查看及合并")])])]),t._v(" "),r("p",[r("img",{attrs:{src:"/media//202102/clipboard_1612401276.png",alt:""}})]),t._v(" "),r("ul",[r("li",[r("strong",[t._v("无论合并成功还是失败，都可以添加评论进行交流(不常用，一般直接面对面或语音沟通即可)")])])]),t._v(" "),r("p",[r("img",{attrs:{src:"/media//202102/clipboard_1612401290.png",alt:""}})]),t._v(" "),r("h1",{attrs:{id:"五、如何配置保护分支"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#五、如何配置保护分支"}},[t._v("#")]),t._v(" 五、如何配置保护分支")]),t._v(" "),r("ul",[r("li",[r("strong",[t._v("操作： 仓库 > 分支 > 项目设置 > Protected Branches")])])]),t._v(" "),r("p",[r("img",{attrs:{src:"/media//202102/clipboard_1612401308.png",alt:""}})]),t._v(" "),r("p",[r("img",{attrs:{src:"/media//202102/clipboard_1612401321.png",alt:""}})])])}),[],!1,null,null,null);a.default=s.exports}}]);