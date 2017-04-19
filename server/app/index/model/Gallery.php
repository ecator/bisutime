<?php
/**
 * Created by PhpStorm.
 * User: qule
 * Date: 2017/4/14
 * Time: 14:20
 */

namespace app\index\model;
use think\Model;

class Gallery extends Model
{
    protected $table="gallery";
    protected $autoWriteTimestamp="datetime";
    protected $auto=["filename"];

}