<?php
namespace app\app\controller;

use think\Controller;
use app\app\model\Utils;
use app\app\model\Constant;
use app\common\model\Param;
use app\common\model\Position;

class Positionmanage extends Controller {

    public function index() {
        if (Utils::userAlreadyLogin()) {
            return view();
        } else {
            $this->error(Constant::PLEASELOGIN, Constant::LOGINPATH);
        }
    }

    /**
     * table接口
     */
    public function selectPos() {
        if (Utils::userAlreadyLogin()) {
            $positions = Position::getAll();
            $positionsByPage = Position::getByPage(Param::get("limit"), Param::get("page"));
            $result = [
                "code" => 0,
                "msg" => "",
                "count" => count($positions),
                "data" => $positionsByPage
            ];
            return $result;
        } else {
            $this->error(Constant::PLEASELOGIN, Constant::LOGINPATH);
        } 
    }

    /**
     * 添加部门
     */
    public function insertPos() {
        if (Utils::userAlreadyLogin()) {
            $co = $this->checkOnlyAndNull();
            if ($co['code'] == 0) {
                return json_encode($co);
            }
            Position::insert($this->getFields());
            return json_encode(Utils::returnCode(1));
        } else {
            $this->error(Constant::PLEASELOGIN, Constant::LOGINPATH);
        }
    }

    /**
     * 修改部门
     */
    public function updatePos() {
        if (Utils::userAlreadyLogin()) {
            $co = $this->checkOnlyAndNull();
            if ($co['code'] == 0) {
                return json_encode($co);
            }
            $dep = new Position(Param::get("posId"));
            $dep->update($this->getFields());
            return json_encode(Utils::returnCode(1));
        } else {
            $this->error(Constant::PLEASELOGIN, Constant::LOGINPATH);
        }
    }

    /**
     * 批量删除部门
     */
    public function deletePoses() {
        if (Utils::userAlreadyLogin()) {
            $datas = json_decode(Param::get("data"), true);
            foreach ($datas as $data) {
                if ($data['pos_id'] != "" && $data['pos_id'] > 1) {
                    $pos = new Position($data['pos_id']);
                    $pos->delete();
                }
            }
            return json_encode(Utils::returnCode(1));
        } else {
            $this->error(Constant::PLEASELOGIN, Constant::LOGINPATH);
        }
    }

    /**
     * 删除部门
     */
    public function deletePos() {
        if (Utils::userAlreadyLogin()) {
            $posId = Param::get("posId");
            if ($posId != "" && $posId < 2) {
                return Utils::returnMsg(0, "posRootError");
            }
            $pos = new Position($posId);
            $pos->delete();
            return json_encode(Utils::returnCode(1));
        } else {
            $this->error(Constant::PLEASELOGIN, Constant::LOGINPATH);
        }
    }

    /**
     * 获取Request中的数据库字段
     */
    private function getFields() {
        $result = [
            "pos_no" => Param::get("posNo"),
            "pos_name" => Param::get("posName"),
            "pos_remark" => Param::get("posRemark")
        ];
        return $result;
    }

    /**
     * 检查唯一字段
     */
    private function checkOnlyAndNull() {
        $posNo = Param::get("posNo");
        $posId = Param::get("posId");
        if ($posId != "" && $posId < 2) {
            return Utils::returnMsg(0, "posRootError");
        }
        if (Position::checkPos_no($posNo)) {
            if ($posId == "") {
                return Utils::returnMsg(0, "posNoError");
            } else {
                $pos = new Position($posId);
                if ($pos->getPos_no() != $posNo) {
                    return Utils::returnMsg(0, "posNoError");
                }
            }
            
        }
        if (Param::get("posNo") == "" || Param::get("posName") == "") {
            return Utils::returnMsg(0, "nullError");
        }
        return Utils::returnCode(1);
    }
    
}

    