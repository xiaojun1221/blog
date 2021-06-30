---
title: centos+K8S群集监控环境构建
toc: true
recommend: 1
keywords: categories-centos
uniqueId: &#39;2020-06-16 01:15:25/&quot;centos+K8S群集监控环境构建&quot;.html&#39;
thumbnail: &#39;https://cdn.jsdelivr.net/gh/xincan/blog-database/blog/centos-k8s-1.jpg&#39;
tags: 
 - centos
 - docker
 - K8S 
categories:
  - 系统教程
  - 环境构建
abbrlink: 2aa23666
date: 2020-06-16 09:15:25
keys:
 - '341b87e4c93156276d7d584b935958b0'
---
### 虚拟机配置

准备三台虚拟机，每台虚机请参照[centos基础环境构建]()、[centos构建docker基础环境]()进行安装构建
&lt;!-- more --&gt;

#### 一、 三台虚拟机配置表

1. 服务器配置

|     服务器IP     |        域名        |    别名   |  服务器类别  |   登录用户   |   登录密码   |  CPU  |  内存  |
|:---------------:|:------------------:|:--------:|:-----------:|:-----------:|:-----------:|:-----:|:------:|
|  192.168.1.55   | master55.xincan.cn | master55 |    master   |    root     |   v*****t   |  4核  |  4G    |
|  192.168.1.56   | slave56.xincan.cn  | slave56  |    slave    |    root     |   v*****t   |  2核  |  2G    |
|  192.168.1.57   | slave57.xincan.cn  | slave57  |    slave    |    root     |   v*****t   |  2核  |  2G    |

2. 工具版本

docker version: v19.03.11
Kubernetes version: v1.18.2

