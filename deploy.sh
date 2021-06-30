###
 # @Author: wangjun
 # @LastEditors: wangjun
 # @Date: 2020-07-06 13:16:03
 # @LastEditTime: 2021-06-30 14:06:02
 # @Description: 
### 
# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd public

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:xiaojun1221/xiaojun1221.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:xiaojun1221/blog.git master:gh-pages

cd -