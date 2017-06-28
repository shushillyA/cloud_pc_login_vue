<template>
  <div class='wrap'>
    <section class="search">
      <section class='shell'>
        <img v-if='preShow' class='preImg' src="../../assets/row.png" alt="" style="transform:rotate(180deg)" v-on:click='getDay("pre", "7")'>
        <!--<img v-if='!preShow' class='preImg' src="../../assets/row.png" alt="" style="transform:rotate(180deg)" v-on:click='getDay("pre", "7")'>-->
        <div id='touch1'>
          <span>{{(month) <10 ? date.substring(0, 7) : date.substring(0, 8)}}</span>
          <span v-show='!isArea'>{{area}}</span>
          <span>第{{week}}周</span>
        </div>
        <!--<img v-if='nextShow' class='nextImg' src="../../assets/row.png" alt="" v-on:click='getDay("next", "7")'>-->
        <img v-if='nextShow' class='nextImg' src="../../assets/row.png" alt="" v-on:click='getDay("next", "7")'>
        <!--<router-link :to="{name: 'filter', params: {date: date}}">-->
          <img v-if='!isArea' v-on:click='goFilter' class='filterImg' src="../../assets/filter.png" alt="">
        <!--</router-link>-->
      </section>
    </section>
    <!--<div class='content' id='touch'>-->
    <div class='content'>
      <div id='noContent' v-if='text'>
        <img src='../../assets/logo_no.png'>
        <p>暂无数据</p>
      </div>
      <i v-if='!text'>
        <section class='shell'>
          <div id="main1" v-if='!pic1' class='main'></div>
          <i id="main1" v-if='pic1' class='main' style="display:block"><span class='picText' id='picText1'>市教育局预警<br/>暂无数据</span></i>
          <!--<div id="main1" class='main'><span class='picText'>暂无数据</span></div>-->
        </section>
        <section class='shell'>
          <div id="main2" v-if='!pic2' class='main'></div>
          <i id="main2" v-if='pic2' class='main' style="display:block"><span class='picText' id='picText1'>预警干预<br/>暂无数据</span></i>
        </section>
        <section class='shell'>
          <div id="main3" v-if='!pic3' class='main'></div>
          <i id="main3" v-if='pic3' class='main' style="display:block"><span class='picText' id='picText1'>学段分布<br/>暂无数据</span></i>
        </section>
        <section class='shell'>
          <div id="main4" v-if='!pic4' class='main'></div>
          <i id="main4" v-if='pic4' class='main' style="display:block"><span class='picText' id='picText4'>发展趋势<br/>暂无数据</span></i>
        </section>
        <section class='shell'>
          <div id="main5" v-if='!pic5' class='main'></div>
          <i id="main5" v-if='pic5' class='main' style="display:block"><span class='picText' id='picText5'>预警比例<br/>暂无数据</span></i>
          <p class='record' v-if='!text'>行为记录</p>
        </section>
        <section class='shell'>
          <div id="main6" v-if='!pic6' class='main'></div>
          <i id="main6" v-if='pic6' class='main' style="display:block"><span class='picText' id='picText6'>环比分析<br/>暂无数据</span></i>
          <div style="height:1rem"></div>
        </section>
      </i>
      <div class='empty'></div>
    </div>
  </div>