参考地址[kubernetes监控中级方案](https://www.cnblogs.com/skyflask/p/11480988.html)

#### 二、 修改虚机域名
依次修改各个虚拟机域名为master55.xincan.cn、 slave56.xincan.cn、 slave57.xincan.cn
```shell script
// master55服务器
[root@localhost ~]# vi /etc/hostname
master55.xincan.cn
[root@localhost ~]#

// slave56服务器
[root@localhost ~]# vi /etc/hostname
slave56.xincan.cn
[root@localhost ~]#

// slave57服务器
[root@localhost ~]#  vi /etc/hostname
slave57.xincan.cn
[root@localhost ~]#

```

#### 三、 配置三台机器互相用域名、别名访问
修改/etc/hosts文件设置，3台服务器同时增加如下代码
192.168.1.55 master55.xincan.cn master55
192.168.1.56 slave56.xincan.cn slave56
192.168.1.57 slave57.xincan.cn slave57
```shell script
[root@localhost /]# cat /etc/hosts
127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6

192.168.1.55 master55.xincan.cn master55
192.168.1.56 slave56.xincan.cn slave56
192.168.1.57 slave57.xincan.cn slave57
[root@localhost /]#
```

#### 四、 重启三台虚拟机，执行reboot
分别链接3台服务器，由之前的localhost已经改成服务器别名
```shell script
 // master55
[root@master55 ~]#

 // master55
[root@slave56 ~]#

 // master55
[root@slave57 ~]#
```

#### 五、 三台服务器时间同步
1. 3台服务器都安装ntp，提示**Complete!**则安装成功

```shell script
[root@localhost ~]# sudo yum install -y ntp
Loaded plugins: fastestmirror
Determining fastest mirrors
 * base: mirrors.huaweicloud.com
 * extras: mirrors.huaweicloud.com
 * updates: mirrors.ustc.edu.cn
base                                                                                                                          | 3.6 kB  00:00:00
extras                                                                                                                        | 2.9 kB  00:00:00
updates                                                                                                                       | 2.9 kB  00:00:00
(1/4): base/7/x86_64/group_gz                                                                                                 | 153 kB  00:00:00
(2/4): extras/7/x86_64/primary_db                                                                                             | 194 kB  00:00:00
(3/4): updates/7/x86_64/primary_db                                                                                            | 2.1 MB  00:00:01
(4/4): base/7/x86_64/primary_db                                                                                               | 6.1 MB  00:00:05
Resolving Dependencies
--&gt; Running transaction check
---&gt; Package ntp.x86_64 0:4.2.6p5-29.el7.centos will be installed
--&gt; Processing Dependency: ntpdate = 4.2.6p5-29.el7.centos for package: ntp-4.2.6p5-29.el7.centos.x86_64
--&gt; Processing Dependency: libopts.so.25()(64bit) for package: ntp-4.2.6p5-29.el7.centos.x86_64
--&gt; Running transaction check
---&gt; Package autogen-libopts.x86_64 0:5.18-5.el7 will be installed
---&gt; Package ntpdate.x86_64 0:4.2.6p5-29.el7.centos will be installed
--&gt; Finished Dependency Resolution

Dependencies Resolved

=====================================================================================================================================================
 Package                                Arch                          Version                                      Repository                   Size
=====================================================================================================================================================
Installing:
 ntp                                    x86_64                        4.2.6p5-29.el7.centos                        base                        548 k
Installing for dependencies:
 autogen-libopts                        x86_64                        5.18-5.el7                                   base                         66 k
 ntpdate                                x86_64                        4.2.6p5-29.el7.centos                        base                         86 k

Transaction Summary
=====================================================================================================================================================
Install  1 Package (+2 Dependent packages)

Total download size: 701 k
Installed size: 1.6 M
Downloading packages:
warning: /var/cache/yum/x86_64/7/base/packages/ntpdate-4.2.6p5-29.el7.centos.x86_64.rpm: Header V3 RSA/SHA256 Signature, key ID f4a80eb5: NOKEY- ETA
Public key for ntpdate-4.2.6p5-29.el7.centos.x86_64.rpm is not installed
(1/3): ntpdate-4.2.6p5-29.el7.centos.x86_64.rpm                                                                               |  86 kB  00:00:00
(2/3): autogen-libopts-5.18-5.el7.x86_64.rpm                                                                                  |  66 kB  00:00:00
(3/3): ntp-4.2.6p5-29.el7.centos.x86_64.rpm                                                                                   | 548 kB  00:00:00
-----------------------------------------------------------------------------------------------------------------------------------------------------
Total                                                                                                                956 kB/s | 701 kB  00:00:00
Retrieving key from file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7
Importing GPG key 0xF4A80EB5:
 Userid     : &quot;CentOS-7 Key (CentOS 7 Official Signing Key) &lt;security@centos.org&gt;&quot;
 Fingerprint: 6341 ab27 53d7 8a78 a7c2 7bb1 24c6 a8a7 f4a8 0eb5
 Package    : centos-release-7-6.1810.2.el7.centos.x86_64 (@anaconda)
 From       : /etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7
Running transaction check
Running transaction test
Transaction test succeeded
Running transaction
  Installing : autogen-libopts-5.18-5.el7.x86_64                                                                                                 1/3
  Installing : ntpdate-4.2.6p5-29.el7.centos.x86_64                                                                                              2/3
  Installing : ntp-4.2.6p5-29.el7.centos.x86_64                                                                                                  3/3
  Verifying  : ntp-4.2.6p5-29.el7.centos.x86_64                                                                                                  1/3
  Verifying  : ntpdate-4.2.6p5-29.el7.centos.x86_64                                                                                              2/3
  Verifying  : autogen-libopts-5.18-5.el7.x86_64                                                                                                 3/3

Installed:
  ntp.x86_64 0:4.2.6p5-29.el7.centos

Dependency Installed:
  autogen-libopts.x86_64 0:5.18-5.el7                                     ntpdate.x86_64 0:4.2.6p5-29.el7.centos

Complete!
[root@localhost ~]#
```

2. 3台服务器同时设置，查看当前系统时间、并设置当前时间为上海

```shell script
[root@localhost /]# date
Thu Jun  4 05:28:48 UTC 2020
[root@localhost /]# ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
[root@localhost /]# date
Thu Jun  4 13:29:01 CST 2020
[root@localhost /]# 
```
3. master55配置**server ntp.aliyun.com iburst**，然后通过**sudo systemctl start ntpd**启动服务，稍等一会执行**ntpq -p**查看是否同步，如果出现前面的*则，同步成功

systemctl start ntpd            &amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;启动ntp
systemctl restart ntpd          &amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;重启ntp
systemctl enable ntpd.service   &amp;nbsp;&amp;nbsp;开机启动
ntpdc -c loopinfo               &amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;查看与时间同步服务器的时间差

```shell script
[root@master55 /]# vi /etc/ntp.conf

# server 0.centos.pool.ntp.org iburst
# server 1.centos.pool.ntp.org iburst
# server 2.centos.pool.ntp.org iburst
# server 3.centos.pool.ntp.org iburst

server ntp.aliyun.com iburst

[root@master55 /]#
[root@master55 /]# sudo systemctl start ntpd
[root@master55 /]# systemctl enable ntpd.service
Created symlink from /etc/systemd/system/multi-user.target.wants/ntpd.service to /usr/lib/systemd/system/ntpd.service.
[root@localhost /]# ntpq -p
     remote           refid      st t when poll reach   delay   offset  jitter
==============================================================================
*203.107.6.88    10.137.38.86     2 u   37   64    1   53.476   -5.668   2.224
[root@master55 /]#
```
4. slave56、slave57配置master55域名地址**server master55.xincan.cn iburst**，然后通过**sudo systemctl start ntpd**启动服务，稍等一会执行**ntpq -p**查看是否同步，如果出现前面的*则，同步成功

slave56设置
```shell script
[root@slave56 /]# vi /etc/ntp.conf

# server 0.centos.pool.ntp.org iburst
# server 1.centos.pool.ntp.org iburst
# server 2.centos.pool.ntp.org iburst
# server 3.centos.pool.ntp.org iburst

server master55.xincan.cn iburst

[root@slave56 /]#
[root@slave56 /]# sudo systemctl start ntpd
[root@slave56 /]# systemctl enable ntpd.service
Created symlink from /etc/systemd/system/multi-user.target.wants/ntpd.service to /usr/lib/systemd/system/ntpd.service.
[root@slave56 /]# ntpq -p
     remote           refid      st t when poll reach   delay   offset  jitter
==============================================================================
*master55.xincan 203.107.6.88     3 u   12   64    1    0.367   10.659   0.054
[root@slave56 /]#
```
slave57设置
```shell script
[root@slave57 /]# vi /etc/ntp.conf

# server 0.centos.pool.ntp.org iburst
# server 1.centos.pool.ntp.org iburst
# server 2.centos.pool.ntp.org iburst
# server 3.centos.pool.ntp.org iburst

server master55.xincan.cn iburst

[root@slave57 /]#
[root@slave57 /]# sudo systemctl start ntpd
[root@slave57 /]# systemctl enable ntpd.service
Created symlink from /etc/systemd/system/multi-user.target.wants/ntpd.service to /usr/lib/systemd/system/ntpd.service.
[root@slave57 /]# ntpq -p
     remote           refid      st t when poll reach   delay   offset  jitter
==============================================================================
*master55.xincan 203.107.6.88     3 u   12   64    1    0.367   10.659   0.054
[root@slave57 /]#
```

#### 六、 三台服务器同时配置kubernetes网桥
设置网桥为值为1

1. master55设置

```shell script
[root@master55 /]# sudo bash -c &#39;cat &lt;&lt;EOF &gt;  /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward=1
EOF&#39;

[root@master55 /]#
[root@master55 /]# sysctl --system
* Applying /usr/lib/sysctl.d/00-system.conf ...
net.bridge.bridge-nf-call-ip6tables = 0
net.bridge.bridge-nf-call-iptables = 0
net.bridge.bridge-nf-call-arptables = 0
* Applying /usr/lib/sysctl.d/10-default-yama-scope.conf ...
kernel.yama.ptrace_scope = 0
* Applying /usr/lib/sysctl.d/50-default.conf ...
kernel.sysrq = 16
kernel.core_uses_pid = 1
net.ipv4.conf.default.rp_filter = 1
net.ipv4.conf.all.rp_filter = 1
net.ipv4.conf.default.accept_source_route = 0
net.ipv4.conf.all.accept_source_route = 0
net.ipv4.conf.default.promote_secondaries = 1
net.ipv4.conf.all.promote_secondaries = 1
fs.protected_hardlinks = 1
fs.protected_symlinks = 1
* Applying /etc/sysctl.d/99-sysctl.conf ...
* Applying /etc/sysctl.d/k8s.conf ...
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
* Applying /etc/sysctl.conf ...
[root@master55 /]#
```

2. slave56设置

```shell script
[root@slave56 /]# sudo bash -c &#39;cat &lt;&lt;EOF &gt;  /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward=1
EOF&#39;

[root@slave56 /]#
[root@slave56 /]# sysctl --system
* Applying /usr/lib/sysctl.d/00-system.conf ...
net.bridge.bridge-nf-call-ip6tables = 0
net.bridge.bridge-nf-call-iptables = 0
net.bridge.bridge-nf-call-arptables = 0
* Applying /usr/lib/sysctl.d/10-default-yama-scope.conf ...
kernel.yama.ptrace_scope = 0
* Applying /usr/lib/sysctl.d/50-default.conf ...
kernel.sysrq = 16
kernel.core_uses_pid = 1
net.ipv4.conf.default.rp_filter = 1
net.ipv4.conf.all.rp_filter = 1
net.ipv4.conf.default.accept_source_route = 0
net.ipv4.conf.all.accept_source_route = 0
net.ipv4.conf.default.promote_secondaries = 1
net.ipv4.conf.all.promote_secondaries = 1
fs.protected_hardlinks = 1
fs.protected_symlinks = 1
* Applying /etc/sysctl.d/99-sysctl.conf ...
* Applying /etc/sysctl.d/k8s.conf ...
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
* Applying /etc/sysctl.conf ...
[root@slave56 /]#
```

3. slave57设置

```shell script
[root@slave57 /]# sudo bash -c &#39;cat &lt;&lt;EOF &gt;  /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward=1
EOF&#39;

[root@slave57 /]#
[root@slave57 /]# sysctl --system
* Applying /usr/lib/sysctl.d/00-system.conf ...
net.bridge.bridge-nf-call-ip6tables = 0
net.bridge.bridge-nf-call-iptables = 0
net.bridge.bridge-nf-call-arptables = 0
* Applying /usr/lib/sysctl.d/10-default-yama-scope.conf ...
kernel.yama.ptrace_scope = 0
* Applying /usr/lib/sysctl.d/50-default.conf ...
kernel.sysrq = 16
kernel.core_uses_pid = 1
net.ipv4.conf.default.rp_filter = 1
net.ipv4.conf.all.rp_filter = 1
net.ipv4.conf.default.accept_source_route = 0
net.ipv4.conf.all.accept_source_route = 0
net.ipv4.conf.default.promote_secondaries = 1
net.ipv4.conf.all.promote_secondaries = 1
fs.protected_hardlinks = 1
fs.protected_symlinks = 1
* Applying /etc/sysctl.d/99-sysctl.conf ...
* Applying /etc/sysctl.d/k8s.conf ...
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
* Applying /etc/sysctl.conf ...
[root@slave57 /]#
```

#### 七、 三台服务器同时配置kubernetes下载源，关闭SELinux

1. master55设置

```shell script
[root@master55 /]# sudo bash -c &#39;cat &lt;&lt;EOF &gt; /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=http://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=http://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg http://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF&#39;

[root@master55 /]#
[root@master55 /]# sudo setenforce 0
setenforce: SELinux is disabled
[root@master55 /]#
```

2. slave56设置

```shell script
[root@slave56 /]# sudo bash -c &#39;cat &lt;&lt;EOF &gt; /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=http://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=http://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg http://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF&#39;

[root@slave56 /]#
setenforce: SELinux is disabled
[root@slave56 /]# sudo setenforce 0
[root@slave56 /]#
```

3. slave57设置

```shell script
[root@slave57 /]# sudo bash -c &#39;cat &lt;&lt;EOF &gt; /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=http://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=http://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg http://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF&#39;

[root@slave57 /]#
[root@slave57 /]# sudo setenforce 0
setenforce: SELinux is disabled
[root@slave57 /]#
```
#### 八、 查看三台服务器下载源列表，如下成功

```shell script
drwxr-xr-x. 2 root root  187 Jun 16 13:05 backup
-rw-r--r--. 1 root root 2523 Jun 16  2018 CentOS-Base.repo
-rw-r--r--. 1 root root 2424 Oct 19  2019 docker-ce.repo
-rw-r--r--. 1 root root  272 Jun 16 16:34 kubernetes.repo
```

#### 九、 三台服务器设置免密登录
1：manager节点执行：ssh-keygen -t rsa 一路回车到结束，在/root/.ssh/下面会生成一个公钥文件id_rsa.pub

```shell script
[root@master55 /]# ssh-keygen -t rsa
Generating public/private rsa key pair.
Enter file in which to save the key (/root/.ssh/id_rsa):
Created directory &#39;/root/.ssh&#39;.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /root/.ssh/id_rsa.
Your public key has been saved in /root/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:I0PR5fMj01uGGb1Z3pbRFjzwTIFb2ONyZ1M2I9OVTNY root@master55.xincan.cn
The key&#39;s randomart image is:
+---[RSA 2048]----+
|      .. ..  .X**|
|       ...   *=%E|
|      .   o . B=X|
|     .     + * X*|
|      o S o * Bo*|
|       o . o = . |
|            .    |
|                 |
|                 |
+----[SHA256]-----+
[root@master55 /]#     
```

2. 将公钥追加到authorized_keys

```shell script
[root@master55 /]# cat ~/.ssh/id_rsa.pub &gt;&gt; ~/.ssh/authorized_keys
[root@master55 /]# cd ~/.ssh/
[root@master55 .ssh]# ll
total 12
-rw-r--r-- 1 root root  405 Jun 16 17:03 authorized_keys
-rw------- 1 root root 1675 Jun 16 17:01 id_rsa
-rw-r--r-- 1 root root  405 Jun 16 17:01 id_rsa.pub
[root@master55 .ssh]#  
```

3. 修改authorized_keys权限：

```shell script
[root@master55 /]# chmod 600 ~/.ssh/authorized_keys
[root@master55 /]# 
```

4. 将\~/.ssh从master55节点分发到slave56、slave57节点，执行：
scp -r \~/.ssh/ root@slave56:\~/.ssh/
scp -r \~/.ssh/ root@slave57:\~/.ssh/
过程中需要填写yes，然后提示输入slave56、slave57两个节点的登录密码

```shell script
[root@master55 .ssh]# scp -r ~/.ssh/ root@slave56:~/.ssh/
The authenticity of host &#39;slave56 (192.168.1.56)&#39; can&#39;t be established.
ECDSA key fingerprint is SHA256:KhL6Vyv6q5fHHcZ3+xoLn6W/mZ7SBAFD+n/TCXEHtSM.
ECDSA key fingerprint is MD5:71:35:87:3d:ff:73:04:fc:d7:a2:07:30:68:b8:62:5b.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added &#39;slave56,192.168.1.56&#39; (ECDSA) to the list of known hosts.
root@slave56&#39;s password:
id_rsa                                                                                             100% 1675     1.1MB/s   00:00
id_rsa.pub                                                                                         100%  405   282.4KB/s   00:00
authorized_keys                                                                                    100%  405   277.0KB/s   00:00
known_hosts                                                                                        100%  182   104.6KB/s   00:00
[root@master55 .ssh]# scp -r ~/.ssh/ root@slave57:~/.ssh/
The authenticity of host &#39;slave57 (192.168.1.57)&#39; can&#39;t be established.
ECDSA key fingerprint is SHA256:Gfz+xXR217Yb2ZWOIMsRzSe+iynRvpxLnt98cI4kBRA.
ECDSA key fingerprint is MD5:8b:1d:cd:1d:24:79:de:80:c3:53:7c:d3:87:e0:d4:96.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added &#39;slave57,192.168.1.57&#39; (ECDSA) to the list of known hosts.
root@slave57&#39;s password:
id_rsa                                                                                             100% 1675     1.0MB/s   00:00
id_rsa.pub                                                                                         100%  405   304.6KB/s   00:00
authorized_keys                                                                                    100%  405   352.7KB/s   00:00
known_hosts                                                                                        100%  364   271.2KB/s   00:00
[root@master55 .ssh]# 
```

5. 验证master55、slave56、slave57三个节点免密登录
master55节点验证

```shell script
[root@master55 /]# ssh root@slave56
Last login: Tue Jun 16 15:11:10 2020 from 192.168.1.182
[root@slave56 ~]# exit
logout
Connection to slave56 closed.
[root@master55 /]# ssh root@slave57
Last login: Tue Jun 16 15:11:23 2020 from 192.168.1.182
[root@slave57 ~]# exit
logout
Connection to slave57 closed.
[root@master55 /]#
```

slave56节点验证,第一次链接需要输入目标服务密码，后续则不用

```shell script
[root@slave56 ~]# ssh root@master55
The authenticity of host &#39;master55 (192.168.1.55)&#39; can&#39;t be established.
ECDSA key fingerprint is SHA256:Dv4+42UAUC3FCEqZjwxJECtUHMgAYUtD2UsRASyffFw.
ECDSA key fingerprint is MD5:fe:0b:32:39:20:9c:e1:3e:67:b7:3d:42:a1:22:df:2a.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added &#39;master55,192.168.1.55&#39; (ECDSA) to the list of known hosts.
Last login: Tue Jun 16 15:58:21 2020 from 192.168.1.182
[root@master55 ~]# exit
logout
Connection to master55 closed.
[root@slave56 ~]# ssh root@master55
Last login: Tue Jun 16 17:17:38 2020 from 192.168.1.56
[root@master55 ~]# exit
logout
Connection to master55 closed.
[root@slave56 ~]# ssh root@slave57
The authenticity of host &#39;slave57 (192.168.1.57)&#39; can&#39;t be established.
ECDSA key fingerprint is SHA256:Gfz+xXR217Yb2ZWOIMsRzSe+iynRvpxLnt98cI4kBRA.
ECDSA key fingerprint is MD5:8b:1d:cd:1d:24:79:de:80:c3:53:7c:d3:87:e0:d4:96.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added &#39;slave57,192.168.1.57&#39; (ECDSA) to the list of known hosts.
Last login: Tue Jun 16 17:15:27 2020 from 192.168.1.55
[root@slave57 ~]# exit
logout
Connection to slave57 closed.
[root@slave56 ~]# ssh root@slave57
Last login: Tue Jun 16 17:17:59 2020 from 192.168.1.56
[root@slave57 ~]# exit
logout
Connection to slave57 closed.
[root@slave56 ~]#
```

slave57节点验证,第一次链接需要输入目标服务密码，后续则不用

```shell script
[root@slave57 /]# ssh root@master55
The authenticity of host &#39;master55 (192.168.1.55)&#39; can&#39;t be established.
ECDSA key fingerprint is SHA256:Dv4+42UAUC3FCEqZjwxJECtUHMgAYUtD2UsRASyffFw.
ECDSA key fingerprint is MD5:fe:0b:32:39:20:9c:e1:3e:67:b7:3d:42:a1:22:df:2a.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added &#39;master55,192.168.1.55&#39; (ECDSA) to the list of known hosts.
Last login: Tue Jun 16 17:17:42 2020 from 192.168.1.56
[root@master55 ~]# exit
logout
Connection to master55 closed.
[root@slave57 yum.repos.d]# ssh root@master55
Last login: Tue Jun 16 17:19:31 2020 from 192.168.1.57
[root@master55 ~]# exit
logout
Connection to master55 closed.
[root@slave57 yum.repos.d]# ssh root@slave56
Last login: Tue Jun 16 17:15:11 2020 from 192.168.1.55
[root@slave56 ~]# exit
logout
Connection to slave56 closed.
[root@slave57 /]#
```

#### 十、 三台服务器同时安装kubelet kubeadm kubectl
安装完成之后，启动，并设置开机启动

```shell script
sudo yum install -y kubelet-1.18.2 kubeadm-1.18.2 kubectl-1.18.2
systemctl enable kubelet &amp;&amp; sudo systemctl start kubelet
```

#### 十一、以master55为Kubernetes主节点进行Kubernetes初始化

1. 执行命令进行初始化
sudo kubeadm init &amp;minus;&amp;minus;image-repository registry.aliyuncs.com/google_containers &amp;minus;&amp;minus;kubernetes-version v1.18.2 &amp;minus;&amp;minus;apiserver-advertise-address 192.168.1.55 &amp;minus;&amp;minus;pod-network-cidr=10.244.0.0/16 &amp;minus;&amp;minus;token-ttl 0

```shell script
[root@master55 /]# sudo kubeadm init --image-repository registry.aliyuncs.com/google_containers --kubernetes-version v1.18.2 --apiserver-advertise-address 192.168.1.55 --pod-network-cidr=10.244.0.0/16 --token-ttl 0
W0616 17:24:47.742105    8831 configset.go:202] WARNING: kubeadm cannot validate component configs for API groups [kubelet.config.k8s.io kubeproxy.config.k8s.io]
[init] Using Kubernetes version: v1.18.2
[preflight] Running pre-flight checks
[preflight] Pulling images required for setting up a Kubernetes cluster
[preflight] This might take a minute or two, depending on the speed of your internet connection
[preflight] You can also perform this action in beforehand using &#39;kubeadm config images pull&#39;
[kubelet-start] Writing kubelet environment file with flags to file &quot;/var/lib/kubelet/kubeadm-flags.env&quot;
[kubelet-start] Writing kubelet configuration to file &quot;/var/lib/kubelet/config.yaml&quot;
[kubelet-start] Starting the kubelet
[certs] Using certificateDir folder &quot;/etc/kubernetes/pki&quot;
[certs] Generating &quot;ca&quot; certificate and key
[certs] Generating &quot;apiserver&quot; certificate and key
[certs] apiserver serving cert is signed for DNS names [master55.xincan.cn kubernetes kubernetes.default kubernetes.default.svc kubernetes.default.svc.cluster.local] and IPs [10.96.0.1 192.168.1.55]
[certs] Generating &quot;apiserver-kubelet-client&quot; certificate and key
[certs] Generating &quot;front-proxy-ca&quot; certificate and key
[certs] Generating &quot;front-proxy-client&quot; certificate and key
[certs] Generating &quot;etcd/ca&quot; certificate and key
[certs] Generating &quot;etcd/server&quot; certificate and key
[certs] etcd/server serving cert is signed for DNS names [master55.xincan.cn localhost] and IPs [192.168.1.55 127.0.0.1 ::1]
[certs] Generating &quot;etcd/peer&quot; certificate and key
[certs] etcd/peer serving cert is signed for DNS names [master55.xincan.cn localhost] and IPs [192.168.1.55 127.0.0.1 ::1]
[certs] Generating &quot;etcd/healthcheck-client&quot; certificate and key
[certs] Generating &quot;apiserver-etcd-client&quot; certificate and key
[certs] Generating &quot;sa&quot; key and public key
[kubeconfig] Using kubeconfig folder &quot;/etc/kubernetes&quot;
[kubeconfig] Writing &quot;admin.conf&quot; kubeconfig file
[kubeconfig] Writing &quot;kubelet.conf&quot; kubeconfig file
[kubeconfig] Writing &quot;controller-manager.conf&quot; kubeconfig file
[kubeconfig] Writing &quot;scheduler.conf&quot; kubeconfig file
[control-plane] Using manifest folder &quot;/etc/kubernetes/manifests&quot;
[control-plane] Creating static Pod manifest for &quot;kube-apiserver&quot;
[control-plane] Creating static Pod manifest for &quot;kube-controller-manager&quot;
W0616 17:29:47.640484    8831 manifests.go:225] the default kube-apiserver authorization-mode is &quot;Node,RBAC&quot;; using &quot;Node,RBAC&quot;
[control-plane] Creating static Pod manifest for &quot;kube-scheduler&quot;
W0616 17:29:47.646613    8831 manifests.go:225] the default kube-apiserver authorization-mode is &quot;Node,RBAC&quot;; using &quot;Node,RBAC&quot;
[etcd] Creating static Pod manifest for local etcd in &quot;/etc/kubernetes/manifests&quot;
[wait-control-plane] Waiting for the kubelet to boot up the control plane as static Pods from directory &quot;/etc/kubernetes/manifests&quot;. This can take up to 4m0s
[apiclient] All control plane components are healthy after 31.505848 seconds
[upload-config] Storing the configuration used in ConfigMap &quot;kubeadm-config&quot; in the &quot;kube-system&quot; Namespace
[kubelet] Creating a ConfigMap &quot;kubelet-config-1.18&quot; in namespace kube-system with the configuration for the kubelets in the cluster
[upload-certs] Skipping phase. Please see --upload-certs
[mark-control-plane] Marking the node master55.xincan.cn as control-plane by adding the label &quot;node-role.kubernetes.io/master=&#39;&#39;&quot;
[mark-control-plane] Marking the node master55.xincan.cn as control-plane by adding the taints [node-role.kubernetes.io/master:NoSchedule]
[bootstrap-token] Using token: 991hr9.scqkkyphn1cjjcl7
[bootstrap-token] Configuring bootstrap tokens, cluster-info ConfigMap, RBAC Roles
[bootstrap-token] configured RBAC rules to allow Node Bootstrap tokens to get nodes
[bootstrap-token] configured RBAC rules to allow Node Bootstrap tokens to post CSRs in order for nodes to get long term certificate credentials
[bootstrap-token] configured RBAC rules to allow the csrapprover controller automatically approve CSRs from a Node Bootstrap Token
[bootstrap-token] configured RBAC rules to allow certificate rotation for all node client certificates in the cluster
[bootstrap-token] Creating the &quot;cluster-info&quot; ConfigMap in the &quot;kube-public&quot; namespace
[kubelet-finalize] Updating &quot;/etc/kubernetes/kubelet.conf&quot; to point to a rotatable kubelet client certificate and key
[addons] Applied essential addon: CoreDNS
[addons] Applied essential addon: kube-proxy

Your Kubernetes control-plane has initialized successfully!

To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

You should now deploy a pod network to the cluster.
Run &quot;kubectl apply -f [podnetwork].yaml&quot; with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

Then you can join any number of worker nodes by running the following on each as root:

kubeadm join 192.168.1.55:6443 --token 991hr9.scqkkyphn1cjjcl7 \
    --discovery-token-ca-cert-hash sha256:1dcf2607e09f83160ce9bc99a941d9a6bd74e99b6b8d3adb63af800ffee19baf
[root@master55 /]#
```

2. 根据初始化提示，在master55节点上执行如下命令
  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

```shell script
[root@master55 /]# mkdir -p $HOME/.kube
[root@master55 /]# sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
[root@master55 /]# sudo chown $(id -u):$(id -g) $HOME/.kube/config
[root@master55 /]#
```

3. 根据初始化提示，在slave56、slave57节点上分别执行如下命令
 kubeadm join 192.168.1.55:6443 &amp;minus;&amp;minus;token 991hr9.scqkkyphn1cjjcl7 &amp;minus;&amp;minus;discovery-token-ca-cert-hash sha256:1dcf2607e09f83160ce9bc99a941d9a6bd74e99b6b8d3adb63af800ffee19baf

```shell script
W0616 17:50:09.914108    4585 join.go:346] [preflight] WARNING: JoinControlPane.controlPlane settings will be ignored when control-plane flag is not set.
[preflight] Running pre-flight checks
[preflight] Reading configuration from the cluster...
[preflight] FYI: You can look at this config file with &#39;kubectl -n kube-system get cm kubeadm-config -oyaml&#39;
[kubelet-start] Downloading configuration for the kubelet from the &quot;kubelet-config-1.18&quot; ConfigMap in the kube-system namespace
[kubelet-start] Writing kubelet configuration to file &quot;/var/lib/kubelet/config.yaml&quot;
[kubelet-start] Writing kubelet environment file with flags to file &quot;/var/lib/kubelet/kubeadm-flags.env&quot;
[kubelet-start] Starting the kubelet
[kubelet-start] Waiting for the kubelet to perform the TLS Bootstrap...

This node has joined the cluster:
* Certificate signing request was sent to apiserver and a response was received.
* The Kubelet was informed of the new secure connection details.

Run &#39;kubectl get nodes&#39; on the control-plane to see this node join the cluster.

```

#### 十二、Kubernetes命令自动补全（墙裂建议）

```SHELL SCRIPT
[root@master55 ~]# yum install -y epel-release bash-completion
Loaded plugins: fastestmirror
Loading mirror speeds from cached hostfile
 * base: mirrors.aliyun.com
 * extras: mirrors.aliyun.com
 * updates: mirrors.aliyun.com
kubernetes/signature                                                                                                                                                   |  454 B  00:00:00
kubernetes/signature                                                                                                                                                   | 1.4 kB  00:00:00 !!!
Resolving Dependencies
--&gt; Running transaction check
---&gt; Package bash-completion.noarch 1:2.1-6.el7 will be updated
---&gt; Package bash-completion.noarch 1:2.1-8.el7 will be an update
---&gt; Package epel-release.noarch 0:7-11 will be installed
--&gt; Finished Dependency Resolution

Dependencies Resolved

==============================================================================================================================================================================================
 Package                                            Arch                                      Version                                         Repository                                 Size
==============================================================================================================================================================================================
Installing:
 epel-release                                       noarch                                    7-11                                            extras                                     15 k
Updating:
 bash-completion                                    noarch                                    1:2.1-8.el7                                     base                                       87 k

Transaction Summary
==============================================================================================================================================================================================
Install  1 Package
Upgrade  1 Package

Total download size: 101 k
Downloading packages:
No Presto metadata available for base
(1/2): bash-completion-2.1-8.el7.noarch.rpm                                                                                                                            |  87 kB  00:00:00
(2/2): epel-release-7-11.noarch.rpm                                                                                                                                    |  15 kB  00:00:00
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Total                                                                                                                                                         225 kB/s | 101 kB  00:00:00
Running transaction check
Running transaction test
Transaction test succeeded
Running transaction
  Installing : epel-release-7-11.noarch                                                                                                                                                   1/3
  Updating   : 1:bash-completion-2.1-8.el7.noarch                                                                                                                                         2/3
  Cleanup    : 1:bash-completion-2.1-6.el7.noarch                                                                                                                                         3/3
  Verifying  : 1:bash-completion-2.1-8.el7.noarch                                                                                                                                         1/3
  Verifying  : epel-release-7-11.noarch                                                                                                                                                   2/3
  Verifying  : 1:bash-completion-2.1-6.el7.noarch                                                                                                                                         3/3

Installed:
  epel-release.noarch 0:7-11

Updated:
  bash-completion.noarch 1:2.1-8.el7

Complete!
[root@master55 ~]# source /usr/share/bash-completion/bash_completion
[root@master55 ~]#
[root@master55 ~]# source &lt;(kubectl completion bash)
[root@master55 ~]#
[root@master55 ~]# echo &quot;source &lt;(kubectl completion bash)&quot; &gt;&gt; ~/.bashrc
// 输入kubectl, 双击Tab
[root@master55 ~]# kubectl
alpha          apply          certificate    convert        delete         edit           get            options        proxy          scale          uncordon
annotate       attach         cluster-info   cordon         describe       exec           kustomize      patch          replace        set            version
api-resources  auth           completion     cp             diff           explain        label          plugin         rollout        taint          wait
api-versions   autoscale      config         create         drain          expose         logs           port-forward   run            top
[root@master55 ~]# kubectl
```

#### 十三、k8s查看所有节点

master55节点查看所有节点，当前三台服务器的状态都是NotReady

```shell script
[root@master55 /]# kubectl get nodes
NAME                 STATUS     ROLES    AGE   VERSION
master55.xincan.cn   NotReady   master   16h   v1.18.3
slave56.xincan.cn    NotReady   &lt;none&gt;   15h   v1.18.3
slave57.xincan.cn    NotReady   &lt;none&gt;   16h   v1.18.3
[root@master55 /]#
```

#### 十四、k8s查看所有命名空间下所有pod

发现coredns一直处在pending状态，需要安装k8s网络插件

```shell script
[root@master55 /]# kubectl get pod --all-namespaces
NAMESPACE     NAME                                         READY   STATUS    RESTARTS   AGE
kube-system   coredns-7ff77c879f-hz59h                     0/1     Pending   0          16h
kube-system   coredns-7ff77c879f-kkdpn                     0/1     Pending   0          16h
kube-system   etcd-master55.xincan.cn                      1/1     Running   2          16h
kube-system   kube-apiserver-master55.xincan.cn            1/1     Running   2          16h
kube-system   kube-controller-manager-master55.xincan.cn   1/1     Running   2          16h
kube-system   kube-proxy-kdxlv                             1/1     Running   2          16h
kube-system   kube-proxy-mxm5n                             1/1     Running   2          16h
kube-system   kube-proxy-sdnxb                             1/1     Running   2          15h
kube-system   kube-scheduler-master55.xincan.cn            1/1     Running   2          16h
[root@master55 /]#
```

#### 十五、k8s安装网络插件

我们这里选取calico网络插件（提供企业级支持）

1. 在master55节点上创建文件夹，用于存放下载的网络插件，我这里下载的是calico-3.13.1.yaml

```shell script
[root@master55 /]# mkdir k8s
[root@master55 /]# cd k8s/
[root@master55 k8s]# mkdir calico &amp;&amp; cd calico
[root@master55 calico]# wget https://kuboard.cn/install-script/calico/calico-3.13.1.yaml
--2020-06-17 17:42:44--  https://kuboard.cn/install-script/calico/calico-3.13.1.yaml
Resolving kuboard.cn (kuboard.cn)... 119.3.92.138, 122.112.240.69
Connecting to kuboard.cn (kuboard.cn)|119.3.92.138|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 21079 (21K) [application/octet-stream]
Saving to: ‘calico-3.13.1.yaml’

100%[====================================================================================================================================================&gt;] 21,079      --.-K/s   in 0s

2020-06-17 17:42:51 (221 MB/s) - ‘calico-3.13.1.yaml’ saved [21079/21079]

[root@master55 calico]# ls
calico-3.13.1.yaml
[root@master55 calico]#
```

2. 安装calico-3.13.1.yaml

```shell script
[root@master55 calico]# kubectl apply -f calico-3.13.1.yaml
configmap/calico-config created
customresourcedefinition.apiextensions.k8s.io/bgpconfigurations.crd.projectcalico.org created
customresourcedefinition.apiextensions.k8s.io/bgppeers.crd.projectcalico.org created
customresourcedefinition.apiextensions.k8s.io/blockaffinities.crd.projectcalico.org created
customresourcedefinition.apiextensions.k8s.io/clusterinformations.crd.projectcalico.org created
customresourcedefinition.apiextensions.k8s.io/felixconfigurations.crd.projectcalico.org created
customresourcedefinition.apiextensions.k8s.io/globalnetworkpolicies.crd.projectcalico.org created
customresourcedefinition.apiextensions.k8s.io/globalnetworksets.crd.projectcalico.org created
customresourcedefinition.apiextensions.k8s.io/hostendpoints.crd.projectcalico.org created
customresourcedefinition.apiextensions.k8s.io/ipamblocks.crd.projectcalico.org created
customresourcedefinition.apiextensions.k8s.io/ipamconfigs.crd.projectcalico.org created
customresourcedefinition.apiextensions.k8s.io/ipamhandles.crd.projectcalico.org created
customresourcedefinition.apiextensions.k8s.io/ippools.crd.projectcalico.org created
customresourcedefinition.apiextensions.k8s.io/networkpolicies.crd.projectcalico.org created
customresourcedefinition.apiextensions.k8s.io/networksets.crd.projectcalico.org created
clusterrole.rbac.authorization.k8s.io/calico-kube-controllers created
clusterrolebinding.rbac.authorization.k8s.io/calico-kube-controllers created
clusterrole.rbac.authorization.k8s.io/calico-node created
clusterrolebinding.rbac.authorization.k8s.io/calico-node created
daemonset.apps/calico-node created
serviceaccount/calico-node created
deployment.apps/calico-kube-controllers created
serviceaccount/calico-kube-controllers created
[root@master55 calico]#
```

#### 十六、再次查看node和pod

需要等待一会时间
1. 查看nodes，发现状态已经为Ready

```shell script
[root@master55 /]# kubectl get nodes
NAME                 STATUS   ROLES    AGE   VERSION
master55.xincan.cn   Ready    master   16h   v1.18.3
slave56.xincan.cn    Ready    &lt;none&gt;   16h   v1.18.3
slave57.xincan.cn    Ready    &lt;none&gt;   16h   v1.18.3
[root@master55 /]# 
```
2. 查看pods，发现状态都为Running

```shell script
[root@master55 /]# kubectl get pod --all-namespaces
NAMESPACE     NAME                                         READY   STATUS    RESTARTS   AGE
kube-system   calico-kube-controllers-5b8b769fcd-cbqpr     1/1     Running   0          6m21s
kube-system   calico-node-fnv55                            1/1     Running   0          6m21s
kube-system   calico-node-rbpc8                            1/1     Running   0          6m21s
kube-system   calico-node-xrsbf                            1/1     Running   0          6m21s
kube-system   coredns-7ff77c879f-hz59h                     1/1     Running   0          16h
kube-system   coredns-7ff77c879f-kkdpn                     1/1     Running   0          16h
kube-system   etcd-master55.xincan.cn                      1/1     Running   2          16h
kube-system   kube-apiserver-master55.xincan.cn            1/1     Running   2          16h
kube-system   kube-controller-manager-master55.xincan.cn   1/1     Running   2          16h
kube-system   kube-proxy-kdxlv                             1/1     Running   2          16h
kube-system   kube-proxy-mxm5n                             1/1     Running   2          16h
kube-system   kube-proxy-sdnxb                             1/1     Running   2          16h
kube-system   kube-scheduler-master55.xincan.cn            1/1     Running   2          16h
[root@master55 /]# 
```

#### 十七、安装git

```shell script
[root@master55 /]# yum install curl-devel expat-devel gettext-devel openssl-devel zlib-devel gcc perl-ExtUtils-MakeMaker
[root@master55 /]# cd /usr/local/src/
[root@master55 src]# wget https://mirrors.edge.kernel.org/pub/software/scm/git/git-2.23.0.tar.xz
[root@master55 src]# tar -xvf git-2.23.0.tar.xz
[root@master55 src]# cd git-2.23.0/
[root@master55 src]# make prefix=/usr/local/git all
[root@master55 src]# make prefix=/usr/local/git install
[root@master55 src]# echo &quot;export PATH=$PATH:/usr/local/git/bin&quot; &gt;&gt; /etc/profile
[root@master55 src]# source  /etc/profile
```

#### 十八、kube-promethues部署
1. 下载安装源码，切换到上述创建的k8s目录下，进行git clone https://github.com/coreos/kube-prometheus.git拉取
2. 安装文件都在kube-prometheus/manifests/ 目录下，切换到此目录

```shell script
[root@master55 k8s]# git clone https://github.com/coreos/kube-prometheus.git
Cloning into &#39;kube-prometheus&#39;...
remote: Enumerating objects: 8381, done.
remote: Total 8381 (delta 0), reused 0 (delta 0), pack-reused 8381
Receiving objects: 100% (8381/8381), 4.70 MiB | 421.00 KiB/s, done.
Resolving deltas: 100% (5082/5082), done.
[root@master55 k8s]# ls
calico  kube-prometheus
[root@master55 k8s]# cd kube-prometheus/manifests/
[root@master55 manifests]# ls
alertmanager-alertmanager.yaml              node-exporter-clusterRoleBinding.yaml                       prometheus-clusterRole.yaml
alertmanager-secret.yaml                    node-exporter-clusterRole.yaml                              prometheus-operator-serviceMonitor.yaml
alertmanager-serviceAccount.yaml            node-exporter-daemonset.yaml                                prometheus-prometheus.yaml
alertmanager-serviceMonitor.yaml            node-exporter-serviceAccount.yaml                           prometheus-roleBindingConfig.yaml
alertmanager-service.yaml                   node-exporter-serviceMonitor.yaml                           prometheus-roleBindingSpecificNamespaces.yaml
grafana-dashboardDatasources.yaml           node-exporter-service.yaml                                  prometheus-roleConfig.yaml
grafana-dashboardDefinitions.yaml           prometheus-adapter-apiService.yaml                          prometheus-roleSpecificNamespaces.yaml
grafana-dashboardSources.yaml               prometheus-adapter-clusterRoleAggregatedMetricsReader.yaml  prometheus-rules.yaml
grafana-deployment.yaml                     prometheus-adapter-clusterRoleBindingDelegator.yaml         prometheus-serviceAccount.yaml
grafana-serviceAccount.yaml                 prometheus-adapter-clusterRoleBinding.yaml                  prometheus-serviceMonitorApiserver.yaml
grafana-serviceMonitor.yaml                 prometheus-adapter-clusterRoleServerResources.yaml          prometheus-serviceMonitorCoreDNS.yaml
grafana-service.yaml                        prometheus-adapter-clusterRole.yaml                         prometheus-serviceMonitorKubeControllerManager.yaml
kube-state-metrics-clusterRoleBinding.yaml  prometheus-adapter-configMap.yaml                           prometheus-serviceMonitorKubelet.yaml
kube-state-metrics-clusterRole.yaml         prometheus-adapter-deployment.yaml                          prometheus-serviceMonitorKubeScheduler.yaml
kube-state-metrics-deployment.yaml          prometheus-adapter-roleBindingAuthReader.yaml               prometheus-serviceMonitor.yaml
kube-state-metrics-serviceAccount.yaml      prometheus-adapter-serviceAccount.yaml                      prometheus-service.yaml
kube-state-metrics-serviceMonitor.yaml      prometheus-adapter-service.yaml                             setup
kube-state-metrics-service.yaml             prometheus-clusterRoleBinding.yaml
[root@master55 manifests]#
```

3. 官方把所有文件都放在一起,这里我复制了然后分类下，切换到k8s目录下进行操作

```shell script
[root@master55 k8s]# mkdir prometheus
[root@master55 k8s]# cp kube-prometheus/manifests/* prometheus/
[root@master55 k8s]# cd prometheus/
[root@master55 prometheus]# mkdir -p operator node-exporter alertmanager grafana kube-state-metrics prometheus serviceMonitor adapter
```

4. 将kube-prometheus/manifests/setup下的文件都复制到/prometheus/operator/下

```shell script
[root@master55 k8s]# cp -f kube-prometheus/manifests/setup/* /k8s/prometheus/operator/
```

5. 将prometheus/operator/下0namespace-namespace.yaml文件移动到/k8s/prometheus/下

```shell script
[root@master55 k8s]# mv prometheus/operator/0namespace-namespace.yaml prometheus/
```

6. 切换到prometheus/目录下，进行文件归置

```shell script
[root@master55 k8s]# cd prometheus/
[root@master55 prometheus]# mv *-serviceMonitor* serviceMonitor/
[root@master55 prometheus]# mv grafana-* grafana/
[root@master55 prometheus]# mv kube-state-metrics-* kube-state-metrics/
[root@master55 prometheus]# mv alertmanager-* alertmanager/
[root@master55 prometheus]# mv node-exporter-* node-exporter/
[root@master55 prometheus]# mv prometheus-adapter* adapter/
[root@master55 prometheus]# mv prometheus-* prometheus/
```

7. 注意：新版本的默认label变了，需要修改选择器为beta.kubernetes.io/os，不然安装的时候会卡住,修改选择器

```shell script
[root@master55 prometheus]# sed -ri &#39;/linux/s#kubernetes.io#beta.&amp;#&#39; \
     alertmanager/alertmanager-alertmanager.yaml \
     prometheus/prometheus-prometheus.yaml \
     node-exporter/node-exporter-daemonset.yaml \
     kube-state-metrics/kube-state-metrics-deployment.yaml
[root@master55 prometheus]#
```

7. 注意：镜像使用dockerhub上的

```shell script
[root@master55 prometheus]# sed -ri &#39;/quay.io/s#quay.io/prometheus#prom#&#39; \
  alertmanager/alertmanager-alertmanager.yaml \
  prometheus/prometheus-prometheus.yaml \
  node-exporter/node-exporter-daemonset.yaml
[root@master55 prometheus]#
```

8. 注意：镜像使用dockerhub上的

```shell script
[root@master55 prometheus]# find -type f -exec sed -ri &#39;s#k8s.gcr.io#gcr.azk8s.cn/google_containers#&#39; {} \; 
[root@master55 prometheus]#
```

9. 生成namespace

```shell script
[root@master55 prometheus]# kubectl apply -f .
namespace/monitoring created
[root@master55 prometheus]#
```

10. 安装operater

```shell script
[root@master55 prometheus]# kubectl apply -f operator/
customresourcedefinition.apiextensions.k8s.io/alertmanagers.monitoring.coreos.com created
customresourcedefinition.apiextensions.k8s.io/podmonitors.monitoring.coreos.com created
customresourcedefinition.apiextensions.k8s.io/prometheuses.monitoring.coreos.com created
customresourcedefinition.apiextensions.k8s.io/prometheusrules.monitoring.coreos.com created
customresourcedefinition.apiextensions.k8s.io/servicemonitors.monitoring.coreos.com created
customresourcedefinition.apiextensions.k8s.io/thanosrulers.monitoring.coreos.com created
clusterrole.rbac.authorization.k8s.io/prometheus-operator created
clusterrolebinding.rbac.authorization.k8s.io/prometheus-operator created
deployment.apps/prometheus-operator created
service/prometheus-operator created
serviceaccount/prometheus-operator created
[root@master55 prometheus]#
```

11. 依次安装其他组件

```shell script
[root@master55 prometheus]# kubectl apply -f adapter/
[root@master55 prometheus]# kubectl apply -f alertmanager/
[root@master55 prometheus]# kubectl apply -f node-exporter/
[root@master55 prometheus]# kubectl apply -f kube-state-metrics/
[root@master55 prometheus]# kubectl apply -f grafana/
[root@master55 prometheus]# kubectl apply -f prometheus/
[root@master55 prometheus]# kubectl apply -f serviceMonitor/
[root@master55 prometheus]#
```

12. 查看整体状态

```shell script
[root@master55 /]# kubectl -n monitoring get all
NAME                                       READY   STATUS    RESTARTS   AGE
pod/alertmanager-main-0                    2/2     Running   0          28m
pod/alertmanager-main-1                    2/2     Running   0          28m
pod/alertmanager-main-2                    2/2     Running   0          28m
pod/grafana-5c55845445-hzhbk               1/1     Running   0          38m
pod/kube-state-metrics-665c856fb9-7ggrg    3/3     Running   0          38m
pod/node-exporter-dqfd7                    2/2     Running   0          39m
pod/node-exporter-gf8gr                    2/2     Running   0          39m
pod/node-exporter-mcl79                    2/2     Running   0          39m
pod/prometheus-adapter-5cdcdf9c8d-665fj    1/1     Running   0          39m
pod/prometheus-operator-6f98f66b89-6spkk   2/2     Running   0          32m

NAME                            TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)                      AGE
service/alertmanager-main       ClusterIP   10.111.117.158   &lt;none&gt;        9093/TCP                     39m
service/alertmanager-operated   ClusterIP   None             &lt;none&gt;        9093/TCP,9094/TCP,9094/UDP   28m
service/grafana                 ClusterIP   10.111.25.63     &lt;none&gt;        3000/TCP                     38m
service/kube-state-metrics      ClusterIP   None             &lt;none&gt;        8443/TCP,9443/TCP            38m
service/node-exporter           ClusterIP   None             &lt;none&gt;        9100/TCP                     39m
service/prometheus-adapter      ClusterIP   10.109.99.195    &lt;none&gt;        443/TCP                      39m
service/prometheus-k8s          ClusterIP   10.110.243.126   &lt;none&gt;        9090/TCP                     38m
service/prometheus-operator     ClusterIP   None             &lt;none&gt;        8443/TCP                     32m

NAME                           DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR                 AGE
daemonset.apps/node-exporter   3         3         3       3            3           beta.kubernetes.io/os=linux   39m

NAME                                  READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/grafana               1/1     1            1           38m
deployment.apps/kube-state-metrics    1/1     1            1           38m
deployment.apps/prometheus-adapter    1/1     1            1           39m
deployment.apps/prometheus-operator   1/1     1            1           32m

NAME                                             DESIRED   CURRENT   READY   AGE
replicaset.apps/grafana-5c55845445               1         1         1       38m
replicaset.apps/kube-state-metrics-665c856fb9    1         1         1       38m
replicaset.apps/prometheus-adapter-5cdcdf9c8d    1         1         1       39m
replicaset.apps/prometheus-operator-6f98f66b89   1         1         1       32m

NAME                                 READY   AGE
statefulset.apps/alertmanager-main   3/3     28m
[root@master55 /]#
```


13. k8s查看所有svc

```shell script
[root@master55 prometheus]# kubectl -n monitoring get svc
NAME                    TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)                      AGE
alertmanager-main       ClusterIP   10.111.117.158   &lt;none&gt;        9093/TCP                     115m
alertmanager-operated   ClusterIP   None             &lt;none&gt;        9093/TCP,9094/TCP,9094/UDP   104m
grafana                 NodePort    10.111.25.63     &lt;none&gt;        3000:31533/TCP               114m
kube-state-metrics      ClusterIP   None             &lt;none&gt;        8443/TCP,9443/TCP            115m
node-exporter           ClusterIP   None             &lt;none&gt;        9100/TCP                     115m
prometheus-adapter      ClusterIP   10.109.99.195    &lt;none&gt;        443/TCP                      115m
prometheus-k8s          ClusterIP   10.110.243.126   &lt;none&gt;        9090/TCP                     114m
prometheus-operator     ClusterIP   None             &lt;none&gt;        8443/TCP                     108m
[root@master55 prometheus]#
```

13. k8s暴露grafana外网访问端口
     修改type: ClusterIP为 type: NodePort ,默认外网端口NodePort对应的是31533，找到如下代码，

```shell script
[root@master55 prometheus]# kubectl -n monitoring edit svc grafana

spec:
  clusterIP: 10.111.25.63
  externalTrafficPolicy: Cluster
  ports:
  - name: http
    nodePort: 31533
    port: 3000
    protocol: TCP
    targetPort: http
  selector:
    app: grafana
  sessionAffinity: None
  type: NodePort

```

14. 最终效果图（部分效果图）

![效果图一](https://cdn.jsdelivr.net/gh/xincan/blog-database/blog/centos-k8s-5.png)
![效果图一](https://cdn.jsdelivr.net/gh/xincan/blog-database/blog/centos-k8s-4.png)
![效果图一](https://cdn.jsdelivr.net/gh/xincan/blog-database/blog/centos-k8s-3.png)

#### 十九、 安装kubernetes-dashboard

下载dashboard所需资源
    git clone https://github.com/xincan/kubernetes.git

```shell script
[root@xincan /]#cd /k8s/
[root@xincan k8s]#git clone https://github.com/xincan/kubernetes.git
[root@xincan k8s]#ls
calico  kube-prometheus  kubernetes-dashboard  prometheus
[root@master55 k8s]# cd kubernetes-dashboard/
[root@master55 kubernetes-dashboard]# ls
login-token  recommended.yaml
[root@master55 kubernetes-dashboard]#kubectl create -f recommended.yaml
namespace/kubernetes-dashboard created
serviceaccount/kubernetes-dashboard created
service/kubernetes-dashboard created
secret/kubernetes-dashboard-certs created
secret/kubernetes-dashboard-csrf created
secret/kubernetes-dashboard-key-holder created
configmap/kubernetes-dashboard-settings created
role.rbac.authorization.k8s.io/kubernetes-dashboard created
clusterrole.rbac.authorization.k8s.io/kubernetes-dashboard created
rolebinding.rbac.authorization.k8s.io/kubernetes-dashboard created
clusterrolebinding.rbac.authorization.k8s.io/kubernetes-dashboard created
deployment.apps/kubernetes-dashboard created
service/dashboard-metrics-scraper created
deployment.apps/dashboard-metrics-scraper created
[root@master55 kubernetes-dashboard]#
## 查看kubernetes-dashboard命名空间下pod，svc
[root@master55 kubernetes-dashboard]# kubectl get pod,svc -n kubernetes-dashboard
NAME                                             READY   STATUS              RESTARTS   AGE
pod/dashboard-metrics-scraper-779f5454cb-hzgc4   1/1     ContainerCreating   0          30s
pod/kubernetes-dashboard-857bb4c778-gsf2q        1/1     ContainerCreating   0          30s

NAME                                TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
service/dashboard-metrics-scraper   ClusterIP   10.105.54.169   &lt;none&gt;        8000/TCP   30s
service/kubernetes-dashboard        ClusterIP   10.110.40.170   &lt;none&gt;        443/TCP    31s
[root@master55 kubernetes-dashboard]#
## 增加nodePort: 30001,设置dashboard访问端口，修改type: NodePort,保存退出自动更新
## 也可以使用kubectl patch svc -n kube-system kubernetes-dashboard -p &#39;{&quot;spec&quot;:{&quot;type&quot;:&quot;NodePort&quot;}}&#39;进行修改
[root@master55 kubernetes-dashboard]#kubectl edit svc -n kubernetes-dashboard kubernetes-dashboard
spec:
  clusterIP: 10.110.40.170
  externalTrafficPolicy: Cluster
  ports:
  - nodePort: 30000
    port: 443
    protocol: TCP
    targetPort: 8443
  selector:
    k8s-app: kubernetes-dashboard
  sessionAffinity: None
  type: NodePort

dit cancelled, no changes made.
## 修改完成后，可以看到kubernetes-dashboard的type为NodePort，端口为30000
[root@master55 kubernetes-dashboard]# kubectl get svc -n kubernetes-dashboard kubernetes-dashboard
NAME                   TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)         AGE
kubernetes-dashboard   NodePort   10.110.40.170   &lt;none&gt;        443:30001/TCP   14m
[root@master55 kubernetes-dashboard]#
```

#### 二十、 Token令牌登录

```shell script
## 在kube-system命名空间下创建xincan-dashboard-admin用户
[root@master55 k8s]# kubectl create serviceaccount xincan-dashboard-admin -n kube-system
serviceaccount/xincan-dashboard-admin created
## 查看用户
[root@master55 k8s]# kubectl get serviceaccount xincan-dashboard-admin -n kube-system
NAME                     SECRETS   AGE
xincan-dashboard-admin   1         7s
[root@master55 k8s]#

## 在kube-system命名空间下，创建xincan-dashboard-admin权限
[root@master55 k8s]# kubectl create clusterrolebinding dashboard-cluster-admin --clusterrole=cluster-admin --serviceaccount=kube-system:xincan-dashboard-admin
clusterrolebinding.rbac.authorization.k8s.io/dashboard-cluster-admin created

## 查看权限xincan-dashboard-admin是否生效
[root@master55 k8s]# kubectl get secret -n kube-system
NAME                                             TYPE                                  DATA   AGE
attachdetach-controller-token-fk6c9              kubernetes.io/service-account-token   3      91m
bootstrap-signer-token-kjw62                     kubernetes.io/service-account-token   3      91m
bootstrap-token-90s06v                           bootstrap.kubernetes.io/token         7      91m
calico-kube-controllers-token-6824q              kubernetes.io/service-account-token   3      85m
calico-node-token-22rkl                          kubernetes.io/service-account-token   3      85m
certificate-controller-token-4zhbc               kubernetes.io/service-account-token   3      91m
clusterrole-aggregation-controller-token-vzbqs   kubernetes.io/service-account-token   3      91m
coredns-token-xrqs4                              kubernetes.io/service-account-token   3      91m
xincan-dashboard-admin-token-jkhl2               kubernetes.io/service-account-token   3      3m35s
[root@master55 k8s]#

## 获取xincan-dashboard-admin-token-jkhl2的token令牌
[root@master55 k8s]# kubectl describe secret -n kube-system xincan-dashboard-admin-token-jkhl2
Name:         xincan-dashboard-admin-token-jkhl2
Namespace:    kube-system
Labels:       &lt;none&gt;
Annotations:  kubernetes.io/service-account.name: xincan-dashboard-admin
              kubernetes.io/service-account.uid: c257c2f8-57cf-41d7-b8e6-b833a8ef0790

Type:  kubernetes.io/service-account-token

Data
====
ca.crt:     1025 bytes
namespace:  11 bytes
token:      eyJhbGciOiJSUzI1NiIsImtpZCI6IkFfZDQ5YTBkcTIwVG1xdF9rWFJxWDJfblFMd1lfdWQwdllVVjFxZTVtcTQifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJ4aW5jYW4tZGFzaGJvYXJkLWFkbWluLXRva2VuLWpraGwyIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQubmFtZSI6InhpbmNhbi1kYXNoYm9hcmQtYWRtaW4iLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC51aWQiOiJjMjU3YzJmOC01N2NmLTQxZDctYjhlNi1iODMzYThlZjA3OTAiLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6a3ViZS1zeXN0ZW06eGluY2FuLWRhc2hib2FyZC1hZG1pbiJ9.rPDqRpuVrQmTXJ7FHKz8isG4IqYs7aN5QgZCLVRLK1Ul0677pmPfFTgZpVzf5R9f6_h7kFLGFej9wq5QJ3NZn71jv1qhn9rYgabyZ9KsDZsE6SDwQQuHcVDz7iQ9prFezyqdiyBIxqoFEFhZyZe8pn-Ua53a7-P4Dm2xs2xMgbvrLt6b_b8--H_plV-6xrLKrM5BhG15HDi5MA7MXBZJzxTyuNC8CtjQ6ShuQFv5I3Fwqgugu9tqxGBk9Xjy82JGrdnvoSNRNThCMzlVZmClzrsT6CZ4BUw4t0x4dYhvbdo6IS5nnW0u_EOsaDdi1gqBjpeMX_tNT1ChqN55TnnPPw
[root@master55 k8s]#
## 复制令牌然后到登录界面进行粘贴

```
![token登录方式](https://cdn.jsdelivr.net/gh/xincan/blog-database/blog/k8s-token-login.png)


#### 二十、 KubeConfig登录

```shell script

[root@master55 k8s]# DASH_TOCKEN=$(kubectl get secret -n kube-system xincan-dashboard-admin-token-jkhl2 -o jsonpath={.data.token}|base64 -d)
[root@master55 k8s]# kubectl config set-cluster kubernetes --server=https://kubernetes.docker.internal:6443 --kubeconfig=/k8s/xincan-dashbord-admin.conf
Cluster &quot;kubernetes&quot; set.
[root@master55 k8s]# kubectl config set-credentials xincan-dashboard-admin --token=$DASH_TOCKEN --kubeconfig=/k8s/xincan-dashbord-admin.conf
User &quot;xincan-dashboard-admin&quot; set.
[root@master55 k8s]# kubectl config set-context dashboard-admin@kubernetes --cluster=kubernetes --user=xincan-dashboard-admin --kubeconfig=/k8s/xincan-dashbord-admin.conf
Context &quot;dashboard-admin@kubernetes&quot; created.
[root@master55 k8s]# kubectl config use-context dashboard-admin@kubernetes --kubeconfig=/k8s/xincan-dashbord-admin.conf
Switched to context &quot;dashboard-admin@kubernetes&quot;.
[root@master55 k8s]# ll
total 710420
-rw-r--r-- 1 root root     21079 Jul 12 22:24 calico-3.13.1.yaml
-rwxr-xr-x 1 root root      2051 Jul 16 14:40 get-k8s-images.sh
-rw-r--r-- 1 root root 727422976 Jul 16 14:57 k8s-imagesV1.18.5.tar
-rw-r--r-- 1 root root       901 Jul 16 15:54 k8s-token
drwxr-xr-x 3 root root      4096 Jul 16 17:47 kube-prometheus
drwxr-xr-x 2 root root        30 Jul 16 17:47 kubernetes-dashboard
-rw------- 1 root root      1321 Jul 16 17:01 xincan-dashbord-admin.conf
[root@master55 k8s]#

## 将生成后的xincan-dashbord-admin.conf复制到登录的主机，在需要时，上传这个配置文件即可

```

![token登录方式](https://cdn.jsdelivr.net/gh/xincan/blog-database/blog/k8s-kubeconfig-login.png)

![kubernetes主界面](https://cdn.jsdelivr.net/gh/xincan/blog-database/blog/k8s-main.png)</textarea>

