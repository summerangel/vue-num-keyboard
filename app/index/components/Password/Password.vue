<template>
  <div class="set-password">
    <p class="set-password-tip">设置6位数字支付密码</p>
    <div class="set-password-in">
      <input hidden type="text" v-model="inputVal" maxlength="6">
      <div class="password" @click="getInputVal">
        <span class="pwd"><span v-if="sixPwd.one > 0">.</span></span>
        <span class="pwd"><span v-if="sixPwd.two > 0">.</span></span>
        <span class="pwd"><span v-if="sixPwd.three > 0">.</span></span>
        <span class="pwd"><span v-if="sixPwd.four > 0">.</span></span>
        <span class="pwd"><span v-if="sixPwd.five > 0">.</span></span>
        <span class="pwd"><span v-if="sixPwd.six > 0">.</span></span>
      </div>
    </div>
  </div>
</template>
<script>
  import events from '../../modules/events';
  import eventHub from '../../modules/event-hub';

  export default {
    beforeUpdate () {
      eventHub.$on(events.KEYBOARD_VALUE, this.getNumHandler);
      this.checkPayPassword();
      var obj = {
        open: true,
        inputVal: this.inputVal
      };
      eventHub.$emit(events.TOGGLE_NUM_KEYBOARD, obj);
    },
    data() {
      return {
        inputVal: '' //输入框的值
      }
    },
    computed: {
      sixPwd() {
        this.getInputVal();
        var sixPwd = {
          one: this.inputVal.length > 0?this.inputVal.substring(0,1):'',
          two: this.inputVal.length > 1?this.inputVal.substring(1,2):'',
          three: this.inputVal.length > 2?this.inputVal.substring(2,3):'',
          four: this.inputVal.length > 3?this.inputVal.substring(3,4):'',
          five: this.inputVal.length > 4?this.inputVal.substring(4,5):'',
          six: this.inputVal.length > 5?this.inputVal.substring(5,6):''
        }
        console.log('sixPwd',sixPwd);
        return sixPwd;
      }
    },
    methods: {
      checkPayPassword() {
        this.inputVal = this.inputVal.replace(/\D/g, '');
        if (/^\d{6}$/.test(this.inputVal)) {
        }
        else {
          this.inputVal = this.inputVal.substring(0,6);
        }
      },
      getInputVal() {
        eventHub.$on(events.KEYBOARD_VALUE, this.getNumHandler);

        //只输入6位
        this.checkPayPassword();

        var obj = {
          open: true,
          inputVal: this.inputVal
        };
        eventHub.$emit(events.TOGGLE_NUM_KEYBOARD, obj);
      },
      getNumHandler(val) {
        if (val) {
          this.inputVal = val === '空'?'':val;
        }
      }
    }
  }
</script>
<style>
  .set-password {

  }
  .set-password-tip {
    padding: 1.5rem 1rem;
    text-align: center;
  }
  .set-password-in {
    margin: 0 2rem;
    border: 1px solid #4F4F4F;
    border-radius: 5px;
  }
  .password {
    width: 100%;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    height: 3rem;
    border: 0;
  }
  .pwd {
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    border: 1px solid #4F4F4F;
    height: 3rem;
    text-align: center;
    line-height: 2.5rem;
  }
</style>