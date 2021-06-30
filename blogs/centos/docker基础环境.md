---
title: centos构建docker基础环境
toc: true
recommend: 1
keywords: categories-centos, categories-docker
uniqueId: &#39;2020-06-03 11:32:00/&quot;centos构建docker基础环境&quot;.html&#39;
abbrlink: cd183338
date: 2020-06-03 19:32:00
thumbnail: &#39;https://cdn.jsdelivr.net/gh/xincan/blog-database/image/xincan-6.png&#39;
tags: 
 - docker
 - centos
categories:
  - 系统教程
  - 环境构建
---
### 环境准备

准备一台虚拟机，请参照[centos基础环境构建](http://xincan.github.io/posts/d05af695/)

&lt;!-- more --&gt;

#### 一、 检查是否之前安装过docker，如果有则清除docker环境
```shell script
[root@localhost /]# sudo yum remove docker docker-client docker-client-latest docker-common docker-latest docker-latest-logrotate docker-logrotate docker-engine
Loaded plugins: fastestmirror
No Match for argument: docker
No Match for argument: docker-client
No Match for argument: docker-client-latest
No Match for argument: docker-common
No Match for argument: docker-latest
No Match for argument: docker-latest-logrotate
No Match for argument: docker-logrotate
No Match for argument: docker-engine
No Packages marked for removal
[root@localhost /]#
```

#### 二、 安装yum、docker环境依赖
见到**Complete!**，则安装成功
```shell script
[root@localhost /]# sudo yum install -y yum-utils device-mapper-persistent-data lvm2
Loaded plugins: fastestmirror
Loading mirror speeds from cached hostfile
 * base: mirrors.aliyun.com
 * extras: mirrors.aliyun.com
 * updates: mirrors.aliyun.com
Resolving Dependencies
--&gt; Running transaction check
---&gt; Package device-mapper-persistent-data.x86_64 0:0.8.5-2.el7 will be installed
--&gt; Processing Dependency: libaio.so.1(LIBAIO_0.4)(64bit) for package: device-mapper-persistent-data-0.8.5-2.el7.x86_64
--&gt; Processing Dependency: libaio.so.1(LIBAIO_0.1)(64bit) for package: device-mapper-persistent-data-0.8.5-2.el7.x86_64
--&gt; Processing Dependency: libaio.so.1()(64bit) for package: device-mapper-persistent-data-0.8.5-2.el7.x86_64
---&gt; Package lvm2.x86_64 7:2.02.186-7.el7_8.2 will be installed
--&gt; Processing Dependency: lvm2-libs = 7:2.02.186-7.el7_8.2 for package: 7:lvm2-2.02.186-7.el7_8.2.x86_64
--&gt; Processing Dependency: liblvm2app.so.2.2(Base)(64bit) for package: 7:lvm2-2.02.186-7.el7_8.2.x86_64
--&gt; Processing Dependency: libdevmapper-event.so.1.02(Base)(64bit) for package: 7:lvm2-2.02.186-7.el7_8.2.x86_64
--&gt; Processing Dependency: liblvm2app.so.2.2()(64bit) for package: 7:lvm2-2.02.186-7.el7_8.2.x86_64
--&gt; Processing Dependency: libdevmapper-event.so.1.02()(64bit) for package: 7:lvm2-2.02.186-7.el7_8.2.x86_64
---&gt; Package yum-utils.noarch 0:1.1.31-50.el7 will be updated
---&gt; Package yum-utils.noarch 0:1.1.31-54.el7_8 will be an update
--&gt; Running transaction check
---&gt; Package device-mapper-event-libs.x86_64 7:1.02.164-7.el7_8.2 will be installed
---&gt; Package libaio.x86_64 0:0.3.109-13.el7 will be installed
---&gt; Package lvm2-libs.x86_64 7:2.02.186-7.el7_8.2 will be installed
--&gt; Processing Dependency: device-mapper-event = 7:1.02.164-7.el7_8.2 for package: 7:lvm2-libs-2.02.186-7.el7_8.2.x86_64
--&gt; Running transaction check
---&gt; Package device-mapper-event.x86_64 7:1.02.164-7.el7_8.2 will be installed
--&gt; Processing Dependency: device-mapper = 7:1.02.164-7.el7_8.2 for package: 7:device-mapper-event-1.02.164-7.el7_8.2.x86_64
--&gt; Running transaction check
---&gt; Package device-mapper.x86_64 7:1.02.149-10.el7_6.7 will be updated
--&gt; Processing Dependency: device-mapper = 7:1.02.149-10.el7_6.7 for package: 7:device-mapper-libs-1.02.149-10.el7_6.7.x86_64
---&gt; Package device-mapper.x86_64 7:1.02.164-7.el7_8.2 will be an update
--&gt; Running transaction check
---&gt; Package device-mapper-libs.x86_64 7:1.02.149-10.el7_6.7 will be updated
---&gt; Package device-mapper-libs.x86_64 7:1.02.164-7.el7_8.2 will be an update
--&gt; Finished Dependency Resolution

Dependencies Resolved

===================================================================================================================================================================================================================
 Package                                                         Arch                                     Version                                                  Repository                                 Size
===================================================================================================================================================================================================================
Installing:
 device-mapper-persistent-data                                   x86_64                                   0.8.5-2.el7                                              base                                      422 k
 lvm2                                                            x86_64                                   7:2.02.186-7.el7_8.2                                     updates                                   1.3 M
Updating:
 yum-utils                                                       noarch                                   1.1.31-54.el7_8                                          updates                                   122 k
Installing for dependencies:
 device-mapper-event                                             x86_64                                   7:1.02.164-7.el7_8.2                                     updates                                   191 k
 device-mapper-event-libs                                        x86_64                                   7:1.02.164-7.el7_8.2                                     updates                                   190 k
 libaio                                                          x86_64                                   0.3.109-13.el7                                           base                                       24 k
 lvm2-libs                                                       x86_64                                   7:2.02.186-7.el7_8.2                                     updates                                   1.1 M
Updating for dependencies:
 device-mapper                                                   x86_64                                   7:1.02.164-7.el7_8.2                                     updates                                   295 k
 device-mapper-libs                                              x86_64                                   7:1.02.164-7.el7_8.2                                     updates                                   324 k

Transaction Summary
===================================================================================================================================================================================================================
Install  2 Packages (+4 Dependent packages)
Upgrade  1 Package  (+2 Dependent packages)

Total download size: 3.9 M
Downloading packages:
No Presto metadata available for updates
(1/9): device-mapper-1.02.164-7.el7_8.2.x86_64.rpm                                                                                                                                          | 295 kB  00:00:00
(2/9): device-mapper-event-1.02.164-7.el7_8.2.x86_64.rpm                                                                                                                                    | 191 kB  00:00:00
(3/9): device-mapper-event-libs-1.02.164-7.el7_8.2.x86_64.rpm                                                                                                                               | 190 kB  00:00:00
(4/9): device-mapper-libs-1.02.164-7.el7_8.2.x86_64.rpm                                                                                                                                     | 324 kB  00:00:00
(5/9): libaio-0.3.109-13.el7.x86_64.rpm                                                                                                                                                     |  24 kB  00:00:00
(6/9): device-mapper-persistent-data-0.8.5-2.el7.x86_64.rpm                                                                                                                                 | 422 kB  00:00:00
(7/9): lvm2-2.02.186-7.el7_8.2.x86_64.rpm                                                                                                                                                   | 1.3 MB  00:00:01
(8/9): lvm2-libs-2.02.186-7.el7_8.2.x86_64.rpm                                                                                                                                              | 1.1 MB  00:00:00
(9/9): yum-utils-1.1.31-54.el7_8.noarch.rpm                                                                                                                                                 | 122 kB  00:00:00
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Total                                                                                                                                                                              2.3 MB/s | 3.9 MB  00:00:01
Running transaction check
Running transaction test
Transaction test succeeded
Running transaction
  Installing : libaio-0.3.109-13.el7.x86_64                          1/12
  Updating   : 7:device-mapper-libs-1.02.164-7.el7_8.2.x86_64        2/12
  Updating   : 7:device-mapper-1.02.164-7.el7_8.2.x86_64              3/12
  Installing : 7:device-mapper-event-libs-1.02.164-7.el7_8.2.x86_64   4/12
  Installing : 7:device-mapper-event-1.02.164-7.el7_8.2.x86_64        5/12
  Installing : 7:lvm2-libs-2.02.186-7.el7_8.2.x86_64                  6/12
  Installing : device-mapper-persistent-data-0.8.5-2.el7.x86_64      7/12
  Installing : 7:lvm2-2.02.186-7.el7_8.2.x86_64                      8/12
  Updating   : yum-utils-1.1.31-54.el7_8.noarch                     9/12
  Cleanup    : yum-utils-1.1.31-50.el7.noarch                       10/12
  Cleanup    : 7:device-mapper-libs-1.02.149-10.el7_6.7.x86_64       11/12
  Cleanup    : 7:device-mapper-1.02.149-10.el7_6.7.x86_64           12/12
  Verifying  : 7:device-mapper-1.02.164-7.el7_8.2.x86_64              1/12
  Verifying  : device-mapper-persistent-data-0.8.5-2.el7.x86_64      2/12
  Verifying  : 7:lvm2-libs-2.02.186-7.el7_8.2.x86_64                  3/12
  Verifying  : 7:device-mapper-event-1.02.164-7.el7_8.2.x86_64        4/12
  Verifying  : 7:lvm2-2.02.186-7.el7_8.2.x86_64                      5/12
  Verifying  : 7:device-mapper-libs-1.02.164-7.el7_8.2.x86_64        6/12
  Verifying  : libaio-0.3.109-13.el7.x86_64                          7/12
  Verifying  : yum-utils-1.1.31-54.el7_8.noarch                      8/12
  Verifying  : 7:device-mapper-event-libs-1.02.164-7.el7_8.2.x86_64  9/12
  Verifying  : 7:device-mapper-libs-1.02.149-10.el7_6.7.x86_64       10/12
  Verifying  : yum-utils-1.1.31-50.el7.noarch                       11/12
  Verifying  : 7:device-mapper-1.02.149-10.el7_6.7.x86_64           12/12

Installed:
  device-mapper-persistent-data.x86_64 0:0.8.5-2.el7                                                                lvm2.x86_64 7:2.02.186-7.el7_8.2

Dependency Installed:
  device-mapper-event.x86_64 7:1.02.164-7.el7_8.2           device-mapper-event-libs.x86_64 7:1.02.164-7.el7_8.2           libaio.x86_64 0:0.3.109-13.el7           lvm2-libs.x86_64 7:2.02.186-7.el7_8.2

Updated:
  yum-utils.noarch 0:1.1.31-54.el7_8

Dependency Updated:
  device-mapper.x86_64 7:1.02.164-7.el7_8.2                                                             device-mapper-libs.x86_64 7:1.02.164-7.el7_8.2

Complete!
[root@localhost /]#
```

#### 三、 配置docker源
```shell script
[root@localhost /]# sudo yum-config-manager -y --add-repo https://download.docker.com/linux/centos/docker-ce.repo
Loaded plugins: fastestmirror
adding repo from: https://download.docker.com/linux/centos/docker-ce.repo
grabbing file https://download.docker.com/linux/centos/docker-ce.repo to /etc/yum.repos.d/docker-ce.repo
repo saved to /etc/yum.repos.d/docker-ce.repo
[root@localhost /]#
[root@localhost /]# cd /etc/yum.repos.d/
[root@localhost yum.repos.d]# ls
backup  CentOS-Base.repo  docker-ce.repo
[root@localhost yum.repos.d]#
```

#### 四、 安装docker-ce-cli客户端、docker-ce服务端
见到**Complete!**，则安装成功
```shell script
[root@localhost /]# sudo yum install -y docker-ce docker-ce-cli containerd.io
Loaded plugins: fastestmirror
Loading mirror speeds from cached hostfile
 * base: mirrors.aliyun.com
 * extras: mirrors.aliyun.com
 * updates: mirrors.aliyun.com
docker-ce-stable                                                                                                                                                                            | 3.5 kB  00:00:00
(1/2): docker-ce-stable/x86_64/updateinfo                                                                                                                                                   |   55 B  00:00:00
(2/2): docker-ce-stable/x86_64/primary_db                                                                                                                                                   |  44 kB  00:00:01
Resolving Dependencies
--&gt; Running transaction check
---&gt; Package containerd.io.x86_64 0:1.2.13-3.2.el7 will be installed
--&gt; Processing Dependency: container-selinux &gt;= 2:2.74 for package: containerd.io-1.2.13-3.2.el7.x86_64
---&gt; Package docker-ce.x86_64 3:19.03.11-3.el7 will be installed
--&gt; Processing Dependency: libcgroup for package: 3:docker-ce-19.03.11-3.el7.x86_64
---&gt; Package docker-ce-cli.x86_64 1:19.03.11-3.el7 will be installed
--&gt; Running transaction check
---&gt; Package container-selinux.noarch 2:2.119.1-1.c57a6f9.el7 will be installed
--&gt; Processing Dependency: policycoreutils-python for package: 2:container-selinux-2.119.1-1.c57a6f9.el7.noarch
---&gt; Package libcgroup.x86_64 0:0.41-21.el7 will be installed
--&gt; Running transaction check
---&gt; Package policycoreutils-python.x86_64 0:2.5-34.el7 will be installed
--&gt; Processing Dependency: policycoreutils = 2.5-34.el7 for package: policycoreutils-python-2.5-34.el7.x86_64
--&gt; Processing Dependency: setools-libs &gt;= 3.3.8-4 for package: policycoreutils-python-2.5-34.el7.x86_64
--&gt; Processing Dependency: libsemanage-python &gt;= 2.5-14 for package: policycoreutils-python-2.5-34.el7.x86_64
--&gt; Processing Dependency: audit-libs-python &gt;= 2.1.3-4 for package: policycoreutils-python-2.5-34.el7.x86_64
--&gt; Processing Dependency: python-IPy for package: policycoreutils-python-2.5-34.el7.x86_64
--&gt; Processing Dependency: libqpol.so.1(VERS_1.4)(64bit) for package: policycoreutils-python-2.5-34.el7.x86_64
--&gt; Processing Dependency: libqpol.so.1(VERS_1.2)(64bit) for package: policycoreutils-python-2.5-34.el7.x86_64
--&gt; Processing Dependency: libapol.so.4(VERS_4.0)(64bit) for package: policycoreutils-python-2.5-34.el7.x86_64
--&gt; Processing Dependency: checkpolicy for package: policycoreutils-python-2.5-34.el7.x86_64
--&gt; Processing Dependency: libqpol.so.1()(64bit) for package: policycoreutils-python-2.5-34.el7.x86_64
--&gt; Processing Dependency: libapol.so.4()(64bit) for package: policycoreutils-python-2.5-34.el7.x86_64
--&gt; Running transaction check
---&gt; Package audit-libs-python.x86_64 0:2.8.5-4.el7 will be installed
--&gt; Processing Dependency: audit-libs(x86-64) = 2.8.5-4.el7 for package: audit-libs-python-2.8.5-4.el7.x86_64
---&gt; Package checkpolicy.x86_64 0:2.5-8.el7 will be installed
---&gt; Package libsemanage-python.x86_64 0:2.5-14.el7 will be installed
---&gt; Package policycoreutils.x86_64 0:2.5-29.el7_6.1 will be updated
---&gt; Package policycoreutils.x86_64 0:2.5-34.el7 will be an update
---&gt; Package python-IPy.noarch 0:0.75-6.el7 will be installed
---&gt; Package setools-libs.x86_64 0:3.3.8-4.el7 will be installed
--&gt; Running transaction check
---&gt; Package audit-libs.x86_64 0:2.8.4-4.el7 will be updated
--&gt; Processing Dependency: audit-libs(x86-64) = 2.8.4-4.el7 for package: audit-2.8.4-4.el7.x86_64
---&gt; Package audit-libs.x86_64 0:2.8.5-4.el7 will be an update
--&gt; Running transaction check
---&gt; Package audit.x86_64 0:2.8.4-4.el7 will be updated
---&gt; Package audit.x86_64 0:2.8.5-4.el7 will be an update
--&gt; Finished Dependency Resolution

Dependencies Resolved

===================================================================================================================================================================================================================
 Package                                                 Arch                                    Version                                                   Repository                                         Size
===================================================================================================================================================================================================================
Installing:
 containerd.io                                           x86_64                                  1.2.13-3.2.el7                                            docker-ce-stable                                   25 M
 docker-ce                                               x86_64                                  3:19.03.11-3.el7                                          docker-ce-stable                                   24 M
 docker-ce-cli                                           x86_64                                  1:19.03.11-3.el7                                          docker-ce-stable                                   38 M
Installing for dependencies:
 audit-libs-python                                       x86_64                                  2.8.5-4.el7                                               base                                               76 k
 checkpolicy                                             x86_64                                  2.5-8.el7                                                 base                                              295 k
 container-selinux                                       noarch                                  2:2.119.1-1.c57a6f9.el7                                   extras                                             40 k
 libcgroup                                               x86_64                                  0.41-21.el7                                               base                                               66 k
 libsemanage-python                                      x86_64                                  2.5-14.el7                                                base                                              113 k
 policycoreutils-python                                  x86_64                                  2.5-34.el7                                                base                                              457 k
 python-IPy                                              noarch                                  0.75-6.el7                                                base                                               32 k
 setools-libs                                            x86_64                                  3.3.8-4.el7                                               base                                              620 k
Updating for dependencies:
 audit                                                   x86_64                                  2.8.5-4.el7                                               base                                              256 k
 audit-libs                                              x86_64                                  2.8.5-4.el7                                               base                                              102 k
 policycoreutils                                         x86_64                                  2.5-34.el7                                                base                                              917 k

Transaction Summary
===================================================================================================================================================================================================================
Install  3 Packages (+8 Dependent packages)
Upgrade             ( 3 Dependent packages)

Total download size: 91 M
Downloading packages:
No Presto metadata available for base
(1/14): audit-libs-2.8.5-4.el7.x86_64.rpm                                                                                                                                                   | 102 kB  00:00:00
(2/14): audit-libs-python-2.8.5-4.el7.x86_64.rpm                                                                                                                                            |  76 kB  00:00:00
(3/14): audit-2.8.5-4.el7.x86_64.rpm                                                                                                                                                        | 256 kB  00:00:00
(4/14): checkpolicy-2.5-8.el7.x86_64.rpm                                                                                                                                                    | 295 kB  00:00:00
(5/14): container-selinux-2.119.1-1.c57a6f9.el7.noarch.rpm                                                                                                                                  |  40 kB  00:00:00
warning: /var/cache/yum/x86_64/7/docker-ce-stable/packages/containerd.io-1.2.13-3.2.el7.x86_64.rpm: Header V4 RSA/SHA512 Signature, key ID 621e9f35: NOKEY                       ] 2.0 MB/s |  45 MB  00:00:22 ETA
Public key for containerd.io-1.2.13-3.2.el7.x86_64.rpm is not installed
(6/14): containerd.io-1.2.13-3.2.el7.x86_64.rpm                                                                                                                                             |  25 MB  00:00:32
(7/14): libcgroup-0.41-21.el7.x86_64.rpm                                                                                                                                                    |  66 kB  00:00:00
(8/14): libsemanage-python-2.5-14.el7.x86_64.rpm                                                                                                                                            | 113 kB  00:00:00
(9/14): policycoreutils-python-2.5-34.el7.x86_64.rpm                                                                                                                                        | 457 kB  00:00:01
(10/14): python-IPy-0.75-6.el7.noarch.rpm                                                                                                                                                   |  32 kB  00:00:00
(11/14): setools-libs-3.3.8-4.el7.x86_64.rpm                                                                                                                                                | 620 kB  00:00:00
(12/14): policycoreutils-2.5-34.el7.x86_64.rpm                                                                                                                                              | 917 kB  00:00:02
(13/14): docker-ce-19.03.11-3.el7.x86_64.rpm                                                                                                                                                |  24 MB  00:00:36
(14/14): docker-ce-cli-19.03.11-3.el7.x86_64.rpm                                                                                                                                            |  38 MB  00:00:28
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Total                                                                                                                                                                              1.5 MB/s |  91 MB  00:01:01
Retrieving key from https://download.docker.com/linux/centos/gpg
Importing GPG key 0x621E9F35:
 Userid     : &quot;Docker Release (CE rpm) &lt;docker@docker.com&gt;&quot;
 Fingerprint: 060a 61c5 1b55 8a7f 742b 77aa c52f eb6b 621e 9f35
 From       : https://download.docker.com/linux/centos/gpg
Running transaction check
Running transaction test
Transaction test succeeded
Running transaction
  Updating   : audit-libs-2.8.5-4.el7.x86_64                                                                                                                                                                  1/17
  Updating   : policycoreutils-2.5-34.el7.x86_64                                                                                                                                                              2/17
  Installing : libcgroup-0.41-21.el7.x86_64                                                                                                                                                                   3/17
  Installing : audit-libs-python-2.8.5-4.el7.x86_64                                                                                                                                                           4/17
  Installing : python-IPy-0.75-6.el7.noarch                                                                                                                                                                   5/17
  Installing : setools-libs-3.3.8-4.el7.x86_64                                                                                                                                                                6/17
  Installing : libsemanage-python-2.5-14.el7.x86_64                                                                                                                                                           7/17
  Installing : 1:docker-ce-cli-19.03.11-3.el7.x86_64                                                                                                                                                          8/17
  Installing : checkpolicy-2.5-8.el7.x86_64                                                                                                                                                                   9/17
  Installing : policycoreutils-python-2.5-34.el7.x86_64                                                                                                                                                      10/17
  Installing : 2:container-selinux-2.119.1-1.c57a6f9.el7.noarch                                                                                                                                              11/17
  Installing : containerd.io-1.2.13-3.2.el7.x86_64                                                                                                                                                           12/17
  Installing : 3:docker-ce-19.03.11-3.el7.x86_64                                                                                                                                                             13/17
  Updating   : audit-2.8.5-4.el7.x86_64                                                                                                                                                                      14/17
  Cleanup    : policycoreutils-2.5-29.el7_6.1.x86_64                                                                                                                                                         15/17
  Cleanup    : audit-2.8.4-4.el7.x86_64                                                                                                                                                                      16/17
  Cleanup    : audit-libs-2.8.4-4.el7.x86_64                                                                                                                                                                 17/17
  Verifying  : 2:container-selinux-2.119.1-1.c57a6f9.el7.noarch                                                                                                                                               1/17
  Verifying  : audit-libs-2.8.5-4.el7.x86_64                                                                                                                                                                  2/17
  Verifying  : checkpolicy-2.5-8.el7.x86_64                                                                                                                                                                   3/17
  Verifying  : audit-2.8.5-4.el7.x86_64                                                                                                                                                                       4/17
  Verifying  : 1:docker-ce-cli-19.03.11-3.el7.x86_64                                                                                                                                                          5/17
  Verifying  : policycoreutils-2.5-34.el7.x86_64                                                                                                                                                              6/17
  Verifying  : libsemanage-python-2.5-14.el7.x86_64                                                                                                                                                           7/17
  Verifying  : containerd.io-1.2.13-3.2.el7.x86_64                                                                                                                                                            8/17
  Verifying  : setools-libs-3.3.8-4.el7.x86_64                                                                                                                                                                9/17
  Verifying  : python-IPy-0.75-6.el7.noarch                                                                                                                                                                  10/17
  Verifying  : policycoreutils-python-2.5-34.el7.x86_64                                                                                                                                                      11/17
  Verifying  : audit-libs-python-2.8.5-4.el7.x86_64                                                                                                                                                          12/17
  Verifying  : 3:docker-ce-19.03.11-3.el7.x86_64                                                                                                                                                             13/17
  Verifying  : libcgroup-0.41-21.el7.x86_64                                                                                                                                                                  14/17
  Verifying  : audit-libs-2.8.4-4.el7.x86_64                                                                                                                                                                 15/17
  Verifying  : audit-2.8.4-4.el7.x86_64                                                                                                                                                                      16/17
  Verifying  : policycoreutils-2.5-29.el7_6.1.x86_64                                                                                                                                                         17/17

Installed:
  containerd.io.x86_64 0:1.2.13-3.2.el7                                  docker-ce.x86_64 3:19.03.11-3.el7                                  docker-ce-cli.x86_64 1:19.03.11-3.el7

Dependency Installed:
  audit-libs-python.x86_64 0:2.8.5-4.el7        checkpolicy.x86_64 0:2.5-8.el7    container-selinux.noarch 2:2.119.1-1.c57a6f9.el7    libcgroup.x86_64 0:0.41-21.el7    libsemanage-python.x86_64 0:2.5-14.el7
  policycoreutils-python.x86_64 0:2.5-34.el7    python-IPy.noarch 0:0.75-6.el7    setools-libs.x86_64 0:3.3.8-4.el7

Dependency Updated:
  audit.x86_64 0:2.8.5-4.el7                                       audit-libs.x86_64 0:2.8.5-4.el7                                       policycoreutils.x86_64 0:2.5-34.el7

Complete!
[root@localhost /]#
```

#### 五、 将当前用户添加到docker用户组
vagrant为登录用户名称，根据自己机器登录名称设定
```shell script
[root@localhost /]# sudo usermod -aG docker vagrant
[root@localhost /]# sudo usermod -aG docker root
[root@localhost /]#
```

#### 六、 设置docker镜像下载源，指定cgroup驱动
查看/etc/docker下是否有daemon.json文件，如果有手动修改，如果没有则直接执行如下命令
1. 查看daemon.json是否存在，我这里不存在，执行第2步增加docker配置

```shell script
[root@localhost /]# cd /etc/docker/
[root@localhost docker]# ls
key.json
[root@localhost docker]#
```

2. 增加docker配置，并查看配置
https://1mbc3b4s.mirror.aliyuncs.com的获取  [阿里云镜像地址](https://cr.console.aliyun.com/undefined/instances/mirrors?spm=5176.12901015.0.i12901015.7fcb525ccA1UbT)
如果之前启动过docker,修改完成之后需要重启
sudo systemctl daemon-reload &amp;&amp; sudo systemctl restart docker

```shell script
sudo tee /etc/docker/daemon.json &lt;&lt;-&#39;EOF&#39; 
{
    &quot;registry-mirrors&quot;: [&quot;https://1mbc3b4s.mirror.aliyuncs.com&quot;],
    &quot;exec-opts&quot;: [&quot;native.cgroupdriver=systemd&quot;]
} 
EOF
[root@localhost docker]# cat /etc/docker/daemon.json
{
    &quot;registry-mirrors&quot;: [&quot;https://1mbc3b4s.mirror.aliyuncs.com&quot;],
    &quot;exec-opts&quot;: [&quot;native.cgroupdriver=systemd&quot;]
}
[root@localhost docker]#
```

#### 七、 启动docker
```shell script
[root@localhost /]# sudo systemctl start docker
[root@localhost /]#
```

#### 八、 查看docker是否安装成功
这里可以看到docker的版本为19.03.11，增加了docker0网络
```shell script
[root@localhost /]# docker info
Client:
 Debug Mode: false

Server:
 Containers: 0
  Running: 0
  Paused: 0
  Stopped: 0
 Images: 0
 Server Version: 19.03.11
 Storage Driver: overlay2
  Backing Filesystem: xfs
  Supports d_type: true
  Native Overlay Diff: true
 Logging Driver: json-file
 Cgroup Driver: systemd
 Plugins:
  Volume: local
  Network: bridge host ipvlan macvlan null overlay
  Log: awslogs fluentd gcplogs gelf journald json-file local logentries splunk syslog
 Swarm: inactive
 Runtimes: runc
 Default Runtime: runc
 Init Binary: docker-init
 containerd version: 7ad184331fa3e55e52b890ea95e65ba581ae3429
 runc version: dc9208a3303feef5b3839f4323d9beb36df0a9dd
 init version: fec3683
 Security Options:
  seccomp
   Profile: default
 Kernel Version: 3.10.0-957.12.2.el7.x86_64
 Operating System: CentOS Linux 7 (Core)
 OSType: linux
 Architecture: x86_64
 CPUs: 4
 Total Memory: 3.7GiB
 Name: xincan.base.com
 ID: IQSQ:3C2Y:CYZ6:UQVE:VEOH:HCVJ:NNUS:W2E5:NLRE:GAME:NH2L:2XHC
 Docker Root Dir: /var/lib/docker
 Debug Mode: false
 Registry: https://index.docker.io/v1/
 Labels:
 Experimental: false
 Insecure Registries:
  127.0.0.0/8
 Registry Mirrors:
  https://1mbc3b4s.mirror.aliyuncs.com/
 Live Restore Enabled: false

[root@localhost /]#
[root@localhost /]# ip addr
1: lo: &lt;LOOPBACK,UP,LOWER_UP&gt; mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: eth0: &lt;BROADCAST,MULTICAST,UP,LOWER_UP&gt; mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether 52:54:00:8a:fe:e6 brd ff:ff:ff:ff:ff:ff
    inet 10.0.2.15/24 brd 10.0.2.255 scope global noprefixroute dynamic eth0
       valid_lft 70167sec preferred_lft 70167sec
    inet6 fe80::5054:ff:fe8a:fee6/64 scope link
       valid_lft forever preferred_lft forever
3: eth1: &lt;BROADCAST,MULTICAST,UP,LOWER_UP&gt; mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether 08:00:27:dd:2a:77 brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.40/24 brd 192.168.1.255 scope global noprefixroute eth1
       valid_lft forever preferred_lft forever
    inet6 fe80::a00:27ff:fedd:2a77/64 scope link
       valid_lft forever preferred_lft forever
4: docker0: &lt;NO-CARRIER,BROADCAST,MULTICAST,UP&gt; mtu 1500 qdisc noqueue state DOWN group default
    link/ether 02:42:49:69:f4:4a brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0
       valid_lft forever preferred_lft forever
[root@localhost /]#
```

#### 九、 设置docker开机启动
```shell script
[root@localhost /]# sudo systemctl enable docker
Created symlink from /etc/systemd/system/multi-user.target.wants/docker.service to /usr/lib/systemd/system/docker.service.
[root@localhost /]#
```

#### 十、 安装docker-compose（墙裂建议） [docker-compose安装文档地址](https://docs.docker.com/compose/install/)

1. 下载docker-compose
    sudo curl -L &quot;https://github.com/docker/compose/releases/download/1.26.0/docker-compose-$(uname -s)-$(uname -m)&quot; -o /usr/local/bin/docker-compose
2. 赋予docker-compose权限
    sudo chmod +x /usr/local/bin/docker-compose
3. 添加docker-compose软连接
    sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

```shell script
[root@xincan /]# sudo curl -L &quot;https://github.com/docker/compose/releases/download/1.26.0/docker-compose-$(uname -s)-$(uname -m)&quot; -o /usr/local/bin/docker-compose
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   638  100   638    0     0    239      0  0:00:02  0:00:02 --:--:--   239
100 11.6M  100 11.6M    0     0  1208k      0  0:00:09  0:00:09 --:--:-- 2430k
[root@xincan /]# docker-compose --version
-bash: /usr/local/bin/docker-compose: Permission denied
[root@xincan /]# sudo chmod +x /usr/local/bin/docker-compose
[root@xincan /]# sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
[root@xincan /]# docker-compose --version
docker-compose version 1.26.0, build d4451659
[root@xincan /]#
```

#### 十、 安装docker-compose（墙裂建议）

1. 安装bash-completion
    yum install -y bash-completion
2. 赋予docker-compose权限
    sudo chmod +x /usr/local/bin/docker-compose
3. 添加docker-compose软连接
    sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

```shell script
[root@xincan /]#yum install -y bash-completion
```