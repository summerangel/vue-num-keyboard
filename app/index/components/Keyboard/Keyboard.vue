<template>
  <div>
    <div class="num-keyboard-wrapper" :class="{open: pObj.open}">
      <div class="finish" @mousedown="selectNumber('完成')">完成</div>
      <table class="table" border="0" cellspacing="0" cellpadding="0">
        <tbody>
        <tr v-for="item in numData">
          <td  v-for="num in item.list" @mousedown="selectNumber(num)">{{ num.value }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
  import events from '../../modules/events';
  import eventHub from '../../modules/event-hub';

  var numData = [
    {
      id: 0,
      list: [{
        value: 1,
        class: ''
      },
        {
          value: 2,
          class: ''
        },
        {
          value: 3,
          class: ''
        }
      ]
    },
    {
      id: 1,
      list: [{
        value: 4,
        class: ''
      },
        {
          value: 5,
          class: ''
        },
        {
          value: 6,
          class: ''
        }
      ]
    },
    {
      id: 2,
      list: [{
        value: 7,
        class: ''
      },
        {
          value: 8,
          class: ''
        },
        {
          value: 9,
          class: ''
        }
      ]
    },
    {
      id: 3,
      list: [{
        value: '.',
        class: 'bgD3D9DF'
      },
        {
          value: 0,
          class: ''
        },
        {
          value: '删除',
          class: 'bgD3D9DF'
        }
      ]
    }
  ];
  export default {
    beforeUpdate () {
      eventHub.$on(events.TOGGLE_NUM_KEYBOARD, this.toggleKeyboard);
    },
    data() {
      return {
        number: '',
        numData: numData,
        pObj: {
          open: true,  //是否弹出
          inputVal: ''  //其他组件输入框的值
        }
      }
    },
    methods: {
      selectNumber(item) {
        if (item.value !== '删除' && item !== '完成') {
          this.pObj.inputVal += item.value;
          eventHub.$emit(events.KEYBOARD_VALUE, this.pObj.inputVal);
        }
        else if (item.value === undefined && item === '完成') {
          this.pObj.open = false;
        }
        else if (item.value === '删除') {
          var num = this.pObj.inputVal;
          if (num) {
            var newNum = num.substr(0, num.length - 1);
            newNum = newNum === ''?'空':newNum;
            eventHub.$emit(events.KEYBOARD_VALUE, newNum);
          }
        }
        eventHub.$on(events.TOGGLE_NUM_KEYBOARD, this.toggleKeyboard);
      },
      toggleKeyboard(obj) {
        console.log('obj',obj);
        if (obj) {
          this.pObj = obj;
        }
      }
    }
  }
</script>
<style>
  .num-keyboard-wrapper {
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 1000;
    width: 100%;
    height: 193px;
    background-color: rgb(255, 255, 255);
    display: none;
  }
  .open {
    display: block;
  }
  .table {
    text-align:center;
    width:100%;
    height:160px;
    border-top:1px solid #CECDCE;
    background-color:#FFF;
  }
  td{
    width:33%;
    border:1px solid #ddd;
    border-right:0;
    border-top:0;
  }
  td:hover{
    background-color:#1FB9FF;
    color:#FFF;
  }
  .bgD3D9DF {
    background-color:#D3D9DF;
  }
  .finish {
    width:60px;
    height:28px;
    background-color:#1FB9FF;
    float:right;
    margin-right:5px;
    text-align:center;
    color:#fff;
    line-height:28px;
    border-radius:3px;
    margin-bottom:5px;
    cursor:pointer;
  }
</style>