import editIcon from '@/assets/svg/operation/edit.svg'
import userIcon from '@/assets/svg/user.svg'
// import editIcon from '@/assets/svg/operation/edit.svg'
import type { DropDownItem } from '@/api/component/type'
import { uploadManageAvatar } from '@/api/manage';
import { useCommonStore } from '@/stores/common';
import type { LoginData } from '@/api/manage/type';
import type { ResData } from '@/api/common/type';
import router from '@/router';

export default [{
    name: '修改头像',
    iconPath: editIcon,
    handler: async() => {
        // 创建一个 input 元素
        const inputElement = document.createElement('input')

        // 设置 input 类型为文件选择
        inputElement.type = 'file'

        // 设置该 input 元素为不可见
        inputElement.style.display = 'none'

        let res:ResData<string>
        // 监听 input 元素的 change 事件
        inputElement.addEventListener('change', async (event: Event) => {
            let data = (event.target as HTMLInputElement).files
            if (data != null) {
                const selectedFile = data[0] as File
                // 在这里可以对用户选择的文件进行处理
                res = (await uploadManageAvatar(selectedFile))
                try{
                    (useCommonStore().loginData as LoginData).avatar = res.data
                }catch(e){

                }
                localStorage.setItem('userInfo', JSON.stringify(useCommonStore().loginData))
                ElMessage({
                    type: 'success',
                    message: '修改头像成功'
                })
            }
        })

        // 将 input 元素添加到页面中
        document.body.appendChild(inputElement)

        // 模拟用户点击 input 元素来选择文件
        inputElement.click()
    }
},
// {
//     name:'修改昵称',
//     iconPath:editIcon,
//     handler:() => {
//         let commonStore = useCommonStore()
//         commonStore.notiShow = true
//         commonStore.notiTitle = '修改昵称'
//         commonStore.labelValue = '昵称'
//     }
// },
{
    name:'退出登录',
    iconPath:editIcon,
    handler:() => {
        localStorage.removeItem('userInfo')
        router.push('/')
    }
}] as DropDownItem[]