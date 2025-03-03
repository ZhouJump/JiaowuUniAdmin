wget -c https://download1.dcloud.net.cn/download/HBuilderX.4.51.2025010802-dev.linux_x64.full.tar.gz  
tar -zxvf HBuilderX.4.51.2025010802-dev.linux_x64.full.tar.gz
cd HBuilderX
./cli open
cli project open --path ../
cli publish --platform h5 --project 掌上教务后台