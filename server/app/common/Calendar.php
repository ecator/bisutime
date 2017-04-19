<?php
/**
 * Created by PhpStorm.
 * User: qule
 * Date: 2017/4/17
 * Time: 21:59
 * 校历标准对象
 */

namespace app\common;


class Calendar
{
    public $title;
    public $start;
    public $end;
    public $holidays=array();
    public $studies=array();
    public $tests=array();
    public $replacements=array();
    public function __construct($title)
    {
        $this->title=$title;
    }
    public function addHoliday($start,$end){
        $holiday=new \stdClass();
        $holiday->start=$start;
        $holiday->end=$end;
        $this->holidays[]=$holiday;
    }
    public function addTest($start,$end){
        $test=new \stdClass();
        $test->start=$start;
        $test->end=$end;
        $this->tests[]=$test;
    }
    public function addStudy($start,$end){
        $study=new \stdClass();
        $study->start=$start;
        $study->end=$end;
        $this->studies[]=$study;
    }
    public function addReplacement($title,$date){
        $replacement=new \stdClass();
        $replacement->title=$title;
        $replacement->date=$date;
        $this->replacements[]=$replacement;
    }
}