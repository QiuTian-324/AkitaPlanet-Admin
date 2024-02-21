<script setup>
import {onMounted, ref, watch} from 'vue'
import { NAvatar, NButton, NCard, NGi, NGradientText, NGrid, NStatistic } from 'naive-ui'

import AppPage from '@/components/common/AppPage.vue'
import {useThemeStore, useUserStore} from '@/store'
import api from '@/api'
//引入创建的echarts.ts文件
import echarts from './comps/echarts.js'
import {GetTransform_Fn} from "@/utils/sayHello.js";
// import * as echarts from 'echarts';

const themeStore = useThemeStore()
const { nickname, avatar } = useUserStore()

const homeInfo = ref({
  view_count: 0,
  user_count: 0,
  article_count: 0,
  message_count: 0,
})

// 在组件中定义图表实例
let myBar
let myPie

onMounted(async () => {
  // getOneSentence()
  const res = await api.getHomeInfo()
  homeInfo.value = res.data

// 基于准备好的dom，初始化echarts实例
//   myBar = echarts.init(document.getElementById('bar'));
  myBar = echarts.init(document.getElementById('bar'))
  myPie = echarts.init(document.getElementById('pie'))

  updateBar() // 初始加载柱状图表
  userPie()
})
// 创建一个新的主题对象，基于默认的 dark 主题
const darkTheme = {
  color: ['#4178b3', '#FFA07A', '#ed5555', '#FFD700', '#ADFF2F', '#B0E0E6', '#9370DB', '#32CD32', '#00FFFF'],  textStyle: {
    color: 'white' // 设置文字颜色为白色
  },
};

// 注册自定义的 dark 主题
echarts.registerTheme('myDarkTheme', darkTheme);


watch(()=>themeStore.darkMode,(value)=>{
  console.log(1)
  myBar.dispose() // 销毁旧图表实例
  myPie.dispose()
    if (value){
      // 创建图表实例
      myBar = echarts.init(document.getElementById('bar'), 'myDarkTheme');

      myPie = echarts.init(document.getElementById('pie'), 'myDarkTheme')
    }else {
      // 创建图表实例
      myBar = echarts.init(document.getElementById('bar'))
      myPie = echarts.init(document.getElementById('pie'))
    }
  updateBar() // 重新加载图表
  userPie()
})


const updateBar = () => {
  // 模拟数据：每周每天的文章数量
  // const weekDays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  const articleCounts = [20, 30, 15, 40, 25, 35, 10]

  // 设置图表配置
  myBar.setOption({
    title: {
      text: '文章数据',
      textStyle: {
        color: themeStore.darkMode?'white':"black" // 设置标题文字颜色为白色
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['Golang', 'Java', '前端', 'PHP', '其它']
    },
    yAxis: {
      type: 'value',
      name: '文章数量'
    },
    series: [
      {
        name: '文章数量',
        type: 'bar',
        data: articleCounts
      }
    ]
  })
}

const userPie = () => {
  myPie.setOption({
    title: {
      text: '用户数据',
      textStyle: {
        color: themeStore.darkMode?'white':"black" // 设置标题文字颜色为白色
      }
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: '用户级别占比',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 3, name: '超级管理员' },
          { value: 20, name: '管理员' },
          { value: 30, name: '普通用户' }
        ]
      }
    ]
  })
}

// 一言
// const sentence = ref('')
// async function getOneSentence() {
//   fetch('https://v1.hitokoto.cn?c=i')
//     .then(resp => resp.json())
//     .then(data => sentence.value = data.hitokoto)
//     .catch(() => sentence.value = '宠辱不惊，看庭前花开花落；去留无意，望天上云卷云舒。')
// }
</script>

<template>
  <AppPage>
    <div class="flex-1">
      <NCard>
        <div class="flex items-center">
          <NAvatar round :size="60" :src="avatar" />
          <div class="ml-5">
            <p> Hello, {{ nickname }} </p>
            <NGradientText class="mt-1 op-80 text-black dark:text-white">
              {{ GetTransform_Fn() }}
            </NGradientText>
          </div>
          <div class="ml-auto flex items-center">
<!--            <NStatistic label="Stars" class="w-[80px]">-->
<!--              <a href="https://github.com/szluyu99/gin-vue-blog" target="_blank">-->
<!--                <img-->
<!--                  alt="stars"-->
<!--                  src="https://badgen.net/github/stars/szluyu99/gin-vue-blog"-->
<!--                >-->
<!--              </a>-->
<!--            </NStatistic>-->
<!--            <NStatistic label="Forks" class="ml-10 w-[100px]">-->
<!--              <a href="https://github.com/szluyu99/gin-vue-blog" target="_blank">-->
<!--                <img-->
<!--                  alt="forks"-->
<!--                  src="https://badgen.net/github/forks/szluyu99/gin-vue-blog"-->
<!--                >-->
<!--              </a>-->
<!--            </NStatistic>-->
          </div>
        </div>
      </NCard>

      <NGrid class="mt-4" x-gap="12" :cols="4">
        <template
          v-for="item of [
            { icon: 'i-fa6-solid:users', color: 'text-[#40C9C6]', label: '访问量', key: 'view_count' },
            { icon: 'i-heroicons:users-solid', color: 'text-[#34BFA3]', label: '用户量', key: 'user_count' },
            { icon: 'i-material-symbols:article', color: 'text-[#F4516C]', label: '文章量', key: 'article_count' },
            { icon: 'i-bxs:comment-dots', color: 'text-[#36A3F7]', label: '留言量', key: 'message_count' },
          ]" :key="item.key"
        >
          <NGi>
            <NCard>
              <span
                class="text-[60px]"
                :class="[item.icon, item.color]"
              />
              <NStatistic class="float-right" :label="item.label">
                {{ homeInfo[item.key] ?? 'unknown' }}
              </NStatistic>
            </NCard>
          </NGi>
        </template>
      </NGrid>

      <!-- TODO: 完善首页设计 -->
      <NCard title="" size="small" class="mt-4">
        <div class="flex justify-between w-[100%] h-[520px]">
          <div id="bar" class="w-[50%] h-[100%]" />
          <div id="pie" class="w-[40%] h-[100%]" />
        </div>
      </NCard>
    </div>
  </AppPage>
</template>
