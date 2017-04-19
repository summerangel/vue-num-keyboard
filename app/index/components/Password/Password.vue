<template>
  <div class="set-password">
    <div style="width: 100%;min-height: 500px;" @mousedown.stop="closeKeyboard">
      <p class="set-password-tip">设置6位数字支付密码</p>
      <div class="mock-pwd clearfix">
        <ol>
          <li @mousedown.stop="toggleKeyboard" v-for="n in pwdNumbers" :class="{active: n === 1}">
          </li>
        </ol>
      </div>
      <div class="input-wrapper">
        <input minlength="6" maxlength="6"
               class="pwd-input form-control" type="text"
               v-model="inputVal" :id="'amount'">
      </div>
    </div>
    <Keyboard></Keyboard>
  </div>
</template>
<script>
  import events from '../../modules/events';
  import eventHub, { keyboard } from '../../modules/event-hub';
  import Keyboard from '../Keyboard';
  let input;

  export default {
    mounted () {
      input = document.getElementById('amount');
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        input.focus();
        eventHub.$on(events.KEYBOARD_VALUE, this.getNumHandler);
      })
    },
    beforeUpdate () {
      eventHub.$on(events.KEYBOARD_VALUE, this.getNumHandler);
      this.checkPayPassword();
      var obj = {
        open: true,
        inputVal: this.inputVal
      };
      keyboard.open(obj);
    },
    data() {
      return {
        inputVal: '' //输入框的值
      }
    },
    computed: {
      pwdNumbers() {
        this.getInputVal();
        let pwdNumbers = [0, 0, 0, 0, 0, 0];
        const l = this.inputVal.length - 1;
        pwdNumbers = pwdNumbers.map((number, index) => {
          return index <= l ? 1 : 0;
        });
        return pwdNumbers;
      }
    },
    components: { Keyboard },
    methods: {
      toggleKeyboard(e) {
        input.focus();
        this.getInputVal();
      },
      closeKeyboard(e) {
        e.preventDefault();
        var obj = {
          open: false,
          inputVal: this.inputVal
        };
        keyboard.close(obj);
      },
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
        keyboard.open(obj);
      },
      getNumHandler(val) {
        if (val) {
          this.inputVal = val === '空'?'':val;
        }
      }
    }
  }
</script>
<style src="./Password.scss" lang="sass"></style>