</template>
<style lang='postcss' scoped>
    .wrap{
        width:100%;
        height:100%;
      & i {
        display: block;
        font-style:normal;
        width:100%;
        height:100%;
      }
      & .search{
        width: 100%;
        height: 4rem;
        text-align: center;
        background: -webkit-gradient(linear, 0% 0%, 0% 100%,from(#3095fc), to(#2cd2f1));
        & section{
          height:6rem;
          line-height:4.2rem;
          margin: -1% 2% 2% 2%;
          width:96%;
          overflow: inherit;
          & .preImg{
            height:1.1rem;
            float:left;
            margin-top:1.45rem;
          }
          & p{
            width:1rem;
            height:1.1rem;
            float:left;
            margin-top:1.45rem;
          }
          & .nextImg{
            height:1.1rem;
            float:right;
            margin-top:1.45rem;
          }
          & .filterImg{
              height: 6rem;
              z-index: 1;
              position: fixed;
              top: 9rem;
              right: 2rem;
          }
          & div{
            width:90%;
            float:left;
            padding-left:8%;
            text-align:center;
            & span{
              width:33%;
              font-size:1.8rem;
              color:#3dbfff;
              float: left;
            }
            & span:last-child{
              float:right;
              width:30%;
            }
             & span:first-child{
              width:36%;
            }
          }
        }
      }
      & .content{
        width:100%;
        height:100%;
        margin-top:4.5rem;
        & #noContent{
        width: 40%;
        // width: 100%;
        // height: 3000px;
        text-align: center;
        position: absolute;
        left: 50%;
        top: 20%;
        transform: translate(-50%,200%);
          & p{
            font-size:2rem;
            color:#cdcdd6;
          }
          & img{
            width:7rem;
          }
        }
        & section{
          width:92%;
          height:42%;
          margin:4%;
          position: relative;
          & .main{
            width: 100%;
            height: 100%;
            text-align: center;
            position:relative;
            /*& .picText{
              display: block;
              position:absolute;
              line-height: 100%;
              width:100%;
              text-align: center;
              // height: 100%;
              top:50%;
              margin-top: -0.9rem;
              font-size: 1.8rem;
              color: #b2b3c4;
            }*/
          } 
          & p{
            position: absolute;
            top: 55%;
            left: 42%;
            font-size: 1.6rem;
          }
        }
        & .empty{
          height:4rem;
        }
      }
    }
    .picText{
        display: block;
        position:absolute;
        line-height: 150%;
        width:100%;
        text-align: center;
        /*height: 100%;*/
        top:50%;
        margin-top: -1.9rem;
        font-size: 1.8rem;
        color: #b2b3c4;
      }
    
</style>
<script>
import echarts from 'echarts'
import functions from '../../functions'
export default {
  name: 'sheetlist',
  data () {
    return {
      // date: '2017年5月8日',
      date: new Date().getFullYear() + '年' + (new Date().getMonth() + 1) + '月' + new Date().getDate() + '日',
      // date: '',
      area: '全部',
      week: '',
      charts: '',
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
      key: true,
      index: '',
      isArea: false,
      text: false, // 行为记录  true显示暂无数据  false显示图标
      nextShow: true, // 切换下周箭头是否显示
      preShow: true, // 切换上周箭头是否显示
      zIndex: +100,
      start: '',
      filterMonth: '',
      pic1: false,
      pic2: false,
      pic3: false,
      pic4: false,
      pic5: false,
      pic6: false,
      select_area_code: '',
      week1: '',   // 用来发送的
      month1: ''   // 用来发送的
    }
  },
  created () {
    // 暴露返回
    window.back = this.prev
    // 暴露点击
    window.clickButton = this.clickButton
    this.$store.state.noWLAN.index = 'behavior'   // 设置断网返回不需要jsonp
    if (this.$store.state.behavior.isArea === true) {   // 判断区还是市教育局
      this.isArea = true  // 不用初始化变成false
      console.log(this.area, '判断是否是教育局的')
    }
    // this.getUserInfo()
    // console.log(this.week, '年')
    if (this.$store.state.behavior.year.length !== 0 && this.$store.state.behavior.month !== 0) {
      this.week = 1
      this.renderData('other', this.week - 1)
    } else {
      // console.log(this.week, '打印')
      this.renderData('start')
    }
    this.date = this.year + '年' + this.month + '月' + this.day + '日'
    if (parseInt(this.$store.state.behavior.month) > new Date().getMonth() + 1 || this.month > new Date().getMonth() + 1) {
      // console.log(this.month, '月份')
      this.text = true
      // this.preShow = false
    } else {
      this.text = false   // 显示图标
      // this.preShow = true
    }
    // this.getWeek(this.date)
    this.covertToChinese(this.week)
    // console.log(this.$store.state.behavior.month, '月份')
    // console.log(this.week, 'xingiq')
    if (this.$store.state.behavior.month === '4' && this.week === 1) { //  返回将箭头隐藏
      // console.log('进来手动阀')
      this.preShow = false
    } else {
      this.preShow = true
    }
    this.filterMonth = this.$store.state.behavior.month
    // this.$store.state.behavior.areaCode = '' // 重置date后将state中的存储的置空
    this.$store.state.behavior.year = ''
    this.$store.state.behavior.month = ''
  },
  mounted () {
    try {
      this.$invoke('toggleNavigation', { isShow: false })
      this.$invoke('setTitle', { title: '学生行为预警' })
      this.$invoke('showButton', { text: '@warn_chart' })
    } catch (e) {
    }
    // this.renderData(this.week)
    // this.touch()
    if (parseInt(this.$store.state.behavior.month) > new Date().getMonth() + 1 || this.month > new Date().getMonth() + 1) {
      // console.log(this.month, '月份')
      this.text = true
      // this.preShow = false
    } else {
      this.text = false   // 显示图标
      // this.preShow = true
    }
    console.log('渲染咯！！！！！！！！！！！！！！！！！！！！！！')
  },
  updated () {
    // 只要页面dom解构发生改变
    // console.log(parseInt(this.$store.state.behavior.month), 'updated的时候打印')
    // if (parseInt(this.$store.state.behavior.month) > new Date().getMonth() + 1 || this.month > new Date().getMonth() + 1 || (this.month < 4) || this.month === 4 && this.date < 5) {
    // // console.log(this.month, '月份')
    //   this.text = true
    // // this.preShow = false
    // // } else {
    //   // this.text = false   // 显示图标
    // // this.preShow = true
    // }
    // console.log('更新咯！！！！！！！！！！！！！！！！！！！！！！！！！')
  },
  methods: {
    renderData: function (first, index) {
      if (this.$store.state.behavior.year.length !== 0 && this.$store.state.behavior.month !== 0 && this.$store.state.behavior.areaCode.length === 0) { // 区选择
        this.month = this.$store.state.behavior.month.replace('月', '')
        this.select_area_code = 1
        console.log('进来了不111111')
        var sendData = {
          access_token: functions.getParam('token'),
          index: index,
          year: this.$store.state.behavior.year.replace('年', ''),
          month: this.$store.state.behavior.month.replace('月', ''),
          select_area_code: this.select_area_code
        }
      } else if (this.$store.state.behavior.year.length !== 0 && this.$store.state.behavior.month.length !== 0 && this.$store.state.behavior.areaCode.length !== 0) { // 市选择
        this.month = this.$store.state.behavior.month.replace('月', '')
        this.area = this.$store.state.behavior.area
        this.select_area_code = this.$store.state.behavior.areaCode
        console.log('进来了不22222222')
        sendData = {
          access_token: functions.getParam('token'),
          index: index,
          year: this.$store.state.behavior.year.replace('年', ''),
          month: this.$store.state.behavior.month.replace('月', ''),
          select_area_code: this.select_area_code
        }
      } else if (!this.key) { // 切换时
        // console.log('进入条件')
        console.log('444444444444444')
        if (this.$store.state.behavior.flag === 1) {
          this.select_area_code = this.$store.state.behavior.areaCode
        }
        sendData = {
          access_token: functions.getParam('token'),
          select_area_code: this.select_area_code,
          index: index,
          year: this.year,
          month: this.month
        }
      } else { // 初次渲染
        sendData = {
          access_token: functions.getParam('token'),
          select_area_code: 1,
          year: this.year,
          month: this.month
        }
        this.select_area_code = 1
      }
      console.log(sendData, '2222222222222222222222222222222222')
      console.log(index, '索引')
      if (this.$store.state.behavior.flag === 1) {
        // 确认按了 重新渲染  按了确认给1
        console.log('flag为1')
        this.$store.state.behavior.flag = 0
        this.$store.state.behavior.prev = 0
      } else {
        console.log(this.$store.state.behavior.prev, '321321313132131313')
        if (this.$store.state.behavior.prev === 1) {
          // 返回取数据
          this.$store.state.behavior.prev = 0
          console.log(sendData.index, '111111111111111111111111111111111111111111111111111')
          if (sendData.index + '') {
            // 第一次渲染不给 所以进入
            console.log('复制')
            sendData.select_area_code = this.$store.state.behavior.sendData.select_area_code
            // sendData.index = this.$store.state.behavior.sendData.index
            sendData.year = this.$store.state.behavior.sendData.year
            sendData.month = this.$store.state.behavior.sendData.month
            this.area = this.$store.state.behavior.sendData.area1
          }
          console.log('导入sendData')
        }
      }
      this.$store.state.behavior.sendData.select_area_code = sendData.select_area_code
      if (sendData.index + '') {
        console.log('保存index')
        this.$store.state.behavior.sendData.index = sendData.index
      }
      this.$store.state.behavior.sendData.year = sendData.year
      this.$store.state.behavior.sendData.month = sendData.month
      this.$store.state.behavior.sendData.area1 = this.area
      console.log(this.$store.state.behavior.sendData, '333333333333333333333333333333')
      this.text = false  // 显示图标 一定要让图标标签出来 不然渲染无法执行 也不能隐藏
      console.log('图标！！！！！！！！！！！！！！！！！！！！！')
      console.log('以下是发送的数据')
      console.log(sendData)
      this.$http.jsonp(functions.getURL('edu-bwarning'), { params: sendData }).then(
        function (obj) {
          obj = obj.data
          console.log(obj)
          if (first === 'start' || (this.$store.state.behavior.year.length !== 0 && this.$store.state.behavior.month !== 0)) {
            console.log(obj.data.index, '12313131231')
            this.week = +obj.data.index + 1
            this.$store.state.behavior.currentWeek = +obj.data.index + 1
            console.log(this.week, '123131')
          }
          console.log(this.week, '星期几')
          this.$store.state.behavior.prevWeek = obj.data.prevWeek   // 保存上一周的数据 提供给下次请求用
          this.$store.state.behavior.nextWeek = obj.data.nextWeek   // 保存下一周的数据 提供给下次请求用
          var a = 2
          // this.$store.state.behavior.filterFlag = true
          // console.log(obj, 'obj数据')
          // try {
          console.log('111111111111')
          if (a === 2) {
            console.log(obj.data, '返回的数据166行')
            this.charts = obj.data   // 保存数据到本地
            // var y1 = []
            var x1 = []
            var y2 = []
            var x2 = []
            var y3 = []
            var x3 = []
            var y4 = []
            var x4 = []
            // var y5 = []
            // var x5 = []
            var y6 = []
            var x6 = []
            // 图1
            // var data1 = [{name: '', count: ''}]
            // var seriesdata = []
            if (obj.data.nextWeek.length === 0) {
              this.nextShow = false
              // console.log('进来')
              this.key = true
              // return
            } else {
              this.nextShow = true
            }
            // console.log(this.date, '日期')
            // console.log(this.date.split('年')[1].split('月')[0], '月份是打发点')
            // console.log((new Date().getMonth() + 1), '月份是打发点')
            // console.log('33333333333')
            // console.log(obj.data.weeks.length, '长度')
            // if (obj.data.preWeek.length === 0 || parseInt(this.$store.state.behavior.month.replace('月', '')) >= new Date().getMonth() + 3) {
            if (obj.data.prevWeek.length === 0) {
              this.preShow = false
              // console.log('安师大告诉')
            } else {
              this.preShow = true
            }
            if ((Array.isArray(obj.data.chart1) && Array.isArray(obj.data.chart2) && Array.isArray(obj.data.chart3) && Array.isArray(obj.data.chart4) && Array.isArray(obj.data.chart6))) { // 所有图标没数据
              // console.log(this.date, '日期')
              this.key = true
              this.text = true
              return
            }
            console.log(this.filterMonth, '筛选月')
            if (+this.date.split('年')[1].split('月')[0] > new Date().getMonth() + 1) { // 页面显示月大于当前月
              // console.log('aaaaaaaa')
              this.key = true
              this.text = true
              return
            }
            // if ((+this.date.split('年')[1].split('月')[0] === new Date().getMonth() + 1 && this.week >= this.$store.state.behavior.currentWeek)) { // 当前月的当前周
            //   // console.log('ddddddddddddd')
            //   this.key = true
            //   this.text = true
            //   return
            // }
            for (var m in obj.data.chart1) {
              x1.push({name: m, value: obj.data.chart1[m]})
              // data1.name = m
              // data1.count = obj.data.chart1[m]
            }
            for (var j in obj.data.chart2) {
              if (x2.length === 5) {
                break
              }
              y2.push(obj.data.chart2[j])
              x2.push(j)
            }
            if (x2.length === 1) {
              var bar2 = '20%'
            } else {
              bar2 = '60%'
            }
            // console.log(x2, 'x')
            // console.log(y2, 'y')
            // for (var i = 0; i < data1.length; i++) {
            //   var obj1 = {}
            //   obj1.name = data1[i].name
            //   obj1.value = data1[i].count
            //   seriesdata[i] = obj1
            // }
            // 图4
            for (var j3 in obj.data.chart3) {
              y3.push(obj.data.chart3[j3])
              x3.push(j3)
            }
            if (x3.length === 1) {
              var bar3 = '20%'
            } else {
              bar3 = '60%'
            }
            for (var k in obj.data.chart4) {
              y4.push(obj.data.chart4[k])
              x4.push(k)
            }
            if (y4.length > 20) {
              var arry = []
              for (var q = 7; q > 0; q--) {
                arry.push(y4[new Date().getDate() - q])
              }
              y4 = arry
            }
            if (x4.length > 20) {
              var arrx = []
              for (var i = 7; i > 0; i--) {
                arrx.push(x4[new Date().getDate() - i])
              }
              x4 = arrx
            }
            // console.log(y4, y4.length, '这周数据Y轴长度')
            // console.log(x4, x4.length, '这周的数据')
            // console.log(y4)
            // 图6
            for (var j1 in obj.data.chart6) {
              y6.push(obj.data.chart6[j1])
              x6.push(j1)
            }
            // console.log(x6, 'x6')
            // 去掉第二个数据的年份
            if (x6.length) {
              if (x6[1].length > 2) {
                x6[1] = x6[1].substring(3)
              }
            }
            if (this.isArea) { // 区教育局
              var text = '区教育局预警'
            } else {
              text = '市教育局预警'
            }
            console.log(x1, 'x1')
            console.log(x2, 'x2')
            console.log(y2, 'y2')
            console.log(x3, 'x3')
            console.log(y3, 'y3')
            console.log(y4, 'y4')
            console.log(x4, 'x4')
            console.log(x6, 'x6')
            console.log(y6, 'y6')
            // if (x1.length === 0 || x2.length === 0 || x3.length === 0 || x4.length === 0 || x6.length === 0) {
            //   this.key = true
            //   this.text = true
            //   return
            // }
            if (x1.length !== 0) {
              this.pic1 = false
              this.$nextTick(function () {
                var myChart1 = echarts.init(document.getElementById('main1'))
                var option1 = {
                  tooltip: {
                    trigger: 'item',
                    formatter: '{b}\n{c}'
                  },
                  grid: {
                    left: '0%',
                    right: '0%',
                    bottom: '3%',
                    containLabel: true
                  },
                  title: {
                    text: text,
                    x: 'center',
                    textStyle: {
                      color: '#b2b3c4',
                      fontWeight: 400,
                      fontSize: 18,
                      ontStyle: '微软雅黑'
                    }
                  },
                  color: ['#fd5878', '#62c6fb', '#d8a1ff'],
                  series: [
                    {
                      name: '',
                      type: 'pie',
                      radius: ['35%', '55%'],
                      center: ['50%', '55%'],
                      // data: [
                      //   {value: 120, name: '云岩区'},
                      //   {value: 310, name: '南明区'},
                      //   {value: 234, name: '浦东新区'}
                      // ],
                      data: x1,
                      // data: seriesdata,
                      itemStyle: { // 空白间隙
                        normal: {
                          borderWidth: 4,
                          borderColor: '#fff'
                        }
                      },
                      label: { // 饼图标注
                        normal: {
                          textStyle: {
                            color: '#666666',
                            fontSize: 10
                          }
                        }
                      },
                      labelLine: { // 饼图标注线
                        normal: {
                          lineStyle: {
                            color: '#666666'
                          }
                        }
                      }
                    }
                  ]
                }
                myChart1.clear()
                myChart1.setOption(option1)
              })
            } else {
              // myChart1.clear()
              this.$nextTick(function () {
                // console.log('111111111111111111111111')
                // console.log(this.pic1)
                this.pic1 = true  // 显示暂无数据
                // console.log(document.getElementById('main1').children)
                var ele = document.getElementById('main1').children
                for (var m = 0; m < ele.length; m++) {
                  console.dir(ele[m].nodeType, '1111111111')
                  if (ele[m].nodeName === 'DIV') {
                    ele[m].innerHTML = ''
                    // console.log(ele[m], '564164496411')
                  }
                }
                // document.getElementById('main1').children[0].innerHTML = ''
              })
            }
            // console.log('2图')
            if (x2.length !== 0) {
              this.pic2 = false
              this.$nextTick(function () {
                var myChart2 = echarts.init(document.getElementById('main2'))
                var option2 = {
                  title: {
                    text: '预警干预',
                    textStyle: {
                      color: '#b2b3c4',
                      fontWeight: 400,
                      fontSize: 18,
                      ontStyle: '微软雅黑'
                    },
                    x: 'center'
                  },
                  tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                      type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter: '{b}\n: 未处理{c}'
                  },
                  color: ['#ff9a83'],
                  grid: {
                    left: '0%',
                    right: '0%',
                    bottom: '3%',
                    containLabel: true
                  },
                  xAxis: [
                    {
                      type: 'category',
                      // data: ['修文县', '云岩区', '南明区', '开阳县', '乌当区'],
                      data: x2,
                      axisTick: {
                        alignWithLabel: true,
                        show: false
                      },
                      axisLabel: {
                        textStyle: {
                          color: '#949494',
                          fontSize: 10
                        }
                      },
                      axisLine: { // 坐标轴和文字
                        lineStyle: {
                          color: '#c0c1cf'
                        }
                      },
                      splitLine: {
                        show: false
                      }
                    }
                  ],
                  yAxis: [
                    {
                      // type: 'category',
                      type: 'value',
                      // min: 0,
                      // max: 30,
                      // data: [2, 9, 18, 25, 26],
                      data: y2,
                      axisLine: { // 坐标轴和文字
                        lineStyle: {
                          color: '#c4c5d3'
                        }
                      },
                      axisLabel: {
                        textStyle: {
                          color: '#c4c5d3',
                          fontSize: 12
                        }
                      },
                      axisTick: {  // 去掉刻度
                        show: false
                      },
                      splitLine: {
                        show: false
                      }
                    }
                  ],
                  series: [
                    {
                      name: '',
                      type: 'bar',
                      barWidth: bar2,
                      // data: [3, 1, 2, 1, 3],
                      data: y2,
                      bar: {
                        barCategoryGap: '1'
                      }
                    }
                  ]
                }
                myChart2.clear()
                myChart2.setOption(option2)
              })
              // console.log(x2)
              // console.log(y2)
            } else {
              this.$nextTick(function () {
                console.log('111111111111111111111111')
                console.log(this.pic1)
                this.pic2 = true  // 显示暂无数据
                console.log(document.getElementById('main2').children)
                var ele = document.getElementById('main2').children
                for (var m = 0; m < ele.length; m++) {
                  console.dir(ele[m].nodeType, '1111111111')
                  if (ele[m].nodeName === 'DIV') {
                    ele[m].innerHTML = ''
                    console.log(ele[m], '564164496411')
                  }
                }
                // document.getElementById('main1').children[0].innerHTML = ''
              })
            }
            // console.log('3图')
            if (x3.length !== 0) {
              this.pic3 = false
              this.$nextTick(function () {
                var myChart3 = echarts.init(document.getElementById('main3'))
                var option3 = {
                  title: {
                    text: '学段分布',
                    textStyle: {
                      color: '#b2b3c4',
                      fontWeight: 400,
                      fontSize: 18,
                      ontStyle: '微软雅黑'
                    },
                    x: 'center'
                  },
                  tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                      type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter: '{b}\n:{c}'
                  },
                  grid: {
                    left: '0%',
                    right: '0%',
                    bottom: '0%',
                    containLabel: true
                  },
                  xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01],
                    axisLabel: { // x轴文字隐藏
                      show: false
                    },
                    axisLine: {// x轴隐藏
                      show: false
                    },
                    splitLine: {
                      show: false
                    },
                    axisTick: { // 去掉刻度
                      show: false
                    }
                  },
                  yAxis: {
                    type: 'category',
                    // data: ['完全中学', '高级中学', '初级中学'],
                    data: x3,
                    axisLine: {
                      lineStyle: {
                        color: '#c0c1cf'
                      }
                    },
                    axisLabel: {
                      textStyle: {
                        fontSize: 12
                      }
                    },
                    // splitLine: { // 网格线
                    //   show: true,
                    //   lineStyle: {
                    //     color: '#e8ecf6',
                    //     type: 'solid',
                    //     width: 1
                    //   }
                    // },
                    axisTick: { // 去掉刻度
                      show: false
                    }
                    // splitArea : { // 网格区域
                    //   show: true,
                    //   areaStyle:{
                    //     color:['rgba(144,238,144,0.3)','rgba(135,200,250,0.3)']
                    //   }
                    // },
                  },
                  series: [
                    {
                      name: '',
                      type: 'bar',
                      stack: '',
                      barWidth: bar3,
                      itemStyle: {
                        normal: {
                          color: '#6dcbbd',
                          label: {
                            // show: true,
                            position: 'right',
                            textStyle: {
                              color: '#c0c1cf',
                              fontSize: 14
                            }
                          }
                          // barBorderRadius: 10
                        }
                      },
                      // data: [111, 120, 122]
                      data: y3
                    }
                  ]
                }
                myChart3.clear()
                myChart3.setOption(option3)
              })
            } else {
              this.$nextTick(function () {
                // console.log('111111111111111111111111')
                // console.log(this.pic1)
                this.pic3 = true  // 显示暂无数据
                // console.log(document.getElementById('main3').children)
                var ele = document.getElementById('main3').children
                for (var m = 0; m < ele.length; m++) {
                  console.dir(ele[m].nodeType, '1111111111')
                  if (ele[m].nodeName === 'DIV') {
                    ele[m].innerHTML = ''
                    // console.log(ele[m], '564164496411')
                  }
                }
                // document.getElementById('main1').children[0].innerHTML = ''
              })
            }
            // console.log(x4.length, 'x4的长度')
            // console.log('4图')
            if (x4.length !== 0) {
              this.pic4 = false
              this.$nextTick(function () {
                var myChart4 = echarts.init(document.getElementById('main4'))
                var option4 = {
                  title: {
                    text: '发展趋势',
                    textStyle: {
                      color: '#b2b3c4',
                      fontWeight: 400,
                      fontSize: 18,
                      ontStyle: '微软雅黑'
                    },
                    x: 'center'
                  },
                  grid: {
                    left: '0%',
                    right: '0%',
                    bottom: '3%',
                    containLabel: true
                  },
                  toolbox: {
                    show: false, // 去除到处图表的图标
                    feature: {
                      saveAsImage: {}
                    }
                  },
                  xAxis: {
                    type: 'category',
                    boundaryGap: true,
                    // data: ['4-28', '4-29', '4-30', '5-1', '5-2', '5-3'],
                    data: x4,
                    axisLine: { // 坐标轴和文字
                      lineStyle: {
                        color: '#d1d2dc'
                      }
                    },
                    axisLabel: {
                      textStyle: {
                        color: '#949494',
                        fontSize: 12
                      }
                    },
                    axisTick: {  // 去掉刻度
                      show: false
                    },
                    splitLine: {
                      show: false
                    }
                  },
                  yAxis: {
                    type: 'value',
                    // min: '0',
                    // max: '40',
                    axisLine: { // 坐标轴和文字
                      lineStyle: {
                        color: '#c0c1cf'
                      }
                    },
                    axisLabel: {
                      textStyle: {
                        fontSize: 15
                      }
                    },
                    axisTick: {  // 去掉刻度
                      show: false
                    },
                    splitLine: {
                      show: false
                    }
                  },
                  series: [
                    {
                      name: '',
                      type: 'line',
                      stack: '',
                      symbol: 'none',
                      // smooth: true, // 这句就是让曲线变平滑的
                      // symbolSize: 12, // 控制折线点的大小
                      // data: [20, 32, 10, 34, 9, 23, 21],
                      data: y4,
                      itemStyle: {
                        normal: {
                          color: '#fea8b9'
                        }
                      }
                    }
                  ]
                }
                myChart4.clear()
                myChart4.setOption(option4)
              })
            } else {
              this.$nextTick(function () {
                // console.log('111111111111111111111111')
                // console.log(this.pic1)
                this.pic4 = true  // 显示暂无数据
                // console.log(document.getElementById('main4').children)
                var ele = document.getElementById('main4').children
                for (var m = 0; m < ele.length; m++) {
                  // console.dir(ele[m].nodeType, '1111111111')
                  if (ele[m].nodeName === 'DIV') {
                    ele[m].innerHTML = ''
                    // console.log(ele[m], '564164496411')
                  }
                }
                // document.getElementById('main1').children[0].innerHTML = ''
              })
            }
            // console.log('5图')
            if (obj.data.chart5 !== '') {
              this.pic5 = false
              this.$nextTick(function () {
                var myChart5 = echarts.init(document.getElementById('main5'))
                var option5 = {
                  grid: {
                    left: '0%',
                    right: '0%',
                    bottom: '3%',
                    containLabel: true
                  },
                  title: {
                    text: '预警比例',
                    x: 'center',
                    textStyle: {
                      color: '#b2b3c4',
                      fontWeight: 400,
                      fontSize: 18,
                      ontStyle: '微软雅黑'
                    }
                  },
                  color: ['#fe5878', '#ffd870'],
                  series: [
                    {
                      name: '',
                      type: 'pie',
                      radius: ['35%', '55%'],
                      center: ['50%', '60%'],
                      data: [
                        { value: obj.data.chart5, name: '预警率' + '\n\n' + obj.data.chart5 + '%' },
                        { value: (100 - obj.data.chart5), name: '' }
                      ],
                      // data: [
                      //   {value: 335, name: '直接访问'},
                      //   {value: 310, name: '邮件营销'},
                      //   {value: 234, name: '联盟广告'},
                      //   {value: 135, name: '视频广告'},
                      //   {value: 1548, name: '搜索引擎'}
                      // ],
                      itemStyle: { // 空白间隙
                        normal: {
                          borderWidth: 4,
                          borderColor: '#fff'
                        }
                      },
                      label: { // 饼图标注
                        normal: {
                          textStyle: {
                            color: '#666666',
                            fontSize: 15
                          }
                          // formatter: '{b}\n\n{d}%'
                        }
                      },
                      labelLine: { // 饼图标注线
                        normal: {
                          lineStyle: {
                            color: '#666666'
                          },
                          show: false
                        }
                      }
                    }
                  ]
                }
                myChart5.clear()
                myChart5.setOption(option5)
              })
            } else {
              this.$nextTick(function () {
                // console.log('111111111111111111111111')
                // console.log(this.pic1)
                this.pic5 = true  // 显示暂无数据
                // console.log(document.getElementById('main5').children)
                var ele = document.getElementById('main5').children
                for (var m = 0; m < ele.length; m++) {
                  // console.dir(ele[m].nodeType, '1111111111')
                  if (ele[m].nodeName === 'DIV') {
                    ele[m].innerHTML = ''
                    // console.log(ele[m], '564164496411')
                  }
                }
                // document.getElementById('main1').children[0].innerHTML = ''
              })
            }
            // console.log('6图')
            if (x6.length !== 0) {
              this.pic6 = false
              this.$nextTick(function () {
                var myChart6 = echarts.init(document.getElementById('main6'))
                var option6 = {
                  title: {
                    text: '环比分析',
                    textStyle: {
                      color: '#b2b3c4',
                      fontWeight: 400,
                      fontSize: 18,
                      ontStyle: '微软雅黑'
                    },
                    x: 'center'
                  },
                  color: ['#3dbfff'],
                  grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                  },
                  xAxis: [
                    {
                      type: 'category',
                      // data: ['16年12月', '1月', '2月', '3月', '4月', '5月'],
                      data: x6,
                      axisTick: {
                        alignWithLabel: true,
                        show: false
                      },
                      axisLabel: {
                        textStyle: {
                          color: '#949494',
                          fontSize: 13
                        },
                        interval: 0 // 解决x轴文字显示不全
                      },
                      axisLine: { // 坐标轴和文字
                        lineStyle: {
                          color: '#c0c1cf'
                        }
                      },
                      splitLine: {
                        show: false
                      }
                    }
                  ],
                  yAxis: [
                    {
                      // type: 'category',
                      // data: [2, 9, 18, 25, 26],
                      type: 'value',
                      axisLine: { // 坐标轴和文字
                        lineStyle: {
                          color: '#c0c1cf'
                        }
                      },
                      axisLabel: {
                        textStyle: {
                          color: '#c0c1cf',
                          fontSize: 14
                        }
                      },
                      axisTick: {  // 去掉刻度
                        show: false
                      },
                      splitLine: {
                        show: false
                      }
                    }
                  ],
                  series: [
                    {
                      name: '直接访问',
                      type: 'bar',
                      barWidth: '50%',
                      // data: [18, 10, 12, 5, 15]
                      data: y6
                    }
                  ]
                }
                myChart6.clear()
                myChart6.setOption(option6)
              })
            } else {
              this.$nextTick(function () {
                // console.log('111111111111111111111111')
                // console.log(this.pic1)
                this.pic6 = true  // 显示暂无数据
                // console.log(document.getElementById('main6').children)
                var ele = document.getElementById('main6').children
                for (var m = 0; m < ele.length; m++) {
                  console.dir(ele[m].nodeType, '1111111111')
                  if (ele[m].nodeName === 'DIV') {
                    ele[m].innerHTML = ''
                    // console.log(ele[m], '564164496411')
                  }
                }
                // document.getElementById('main1').children[0].innerHTML = ''
              })
            }
            this.key = true
          } else {
            // console.warn('报错了！！！！')
            // console.log(e)
            // this.key = true
          }
        }, function () {
        window.$.invoke('showMessage', { message: '网络请求失败' })
      })
    },
    goFilter: function () {
      this.$router.push({path: '/behavior/filter/', query: {date: this.date, area: this.area}})
      this.$router.go(1)
      this.$store.state.behavior.area1 = this.area
    },
    getDay: function (type, days) {
      // console.log('进入getDay')
      if (this.key) {
        // console.log('进入没锁')
        this.key = false
        // user/user-info.api
        this.$http.jsonp(functions.getURL('user/user-info'), {params: {access_token: functions.getParam('token')}}).then(
          function (obj) {  // 成功
            if (type === 'next') {
              this.week = parseInt(this.$store.state.behavior.nextWeek.index) + 1
              this.month = this.$store.state.behavior.nextWeek.month
              this.date = this.year + '年' + this.$store.state.behavior.nextWeek.month + '月'
              // console.log(this.$store.state.behavior.nextWeek.index, '索引1111')
              this.renderData('other', parseInt(this.$store.state.behavior.nextWeek.index))
              // console.log('解决接近军军军军军军军军军女')
            } else if (type === 'pre') {
              this.date = this.year + '年' + this.$store.state.behavior.prevWeek.month + '月'
              this.month = this.$store.state.behavior.prevWeek.month
              this.week = parseInt(this.$store.state.behavior.prevWeek.index) + 1
              this.renderData('other', parseInt(this.$store.state.behavior.prevWeek.index))
            }
          }, function () {  // 失败
          window.$.invoke('showMessage', { message: '网络请求失败' })
          this.key = true
        })
      }
    },
    covertToChinese: function (num) {
      var N = [
        '零', '一', '二', '三', '四', '五', '六', '七', '八', '九'
      ]
      // console.log(num)
      var str = num.toString()
      var len = num.toString().length
      var Num = []
      for (var i = 0; i < len; i++) {
        Num.push(N[str.charAt(i)])
      }
      return Num.join('')
    },
    // getUserInfo: function () {
    //   this.$http.jsonp('https://apicloud.xlhb.com/v1/user/user-info.api', {params: {access_token: functions.getParam('token')}}).then(
    //     function (obj) {
    //       // console.log(obj, 'getUserInfo')
    //       obj = obj.data
    //       // console.log(obj.data.data.role)
    //       // this.$store.state.role = obj.data.data.role
    //       // console.log('判断市，区教育局')
    //       if (obj.data.province_name !== '' && obj.data.city_name !== '' && obj.data.area_name !== '') { // 省市都不为空为市  省市区都不为空为区
    //         this.isArea = true  // 表示是区
    //       }
    //     }, function () {
    //     window.$.invoke('showMessage', { message: '网络请求失败' })
    //   })
    // },
    // 返回按钮
    prev: function (event) {
      this.$router.go(-1)
      console.log('go back')
      try {
        this.$invoke('toggleNavigation', { isShow: true })
        this.$invoke('setTitle', { title: '首页' })
      } catch (e) {
      }
      this.$store.state.behavior.sheetFlag = true
    },
    clickButton: function () {
      this.$router.push('/behavior/list')
      this.$router.go(1)
    }
  }
}
</script>
