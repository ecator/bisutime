<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 流年 <liu21st@gmail.com>
// +----------------------------------------------------------------------

// 应用公共文件
use think\Db;
use think\Config;
use think\Session;

/**
 * 判断环境来决定是否关闭调试模式
 * 部署环境关闭调试
 * 开发环境开启调试
 * 部署环境+管理员登录模式也开启调试
 */
if(strpos($_SERVER["HTTP_HOST"],"local")===false) Config::set("app_debug",false);
if (Session::has("status") && Session::get("status")==1) Config::set("app_debug",true);

//随机返回一组图片
function getRandomImgs($max=20){
    $gallerys=Db::table("gallery")->where("status",1)->order("create_time desc")->select();
    $keys=array();
    $res=array();
    do{
        if (count($gallerys)==0){
            break;
        }
        $key=rand(0,count($gallerys)-1);
        if (!array_keys($keys,$key,true) && file_exists(ROOT_PATH."public".DS."gallery".DS.$gallerys[$key]["filename"])){
            $keys[]=$key;
            $res[]=array(
                "src"=>$_SERVER["REQUEST_SCHEME"]."://".$_SERVER["HTTP_HOST"]."/gallery/".$gallerys[$key]["filename"],
                "photographer"=>$gallerys[$key]["photographer"]
            );
        }
        if (count($keys)==count($gallerys)){
            break;
        }
    }while(count($keys)<$max);
    return $res;
}