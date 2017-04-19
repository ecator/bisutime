<?php
namespace app\index\controller;

use think\Controller;
use think\Db;
use think\Request;
use app\index\model\Gallery;

class Index extends Controller
{
    public function index()
    {
        $this->assign("title","二外时间");
        $this->assign("list",getRandomImgs());
        return $this->fetch();
    }
    public function upload(Request $request){
        $file=$request->file("photopath");
        $photographer=$request->post("photographer");
        $info=$file->rule("uniqid")->validate(['size'=>1024000,'ext'=>'jpg,png,bmp'])->move(ROOT_PATH."public".DS."gallery");
        if ($info){
            //写入数据库
            $gallery=new Gallery();
            $data=array("photographer"=>$photographer,"filename"=>$info->getFilename());
            $gallery->save($data);
            $this->success("上传成功");
        }else{
            $this->error($file->getError());
        }
    }
}