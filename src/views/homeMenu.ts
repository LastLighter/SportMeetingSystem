import type { Menu } from '@/api/component/type'
import projectIcon from '@/assets/svg/menu/project.svg'
import sportMeetingIcon from '@/assets/svg/menu/sportMeeting.svg'
import adminIcon from '@/assets/svg/menu/administrator.svg'
import registryIcon from '@/assets/svg/menu/registry.svg'
import scoreIcon from '@/assets/svg/menu/score.svg'
import refereeIcon from '@/assets/svg/menu/referee.svg'
import collgeIcon from '@/assets/svg/menu/college.svg'
import userIcon from '@/assets/svg/user.svg'

const menu:Menu[] = [{
    menuIcon:projectIcon,
    menuName:'项目管理',
    menuId:'sports',
    menuRoute:'sports'
},{
    menuIcon:userIcon,
    menuId:'users',
    menuName:'用户管理',
    menuRoute:'users',
},{
    menuIcon:sportMeetingIcon,
    menuId:'history',
    menuName:'历史记录',
    menuRoute:'history',
},{
    menuIcon:adminIcon,
    menuId:'manage',
    menuName:'管理员信息',
    menuRoute:'manage',
},{
    menuIcon:registryIcon,
    menuId:'register',
    menuName:'报名管理',
    menuRoute:'register',
},{
    menuIcon:scoreIcon,
    menuId:'score',
    menuName:'成绩管理',
    menuRoute:'score',
},{
    menuIcon:refereeIcon,
    menuId:'referees',
    menuName:'裁判管理',
    menuRoute:'referees',
},{
    menuIcon:collgeIcon,
    menuId:'college',
    menuName:'学院管理',
    menuRoute:'college',
}]

export default menu