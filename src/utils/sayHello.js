 export const GetTransform_Fn = ()  => {
   const hours = new Date().getHours()
   if (8 <= hours && hours <= 12) {
     return '上午好，希望您有一个美好的一天。'
   } else if (12 <= hours && hours <= 13) {
     return '希望你的中午过得愉快，充满能量。'
   } else if (13 <= hours && hours <= 18) {
     return '下午稍事休息，调整状态，效率会更高哦。'
   } else if (18 <= hours && hours <= 24) {
     return '愿你度过一个宁静愉快的夜晚。'
   } else if (0 <= hours && hours <= 5) {
     return '愿这个凌晨给你带来平静和安宁。'
   } else if (5 <= hours && hours <= 8) {
     return '愿你的早晨充满阳光和活力。'
   }
}
