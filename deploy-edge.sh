#生产环境部署脚本

#先构建项目，生成dist目录
pnpm run build:edge

#cd到构建的目录下
cd dist

#部署到自定义域名
scp -r * root@43.159.53.204:/www/wwwroot/www.cloud-conf.org/edgecom/2023