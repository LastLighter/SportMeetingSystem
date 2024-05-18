import type { Menu } from "@/api/component/type";
import projectIcon from '@/assets/svg/menu/project.svg'
import sportMeetingIcon from '@/assets/svg/menu/sportMeeting.svg'
import scoreIcon from '@/assets/svg/menu/score.svg'
import failIcon from '@/assets/svg/menu/fail.svg'
import pushIcon from '@/assets/svg/menu/push.svg'


const menu:Menu[] = [{
    menuIcon:pushIcon,
    menuName:'报名推送',
    menuId:'pushs',
    menuRoute:'pushs'
},{
    menuIcon:projectIcon,
    menuName:'项目报名',
    menuId:'sport',
    menuRoute:'sport'
},{
    menuIcon:scoreIcon,
    menuName:'项目成绩',
    menuId:'scores',
    menuRoute:'scores'
},{
    menuIcon:failIcon,
    menuName:'已报名项目',
    menuId:'waittings',
    menuRoute:'waittings'
},{
    menuIcon:sportMeetingIcon,
    menuName:'历史记录',
    menuId:'historys',
    menuRoute:'historys'
}]

export default menu