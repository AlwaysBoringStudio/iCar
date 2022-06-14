function Turn_left () {
    CUHK_JC_iCar_Vehicle.CarCtrlSpeed(CUHK_JC_iCar_Vehicle.CarState.Car_Left, 80)
}
function Turn_right () {
    CUHK_JC_iCar_Vehicle.CarCtrlSpeed(CUHK_JC_iCar_Vehicle.CarState.Car_Right, 80)
}
function face_following_mode () {
    huskylens.request()
    if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        xcenter = huskylens.readeBox(1, Content1.xCenter)
        if (xcenter < 80) {
            Turn_left()
        }
        if (xcenter >= 80 && xcenter <= 240) {
            MoveForward()
        }
        if (xcenter > 240) {
            Turn_right()
        }
    } else {
        CUHK_JC_iCar_Vehicle.CarCtrl(CUHK_JC_iCar_Vehicle.CarState.Car_Stop)
    }
}
function MoveForward () {
    CUHK_JC_iCar_Vehicle.CarCtrlSpeed(CUHK_JC_iCar_Vehicle.CarState.Car_Run, 80)
}
let xcenter = 0
huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_FACE_RECOGNITION)
basic.showIcon(IconNames.Yes)
basic.forever(function () {
    face_following_mode()
})
